"use client";

import { useState } from "react";
import { AlertTriangle, Bell, Filter, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const alerts = [
  {
    id: "alert1",
    title: "Critical Soil Moisture Level",
    message: "North Field soil moisture has dropped below 30%. Immediate irrigation recommended.",
    type: "critical",
    timestamp: "2024-03-20T10:30:00Z",
    field: "North Field",
    fieldId: "field1",
    status: "active",
  },
  {
    id: "alert2",
    title: "Pest Detection Warning",
    message: "Possible aphid infestation detected in South Field soybeans. Inspection needed.",
    type: "warning",
    timestamp: "2024-03-20T09:15:00Z",
    field: "South Field",
    fieldId: "field2",
    status: "active",
  },
  {
    id: "alert3",
    title: "Equipment Maintenance Due",
    message: "Irrigation system in East Field requires scheduled maintenance.",
    type: "info",
    timestamp: "2024-03-20T08:00:00Z",
    field: "East Field",
    fieldId: "field3",
    status: "resolved",
  },
  {
    id: "alert4",
    title: "Weather Advisory",
    message: "Frost warning for tonight. Consider protective measures for sensitive crops.",
    type: "warning",
    timestamp: "2024-03-19T22:00:00Z",
    field: "All Fields",
    fieldId: "all",
    status: "active",
  },
];

const getAlertTypeStyles = (type: string) => {
  switch (type.toLowerCase()) {
    case "critical":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        badge: "bg-red-500",
      };
    case "warning":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
        badge: "bg-amber-500",
      };
    case "info":
      return {
        icon: <Bell className="h-5 w-5 text-blue-500" />,
        badge: "bg-blue-500",
      };
    default:
      return {
        icon: <Bell className="h-5 w-5 text-gray-500" />,
        badge: "bg-gray-500",
      };
  }
};

export default function AlertsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.field.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && alert.status === "active";
    if (activeTab === "resolved") return matchesSearch && alert.status === "resolved";
    return matchesSearch;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Alerts</h1>
          <p className="text-muted-foreground">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/settings/notifications">
            <Settings className="h-4 w-4" /> Alert Settings
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search alerts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Types</DropdownMenuItem>
              <DropdownMenuItem>Critical</DropdownMenuItem>
              <DropdownMenuItem>Warning</DropdownMenuItem>
              <DropdownMenuItem>Info</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredAlerts.map((alert) => {
            const styles = getAlertTypeStyles(alert.type);
            return (
              <Card key={alert.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{styles.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold truncate">{alert.title}</h3>
                        <Badge 
                          className={`${styles.badge} text-white border-0`}
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {alert.message}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          <span>•</span>
                          <Link 
                            href={`/fields/${alert.fieldId}`}
                            className="hover:text-foreground"
                          >
                            {alert.field}
                          </Link>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/alerts/${alert.id}`)}
                          >
                            View Details
                          </Button>
                          {alert.status === "active" && (
                            <Button size="sm">
                              Mark as Resolved
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}