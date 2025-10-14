"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = {
  "alert1": {
    id: "alert1",
    title: "Critical Soil Moisture Level",
    message: "North Field soil moisture has dropped below 30%. Immediate irrigation recommended.",
    type: "critical",
    timestamp: "2024-03-20T10:30:00Z",
    field: "North Field",
    fieldId: "field1",
    status: "active",
    details: {
      currentValue: "28%",
      threshold: "30%",
      trend: "Decreasing",
      lastMeasurement: "2024-03-20T10:25:00Z",
      recommendations: [
        "Schedule irrigation within next 12 hours",
        "Increase irrigation duration by 15 minutes",
        "Monitor soil moisture levels hourly"
      ]
    }
  },
  "alert2": {
    id: "alert2",
    title: "Pest Detection Warning",
    message: "Possible aphid infestation detected in South Field soybeans. Inspection needed.",
    type: "warning",
    timestamp: "2024-03-20T09:15:00Z",
    field: "South Field",
    fieldId: "field2",
    status: "active",
    details: {
      affectedArea: "Southeast quadrant",
      pestType: "Aphids",
      severity: "Moderate",
      detectionMethod: "Image analysis",
      recommendations: [
        "Inspect affected area immediately",
        "Consider organic pest control methods",
        "Monitor surrounding areas for spread"
      ]
    }
  }
};

const getAlertTypeStyles = (type: string) => {
  switch (type.toLowerCase()) {
    case "critical":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        badge: "bg-red-500",
        border: "border-red-500"
      };
    case "warning":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        badge: "bg-amber-500",
        border: "border-amber-500"
      };
    case "info":
      return {
        icon: <Bell className="h-5 w-5 text-blue-500" />,
        badge: "bg-blue-500",
        border: "border-blue-500"
      };
    default:
      return {
        icon: <Bell className="h-5 w-5 text-gray-500" />,
        badge: "bg-gray-500",
        border: "border-gray-500"
      };
  }
};

export default function AlertDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const alertId = params.id as string;
  const alert = alerts[alertId as keyof typeof alerts];

  if (!alert) {
    return (
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/alerts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Alerts
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Alert not found</h1>
        </div>
      </div>
    );
  }

  const styles = getAlertTypeStyles(alert.type);

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/alerts')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Alerts
      </Button>

      <Card className={`border-2 ${styles.border}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {styles.icon}
              <CardTitle>{alert.title}</CardTitle>
            </div>
            <Badge className={`${styles.badge} text-white border-0`}>
              {alert.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{alert.message}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Alert Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                    {alert.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Field</span>
                  <Button variant="link" className="h-auto p-0" onClick={() => router.push(`/fields/${alert.fieldId}`)}>
                    {alert.field}
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
                {alert.details.currentValue && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Value</span>
                    <span>{alert.details.currentValue}</span>
                  </div>
                )}
                {alert.details.threshold && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Threshold</span>
                    <span>{alert.details.threshold}</span>
                  </div>
                )}
                {alert.details.trend && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trend</span>
                    <span>{alert.details.trend}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {alert.details.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm text-muted-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            {alert.status === "active" && (
              <>
                <Button variant="outline">Snooze Alert</Button>
                <Button>Mark as Resolved</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}