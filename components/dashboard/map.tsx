"use client";

import { useState } from "react";
import { MapPinIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardMap() {
  // In a real application, this would be fetched from an API
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields = [
    { id: "field1", name: "North Field", health: "excellent", x: 25, y: 30 },
    { id: "field2", name: "South Field", health: "warning", x: 60, y: 50 },
    { id: "field3", name: "East Field", health: "good", x: 75, y: 25 },
    { id: "field4", name: "West Field", health: "critical", x: 40, y: 60 },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-green-300";
      case "warning":
        return "bg-amber-400";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const handleFieldClick = (fieldId: string) => {
    setSelectedField(fieldId === selectedField ? null : fieldId);
  };

  return (
    <div className="relative w-full h-full bg-[url('https://images.pexels.com/photos/11245185/pexels-photo-11245185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center rounded-md overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Field markers */}
      {fields.map((field) => (
        <button
          key={field.id}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none",
            selectedField === field.id ? "z-10 scale-110" : "z-0"
          )}
          style={{ left: `${field.x}%`, top: `${field.y}%` }}
          onClick={() => handleFieldClick(field.id)}
        >
          <div className="relative">
            <div className={cn(
              "h-4 w-4 rounded-full border-2 border-white",
              getHealthColor(field.health)
            )}></div>
            {selectedField === field.id && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-md p-2 shadow-lg whitespace-nowrap z-20">
                <p className="text-xs font-medium">{field.name}</p>
                <p className="text-xs capitalize">{field.health} health</p>
              </div>
            )}
          </div>
        </button>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-md shadow text-xs">
        <h4 className="font-medium mb-1">NDVI Legend</h4>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span>Excellent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-300"></div>
          <span>Good</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-400"></div>
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
}