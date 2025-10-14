"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Wifi, 
  Battery, 
  Signal, 
  AlertTriangle,
  RefreshCw,
  Settings,
  Plus,
  Search
} from "lucide-react";

const devices = [
  {
    id: "sensor-001",
    name: "Soil Moisture Sensor 1",
    type: "moisture",
    location: "North Field",
    status: "online",
    battery: 85,
    signal: 92,
    lastReading: "2024-03-21T10:30:00Z",
    firmware: "v2.1.0"
  },
  {
    id: "sensor-002",
    name: "Temperature Sensor 1",
    type: "temperature",
    location: "South Field",
    status: "online",
    battery: 72,
    signal: 88,
    lastReading: "2024-03-21T10:29:00Z",
    firmware: "v2.1.0"
  },
  {
    id: "sensor-003",
    name: "Weather Station 1",
    type: "weather",
    location: "East Field",
    status: "warning",
    battery: 15,
    signal: 95,
    lastReading: "2024-03-21T10:28:00Z",
    firmware: "v2.0.9"
  },
  {
    id: "sensor-004",
    name: "Soil pH Sensor 1",
    type: "pH",
    location: "West Field",
    status: "offline",
    battery: 0,
    signal: 0,
    lastReading: "2024-03-20T15:45:00Z",
    firmware: "v2.1.0"
  }
];

export default function IoTPage() {
  const [searchQuery, setSearchQuery] = useState("");

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

  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-green-500";
    if (level > 20) return "text-amber-500";
    return "text-red-500";
  };

  const getSignalColor = (level: number) => {
    if (level > 80) return "text-green-500";
    if (level > 50) return "text-amber-500";
    return "text-red-500";
  };

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">IoT Devices</h1>
          <p className="text-muted-foreground">
            Monitor and manage your connected devices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Devices
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Devices</p>
                <p className="text-2xl font-bold">{devices.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Online</p>
                <p className="text-2xl font-bold text-green-500">
                  {devices.filter(d => d.status === "online").length}
                </p>
              </div>
              <Signal className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Warnings</p>
                <p className="text-2xl font-bold text-amber-500">
                  {devices.filter(d => d.status === "warning").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Offline</p>
                <p className="text-2xl font-bold text-red-500">
                  {devices.filter(d => d.status === "offline").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search devices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Devices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <Card key={device.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{device.location}</p>
                </div>
                <Badge className={`${getStatusColor(device.status)} text-white`}>
                  {device.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Battery className={`h-4 w-4 ${getBatteryColor(device.battery)}`} />
                    <span className="text-sm">{device.battery}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Signal className={`h-4 w-4 ${getSignalColor(device.signal)}`} />
                    <span className="text-sm">{device.signal}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Reading</span>
                    <span>{new Date(device.lastReading).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Firmware</span>
                    <span>{device.firmware}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Update
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}