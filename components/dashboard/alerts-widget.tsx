"use client";

import { useState } from "react";
import { AlertTriangle, ThermometerIcon, Droplets, Bug, Info, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: "warning" | "error" | "info";
  icon: typeof AlertTriangle;
  timestamp: string;
  read: boolean;
}

// Mock alerts data
const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Low Soil Moisture",
    message: "North field soil moisture below 30%. Consider irrigation.",
    type: "warning",
    icon: Droplets,
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Pest Detection",
    message: "Possible aphid infestation detected in South field.",
    type: "error",
    icon: Bug,
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Temperature Alert",
    message: "Temperature forecast to drop below 4°C tonight.",
    type: "warning",
    icon: ThermometerIcon,
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "4",
    title: "Maintenance Reminder",
    message: "Scheduled sensor calibration due tomorrow.",
    type: "info",
    icon: Info,
    timestamp: "Yesterday",
    read: true,
  },
];

export function AlertsWidget() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-amber-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive";
      case "warning":
        return "warning";
      case "info":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Alerts</CardTitle>
          <Badge variant="outline">
            {alerts.filter(a => !a.read).length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[300px] overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start p-3 rounded-lg border ${
                !alert.read ? "bg-muted/50" : ""
              }`}
            >
              <div className={`mr-3 mt-0.5 ${getIconColor(alert.type)}`}>
                {<alert.icon className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium truncate pr-2">
                    {alert.title}
                  </p>
                  <Badge variant={getBadgeVariant(alert.type)} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.message}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </span>
                  <div className="flex gap-2">
                    {!alert.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={() => markAsRead(alert.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium">No alerts</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Everything is running smoothly on your farm.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}