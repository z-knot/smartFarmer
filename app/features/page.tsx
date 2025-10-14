"use client";

import { 
  Leaf, 
  BarChart2, 
  Map, 
  Bell, 
  Cloud, 
  Smartphone,
  Database,
  Brain,
  LineChart,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Field Mapping",
    description: "Advanced GIS-based field mapping with historical crop rotation data and soil analysis.",
    color: "text-green-500"
  },
  {
    icon: Cloud,
    title: "Weather Integration",
    description: "Hyperlocal weather forecasting and historical data analysis for better planning.",
    color: "text-blue-500"
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Real-time notifications for critical field conditions and automated recommendations.",
    color: "text-amber-500"
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Comprehensive data collection and analysis from multiple sources for informed decisions.",
    color: "text-purple-500"
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Machine learning powered insights for optimal crop management and resource allocation.",
    color: "text-indigo-500"
  },
  {
    icon: LineChart,
    title: "Yield Forecasting",
    description: "Predictive analytics for crop yields based on historical data and current conditions.",
    color: "text-red-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Access your farm data anywhere with our mobile app and responsive web interface.",
    color: "text-cyan-500"
  },
  {
    icon: Zap,
    title: "IoT Integration",
    description: "Seamless integration with agricultural IoT devices and sensors for real-time monitoring.",
    color: "text-orange-500"
  }
];

export default function FeaturesPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Powerful Features for Modern Agriculture
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AgriVision combines cutting-edge technology with agricultural expertise to help you maximize yield and efficiency.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <Icon className={`h-8 w-8 ${feature.color} mb-2`} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-green-900 to-green-700 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
        <p className="text-lg mb-6 text-green-100">
          Join thousands of farmers already using AgriVision to improve their operations.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="secondary">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  );
}