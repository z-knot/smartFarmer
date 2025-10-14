"use client";

import { useParams } from "next/navigation";
import { useDeviceData } from "@/hooks/use-device-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Battery, Signal, Settings, RefreshCw } from "lucide-react";
import { SensorReadings } from "@/components/dashboard/sensor-readings";

export default function DeviceDetailsPage() {
  const params = useParams();
  const deviceId = params.id as string;
  const { device, loading, error } = useDeviceData(deviceId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!device) {
    return <div>Device not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "warning":
        return "bg-amber-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Devices
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{device.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{device.type}</p>
              </div>
              <Badge className={`${getStatusColor(device.status)} text-white`}>
                {device.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-500" />
                  <span>{device.battery}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-blue-500" />
                  <span>{device.signal}%</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Device Information</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd>{device.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Firmware Version</dt>
                    <dd>{device.firmware}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Last Reading</dt>
                    <dd>{new Date(device.lastReading).toLocaleString()}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Firmware
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
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