"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Play,
  Pause,
  Square,
  BarChart3,
  Settings,
  Database,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Upload
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ModelTraining, TrainingData, ModelVersion } from "@/lib/ml/model-training";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrainingJob {
  id: string;
  modelType: 'yield_prediction' | 'disease_detection' | 'irrigation_optimization';
  status: 'queued' | 'training' | 'validating' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  endTime?: string;
  metrics?: {
    accuracy: number;
    loss: number;
    valAccuracy: number;
    valLoss: number;
  };
  hyperparameters: Record<string, any>;
}

const mockTrainingHistory = [
  { epoch: 1, loss: 0.85, valLoss: 0.92, accuracy: 0.65, valAccuracy: 0.62 },
  { epoch: 2, loss: 0.72, valLoss: 0.78, accuracy: 0.71, valAccuracy: 0.68 },
  { epoch: 3, loss: 0.65, valLoss: 0.71, accuracy: 0.76, valAccuracy: 0.73 },
  { epoch: 4, loss: 0.58, valLoss: 0.65, accuracy: 0.81, valAccuracy: 0.78 },
  { epoch: 5, loss: 0.52, valLoss: 0.61, accuracy: 0.84, valAccuracy: 0.81 },
  { epoch: 6, loss: 0.48, valLoss: 0.58, accuracy: 0.86, valAccuracy: 0.83 },
  { epoch: 7, loss: 0.45, valLoss: 0.56, accuracy: 0.88, valAccuracy: 0.85 },
  { epoch: 8, loss: 0.42, valLoss: 0.54, accuracy: 0.89, valAccuracy: 0.86 },
];

export default function MLTrainingPage() {
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('yield_prediction');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    hiddenLayers: '64,32,16',
    dropout: 0.2,
    regularization: 0.001
  });

  useEffect(() => {
    loadTrainingJobs();
  }, []);

  const loadTrainingJobs = () => {
    // Mock training jobs
    const mockJobs: TrainingJob[] = [
      {
        id: '1',
        modelType: 'yield_prediction',
        status: 'completed',
        progress: 100,
        startTime: '2024-03-20T10:00:00Z',
        endTime: '2024-03-20T12:30:00Z',
        metrics: { accuracy: 0.89, loss: 0.42, valAccuracy: 0.86, valLoss: 0.54 },
        hyperparameters: { learningRate: 0.001, epochs: 100, batchSize: 32 }
      },
      {
        id: '2',
        modelType: 'disease_detection',
        status: 'training',
        progress: 65,
        startTime: '2024-03-21T09:00:00Z',
        hyperparameters: { learningRate: 0.001, epochs: 150, batchSize: 64 }
      },
      {
        id: '3',
        modelType: 'irrigation_optimization',
        status: 'queued',
        progress: 0,
        startTime: '2024-03-21T14:00:00Z',
        hyperparameters: { learningRate: 0.0005, epochs: 80, batchSize: 16 }
      }
    ];
    setTrainingJobs(mockJobs);
  };

  const startTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const newJob: TrainingJob = {
      id: Date.now().toString(),
      modelType: selectedModel as any,
      status: 'training',
      progress: 0,
      startTime: new Date().toISOString(),
      hyperparameters
    };

    setTrainingJobs(prev => [newJob, ...prev]);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          
          // Update job status
          setTrainingJobs(current => 
            current.map(job => 
              job.id === newJob.id 
                ? { 
                    ...job, 
                    status: 'completed', 
                    progress: 100,
                    endTime: new Date().toISOString(),
                    metrics: { accuracy: 0.87, loss: 0.45, valAccuracy: 0.84, valLoss: 0.52 }
                  }
                : job
            )
          );
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'training':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'queued':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'training':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      case 'queued':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
    return `${duration} min`;
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Model Training</h1>
          <p className="text-muted-foreground">
            Train and optimize machine learning models for agricultural predictions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Dataset
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Model
          </Button>
        </div>
      </div>

      <Tabs defaultValue="training" className="space-y-6">
        <TabsList>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="hyperparameters">Hyperparameters</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="evaluation">Model Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Training Control */}
            <Card>
              <CardHeader>
                <CardTitle>Start New Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Model Type</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yield_prediction">Yield Prediction</SelectItem>
                      <SelectItem value="disease_detection">Disease Detection</SelectItem>
                      <SelectItem value="irrigation_optimization">Irrigation Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Learning Rate</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={hyperparameters.learningRate}
                        onChange={(e) => setHyperparameters(prev => ({
                          ...prev,
                          learningRate: parseFloat(e.target.value)
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Epochs</Label>
                      <Input
                        type="number"
                        value={hyperparameters.epochs}
                        onChange={(e) => setHyperparameters(prev => ({
                          ...prev,
                          epochs: parseInt(e.target.value)
                        }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Batch Size</Label>
                      <Input
                        type="number"
                        value={hyperparameters.batchSize}
                        onChange={(e) => setHyperparameters(prev => ({
                          ...prev,
                          batchSize: parseInt(e.target.value)
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dropout</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={hyperparameters.dropout}
                        onChange={(e) => setHyperparameters(prev => ({
                          ...prev,
                          dropout: parseFloat(e.target.value)
                        }))}
                      />
                    </div>
                  </div>
                </div>

                {isTraining && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training Progress</span>
                      <span>{Math.round(trainingProgress)}%</span>
                    </div>
                    <Progress value={trainingProgress} />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={startTraining} 
                    disabled={isTraining}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isTraining ? 'Training...' : 'Start Training'}
                  </Button>
                  {isTraining && (
                    <Button variant="outline" onClick={stopTraining}>
                      <Square className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Training Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Training Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTrainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="loss" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Training Loss"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valLoss" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        name="Validation Loss"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Training Accuracy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valAccuracy" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Validation Accuracy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Jobs History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Training Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <p className="font-medium capitalize">
                          {job.modelType.replace('_', ' ')} Model
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Started {new Date(job.startTime).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="font-medium">{job.progress}%</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{formatDuration(job.startTime, job.endTime)}</p>
                      </div>

                      {job.metrics && (
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Accuracy</p>
                          <p className="font-medium">{Math.round(job.metrics.accuracy * 100)}%</p>
                        </div>
                      )}

                      <Badge className={`${getStatusColor(job.status)} text-white`}>
                        {job.status}
                      </Badge>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hyperparameters">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hyperparameter Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Optimization Method</Label>
                    <Select defaultValue="grid_search">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid_search">Grid Search</SelectItem>
                        <SelectItem value="random_search">Random Search</SelectItem>
                        <SelectItem value="bayesian">Bayesian Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Learning Rate Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Min (0.0001)" />
                      <Input placeholder="Max (0.01)" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Batch Size Options</Label>
                    <Input placeholder="16, 32, 64, 128" />
                  </div>

                  <div className="space-y-2">
                    <Label>Hidden Layer Configurations</Label>
                    <Input placeholder="[64,32], [128,64,32], [256,128,64]" />
                  </div>
                </div>

                <Button className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  Start Hyperparameter Search
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Hyperparameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Yield Prediction Model</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Learning Rate: 0.001</div>
                      <div>Batch Size: 32</div>
                      <div>Dropout: 0.2</div>
                      <div>Layers: [64, 32, 16]</div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">Accuracy: 89.2%</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Disease Detection Model</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Learning Rate: 0.0005</div>
                      <div>Batch Size: 64</div>
                      <div>Dropout: 0.3</div>
                      <div>Layers: [128, 64, 32]</div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">F1-Score: 82.7%</p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Irrigation Optimization</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Learning Rate: 0.002</div>
                      <div>Batch Size: 16</div>
                      <div>Dropout: 0.1</div>
                      <div>Layers: [32, 16, 8]</div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">Accuracy: 95.1%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Total Records</span>
                    <span className="font-medium">2,847,392</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Training Set</span>
                    <span className="font-medium">2,277,914 (80%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Validation Set</span>
                    <span className="font-medium">284,739 (10%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Test Set</span>
                    <span className="font-medium">284,739 (10%)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Features</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>Data Quality Score</span>
                    <span className="font-medium text-green-600">94.2%</span>
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
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completeness</span>
                      <span>96.8%</span>
                    </div>
                    <Progress value={96.8} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span>94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Consistency</span>
                      <span>91.5%</span>
                    </div>
                    <Progress value={91.5} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Timeliness</span>
                      <span>98.1%</span>
                    </div>
                    <Progress value={98.1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Validity</span>
                      <span>93.7%</span>
                    </div>
                    <Progress value={93.7} />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Run Data Quality Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evaluation">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Yield Prediction v2.1</h4>
                      <Badge className="bg-green-500 text-white">Best</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="ml-1 font-medium">89.2%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">RMSE:</span>
                        <span className="ml-1 font-medium">420.5</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">MAE:</span>
                        <span className="ml-1 font-medium">315.2</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Disease Detection v1.8</h4>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">F1-Score:</span>
                        <span className="ml-1 font-medium">82.7%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precision:</span>
                        <span className="ml-1 font-medium">85.1%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recall:</span>
                        <span className="ml-1 font-medium">80.4%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Irrigation Optimizer v3.0</h4>
                      <Badge className="bg-blue-500 text-white">Latest</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="ml-1 font-medium">95.1%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precision:</span>
                        <span className="ml-1 font-medium">94.8%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recall:</span>
                        <span className="ml-1 font-medium">95.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cross-Validation Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">5-Fold Cross-Validation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fold 1:</span>
                        <span>87.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fold 2:</span>
                        <span>89.1%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fold 3:</span>
                        <span>88.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fold 4:</span>
                        <span>90.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fold 5:</span>
                        <span>88.9%</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Mean Accuracy:</span>
                        <span>88.8% ± 1.1%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Run Full Evaluation
                    </Button>
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