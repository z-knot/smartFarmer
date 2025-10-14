"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Download,
  Upload,
  Settings,
  Play,
  Pause,
  Trash2,
  Copy,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface ModelInfo {
  id: string;
  name: string;
  type: 'yield_prediction' | 'disease_detection' | 'irrigation_optimization' | 'pest_risk';
  version: string;
  status: 'deployed' | 'training' | 'validation' | 'deprecated' | 'failed';
  accuracy: number;
  createdAt: string;
  lastTrained: string;
  predictions: number;
  size: string;
  framework: string;
  description: string;
  metrics: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
    rmse?: number;
    mae?: number;
  };
}

const mockModels: ModelInfo[] = [
  {
    id: '1',
    name: 'Yield Prediction Neural Network',
    type: 'yield_prediction',
    version: 'v2.1.3',
    status: 'deployed',
    accuracy: 89.2,
    createdAt: '2024-03-15T10:00:00Z',
    lastTrained: '2024-03-20T14:30:00Z',
    predictions: 15420,
    size: '45.2 MB',
    framework: 'TensorFlow',
    description: 'Deep neural network for predicting crop yields based on environmental and soil conditions.',
    metrics: {
      accuracy: 89.2,
      rmse: 420.5,
      mae: 315.2
    }
  },
  {
    id: '2',
    name: 'Disease Detection Classifier',
    type: 'disease_detection',
    version: 'v1.8.1',
    status: 'deployed',
    accuracy: 82.7,
    createdAt: '2024-03-10T09:15:00Z',
    lastTrained: '2024-03-18T11:45:00Z',
    predictions: 8930,
    size: '67.8 MB',
    framework: 'PyTorch',
    description: 'Random forest classifier for early disease detection in crops.',
    metrics: {
      accuracy: 82.7,
      precision: 85.1,
      recall: 80.4,
      f1Score: 82.7
    }
  },
  {
    id: '3',
    name: 'Irrigation Optimizer',
    type: 'irrigation_optimization',
    version: 'v3.0.2',
    status: 'deployed',
    accuracy: 95.1,
    createdAt: '2024-03-18T16:20:00Z',
    lastTrained: '2024-03-21T08:00:00Z',
    predictions: 12650,
    size: '23.4 MB',
    framework: 'XGBoost',
    description: 'Gradient boosting model for optimizing irrigation schedules and water usage.',
    metrics: {
      accuracy: 95.1,
      precision: 94.8,
      recall: 95.4,
      f1Score: 95.1
    }
  },
  {
    id: '4',
    name: 'Pest Risk Assessment',
    type: 'pest_risk',
    version: 'v1.2.0',
    status: 'training',
    accuracy: 0,
    createdAt: '2024-03-21T12:00:00Z',
    lastTrained: '2024-03-21T12:00:00Z',
    predictions: 0,
    size: '0 MB',
    framework: 'Scikit-learn',
    description: 'Support vector machine for assessing pest infestation risks.',
    metrics: {}
  }
];

const performanceData = [
  { date: '2024-01', accuracy: 85.2, predictions: 8500 },
  { date: '2024-02', accuracy: 87.1, predictions: 9200 },
  { date: '2024-03', accuracy: 89.2, predictions: 10800 },
];

export default function ModelsPage() {
  const [models, setModels] = useState<ModelInfo[]>(mockModels);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);

  const filteredModels = models.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || model.type === selectedType;
    const matchesStatus = selectedStatus === "all" || model.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'training':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'validation':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'deprecated':
        return <Pause className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500';
      case 'training':
        return 'bg-blue-500';
      case 'validation':
        return 'bg-amber-500';
      case 'failed':
        return 'bg-red-500';
      case 'deprecated':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'yield_prediction':
        return 'bg-green-100 text-green-800';
      case 'disease_detection':
        return 'bg-red-100 text-red-800';
      case 'irrigation_optimization':
        return 'bg-blue-100 text-blue-800';
      case 'pest_risk':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatModelType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const deployModel = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'deployed' as const }
        : model
    ));
  };

  const deprecateModel = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'deprecated' as const }
        : model
    ));
  };

  const deleteModel = (modelId: string) => {
    setModels(prev => prev.filter(model => model.id !== modelId));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Model Management</h1>
          <p className="text-muted-foreground">
            Manage, deploy, and monitor your machine learning models
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Model
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            Create New Model
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search models..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Model type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="yield_prediction">Yield Prediction</SelectItem>
                <SelectItem value="disease_detection">Disease Detection</SelectItem>
                <SelectItem value="irrigation_optimization">Irrigation Optimization</SelectItem>
                <SelectItem value="pest_risk">Pest Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredModels.map((model) => (
              <Card key={model.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Brain className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(model.type)}>
                            {formatModelType(model.type)}
                          </Badge>
                          <Badge variant="outline">{model.version}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(model.status)}
                      <Badge className={`${getStatusColor(model.status)} text-white`}>
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {model.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="font-medium">
                        {model.accuracy > 0 ? `${model.accuracy}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Predictions</p>
                      <p className="font-medium">{model.predictions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Size</p>
                      <p className="font-medium">{model.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Framework</p>
                      <p className="font-medium">{model.framework}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Last trained: {new Date(model.lastTrained).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedModel(model)}>
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{model.name} - Details</DialogTitle>
                            <DialogDescription>
                              Model performance metrics and information
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              {Object.entries(model.metrics).map(([key, value]) => (
                                <div key={key} className="p-3 border rounded">
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </p>
                                  <p className="font-medium">
                                    {typeof value === 'number' ? 
                                      (key.includes('accuracy') || key.includes('precision') || key.includes('recall') || key.includes('f1') ? 
                                        `${value}%` : value.toFixed(2)
                                      ) : value
                                    }
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {model.status === 'deployed' ? (
                        <Button variant="outline" size="sm" onClick={() => deprecateModel(model.id)}>
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : model.status === 'validation' ? (
                        <Button variant="outline" size="sm" onClick={() => deployModel(model.id)}>
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : null}

                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>

                      {model.status !== 'deployed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteModel(model.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Accuracy Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[80, 95]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Accuracy (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="predictions" fill="#3b82f6" name="Predictions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Model Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Model</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Accuracy</th>
                      <th className="text-left p-2">Predictions</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr key={model.id} className="border-b">
                        <td className="p-2 font-medium">{model.name}</td>
                        <td className="p-2">
                          <Badge className={getTypeColor(model.type)}>
                            {formatModelType(model.type)}
                          </Badge>
                        </td>
                        <td className="p-2">
                          {model.accuracy > 0 ? `${model.accuracy}%` : 'N/A'}
                        </td>
                        <td className="p-2">{model.predictions.toLocaleString()}</td>
                        <td className="p-2">
                          <Badge className={`${getStatusColor(model.status)} text-white`}>
                            {model.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Model Validation</p>
                        <p className="text-sm text-muted-foreground">All models passed validation tests</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Complete</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">A/B Testing</p>
                        <p className="text-sm text-muted-foreground">Testing new model against current production</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-500 text-white">In Progress</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">Production Deployment</p>
                        <p className="text-sm text-muted-foreground">Scheduled for deployment</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-500 text-white">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Environment</label>
                      <Select defaultValue="production">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rollout Strategy</label>
                      <Select defaultValue="canary">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue-green">Blue-Green</SelectItem>
                          <SelectItem value="canary">Canary</SelectItem>
                          <SelectItem value="rolling">Rolling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Traffic Percentage</label>
                    <div className="flex items-center gap-4">
                      <Progress value={25} className="flex-1" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save Configuration</Button>
                    <Button>Deploy Model</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}