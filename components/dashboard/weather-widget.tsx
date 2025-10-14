"use client";

import { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";

interface WeatherData {
  type: WeatherType;
  temperature: number;
  description: string;
  forecast: Array<{
    day: string;
    type: WeatherType;
    temperature: number;
  }>;
}

// Mock data for demo purposes
const mockWeatherData: WeatherData = {
  type: "sunny",
  temperature: 23,
  description: "Clear sky",
  forecast: [
    { day: "TUE", type: "sunny", temperature: 24 },
    { day: "WED", type: "cloudy", temperature: 22 },
    { day: "THU", type: "rainy", temperature: 19 },
    { day: "FRI", type: "sunny", temperature: 21 },
  ],
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // In a real app, fetch weather data from an API
    // For now, use mock data
    setWeather(mockWeatherData);
  }, []);

  if (!weather) {
    return <div className="animate-pulse">Loading weather...</div>;
  }

  const getWeatherIcon = (type: WeatherType) => {
    switch (type) {
      case "sunny":
        return <Sun className="h-5 w-5 text-amber-400" />;
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-400" />;
      case "snowy":
        return <CloudSnow className="h-5 w-5 text-blue-200" />;
      case "windy":
        return <Wind className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <Card 
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent className="p-2 flex items-center gap-3">
          {getWeatherIcon(weather.type)}
          <div>
            <div className="font-medium text-sm">{weather.temperature}°C</div>
            <div className="text-xs text-muted-foreground">Farmville</div>
          </div>
        </CardContent>
      </Card>

      {expanded && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-10 p-4 w-64 border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{weather.description}</h3>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">Farmville, CA</p>
            </div>
            <div className="text-4xl">{getWeatherIcon(weather.type)}</div>
          </div>

          <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-2">
            {weather.forecast.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs font-medium">{day.day}</div>
                <div className="my-1">{getWeatherIcon(day.type)}</div>
                <div className="text-xs">{day.temperature}°</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}