import { supabase } from '@/lib/supabase';

export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  soilPH: number;
  lightIntensity: number;
  windSpeed: number;
  rainfall: number;
}

export interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  rainfall: number;
  solarRadiation: number;
}

export interface CropData {
  fieldId: string;
  cropType: string;
  plantingDate: string;
  growthStage: string;
  ndviValue: number;
  leafAreaIndex: number;
  biomass: number;
}

export class DataProcessor {
  private static instance: DataProcessor;

  private constructor() {}

  public static getInstance(): DataProcessor {
    if (!DataProcessor.instance) {
      DataProcessor.instance = new DataProcessor();
    }
    return DataProcessor.instance;
  }

  /**
   * Aggregate sensor data for ML processing
   */
  async aggregateSensorData(
    fieldId: string,
    startDate: string,
    endDate: string,
    interval: 'hourly' | 'daily' | 'weekly' = 'daily'
  ): Promise<SensorData[]> {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('*')
      .eq('field_id', fieldId)
      .gte('timestamp', startDate)
      .lte('timestamp', endDate)
      .order('timestamp');

    if (error) throw error;

    return this.processTimeSeriesData(data, interval);
  }

  /**
   * Process and clean time series data
   */
  private processTimeSeriesData(rawData: any[], interval: string): SensorData[] {
    const groupedData = this.groupByTimeInterval(rawData, interval);
    
    return Object.entries(groupedData).map(([timestamp, readings]: [string, any[]]) => {
      const aggregated = this.aggregateReadings(readings);
      return {
        timestamp,
        temperature: this.handleMissingValues(aggregated.temperature),
        humidity: this.handleMissingValues(aggregated.humidity),
        soilMoisture: this.handleMissingValues(aggregated.soilMoisture),
        soilPH: this.handleMissingValues(aggregated.soilPH),
        lightIntensity: this.handleMissingValues(aggregated.lightIntensity),
        windSpeed: this.handleMissingValues(aggregated.windSpeed),
        rainfall: this.handleMissingValues(aggregated.rainfall),
      };
    });
  }

  /**
   * Group readings by time interval
   */
  private groupByTimeInterval(data: any[], interval: string): Record<string, any[]> {
    const grouped: Record<string, any[]> = {};

    data.forEach(reading => {
      const key = this.getTimeKey(reading.timestamp, interval);
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(reading);
    });

    return grouped;
  }

  /**
   * Get time key based on interval
   */
  private getTimeKey(timestamp: string, interval: string): string {
    const date = new Date(timestamp);
    
    switch (interval) {
      case 'hourly':
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}`;
      case 'daily':
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      case 'weekly':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        return `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
      default:
        return timestamp;
    }
  }

  /**
   * Aggregate multiple readings into single values
   */
  private aggregateReadings(readings: any[]): Record<string, number> {
    const sensorTypes = ['temperature', 'humidity', 'soilMoisture', 'soilPH', 'lightIntensity', 'windSpeed', 'rainfall'];
    const aggregated: Record<string, number> = {};

    sensorTypes.forEach(type => {
      const values = readings
        .filter(r => r.sensor_type === type)
        .map(r => r.value)
        .filter(v => v !== null && !isNaN(v));

      if (values.length > 0) {
        aggregated[type] = values.reduce((sum, val) => sum + val, 0) / values.length;
      }
    });

    return aggregated;
  }

  /**
   * Handle missing values using interpolation
   */
  private handleMissingValues(value: number | undefined): number {
    if (value === undefined || isNaN(value)) {
      // Return a reasonable default or use interpolation
      return 0; // In production, implement proper interpolation
    }
    return value;
  }

  /**
   * Normalize data for ML models
   */
  normalizeData(data: SensorData[]): SensorData[] {
    const features = ['temperature', 'humidity', 'soilMoisture', 'soilPH', 'lightIntensity', 'windSpeed', 'rainfall'];
    const stats = this.calculateStats(data, features);

    return data.map(record => {
      const normalized: any = { ...record };
      features.forEach(feature => {
        const value = (record as any)[feature];
        const stat = stats[feature];
        normalized[feature] = (value - stat.mean) / stat.std;
      });
      return normalized;
    });
  }

  /**
   * Calculate statistics for normalization
   */
  private calculateStats(data: SensorData[], features: string[]): Record<string, { mean: number; std: number }> {
    const stats: Record<string, { mean: number; std: number }> = {};

    features.forEach(feature => {
      const values = data.map(d => (d as any)[feature]).filter(v => !isNaN(v));
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
      const std = Math.sqrt(variance);

      stats[feature] = { mean, std: std || 1 }; // Avoid division by zero
    });

    return stats;
  }

  /**
   * Feature engineering for crop prediction
   */
  engineerFeatures(sensorData: SensorData[], weatherData: WeatherData[]): any[] {
    return sensorData.map((sensor, index) => {
      const weather = weatherData[index] || weatherData[weatherData.length - 1];
      
      return {
        // Basic features
        temperature: sensor.temperature,
        humidity: sensor.humidity,
        soilMoisture: sensor.soilMoisture,
        soilPH: sensor.soilPH,
        
        // Derived features
        temperatureHumidityIndex: sensor.temperature * sensor.humidity / 100,
        soilMoistureDeficit: Math.max(0, 40 - sensor.soilMoisture), // Optimal soil moisture ~40%
        phDeviation: Math.abs(sensor.soilPH - 6.5), // Optimal pH ~6.5
        
        // Weather features
        weatherTemperature: weather.temperature,
        weatherHumidity: weather.humidity,
        solarRadiation: weather.solarRadiation,
        
        // Time-based features
        dayOfYear: new Date(sensor.timestamp).getDayOfYear(),
        seasonality: Math.sin(2 * Math.PI * new Date(sensor.timestamp).getDayOfYear() / 365),
        
        // Rolling averages (simplified)
        temperatureTrend: this.calculateTrend(sensorData, index, 'temperature', 7),
        moistureTrend: this.calculateTrend(sensorData, index, 'soilMoisture', 7),
      };
    });
  }

  /**
   * Calculate trend over specified window
   */
  private calculateTrend(data: SensorData[], currentIndex: number, feature: keyof SensorData, window: number): number {
    const start = Math.max(0, currentIndex - window);
    const values = data.slice(start, currentIndex + 1).map(d => d[feature] as number);
    
    if (values.length < 2) return 0;
    
    // Simple linear trend calculation
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, idx) => sum + val * idx, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
    
    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  }
}

// Extend Date prototype for day of year calculation
declare global {
  interface Date {
    getDayOfYear(): number;
  }
}

Date.prototype.getDayOfYear = function() {
  const start = new Date(this.getFullYear(), 0, 0);
  const diff = this.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};