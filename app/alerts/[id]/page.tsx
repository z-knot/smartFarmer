"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = {
  "alert1": {
    id: "alert1", title: "Critical Soil Moisture", message: "North Field soil moisture below 30%.",
    type: "critical", timestamp: "2024-03-20T10:30:00Z", field: "North Field", fieldId: "field1",
    status: "active", details: { currentValue: "28%", threshold: "30%", trend: "Decreasing",
    lastMeasurement: "2024-03-20T10:25:00Z", recommendations: ["Schedule irrigation", "Monitor soil"] }
  }
};

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alertId = params.id as string;
  const alert = alerts[alertId as keyof typeof alerts] || alerts["alert1"];

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{alert.title}</h1>
              <p className="text-muted-foreground">{alert.message}</p>
            </div>
            <Badge className="bg-red-500">{alert.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between"><span>Field</span><span>{alert.field}</span></div>
          <div className="flex justify-between"><span>Time</span><span>{new Date(alert.timestamp).toLocaleString()}</span></div>
          <Button className="w-full">Mark as Resolved</Button>
        </CardContent>
      </Card>
    </div>
  );
}
