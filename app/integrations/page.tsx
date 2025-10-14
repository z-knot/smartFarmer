"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Database, 
  LineChart, 
  Smartphone,
  Droplets,
  Leaf,
  Sun,
  Wind
} from "lucide-react";

const integrations = [
  {
    icon: Cloud,
    title: "Weather Services",
    description: "Connect with leading weather services for accurate forecasting.",
    partners: ["AccuWeather", "Weather Underground", "OpenWeatherMap"],
    color: "text-blue-500"
  },
  {
    icon: Database,
    title: "Farm Management",
    description: "Integrate with popular farm management software.",
    partners: ["John Deere Operations Center", "Climate FieldView", "Trimble Ag"],
    color: "text-purple-500"
  },
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Connect your irrigation systems for automated control.",
    partners: ["Valley", "Lindsay", "Reinke"],
    color: "text-cyan-500"
  },
  {
    icon: Leaf,
    title: "Crop Analysis",
    description: "Advanced crop monitoring and analysis tools.",
    partners: ["Planet Labs", "DroneDeploy", "Sentera"],
    color: "text-green-500"
  },
  {
    icon: Sun,
    title: "Solar Integration",
    description: "Monitor and manage solar-powered farm equipment.",
    partners: ["SolarEdge", "Enphase", "SMA"],
    color: "text-amber-500"
  },
  {
    icon: Wind,
    title: "Environmental Sensors",
    description: "Connect environmental monitoring devices.",
    partners: ["Davis Instruments", "Onset HOBO", "Campbell Scientific"],
    color: "text-teal-500"
  }
];

export default function IntegrationsPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Powerful Integrations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect AgriVision with your existing farm technology stack for seamless operations.
        </p>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <Icon className={`h-8 w-8 ${integration.color} mb-2`} />
                <CardTitle>{integration.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {integration.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular Partners:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {integration.partners.map((partner) => (
                      <li key={partner}>{partner}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* API Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 rounded-lg p-12 text-white text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Custom Integration API</h2>
        <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
          Need a custom integration? Our robust API allows you to build your own connections to AgriVision's platform.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="lg">
            View API Documentation
          </Button>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Integration Process */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Integration Process
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="font-medium mb-2">Select Your Integration</h3>
              <p className="text-muted-foreground">
                Choose from our list of supported integrations or request a custom solution.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="font-medium mb-2">Configure Connection</h3>
              <p className="text-muted-foreground">
                Follow our step-by-step guide to set up the integration with your existing systems.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="font-medium mb-2">Test and Verify</h3>
              <p className="text-muted-foreground">
                Ensure everything is working correctly with our testing tools and support team.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center">
              4
            </div>
            <div>
              <h3 className="font-medium mb-2">Go Live</h3>
              <p className="text-muted-foreground">
                Deploy your integration to production and start benefiting from connected systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}