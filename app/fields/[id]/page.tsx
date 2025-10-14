"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Calendar,
  Droplets,
  Leaf,
  MapPin,
  Ruler,
  ThermometerIcon,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SensorReadings } from "@/components/dashboard/sensor-readings";

// Mock data - In a real app, this would come from an API
const fieldData = {
  "field1": {
    name: "North Field",
    crop: "Corn",
    area: "15 ha",
    health: "Excellent",
    lastInspection: "2 days ago",
    soilType: "Clay Loam",
    plantingDate: "2024-03-15",
    expectedHarvest: "2024-08-15",
    currentMoisture: "35%",
    temperature: "23°C",
    pH: "6.5",
    recommendations: [
      {
        type: "irrigation",
        message: "Schedule irrigation for tomorrow morning",
        priority: "high"
      },
      {
        type: "fertilizer",
        message: "Apply nitrogen fertilizer within next 5 days",
        priority: "medium"
      }
    ],
    image: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  "field2": {
    name: "South Field",
    crop: "Soybeans",
    area: "12 ha",
    health: "Warning",
    lastInspection: "5 days ago",
    soilType: "Sandy Loam",
    plantingDate: "2024-04-01",
    expectedHarvest: "2024-09-15",
    currentMoisture: "28%",
    temperature: "22°C",
    pH: "6.8",
    recommendations: [
      {
        type: "pest",
        message: "Check for aphid infestation in southeast section",
        priority: "high"
      }
    ],
    image: "https://images.pexels.com/photos/46168/field-paddle-lake-blue-46168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
};

const getHealthColor = (health: string) => {
  switch (health.toLowerCase()) {
    case "excellent":
      return "bg-green-500";
    case "good":
      return "bg-green-400";
    case "warning":
      return "bg-amber-500";
    case "critical":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "medium":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-blue-500" />;
  }
};

export default function FieldDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const fieldId = params.id as string;
  const field = fieldData[fieldId as keyof typeof fieldData];

  if (!field) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Field not found</h1>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => router.push('/fields')}
          >
            Return to Fields
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/fields')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Fields
      </Button>

      <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${field.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{field.name}</h1>
          <div className="flex items-center gap-3">
            <Badge className={`${getHealthColor(field.health)} text-white`}>
              {field.health}
            </Badge>
            <span className="text-white/90 text-sm">
              Last inspection: {field.lastInspection}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Field Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-500" />
              <span className="text-sm">Crop: {field.crop}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Area: {field.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="text-sm">Soil Type: {field.soilType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Planted: {field.plantingDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Expected Harvest: {field.expectedHarvest}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Soil Moisture: {field.currentMoisture}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThermometerIcon className="h-4 w-4 text-red-500" />
              <span className="text-sm">Temperature: {field.temperature}</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-500" />
              <span className="text-sm">Soil pH: {field.pH}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {field.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                {getPriorityIcon(rec.priority)}
                <div>
                  <p className="font-medium text-sm capitalize">{rec.type}</p>
                  <p className="text-sm text-muted-foreground">{rec.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Sensor Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <SensorReadings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}