import { PredictionEngine, YieldPrediction, DiseaseRisk, IrrigationRecommendation } from './prediction-engine';
import { supabase } from '@/lib/supabase';

export interface Recommendation {
  id: string;
  fieldId: string;
  type: 'irrigation' | 'fertilization' | 'pest_control' | 'disease_prevention' | 'harvest_timing';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionItems: string[];
  expectedBenefit: string;
  timeframe: string;
  confidence: number;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
}

export interface FertilizationRecommendation {
  fieldId: string;
  nutrientDeficiencies: string[];
  recommendedFertilizers: {
    type: string;
    amount: number;
    unit: string;
    applicationMethod: string;
  }[];
  timing: string;
  expectedYieldIncrease: number;
}

export interface HarvestRecommendation {
  fieldId: string;
  cropType: string;
  optimalHarvestDate: string;
  currentMaturity: number;
  qualityFactors: {
    moistureContent: number;
    sugarContent?: number;
    proteinContent?: number;
  };
  marketConditions: {
    currentPrice: number;
    priceProjection: number;
    demandLevel: 'low' | 'medium' | 'high';
  };
}

export class RecommendationSystem {
  private static instance: RecommendationSystem;
  private predictionEngine: PredictionEngine;

  private constructor() {
    this.predictionEngine = PredictionEngine.getInstance();
  }

  public static getInstance(): RecommendationSystem {
    if (!RecommendationSystem.instance) {
      RecommendationSystem.instance = new RecommendationSystem();
    }
    return RecommendationSystem.instance;
  }

  /**
   * Generate comprehensive recommendations for a field
   */
  async generateFieldRecommendations(fieldId: string): Promise<Recommendation[]> {
    try {
      const field = await this.getFieldInfo(fieldId);
      const recommendations: Recommendation[] = [];

      // Get predictions
      const [yieldPrediction, diseaseRisks, irrigationRec] = await Promise.all([
        this.predictionEngine.predictCropYield(fieldId, field.cropType),
        this.predictionEngine.predictDiseaseRisk(fieldId, field.cropType),
        this.predictionEngine.generateIrrigationRecommendation(fieldId)
      ]);

      // Generate irrigation recommendations
      if (irrigationRec.priority !== 'low') {
        recommendations.push(this.createIrrigationRecommendation(irrigationRec));
      }

      // Generate disease prevention recommendations
      for (const risk of diseaseRisks) {
        if (risk.riskLevel === 'high' || risk.riskLevel === 'medium') {
          recommendations.push(this.createDiseasePreventionRecommendation(risk));
        }
      }

      // Generate fertilization recommendations
      const fertilizationRec = await this.generateFertilizationRecommendation(fieldId, field.cropType);
      if (fertilizationRec) {
        recommendations.push(this.createFertilizationRecommendation(fertilizationRec));
      }

      // Generate harvest timing recommendations
      if (field.growthStage === 'maturity' || field.growthStage === 'late_reproductive') {
        const harvestRec = await this.generateHarvestRecommendation(fieldId, field.cropType);
        recommendations.push(this.createHarvestRecommendation(harvestRec));
      }

      // Generate yield optimization recommendations
      recommendations.push(...this.createYieldOptimizationRecommendations(yieldPrediction));

      // Sort by priority and confidence
      return recommendations.sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.confidence - a.confidence;
      });

    } catch (error) {
      console.error('Error generating field recommendations:', error);
      throw error;
    }
  }

  /**
   * Create irrigation recommendation
   */
  private createIrrigationRecommendation(irrigationRec: IrrigationRecommendation): Recommendation {
    return {
      id: `irrigation_${Date.now()}`,
      fieldId: irrigationRec.fieldId,
      type: 'irrigation',
      priority: irrigationRec.priority,
      title: 'Irrigation Required',
      description: irrigationRec.reasoning,
      actionItems: [
        `Apply ${irrigationRec.recommendedAmount}mm of water`,
        `Schedule irrigation ${irrigationRec.timing}`,
        'Monitor soil moisture levels after irrigation',
        'Check irrigation system efficiency'
      ],
      expectedBenefit: 'Maintain optimal soil moisture for crop growth',
      timeframe: irrigationRec.timing,
      confidence: 0.92,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
  }

  /**
   * Create disease prevention recommendation
   */
  private createDiseasePreventionRecommendation(risk: DiseaseRisk): Recommendation {
    const priority = risk.riskLevel === 'high' ? 'critical' : 'high';
    
    return {
      id: `disease_${risk.diseaseType}_${Date.now()}`,
      fieldId: risk.fieldId,
      type: 'disease_prevention',
      priority,
      title: `${risk.diseaseType} Prevention`,
      description: `${Math.round(risk.probability * 100)}% risk of ${risk.diseaseType} based on current conditions`,
      actionItems: [
        ...risk.preventiveMeasures,
        'Increase field monitoring frequency',
        'Document any symptoms observed'
      ],
      expectedBenefit: `Prevent potential yield loss from ${risk.diseaseType}`,
      timeframe: 'within 48 hours',
      confidence: 0.78,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
  }

  /**
   * Generate fertilization recommendation
   */
  async generateFertilizationRecommendation(fieldId: string, cropType: string): Promise<FertilizationRecommendation | null> {
    try {
      // Get soil test data and crop requirements
      const soilData = await this.getLatestSoilData(fieldId);
      const cropRequirements = this.getCropNutrientRequirements(cropType);
      
      const deficiencies = this.identifyNutrientDeficiencies(soilData, cropRequirements);
      
      if (deficiencies.length === 0) {
        return null; // No fertilization needed
      }

      const fertilizers = this.recommendFertilizers(deficiencies, cropType);
      
      return {
        fieldId,
        nutrientDeficiencies: deficiencies,
        recommendedFertilizers: fertilizers,
        timing: this.determineFertilizationTiming(cropType),
        expectedYieldIncrease: this.calculateExpectedYieldIncrease(deficiencies)
      };

    } catch (error) {
      console.error('Error generating fertilization recommendation:', error);
      return null;
    }
  }

  /**
   * Create fertilization recommendation
   */
  private createFertilizationRecommendation(fertilizationRec: FertilizationRecommendation): Recommendation {
    const fertilizerList = fertilizationRec.recommendedFertilizers
      .map(f => `${f.amount}${f.unit} of ${f.type}`)
      .join(', ');

    return {
      id: `fertilization_${Date.now()}`,
      fieldId: fertilizationRec.fieldId,
      type: 'fertilization',
      priority: 'medium',
      title: 'Fertilization Recommended',
      description: `Nutrient deficiencies detected: ${fertilizationRec.nutrientDeficiencies.join(', ')}`,
      actionItems: [
        `Apply ${fertilizerList}`,
        `Use ${fertilizationRec.recommendedFertilizers[0]?.applicationMethod || 'broadcast'} application method`,
        'Conduct soil test after 2 weeks',
        'Monitor crop response'
      ],
      expectedBenefit: `Expected yield increase: ${fertilizationRec.expectedYieldIncrease}%`,
      timeframe: fertilizationRec.timing,
      confidence: 0.85,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
  }

  /**
   * Generate harvest recommendation
   */
  async generateHarvestRecommendation(fieldId: string, cropType: string): Promise<HarvestRecommendation> {
    // Mock implementation - in production, integrate with market data APIs
    const currentDate = new Date();
    const optimalDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

    return {
      fieldId,
      cropType,
      optimalHarvestDate: optimalDate.toISOString(),
      currentMaturity: 85,
      qualityFactors: {
        moistureContent: 18.5,
        proteinContent: cropType === 'soybeans' ? 38.2 : undefined,
        sugarContent: cropType === 'corn' ? 12.8 : undefined
      },
      marketConditions: {
        currentPrice: 450, // USD per ton
        priceProjection: 465,
        demandLevel: 'medium'
      }
    };
  }

  /**
   * Create harvest recommendation
   */
  private createHarvestRecommendation(harvestRec: HarvestRecommendation): Recommendation {
    const daysToHarvest = Math.ceil(
      (new Date(harvestRec.optimalHarvestDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
    );

    return {
      id: `harvest_${Date.now()}`,
      fieldId: harvestRec.fieldId,
      type: 'harvest_timing',
      priority: 'high',
      title: 'Optimal Harvest Timing',
      description: `Crop is ${harvestRec.currentMaturity}% mature. Optimal harvest in ${daysToHarvest} days.`,
      actionItems: [
        'Prepare harvesting equipment',
        'Arrange storage facilities',
        'Monitor weather conditions',
        'Check market prices daily',
        'Conduct final quality assessment'
      ],
      expectedBenefit: `Maximize quality and market value. Current price: $${harvestRec.marketConditions.currentPrice}/ton`,
      timeframe: `${daysToHarvest} days`,
      confidence: 0.88,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
  }

  /**
   * Create yield optimization recommendations
   */
  private createYieldOptimizationRecommendations(yieldPrediction: YieldPrediction): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Add specific recommendations based on yield factors
    if (yieldPrediction.factors.soil < 0.8) {
      recommendations.push({
        id: `soil_optimization_${Date.now()}`,
        fieldId: yieldPrediction.fieldId,
        type: 'fertilization',
        priority: 'medium',
        title: 'Soil Condition Optimization',
        description: 'Soil conditions are limiting yield potential',
        actionItems: [
          'Conduct comprehensive soil analysis',
          'Adjust soil pH if necessary',
          'Improve soil organic matter',
          'Consider cover cropping'
        ],
        expectedBenefit: 'Improve soil health and increase yield potential by 10-15%',
        timeframe: 'within 2 weeks',
        confidence: 0.82,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    }

    if (yieldPrediction.factors.weather < 0.7) {
      recommendations.push({
        id: `weather_mitigation_${Date.now()}`,
        fieldId: yieldPrediction.fieldId,
        type: 'pest_control',
        priority: 'high',
        title: 'Weather Stress Mitigation',
        description: 'Weather conditions are negatively impacting crop development',
        actionItems: [
          'Increase irrigation frequency during hot periods',
          'Apply foliar nutrients to support plant stress response',
          'Monitor for weather-related pest and disease pressure',
          'Consider protective measures for extreme weather'
        ],
        expectedBenefit: 'Reduce weather-related yield losses',
        timeframe: 'ongoing',
        confidence: 0.75,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    }

    return recommendations;
  }

  /**
   * Get field information
   */
  private async getFieldInfo(fieldId: string): Promise<any> {
    const { data, error } = await supabase
      .from('fields')
      .select(`
        *,
        field_crops (
          *,
          crop:crops (*)
        )
      `)
      .eq('id', fieldId)
      .single();

    if (error) throw error;

    const currentCrop = data.field_crops.find((fc: any) => fc.status === 'growing');
    
    return {
      ...data,
      cropType: currentCrop?.crop?.name || 'unknown',
      growthStage: this.determineGrowthStage(currentCrop?.planting_date)
    };
  }

  /**
   * Determine growth stage based on planting date
   */
  private determineGrowthStage(plantingDate: string): string {
    if (!plantingDate) return 'unknown';
    
    const daysSincePlanting = Math.floor(
      (Date.now() - new Date(plantingDate).getTime()) / (24 * 60 * 60 * 1000)
    );

    // Simplified growth stage determination
    if (daysSincePlanting < 14) return 'germination';
    if (daysSincePlanting < 45) return 'vegetative';
    if (daysSincePlanting < 75) return 'reproductive';
    if (daysSincePlanting < 105) return 'late_reproductive';
    return 'maturity';
  }

  /**
   * Get latest soil data
   */
  private async getLatestSoilData(fieldId: string): Promise<any> {
    const { data, error } = await supabase
      .from('sensor_readings')
      .select('*')
      .eq('field_id', fieldId)
      .in('sensor_type', ['soilPH', 'nitrogen', 'phosphorus', 'potassium'])
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Group by sensor type and get latest reading
    const latestReadings: Record<string, number> = {};
    data.forEach(reading => {
      if (!latestReadings[reading.sensor_type]) {
        latestReadings[reading.sensor_type] = reading.value;
      }
    });

    return latestReadings;
  }

  /**
   * Get crop nutrient requirements
   */
  private getCropNutrientRequirements(cropType: string): Record<string, { min: number; optimal: number }> {
    const requirements: Record<string, Record<string, { min: number; optimal: number }>> = {
      corn: {
        nitrogen: { min: 150, optimal: 200 }, // kg/ha
        phosphorus: { min: 30, optimal: 50 },
        potassium: { min: 120, optimal: 180 },
        soilPH: { min: 6.0, optimal: 6.8 }
      },
      soybeans: {
        nitrogen: { min: 50, optimal: 80 }, // Lower due to nitrogen fixation
        phosphorus: { min: 25, optimal: 40 },
        potassium: { min: 100, optimal: 150 },
        soilPH: { min: 6.0, optimal: 7.0 }
      },
      wheat: {
        nitrogen: { min: 120, optimal: 160 },
        phosphorus: { min: 25, optimal: 40 },
        potassium: { min: 80, optimal: 120 },
        soilPH: { min: 6.0, optimal: 7.0 }
      }
    };

    return requirements[cropType.toLowerCase()] || requirements.corn;
  }

  /**
   * Identify nutrient deficiencies
   */
  private identifyNutrientDeficiencies(soilData: Record<string, number>, requirements: Record<string, { min: number; optimal: number }>): string[] {
    const deficiencies: string[] = [];

    Object.entries(requirements).forEach(([nutrient, req]) => {
      const currentLevel = soilData[nutrient];
      if (currentLevel !== undefined && currentLevel < req.min) {
        deficiencies.push(nutrient);
      }
    });

    return deficiencies;
  }

  /**
   * Recommend fertilizers based on deficiencies
   */
  private recommendFertilizers(deficiencies: string[], cropType: string): any[] {
    const fertilizers: any[] = [];

    deficiencies.forEach(nutrient => {
      switch (nutrient) {
        case 'nitrogen':
          fertilizers.push({
            type: 'Urea (46-0-0)',
            amount: 100,
            unit: 'kg/ha',
            applicationMethod: 'broadcast and incorporate'
          });
          break;
        case 'phosphorus':
          fertilizers.push({
            type: 'Triple Superphosphate (0-46-0)',
            amount: 50,
            unit: 'kg/ha',
            applicationMethod: 'band application'
          });
          break;
        case 'potassium':
          fertilizers.push({
            type: 'Muriate of Potash (0-0-60)',
            amount: 75,
            unit: 'kg/ha',
            applicationMethod: 'broadcast and incorporate'
          });
          break;
      }
    });

    return fertilizers;
  }

  /**
   * Determine fertilization timing
   */
  private determineFertilizationTiming(cropType: string): string {
    // Simplified timing - in production, consider growth stage and weather
    return 'within 1 week';
  }

  /**
   * Calculate expected yield increase from fertilization
   */
  private calculateExpectedYieldIncrease(deficiencies: string[]): number {
    // Simplified calculation - each major nutrient deficiency costs ~5-10% yield
    return Math.min(deficiencies.length * 7, 25); // Cap at 25% increase
  }

  /**
   * Update recommendation status
   */
  async updateRecommendationStatus(recommendationId: string, status: 'pending' | 'in_progress' | 'completed' | 'dismissed'): Promise<void> {
    // In production, store recommendations in database
    console.log(`Updating recommendation ${recommendationId} to status: ${status}`);
  }

  /**
   * Get recommendation history for a field
   */
  async getRecommendationHistory(fieldId: string, limit: number = 50): Promise<Recommendation[]> {
    // In production, fetch from database
    return [];
  }
}