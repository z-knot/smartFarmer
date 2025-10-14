"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SensorReadings } from "@/components/dashboard/sensor-readings";
import { 
  ThermometerIcon, 
  Droplets, 
  Wind, 
  Sun,
  Download
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AnalyticsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed analysis of your farm's sensor data and metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ThermometerIcon className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-2xl font-bold">23.5°C</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2.3°C above average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Droplets className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">64%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              10% below average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wind className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-2xl font-bold">12 km/h</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Light breeze
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Solar Radiation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Sun className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-2xl font-bold">850 W/m²</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Optimal for growth
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Temperature & Humidity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <SensorReadings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil Moisture Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <SensorReadings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}