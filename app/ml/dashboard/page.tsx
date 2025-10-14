"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  RefreshCw,
  Download,
  Settings
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for demonstration
const modelPerformance = [
  { date: '2024-01', yieldAccuracy: 85, diseaseAccuracy: 78, irrigationAccuracy: 92 },
  { date: '2024-02', yieldAccuracy: 87, diseaseAccuracy: 80, irrigationAccuracy: 94 },
  { date: '2024-03', yieldAccuracy: 89, diseaseAccuracy: 82, irrigationAccuracy: 93 },
  { date: '2024-04', yieldAccuracy: 86, diseaseAccuracy: 79, irrigationAccuracy: 95 },
  { date: '2024-05', yieldAccuracy: 88, diseaseAccuracy: 83, irrigationAccuracy: 96 },
];

const predictionStats = [
  { metric: 'Total Predictions', value: '12,847', change: '+15%' },
  { metric: 'Avg Accuracy', value: '87.3%', change: '+2.1%' },
  { metric: 'Active Models', value: '8', change: '0%' },
  { metric: 'Data Points', value: '2.4M', change: '+22%' },
];

const recentPredictions = [
  {
    id: 1,
    field: 'North Field',
    type: 'Yield Prediction',
    result: '9,200 kg/ha',
    confidence: 89,
    timestamp: '2024-03-21T10:30:00Z'
  },
  {
    id: 2,
    field: 'South Field',
    type: 'Disease Risk',
    result: 'High Risk - Aphids',
    confidence: 76,
    timestamp: '2024-03-21T09:15:00Z'
  },
  {
    id: 3,
    field: 'East Field',
    type: 'Irrigation',
    result: '25mm recommended',
    confidence: 94,
    timestamp: '2024-03-21T08:45:00Z'
  },
];

const modelStatus = [
  {
    name: 'Yield Prediction v2.1',
    type: 'Neural Network',
    status: 'deployed',
    accuracy: 89.2,
    lastTrained: '2024-03-15',
    predictions: 3420
  },
  {
    name: 'Disease Detection v1.8',
    type: 'Random Forest',
    status: 'deployed',
    accuracy: 82.7,
    lastTrained: '2024-03-10',
    predictions: 1890
  },
  {
    name: 'Irrigation Optimizer v3.0',
    type: 'Gradient Boosting',
    status: 'deployed',
    accuracy: 95.1,
    lastTrained: '2024-03-18',
    predictions: 2150
  },
  {
    name: 'Pest Risk v1.2',
    type: 'SVM',
    status: 'training',
    accuracy: 0,
    lastTrained: null,
    predictions: 0
  },
];

export default function MLDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500';
      case 'training':
        return 'bg-blue-500';
      case 'validation':
        return 'bg-amber-500';
      case 'deprecated':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">ML Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor machine learning models and predictions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Model Settings
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {predictionStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.metric}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Model Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={modelPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="yieldAccuracy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Yield Prediction"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="diseaseAccuracy" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        name="Disease Detection"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="irrigationAccuracy" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Irrigation Optimization"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Predictions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{prediction.field}</p>
                        <p className="text-sm text-muted-foreground">{prediction.type}</p>
                        <p className="text-sm font-medium">{prediction.result}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                          {prediction.confidence}% confidence
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(prediction.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Model Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelStatus.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{model.name}</p>
                          <p className="text-sm text-muted-foreground">{model.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="font-medium">
                          {model.accuracy > 0 ? `${model.accuracy}%` : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Predictions</p>
                        <p className="font-medium">{model.predictions.toLocaleString()}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Last Trained</p>
                        <p className="font-medium">
                          {model.lastTrained ? new Date(model.lastTrained).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      
                      <Badge className={`${getStatusColor(model.status)} text-white`}>
                        {model.status}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {model.status === 'deployed' && (
                          <Button variant="outline" size="sm">
                            Retrain
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Prediction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="yieldAccuracy" fill="#10b981" name="Yield Predictions" />
                      <Bar dataKey="diseaseAccuracy" fill="#f59e0b" name="Disease Predictions" />
                      <Bar dataKey="irrigationAccuracy" fill="#3b82f6" name="Irrigation Predictions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Yield Prediction</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Disease Detection</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                      <span className="text-sm font-medium">83%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Irrigation Optimization</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pest Risk Assessment</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Pest Risk Model v1.2</p>
                      <p className="text-sm text-muted-foreground">Training in progress...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                      <span className="text-sm">65% complete</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Yield Prediction v2.2</p>
                      <p className="text-sm text-muted-foreground">Queued for training</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Disease Detection v1.9</p>
                      <p className="text-sm text-muted-foreground">Scheduled for tomorrow</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Completeness</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Accuracy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feature Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Label Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full">
                    <Target className="h-4 w-4 mr-2" />
                    Start New Training Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}