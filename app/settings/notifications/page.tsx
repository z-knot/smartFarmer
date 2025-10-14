"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  AlertTriangle,
  ThermometerIcon,
  Droplets,
  Wrench,
  Mail,
  MessageSquare,
  Phone
} from "lucide-react";

export default function NotificationSettingsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Notification Settings</h1>
          <p className="text-muted-foreground">
            Manage how you receive alerts and notifications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Notification Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via email
                  </p>
                </div>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={setEmailEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-500" />
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts on your devices
                  </p>
                </div>
              </div>
              <Switch
                checked={pushEnabled}
                onCheckedChange={setPushEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-500" />
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts via text message
                  </p>
                </div>
              </div>
              <Switch
                checked={smsEnabled}
                onCheckedChange={setSmsEnabled}
              />
            </div>

            {smsEnabled && (
              <div className="space-y-2 pt-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    High-priority notifications
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ThermometerIcon className="h-4 w-4 text-amber-500" />
                <div>
                  <Label>Weather Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Weather-related notifications
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <Label>Irrigation Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Irrigation system notifications
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-gray-500" />
                <div>
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Equipment maintenance reminders
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  defaultValue="22:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  defaultValue="07:00"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Only critical alerts will be sent during quiet hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}