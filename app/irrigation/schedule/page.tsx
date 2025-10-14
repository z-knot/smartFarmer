"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Clock, Calendar } from "lucide-react";

export default function IrrigationSchedulePage() {
  const [selectedField, setSelectedField] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Schedule Irrigation</h1>
          <p className="text-muted-foreground">
            Plan and schedule irrigation for your fields
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Irrigation</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <select
                  id="field"
                  className="w-full rounded-md border border-input bg-background px-3 h-10"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="">Select field...</option>
                  <option value="north">North Field</option>
                  <option value="south">South Field</option>
                  <option value="east">East Field</option>
                  <option value="west">West Field</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <Button className="w-full">Schedule Irrigation</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>Soil Moisture</span>
                  </div>
                  <span className="font-medium">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Last Irrigation</span>
                  </div>
                  <span className="font-medium">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span>Next Scheduled</span>
                  </div>
                  <span className="font-medium">Tomorrow, 6:00 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Irrigation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-03-18", time: "06:00", duration: "45 min" },
                  { date: "2024-03-16", time: "06:00", duration: "30 min" },
                  { date: "2024-03-14", time: "06:00", duration: "45 min" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{record.date}</p>
                      <p className="text-sm text-muted-foreground">{record.time}</p>
                    </div>
                    <span className="text-sm">{record.duration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}