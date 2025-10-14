import { Suspense } from "react";
import Link from "next/link";
import { 
  ArrowRightIcon, 
  CloudRainIcon, 
  ThermometerIcon, 
  Droplets, 
  AlertTriangle, 
  ArrowUpRight 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMap } from "@/components/dashboard/map";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { SensorReadings } from "@/components/dashboard/sensor-readings";
import { AlertsWidget } from "@/components/dashboard/alerts-widget";
import { FieldsOverview } from "@/components/dashboard/fields-overview";

function LoadingCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="pb-16">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 dark:from-green-950 dark:to-green-800">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                Farm Dashboard
              </h1>
              <p className="text-green-100">
                Welcome back, John. Here's what's happening on your farm today.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Suspense fallback={<div className="animate-pulse bg-white/20 rounded p-4 w-32 h-16"></div>}>
                <WeatherWidget />
              </Suspense>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Suspense fallback={<LoadingCard />}>
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ThermometerIcon className="h-5 w-5 mr-2 text-orange-500" />
                  <span className="text-2xl font-bold">23.5°C</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  2.3°C above average
                </p>
              </CardContent>
            </Card>
            </Suspense>
            
            <Suspense fallback={<LoadingCard />}>
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Humidity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CloudRainIcon className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">64%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  10% below average
                </p>
              </CardContent>
            </Card>
            </Suspense>
            
            <Suspense fallback={<LoadingCard />}>
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Soil Moisture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-2xl font-bold">37%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Optimal range: 35-45%
                </p>
              </CardContent>
            </Card>
            </Suspense>
            
            <Suspense fallback={<LoadingCard />}>
              <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 high priority alerts
                </p>
              </CardContent>
            </Card>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<LoadingCard />}>
              <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Field Health Map</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/fields">
                      <span className="mr-1">View all fields</span>
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  NDVI visualization based on latest satellite imagery
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full">
                  <DashboardMap />
                </div>
              </CardContent>
            </Card>
            </Suspense>

            <Suspense fallback={<LoadingCard />}>
              <FieldsOverview />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<LoadingCard />}>
              <Card>
              <CardHeader>
                <CardTitle>Sensor Readings</CardTitle>
                <CardDescription>
                  Last 24 hours of data from your sensors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SensorReadings />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/analytics">View detailed analytics</Link>
                </Button>
              </CardFooter>
            </Card>
            </Suspense>

            <Suspense fallback={<LoadingCard />}>
              <AlertsWidget />
            </Suspense>

            <Suspense fallback={<LoadingCard />}>
              <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  AI-driven insights for your farm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Irrigation needed</p>
                    <p className="text-xs text-muted-foreground">North field soil moisture is below optimal levels.</p>
                    <div className="mt-1">
                      <Link 
                        href="/irrigation/schedule" 
                        className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                      >
                        Schedule irrigation <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pest detection alert</p>
                    <p className="text-xs text-muted-foreground">Possible aphid infestation in South field.</p>
                    <div className="mt-1">
                      <Link 
                        href="/fields/field2" 
                        className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                      >
                        View detailed report <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    <ThermometerIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Weather advisory</p>
                    <p className="text-xs text-muted-foreground">Frost expected tonight. Consider protective measures.</p>
                    <div className="mt-1">
                      <Link 
                        href="/weather" 
                        className="inline-flex items-center text-xs font-medium text-primary hover:underline"
                      >
                        View forecast <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/recommendations">View all recommendations</Link>
                </Button>
              </CardFooter>
            </Card>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}