"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  ThermometerIcon,
  AlertTriangle
} from "lucide-react";

const forecast = [
  {
    day: "Today",
    date: "Mar 21",
    type: "sunny",
    temp: 23,
    rain: 0,
    wind: 12,
    humidity: 64
  },
  {
    day: "Tomorrow",
    date: "Mar 22",
    type: "cloudy",
    temp: 21,
    rain: 20,
    wind: 15,
    humidity: 72
  },
  {
    day: "Wednesday",
    date: "Mar 23",
    type: "rainy",
    temp: 19,
    rain: 80,
    wind: 18,
    humidity: 85
  },
  {
    day: "Thursday",
    date: "Mar 24",
    type: "cloudy",
    temp: 20,
    rain: 30,
    wind: 14,
    humidity: 75
  },
  {
    day: "Friday",
    date: "Mar 25",
    type: "sunny",
    temp: 22,
    rain: 0,
    wind: 10,
    humidity: 68
  }
];

const alerts = [
  {
    type: "frost",
    message: "Frost warning for tonight. Protect sensitive crops.",
    severity: "high"
  },
  {
    type: "wind",
    message: "Strong winds expected tomorrow afternoon.",
    severity: "medium"
  }
];

export default function WeatherPage() {
  const getWeatherIcon = (type: string) => {
    switch (type) {
      case "sunny":
        return <Sun className="h-8 w-8 text-amber-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Weather Forecast</h1>
          <p className="text-muted-foreground">
            5-day weather forecast and agricultural conditions
          </p>
        </div>
      </div>

      {/* Current Conditions */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <Sun className="h-16 w-16 text-amber-500" />
              <div>
                <p className="text-4xl font-bold">23°C</p>
                <p className="text-muted-foreground">Clear sky</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <span>Wind Speed</span>
                </div>
                <span className="font-medium">12 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>Humidity</span>
                </div>
                <span className="font-medium">64%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span>Precipitation</span>
                </div>
                <span className="font-medium">0%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThermometerIcon className="h-4 w-4 text-red-500" />
                  <span>Feels Like</span>
                </div>
                <span className="font-medium">24°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Agricultural Conditions</p>
              <div className="space-y-1 text-sm">
                <p className="text-green-600">✓ Optimal for field work</p>
                <p className="text-amber-600">! Monitor soil moisture</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <Card className="mb-8 border-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === "high" ? "text-red-500" : "text-amber-500"
                  }`} />
                  <div>
                    <p className="font-medium text-sm capitalize">{alert.type} Alert</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {forecast.map((day) => (
              <div key={day.day} className="text-center">
                <p className="font-medium">{day.day}</p>
                <p className="text-sm text-muted-foreground">{day.date}</p>
                <div className="my-4">
                  {getWeatherIcon(day.type)}
                </div>
                <p className="text-2xl font-bold">{day.temp}°C</p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>Rain: {day.rain}%</p>
                  <p>Wind: {day.wind} km/h</p>
                  <p>Humidity: {day.humidity}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}