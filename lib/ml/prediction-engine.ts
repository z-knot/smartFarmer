import { DataProcessor, SensorData, WeatherData } from './data-processor';
import { supabase } from '@/lib/supabase';

export interface YieldPrediction {
  fieldId: string;
  cropType: string;
  predictedYield: number;
  confidence: number;
  factors: {
    weather: number;
    soil: number;
    management: number;
  };
  recommendations: string[];
}

export interface DiseaseRisk {
  fieldId: string;
  diseaseType: string;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  symptoms: string[];
  preventiveMeasures: string[];
}

export interface IrrigationRecommendation {
  fieldId: string;
  recommendedAmount: number; // in mm
  timing: string;
  priority: 'low' | 'medium' | 'high';
  reasoning: string;
}

export class PredictionEngine {
  private static instance: PredictionEngine;
  private dataProcessor: DataProcessor;
  private models: Map<string, any> = new Map();

  private constructor() {
    this.dataProcessor = DataProcessor.getInstance();
    this.initializeModels();
  }

  public static getInstance(): PredictionEngine {
    if (!PredictionEngine.instance) {
      PredictionEngine.instance = new PredictionEngine();
    }
    return PredictionEngine.instance;
  }

  /**
   * Initialize ML models (simplified for demo)
   */
  private initializeModels() {
    // In production, these would be actual trained models
    this.models.set('yieldPrediction', {
      predict: this.predictYield.bind(this),
      confidence: 0.85
    });

    this.models.set('diseaseDetection', {
      predict: this.predictDiseaseRisk.bind(this),
      confidence: 0.78
    });

    this.models.set('irrigationOptimization', {
      predict: this.optimizeIrrigation.bind(this),
      confidence: 0.92
    });
  }

  /**
   * Predict crop yield based on current conditions
   */
  async predictCropYield(fieldId: string, cropType: string): Promise<YieldPrediction> {
    try {
      // Get historical and current data
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
      
      const sensorData = await this.dataProcessor.aggregateSensorData(fieldId, startDate, endDate);
      const weatherData = await this.getWeatherData(fieldId, startDate, endDate);
      
      // Engineer features
      const features = this.dataProcessor.engineerFeatures(sensorData, weatherData);
      
      // Make prediction
      const prediction = await this.predictYield(features, cropType);
      
      return {
        fieldId,
        cropType,
        predictedYield: prediction.yield,
        confidence: prediction.confidence,
        factors: prediction.factors,
        recommendations: this.generateYieldRecommendations(prediction, features)
      };
    } catch (error) {
      console.error('Error predicting crop yield:', error);
      throw error;
    }
  }

  /**
   * Predict disease risk based on environmental conditions
   */
  async predictDiseaseRisk(fieldId: string, cropType: string): Promise<DiseaseRisk[]> {
    try {
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
      
      const sensorData = await this.dataProcessor.aggregateSensorData(fieldId, startDate, endDate);
      const features = this.extractDiseaseFeatures(sensorData);
      
      const diseases = await this.getDiseaseDatabase(cropType);
      const risks: DiseaseRisk[] = [];
      
      for (const disease of diseases) {
        const risk = this.calculateDiseaseRisk(features, disease);
        if (risk.probability > 0.3) { // Only include significant risks
          risks.push({
            fieldId,
            diseaseType: disease.name,
            riskLevel: this.getRiskLevel(risk.probability),
            probability: risk.probability,
            symptoms: disease.symptoms,
            preventiveMeasures: disease.preventiveMeasures
          });
        }
      }
      
      return risks.sort((a, b) => b.probability - a.probability);
    } catch (error) {
      console.error('Error predicting disease risk:', error);
      throw error;
    }
  }

  /**
   * Generate irrigation recommendations
   */
  async generateIrrigationRecommendation(fieldId: string): Promise<IrrigationRecommendation> {
    try {
      const endDate = new Date().toISOString();
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      const sensorData = await this.dataProcessor.aggregateSensorData(fieldId, startDate, endDate);
      const weatherForecast = await this.getWeatherForecast(fieldId, 7);
      
      const recommendation = this.optimizeIrrigation(sensorData, weatherForecast);
      
      return {
        fieldId,
        recommendedAmount: recommendation.amount,
        timing: recommendation.timing,
        priority: recommendation.priority,
        reasoning: recommendation.reasoning
      };
    } catch (error) {
      console.error('Error generating irrigation recommendation:', error);
      throw error;
    }
  }

  /**
   * Simplified yield prediction model
   */
  private async predictYield(features: any[], cropType: string): Promise<any> {
    // This is a simplified model - in production, use actual ML models
    const latestFeatures = features[features.length - 1];
    
    // Base yield for crop type
    const baseYields: Record<string, number> = {
      'corn': 9500, // kg/ha
      'soybeans': 3200,
      'wheat': 4800,
      'cotton': 1600,
      'rice': 7200
    };
    
    const baseYield = baseYields[cropType.toLowerCase()] || 5000;
    
    // Calculate yield modifiers based on conditions
    const temperatureModifier = this.calculateTemperatureModifier(latestFeatures.temperature);
    const moistureModifier = this.calculateMoistureModifier(latestFeatures.soilMoisture);
    const phModifier = this.calculatePHModifier(latestFeatures.soilPH);
    const weatherModifier = this.calculateWeatherModifier(latestFeatures);
    
    const totalModifier = (temperatureModifier + moistureModifier + phModifier + weatherModifier) / 4;
    const predictedYield = baseYield * totalModifier;
    
    return {
      yield: Math.round(predictedYield),
      confidence: 0.85,
      factors: {
        weather: weatherModifier,
        soil: (moistureModifier + phModifier) / 2,
        management: 0.9 // Simplified
      }
    };
  }

  /**
   * Calculate temperature modifier for yield
   */
  private calculateTemperatureModifier(temperature: number): number {
    // Optimal temperature range varies by crop, using general range 20-25°C
    if (temperature >= 20 && temperature <= 25) return 1.0;
    if (temperature >= 15 && temperature <= 30) return 0.9;
    if (temperature >= 10 && temperature <= 35) return 0.7;
    return 0.5;
  }

  /**
   * Calculate moisture modifier for yield
   */
  private calculateMoistureModifier(moisture: number): number {
    // Optimal soil moisture 35-45%
    if (moisture >= 35 && moisture <= 45) return 1.0;
    if (moisture >= 25 && moisture <= 55) return 0.8;
    if (moisture >= 15 && moisture <= 65) return 0.6;
    return 0.4;
  }

  /**
   * Calculate pH modifier for yield
   */
  private calculatePHModifier(ph: number): number {
    // Optimal pH 6.0-7.0
    if (ph >= 6.0 && ph <= 7.0) return 1.0;
    if (ph >= 5.5 && ph <= 7.5) return 0.9;
    if (ph >= 5.0 && ph <= 8.0) return 0.7;
    return 0.5;
  }

  /**
   * Calculate weather modifier for yield
   */
  private calculateWeatherModifier(features: any): number {
    // Simplified weather impact calculation
    const solarRadiation = features.solarRadiation || 800; // W/m²
    const humidity = features.weatherHumidity || 60;
    
    let modifier = 1.0;
    
    // Solar radiation impact
    if (solarRadiation < 400) modifier *= 0.7;
    else if (solarRadiation > 1200) modifier *= 0.8;
    
    // Humidity impact
    if (humidity < 40 || humidity > 80) modifier *= 0.9;
    
    return modifier;
  }

  /**
   * Extract features relevant to disease prediction
   */
  private extractDiseaseFeatures(sensorData: SensorData[]): any {
    const latest = sensorData[sensorData.length - 1];
    const recent = sensorData.slice(-7); // Last 7 days
    
    return {
      currentHumidity: latest.humidity,
      currentTemperature: latest.temperature,
      avgHumidity: recent.reduce((sum, d) => sum + d.humidity, 0) / recent.length,
      avgTemperature: recent.reduce((sum, d) => sum + d.temperature, 0) / recent.length,
      humidityVariation: this.calculateVariation(recent.map(d => d.humidity)),
      temperatureVariation: this.calculateVariation(recent.map(d => d.temperature)),
      wetDays: recent.filter(d => d.humidity > 80).length,
      leafWetnessDuration: this.estimateLeafWetness(recent)
    };
  }

  /**
   * Calculate variation in data
   */
  private calculateVariation(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  /**
   * Estimate leaf wetness duration
   */
  private estimateLeafWetness(data: SensorData[]): number {
    // Simplified estimation based on humidity and temperature
    return data.filter(d => d.humidity > 85 && d.temperature > 15).length;
  }

  /**
   * Get disease database for crop type
   */
  private async getDiseaseDatabase(cropType: string): Promise<any[]> {
    // In production, this would be a comprehensive disease database
    const diseases: Record<string, any[]> = {
      corn: [
        {
          name: 'Gray Leaf Spot',
          conditions: { humidity: { min: 80 }, temperature: { min: 22, max: 30 } },
          symptoms: ['Gray lesions on leaves', 'Reduced photosynthesis'],
          preventiveMeasures: ['Crop rotation', 'Fungicide application', 'Resistant varieties']
        },
        {
          name: 'Northern Corn Leaf Blight',
          conditions: { humidity: { min: 75 }, temperature: { min: 18, max: 27 } },
          symptoms: ['Elliptical lesions', 'Yellowing leaves'],
          preventiveMeasures: ['Resistant hybrids', 'Crop rotation', 'Tillage practices']
        }
      ],
      soybeans: [
        {
          name: 'Soybean Rust',
          conditions: { humidity: { min: 85 }, temperature: { min: 20, max: 28 } },
          symptoms: ['Small reddish-brown spots', 'Premature defoliation'],
          preventiveMeasures: ['Fungicide application', 'Early detection', 'Resistant varieties']
        }
      ]
    };
    
    return diseases[cropType.toLowerCase()] || [];
  }

  /**
   * Calculate disease risk based on conditions
   */
  private calculateDiseaseRisk(features: any, disease: any): any {
    let riskScore = 0;
    
    // Check humidity conditions
    if (disease.conditions.humidity) {
      if (features.avgHumidity >= disease.conditions.humidity.min) {
        riskScore += 0.4;
      }
      if (features.wetDays >= 3) {
        riskScore += 0.2;
      }
    }
    
    // Check temperature conditions
    if (disease.conditions.temperature) {
      const temp = features.avgTemperature;
      if (temp >= disease.conditions.temperature.min && temp <= disease.conditions.temperature.max) {
        riskScore += 0.3;
      }
    }
    
    // Leaf wetness factor
    if (features.leafWetnessDuration >= 3) {
      riskScore += 0.1;
    }
    
    return {
      probability: Math.min(riskScore, 1.0)
    };
  }

  /**
   * Get risk level from probability
   */
  private getRiskLevel(probability: number): 'low' | 'medium' | 'high' {
    if (probability >= 0.7) return 'high';
    if (probability >= 0.4) return 'medium';
    return 'low';
  }

  /**
   * Optimize irrigation based on conditions
   */
  private optimizeIrrigation(sensorData: SensorData[], weatherForecast: any[]): any {
    const latest = sensorData[sensorData.length - 1];
    const currentMoisture = latest.soilMoisture;
    const targetMoisture = 40; // Optimal soil moisture
    
    // Calculate deficit
    const moistureDeficit = Math.max(0, targetMoisture - currentMoisture);
    
    // Check upcoming rainfall
    const expectedRainfall = weatherForecast
      .slice(0, 3) // Next 3 days
      .reduce((sum, day) => sum + (day.rainfall || 0), 0);
    
    // Adjust recommendation based on forecast
    let recommendedAmount = moistureDeficit * 2.5; // mm of water
    
    if (expectedRainfall > 10) {
      recommendedAmount *= 0.5; // Reduce if rain expected
    }
    
    // Determine timing and priority
    let timing = 'within 24 hours';
    let priority: 'low' | 'medium' | 'high' = 'medium';
    
    if (currentMoisture < 25) {
      priority = 'high';
      timing = 'immediately';
    } else if (currentMoisture > 35) {
      priority = 'low';
      timing = 'within 48 hours';
    }
    
    return {
      amount: Math.round(recommendedAmount),
      timing,
      priority,
      reasoning: this.generateIrrigationReasoning(currentMoisture, expectedRainfall, moistureDeficit)
    };
  }

  /**
   * Generate reasoning for irrigation recommendation
   */
  private generateIrrigationReasoning(currentMoisture: number, expectedRainfall: number, deficit: number): string {
    let reasoning = `Current soil moisture is ${currentMoisture.toFixed(1)}%. `;
    
    if (deficit > 0) {
      reasoning += `This is ${deficit.toFixed(1)}% below optimal levels. `;
    } else {
      reasoning += 'Soil moisture is at optimal levels. ';
    }
    
    if (expectedRainfall > 5) {
      reasoning += `Expected rainfall of ${expectedRainfall.toFixed(1)}mm in the next 3 days reduces irrigation needs.`;
    } else {
      reasoning += 'No significant rainfall expected in the next 3 days.';
    }
    
    return reasoning;
  }

  /**
   * Generate yield improvement recommendations
   */
  private generateYieldRecommendations(prediction: any, features: any[]): string[] {
    const recommendations: string[] = [];
    const latest = features[features.length - 1];
    
    // Soil moisture recommendations
    if (latest.soilMoisture < 35) {
      recommendations.push('Increase irrigation frequency to maintain optimal soil moisture');
    } else if (latest.soilMoisture > 50) {
      recommendations.push('Reduce irrigation to prevent waterlogging and root diseases');
    }
    
    // pH recommendations
    if (latest.phDeviation > 0.5) {
      if (latest.soilPH < 6.0) {
        recommendations.push('Apply lime to increase soil pH to optimal range (6.0-7.0)');
      } else if (latest.soilPH > 7.5) {
        recommendations.push('Apply sulfur or organic matter to reduce soil pH');
      }
    }
    
    // Temperature management
    if (latest.temperature > 30) {
      recommendations.push('Consider shade structures or increased irrigation during hot periods');
    }
    
    // Nutrient management
    if (prediction.factors.soil < 0.8) {
      recommendations.push('Conduct soil test and apply appropriate fertilizers');
    }
    
    return recommendations;
  }

  /**
   * Get weather data (mock implementation)
   */
  private async getWeatherData(fieldId: string, startDate: string, endDate: string): Promise<WeatherData[]> {
    // In production, integrate with weather API
    return [];
  }

  /**
   * Get weather forecast (mock implementation)
   */
  private async getWeatherForecast(fieldId: string, days: number): Promise<any[]> {
    // In production, integrate with weather forecast API
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      temperature: 22 + Math.random() * 8,
      humidity: 60 + Math.random() * 20,
      rainfall: Math.random() * 5
    }));
  }
}