"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  AlertTriangle,
  ThermometerIcon,
  Sprout,
  Bug,
  Wind,
  ArrowUpRight
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    type: "irrigation",
    title: "Schedule Irrigation",
    description: "North field soil moisture is below optimal levels. Schedule irrigation for optimal plant growth.",
    priority: "high",
    field: "North Field",
    icon: Droplets,
    action: "Schedule now",
    link: "/irrigation/schedule"
  },
  {
    id: 2,
    type: "pest",
    title: "Pest Detection Alert",
    description: "Possible aphid infestation detected in South field soybeans. Immediate inspection recommended.",
    priority: "high",
    field: "South Field",
    icon: Bug,
    action: "View details",
    link: "/fields/field2"
  },
  {
    id: 3,
    type: "weather",
    title: "Frost Protection",
    description: "Frost expected tonight. Consider protective measures for sensitive crops.",
    priority: "medium",
    field: "All Fields",
    icon: ThermometerIcon,
    action: "View forecast",
    link: "/weather"
  },
  {
    id: 4,
    type: "fertilizer",
    title: "Nutrient Management",
    description: "East field showing signs of nitrogen deficiency. Consider applying fertilizer within the next week.",
    priority: "medium",
    field: "East Field",
    icon: Sprout,
    action: "View plan",
    link: "/nutrition/plan"
  }
];

export default function RecommendationsPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "irrigation":
        return "text-blue-500";
      case "pest":
        return "text-red-500";
      case "weather":
        return "text-amber-500";
      case "fertilizer":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Recommendations</h1>
          <p className="text-muted-foreground">
            AI-driven insights and recommendations for your farm
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <Card key={rec.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-2 bg-${getIconColor(rec.type)}/10`}>
                    <Icon className={`h-5 w-5 ${getIconColor(rec.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {rec.description}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline">{rec.field}</Badge>
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <a href={rec.link}>
                          {rec.action}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}