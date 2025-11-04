"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle,
  Droplets,
  Leaf,
  Target,
  Calendar,
  BarChart3
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PredictionEngine } from "@/lib/ml/prediction-engine";
import { RecommendationSystem } from "@/lib/ml/recommendation-system";

interface PredictionResult {
  id: string;
  fieldId: string;
  fieldName: string;
  type: 'yield' | 'disease' | 'irrigation' | 'pest';
  result: any;
  confidence: number;
  timestamp: string;
  status: 'completed' | 'processing' | 'failed';
}

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    setLoading(true);
    try {
      // Mock data - in production, fetch from API
      const mockPredictions: PredictionResult[] = [
        {
          id: '1',
          fieldId: 'field1',
          fieldName: 'North Field',
          type: 'yield',
          result: {
            predictedYield: 9200,
            confidence: 89,
            factors: { weather: 0.85, soil: 0.92, management: 0.88 }
          },
          confidence: 89,
          timestamp: new Date().toISOString(),
          status: 'completed'
        },
        {
          id: '2',
          fieldId: 'field2',
          fieldName: 'South Field',
          type: 'disease',
          result: {
            risks: [
              { diseaseType: 'Aphid Infestation', riskLevel: 'high', probability: 0.76 }
            ]
          },
          confidence: 76,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'completed'
        },
        {
          id: '3',
          fieldId: 'field3',
          fieldName: 'East Field',
          type: 'irrigation',
          result: {
            recommendedAmount: 25,
            timing: 'within 24 hours',
            priority: 'high'
          },
          confidence: 94,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'completed'
        }
      ];

      setPredictions(mockPredictions);
    } catch (error) {
      console.error('Error loading predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewPrediction = async (fieldId: string, type: string) => {
    setLoading(true);
    try {
      const predictionEngine = PredictionEngine.getInstance();
      
      let result;
      switch (type) {
        case 'yield':
          result = await predictionEngine.predictCropYield(fieldId, 'corn');
          break;
        case 'disease':
          result = await predictionEngine.predictDiseaseRisk(fieldId, 'corn');
          break;
        case 'irrigation':
          result = await predictionEngine.generateIrrigationRecommendation(fieldId);
          break;
        default:
          throw new Error('Unknown prediction type');
      }

      const newPrediction: PredictionResult = {
        id: Date.now().toString(),
        fieldId,
        fieldName: `Field ${fieldId}`,
        type: type as any,
        result,
        confidence: 85,
        timestamp: new Date().toISOString(),
        status: 'completed'
      };

      setPredictions(prev => [newPrediction, ...prev]);
    } catch (error) {
      console.error('Error generating prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPredictions = predictions.filter(prediction => {
    const matchesSearch = 
      prediction.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prediction.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesField = selectedField === "all" || prediction.fieldId === selectedField;
    const matchesType = selectedType === "all" || prediction.type === selectedType;

    return matchesSearch && matchesField && matchesType;
  });

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'yield':
        return <BarChart3 className="h-5 w-5 text-green-500" />;
      case 'disease':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'irrigation':
        return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'pest':
        return <Leaf className="h-5 w-5 text-amber-500" />;
      default:
        return <Target className="h-5 w-5 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  const formatPredictionResult = (prediction: PredictionResult) => {
    switch (prediction.type) {
      case 'yield':
        return `${prediction.result.predictedYield?.toLocaleString()} kg/ha`;
      case 'disease':
        const risks = prediction.result.risks || prediction.result;
        if (Array.isArray(risks) && risks.length > 0) {
          return `${risks[0].diseaseType} - ${risks[0].riskLevel} risk`;
        }
        return 'No significant risks detected';
      case 'irrigation':
        return `${prediction.result.recommendedAmount}mm - ${prediction.result.timing}`;
      default:
        return 'Prediction completed';
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">ML Predictions</h1>
          <p className="text-muted-foreground">
            View and manage machine learning predictions for your fields
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => generateNewPrediction('field1', 'yield')}
            disabled={loading}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Yield Prediction
          </Button>
          <Button 
            onClick={() => generateNewPrediction('field2', 'disease')}
            disabled={loading}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Analyze Disease Risk
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search predictions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="field1">North Field</SelectItem>
            <SelectItem value="field2">South Field</SelectItem>
            <SelectItem value="field3">East Field</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prediction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="yield">Yield Prediction</SelectItem>
            <SelectItem value="disease">Disease Risk</SelectItem>
            <SelectItem value="irrigation">Irrigation</SelectItem>
            <SelectItem value="pest">Pest Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Predictions List */}
      <div className="space-y-4">
        {loading && (
          <Card>
            <CardContent className="py-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Generating prediction...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredPredictions.map((prediction) => (
          <Card key={prediction.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getPredictionIcon(prediction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold capitalize">{prediction.type} Prediction</h3>
                      <Badge variant="outline">{prediction.fieldName}</Badge>
                      <Badge 
                        className={
                          prediction.status === 'completed' ? 'bg-green-500' :
                          prediction.status === 'processing' ? 'bg-blue-500' :
                          'bg-red-500'
                        }
                      >
                        {prediction.status}
                      </Badge>
                    </div>
                    
                    <p className="text-lg font-medium mb-2">
                      {formatPredictionResult(prediction)}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span className={getConfidenceColor(prediction.confidence)}>
                          {prediction.confidence}% confidence
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(prediction.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Additional Details */}
                    {prediction.type === 'yield' && prediction.result.factors && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">Contributing Factors:</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Weather:</span>
                            <span className="ml-1 font-medium">
                              {Math.round(prediction.result.factors.weather * 100)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Soil:</span>
                            <span className="ml-1 font-medium">
                              {Math.round(prediction.result.factors.soil * 100)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Management:</span>
                            <span className="ml-1 font-medium">
                              {Math.round(prediction.result.factors.management * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {prediction.type === 'disease' && prediction.result.risks && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">Risk Assessment:</p>
                        {prediction.result.risks.map((risk: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{risk.diseaseType}</span>
                            <Badge 
                              className={
                                risk.riskLevel === 'high' ? 'bg-red-500' :
                                risk.riskLevel === 'medium' ? 'bg-amber-500' :
                                'bg-green-500'
                              }
                            >
                              {risk.riskLevel} ({Math.round(risk.probability * 100)}%)
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPredictions.length === 0 && !loading && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No predictions found</h3>
                <p className="text-muted-foreground mb-4">
                  Generate your first prediction to get started with ML insights.
                </p>
                <Button onClick={() => generateNewPrediction('field1', 'yield')}>
                  Generate Prediction
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}