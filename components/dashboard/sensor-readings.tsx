"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";

// Mock data for sensor readings
const data = [
  { time: "00:00", temperature: 18, moisture: 32, pH: 6.5 },
  { time: "03:00", temperature: 17, moisture: 33, pH: 6.5 },
  { time: "06:00", temperature: 16, moisture: 34, pH: 6.6 },
  { time: "09:00", temperature: 19, moisture: 35, pH: 6.6 },
  { time: "12:00", temperature: 22, moisture: 36, pH: 6.7 },
  { time: "15:00", temperature: 24, moisture: 35, pH: 6.8 },
  { time: "18:00", temperature: 22, moisture: 34, pH: 6.7 },
  { time: "21:00", temperature: 20, moisture: 34, pH: 6.6 },
  { time: "24:00", temperature: 19, moisture: 33, pH: 6.5 },
];

const sensorOptions = [
  { id: "temperature", name: "Temperature", color: "hsl(var(--chart-1))" },
  { id: "moisture", name: "Soil Moisture", color: "hsl(var(--chart-2))" },
  { id: "pH", name: "Soil pH", color: "hsl(var(--chart-3))" },
];

export function SensorReadings() {
  const [activeSensors, setActiveSensors] = React.useState<string[]>(["temperature", "moisture"]);

  const toggleSensor = (sensorId: string) => {
    setActiveSensors((prev) =>
      prev.includes(sensorId)
        ? prev.filter((id) => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {sensorOptions.map((sensor) => (
          <button
            key={sensor.id}
            onClick={() => toggleSensor(sensor.id)}
            className={`text-xs px-2 py-1 rounded-full border transition-colors ${
              activeSensors.includes(sensor.id)
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground"
            }`}
          >
            {sensor.name}
          </button>
        ))}
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px",
              }}
            />
            {sensorOptions.map((sensor) => (
              activeSensors.includes(sensor.id) && (
                <Line
                  key={sensor.id}
                  type="monotone"
                  dataKey={sensor.id}
                  stroke={sensor.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}