"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  Database,
  Cloud,
  Activity,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw
} from "lucide-react";

const services = [
  {
    id: "api",
    name: "API Gateway",
    status: "operational",
    uptime: "99.99%",
    responseTime: "45ms",
    lastIncident: null
  },
  {
    id: "db",
    name: "Database",
    status: "operational",
    uptime: "99.95%",
    responseTime: "12ms",
    lastIncident: "2024-03-15T10:00:00Z"
  },
  {
    id: "mqtt",
    name: "MQTT Broker",
    status: "degraded",
    uptime: "99.80%",
    responseTime: "89ms",
    lastIncident: "2024-03-21T09:30:00Z"
  },
  {
    id: "storage",
    name: "Object Storage",
    status: "operational",
    uptime: "100%",
    responseTime: "65ms",
    lastIncident: null
  }
];

const metrics = [
  {
    id: "requests",
    name: "API Requests",
    value: "2.5M",
    change: "+12%",
    trend: "up"
  },
  {
    id: "errors",
    name: "Error Rate",
    value: "0.02%",
    change: "-5%",
    trend: "down"
  },
  {
    id: "latency",
    name: "Avg Latency",
    value: "45ms",
    change: "-8%",
    trend: "down"
  },
  {
    id: "storage",
    name: "Storage Used",
    value: "1.2TB",
    change: "+15%",
    trend: "up"
  }
];

const incidents = [
  {
    id: "inc-001",
    title: "High Latency in MQTT Broker",
    status: "investigating",
    severity: "minor",
    startedAt: "2024-03-21T09:30:00Z",
    updates: [
      {
        timestamp: "2024-03-21T09:30:00Z",
        message: "Investigating increased latency in MQTT broker"
      },
      {
        timestamp: "2024-03-21T09:45:00Z",
        message: "Identified high connection load as root cause"
      }
    ]
  }
];

export default function DevOpsPage() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-amber-500";
      case "down":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "major":
        return "bg-orange-500";
      case "minor":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    setLastRefresh(new Date());
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">System Status</h1>
          <p className="text-muted-foreground">
            Monitor system health and performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {service.id === "api" && <Cloud className="h-5 w-5 text-blue-500" />}
                  {service.id === "db" && <Database className="h-5 w-5 text-purple-500" />}
                  {service.id === "mqtt" && <Activity className="h-5 w-5 text-green-500" />}
                  {service.id === "storage" && <Server className="h-5 w-5 text-orange-500" />}
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <Badge className={`${getStatusColor(service.status)} text-white mt-1`}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime</span>
                  <span>{service.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span>{service.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Metrics */}
      <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{metric.name}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-2xl font-bold">{metric.value}</p>
                <Badge 
                  className={`${
                    metric.trend === "up" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Incidents */}
      <h2 className="text-xl font-semibold mb-4">Active Incidents</h2>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card key={incident.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>{incident.title}</CardTitle>
                </div>
                <Badge className={`${getSeverityColor(incident.severity)} text-white`}>
                  {incident.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Started {new Date(incident.startedAt).toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  {incident.updates.map((update, index) => (
                    <div key={index} className="flex gap-4 text-sm">
                      <span className="text-muted-foreground whitespace-nowrap">
                        {new Date(update.timestamp).toLocaleTimeString()}
                      </span>
                      <span>{update.message}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {incidents.length === 0 && (
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                <p>No active incidents</p>
                <p className="text-sm">All systems are operating normally</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}