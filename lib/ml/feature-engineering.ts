export interface FeatureSet {
  temporal: number[];
  environmental: number[];
  soil: number[];
  crop: number[];
  weather: number[];
  derived: number[];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  category: 'temporal' | 'environmental' | 'soil' | 'crop' | 'weather' | 'derived';
}

export class FeatureEngineering {
  private static instance: FeatureEngineering;

  private constructor() {}

  public static getInstance(): FeatureEngineering {
    if (!FeatureEngineering.instance) {
      FeatureEngineering.instance = new FeatureEngineering();
    }
    return FeatureEngineering.instance;
  }

  /**
   * Create comprehensive feature set for ML models
   */
  createFeatureSet(
    sensorData: any[],
    weatherData: any[],
    cropData: any,
    soilData: any
  ): FeatureSet {
    return {
      temporal: this.createTemporalFeatures(sensorData),
      environmental: this.createEnvironmentalFeatures(sensorData, weatherData),
      soil: this.createSoilFeatures(soilData),
      crop: this.createCropFeatures(cropData),
      weather: this.createWeatherFeatures(weatherData),
      derived: this.createDerivedFeatures(sensorData, weatherData, cropData)
    };
  }

  /**
   * Create temporal features
   */
  private createTemporalFeatures(sensorData: any[]): number[] {
    if (sensorData.length === 0) return [];

    const latest = sensorData[sensorData.length - 1];
    const date = new Date(latest.timestamp);

    return [
      date.getMonth() + 1, // Month (1-12)
      date.getDate(), // Day of month
      date.getDay(), // Day of week
      this.getDayOfYear(date), // Day of year
      Math.sin(2 * Math.PI * this.getDayOfYear(date) / 365), // Seasonal sine
      Math.cos(2 * Math.PI * this.getDayOfYear(date) / 365), // Seasonal cosine
      date.getHours(), // Hour of day
      this.getWeekOfYear(date), // Week of year
      this.isGrowingSeason(date) ? 1 : 0, // Growing season indicator
      this.getDaysSincePlanting(date, latest.plantingDate || '2024-03-15') // Days since planting
    ];
  }

  /**
   * Create environmental features
   */
  private createEnvironmentalFeatures(sensorData: any[], weatherData: any[]): number[] {
    if (sensorData.length === 0) return [];

    const latest = sensorData[sensorData.length - 1];
    const recent = sensorData.slice(-7); // Last 7 days

    return [
      latest.temperature || 0,
      latest.humidity || 0,
      latest.lightIntensity || 0,
      latest.windSpeed || 0,
      this.calculateAverage(recent, 'temperature'),
      this.calculateAverage(recent, 'humidity'),
      this.calculateStandardDeviation(recent, 'temperature'),
      this.calculateStandardDeviation(recent, 'humidity'),
      this.calculateTrend(recent, 'temperature'),
      this.calculateTrend(recent, 'humidity'),
      this.countExtremeValues(recent, 'temperature', 30), // Days above 30°C
      this.countExtremeValues(recent, 'humidity', 80), // Days above 80% humidity
    ];
  }

  /**
   * Create soil features
   */
  private createSoilFeatures(soilData: any): number[] {
    return [
      soilData.soilMoisture || 0,
      soilData.soilPH || 0,
      soilData.nitrogen || 0,
      soilData.phosphorus || 0,
      soilData.potassium || 0,
      soilData.organicMatter || 0,
      soilData.electricalConductivity || 0,
      soilData.bulkDensity || 0,
      // Derived soil features
      Math.abs((soilData.soilPH || 0) - 6.5), // pH deviation from optimal
      (soilData.soilMoisture || 0) < 30 ? 1 : 0, // Moisture stress indicator
      this.calculateNutrientBalance(soilData), // NPK balance
      this.calculateSoilHealthIndex(soilData) // Overall soil health
    ];
  }

  /**
   * Create crop-specific features
   */
  private createCropFeatures(cropData: any): number[] {
    const growthStageMap: Record<string, number> = {
      'germination': 1,
      'vegetative': 2,
      'reproductive': 3,
      'maturity': 4
    };

    return [
      growthStageMap[cropData.growthStage] || 0,
      cropData.plantDensity || 0,
      cropData.leafAreaIndex || 0,
      cropData.biomass || 0,
      cropData.ndviValue || 0,
      cropData.chlorophyllContent || 0,
      cropData.canopyHeight || 0,
      cropData.rootDepth || 0,
      // Crop stress indicators
      cropData.waterStress || 0,
      cropData.nutrientStress || 0,
      cropData.diseasePresence || 0,
      cropData.pestPresence || 0
    ];
  }

  /**
   * Create weather features
   */
  private createWeatherFeatures(weatherData: any[]): number[] {
    if (weatherData.length === 0) return [];

    const latest = weatherData[weatherData.length - 1];
    const recent = weatherData.slice(-7);

    return [
      latest.temperature || 0,
      latest.humidity || 0,
      latest.pressure || 0,
      latest.windSpeed || 0,
      latest.windDirection || 0,
      latest.rainfall || 0,
      latest.solarRadiation || 0,
      latest.uvIndex || 0,
      // Aggregated weather features
      this.calculateSum(recent, 'rainfall'), // Total rainfall last 7 days
      this.calculateAverage(recent, 'temperature'),
      this.calculateAverage(recent, 'humidity'),
      this.calculateAverage(recent, 'solarRadiation'),
      // Weather stress indicators
      this.countExtremeValues(recent, 'temperature', 35), // Heat stress days
      this.countExtremeValues(recent, 'temperature', 5, 'below'), // Cold stress days
      this.countExtremeValues(recent, 'rainfall', 20), // Heavy rain days
      this.calculateGrowingDegreeDays(recent) // Growing degree days
    ];
  }

  /**
   * Create derived features from multiple data sources
   */
  private createDerivedFeatures(sensorData: any[], weatherData: any[], cropData: any): number[] {
    if (sensorData.length === 0) return [];

    const latestSensor = sensorData[sensorData.length - 1];
    const latestWeather = weatherData.length > 0 ? weatherData[weatherData.length - 1] : {};

    return [
      // Comfort indices
      this.calculateHeatIndex(latestSensor.temperature, latestSensor.humidity),
      this.calculateVaporPressureDeficit(latestSensor.temperature, latestSensor.humidity),
      
      // Stress indicators
      this.calculateWaterStressIndex(latestSensor.soilMoisture, latestWeather.temperature),
      this.calculateTemperatureStressIndex(latestSensor.temperature),
      
      // Growth potential indicators
      this.calculatePhotosynthesisIndex(latestSensor.lightIntensity, latestSensor.temperature),
      this.calculateEvapotranspirationIndex(latestSensor.temperature, latestSensor.humidity, latestSensor.windSpeed),
      
      // Disease risk factors
      this.calculateDiseaseRiskIndex(latestSensor.humidity, latestSensor.temperature),
      this.calculateFungalRiskIndex(latestSensor.humidity, latestSensor.temperature, latestWeather.rainfall),
      
      // Nutrient availability
      this.calculateNutrientAvailabilityIndex(latestSensor.soilPH, latestSensor.soilMoisture),
      
      // Interaction terms
      latestSensor.temperature * latestSensor.humidity / 100, // Temperature-humidity interaction
      latestSensor.soilMoisture * latestSensor.temperature, // Soil-temperature interaction
      latestSensor.lightIntensity * (latestSensor.temperature / 25), // Light-temperature interaction
    ];
  }

  /**
   * Calculate feature importance for model interpretation
   */
  calculateFeatureImportance(model: any, featureNames: string[]): FeatureImportance[] {
    // Mock implementation - in production, use actual model feature importance
    const mockImportances = featureNames.map((name, index) => ({
      feature: name,
      importance: Math.random() * 0.1 + (index % 5) * 0.02,
      category: this.categorizeFeature(name)
    }));

    return mockImportances.sort((a, b) => b.importance - a.importance);
  }

  /**
   * Select top features based on importance
   */
  selectTopFeatures(
    featureImportances: FeatureImportance[],
    topK: number = 20
  ): string[] {
    return featureImportances
      .slice(0, topK)
      .map(fi => fi.feature);
  }

  /**
   * Create polynomial features for non-linear relationships
   */
  createPolynomialFeatures(features: number[], degree: number = 2): number[] {
    const polynomialFeatures: number[] = [...features];

    if (degree >= 2) {
      // Add squared terms
      features.forEach(feature => {
        polynomialFeatures.push(feature * feature);
      });

      // Add interaction terms
      for (let i = 0; i < features.length; i++) {
        for (let j = i + 1; j < features.length; j++) {
          polynomialFeatures.push(features[i] * features[j]);
        }
      }
    }

    return polynomialFeatures;
  }

  // Helper methods

  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private getWeekOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  }

  private isGrowingSeason(date: Date): boolean {
    const month = date.getMonth() + 1;
    return month >= 4 && month <= 10; // April to October
  }

  private getDaysSincePlanting(currentDate: Date, plantingDate: string): number {
    const planting = new Date(plantingDate);
    const diff = currentDate.getTime() - planting.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private calculateAverage(data: any[], field: string): number {
    const values = data.map(d => d[field]).filter(v => v !== undefined && !isNaN(v));
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  }

  private calculateSum(data: any[], field: string): number {
    const values = data.map(d => d[field]).filter(v => v !== undefined && !isNaN(v));
    return values.reduce((sum, val) => sum + val, 0);
  }

  private calculateStandardDeviation(data: any[], field: string): number {
    const values = data.map(d => d[field]).filter(v => v !== undefined && !isNaN(v));
    if (values.length < 2) return 0;

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  private calculateTrend(data: any[], field: string): number {
    const values = data.map(d => d[field]).filter(v => v !== undefined && !isNaN(v));
    if (values.length < 2) return 0;

    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, idx) => sum + val * idx, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  }

  private countExtremeValues(data: any[], field: string, threshold: number, direction: 'above' | 'below' = 'above'): number {
    const values = data.map(d => d[field]).filter(v => v !== undefined && !isNaN(v));
    return values.filter(val => 
      direction === 'above' ? val > threshold : val < threshold
    ).length;
  }

  private calculateNutrientBalance(soilData: any): number {
    const n = soilData.nitrogen || 0;
    const p = soilData.phosphorus || 0;
    const k = soilData.potassium || 0;
    
    // Simplified NPK balance calculation
    const total = n + p + k;
    if (total === 0) return 0;
    
    const nRatio = n / total;
    const pRatio = p / total;
    const kRatio = k / total;
    
    // Optimal ratios (simplified)
    const optimalN = 0.5;
    const optimalP = 0.2;
    const optimalK = 0.3;
    
    const deviation = Math.abs(nRatio - optimalN) + Math.abs(pRatio - optimalP) + Math.abs(kRatio - optimalK);
    return 1 - deviation; // Higher value = better balance
  }

  private calculateSoilHealthIndex(soilData: any): number {
    const factors = [
      this.normalizeValue(soilData.organicMatter || 0, 0, 10),
      this.normalizeValue(soilData.soilPH || 0, 5.5, 7.5),
      this.normalizeValue(soilData.soilMoisture || 0, 30, 50),
      1 - this.normalizeValue(soilData.bulkDensity || 0, 1.0, 1.6)
    ];
    
    return factors.reduce((sum, factor) => sum + factor, 0) / factors.length;
  }

  private calculateHeatIndex(temperature: number, humidity: number): number {
    if (temperature < 27) return temperature;
    
    const t = temperature;
    const h = humidity;
    
    return -8.78469475556 + 1.61139411 * t + 2.33854883889 * h +
           -0.14611605 * t * h + -0.012308094 * t * t +
           -0.0164248277778 * h * h + 0.002211732 * t * t * h +
           0.00072546 * t * h * h + -0.000003582 * t * t * h * h;
  }

  private calculateVaporPressureDeficit(temperature: number, humidity: number): number {
    const saturationVaporPressure = 0.6108 * Math.exp(17.27 * temperature / (temperature + 237.3));
    const actualVaporPressure = saturationVaporPressure * humidity / 100;
    return saturationVaporPressure - actualVaporPressure;
  }

  private calculateWaterStressIndex(soilMoisture: number, temperature: number): number {
    const optimalMoisture = 40;
    const moistureStress = Math.max(0, (optimalMoisture - soilMoisture) / optimalMoisture);
    const temperatureStress = Math.max(0, (temperature - 25) / 10);
    return (moistureStress + temperatureStress) / 2;
  }

  private calculateTemperatureStressIndex(temperature: number): number {
    const optimalMin = 20;
    const optimalMax = 25;
    
    if (temperature >= optimalMin && temperature <= optimalMax) return 0;
    if (temperature < optimalMin) return (optimalMin - temperature) / 10;
    return (temperature - optimalMax) / 10;
  }

  private calculatePhotosynthesisIndex(lightIntensity: number, temperature: number): number {
    const optimalLight = 800; // W/m²
    const optimalTemp = 25; // °C
    
    const lightFactor = Math.min(1, lightIntensity / optimalLight);
    const tempFactor = 1 - Math.abs(temperature - optimalTemp) / 15;
    
    return lightFactor * Math.max(0, tempFactor);
  }

  private calculateEvapotranspirationIndex(temperature: number, humidity: number, windSpeed: number): number {
    // Simplified Penman-Monteith equation components
    const vpd = this.calculateVaporPressureDeficit(temperature, humidity);
    return (temperature * vpd * (1 + windSpeed / 10)) / 100;
  }

  private calculateDiseaseRiskIndex(humidity: number, temperature: number): number {
    // High humidity and moderate temperatures increase disease risk
    const humidityFactor = humidity > 80 ? 1 : humidity / 80;
    const tempFactor = temperature >= 15 && temperature <= 30 ? 1 : 0.5;
    return humidityFactor * tempFactor;
  }

  private calculateFungalRiskIndex(humidity: number, temperature: number, rainfall: number): number {
    const baseRisk = this.calculateDiseaseRiskIndex(humidity, temperature);
    const rainfallFactor = rainfall > 5 ? 1.5 : 1;
    return Math.min(1, baseRisk * rainfallFactor);
  }

  private calculateNutrientAvailabilityIndex(ph: number, moisture: number): number {
    const phFactor = 1 - Math.abs(ph - 6.5) / 2; // Optimal pH around 6.5
    const moistureFactor = moisture > 30 ? 1 : moisture / 30;
    return Math.max(0, phFactor * moistureFactor);
  }

  private calculateGrowingDegreeDays(weatherData: any[]): number {
    const baseTemp = 10; // Base temperature for most crops
    return weatherData.reduce((sum, day) => {
      const avgTemp = (day.maxTemp + day.minTemp) / 2;
      return sum + Math.max(0, avgTemp - baseTemp);
    }, 0);
  }

  private normalizeValue(value: number, min: number, max: number): number {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  }

  private categorizeFeature(featureName: string): 'temporal' | 'environmental' | 'soil' | 'crop' | 'weather' | 'derived' {
    const name = featureName.toLowerCase();
    
    if (name.includes('month') || name.includes('day') || name.includes('hour') || name.includes('season')) {
      return 'temporal';
    }
    if (name.includes('soil') || name.includes('ph') || name.includes('nitrogen') || name.includes('phosphorus')) {
      return 'soil';
    }
    if (name.includes('crop') || name.includes('growth') || name.includes('ndvi') || name.includes('biomass')) {
      return 'crop';
    }
    if (name.includes('weather') || name.includes('rain') || name.includes('wind') || name.includes('pressure')) {
      return 'weather';
    }
    if (name.includes('index') || name.includes('stress') || name.includes('interaction')) {
      return 'derived';
    }
    
    return 'environmental';
  }
}