"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MapPin,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Activity,
  Database,
  Server,
  Wifi,
  BarChart3,
  Calendar,
  Settings,
  Download,
  RefreshCw,
  Eye,
  UserCheck,
  UserX,
  Shield,
  Bell,
  Zap,
  Globe
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

// Mock data for dashboard
const systemStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalFields: 3456,
  totalCrops: 12,
  activeAlerts: 23,
  systemUptime: "99.9%",
  dataPoints: "2.4M",
  storageUsed: "1.2TB"
};

const userGrowthData = [
  { month: 'Jan', users: 850, active: 720 },
  { month: 'Feb', users: 920, active: 780 },
  { month: 'Mar', users: 1050, active: 850 },
  { month: 'Apr', users: 1180, active: 920 },
  { month: 'May', users: 1247, active: 892 },
];

const fieldDistributionData = [
  { name: 'Corn', value: 35, color: '#10b981' },
  { name: 'Soybeans', value: 25, color: '#3b82f6' },
  { name: 'Wheat', value: 20, color: '#f59e0b' },
  { name: 'Cotton', value: 12, color: '#ef4444' },
  { name: 'Other', value: 8, color: '#8b5cf6' },
];

const alertsData = [
  { date: '2024-01-01', critical: 5, warning: 12, info: 8 },
  { date: '2024-01-02', critical: 3, warning: 15, info: 10 },
  { date: '2024-01-03', critical: 7, warning: 8, info: 12 },
  { date: '2024-01-04', critical: 2, warning: 18, info: 6 },
  { date: '2024-01-05', critical: 4, warning: 14, info: 9 },
];

const systemMetrics = [
  { time: '00:00', cpu: 45, memory: 62, storage: 78 },
  { time: '04:00', cpu: 38, memory: 58, storage: 78 },
  { time: '08:00', cpu: 72, memory: 75, storage: 79 },
  { time: '12:00', cpu: 85, memory: 82, storage: 80 },
  { time: '16:00', cpu: 68, memory: 71, storage: 81 },
  { time: '20:00', cpu: 52, memory: 65, storage: 82 },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Created new field', time: '2 minutes ago', type: 'create' },
  { id: 2, user: 'Sarah Johnson', action: 'Updated crop data', time: '5 minutes ago', type: 'update' },
  { id: 3, user: 'Mike Chen', action: 'Resolved alert', time: '8 minutes ago', type: 'resolve' },
  { id: 4, user: 'Emily Rodriguez', action: 'Added new sensors', time: '12 minutes ago', type: 'create' },
  { id: 5, user: 'David Kim', action: 'Generated report', time: '15 minutes ago', type: 'export' },
];

const topFields = [
  { name: 'Green Valley Farm - North', owner: 'John Doe', area: '150 ha', health: 95, alerts: 0 },
  { name: 'Sunrise Acres - Main', owner: 'Sarah Johnson', area: '120 ha', health: 92, alerts: 1 },
  { name: 'Golden Harvest - East', owner: 'Mike Chen', area: '200 ha', health: 88, alerts: 2 },
  { name: 'Prairie View - South', owner: 'Emily Rodriguez', area: '180 ha', health: 85, alerts: 1 },
  { name: 'Riverside Farm - West', owner: 'David Kim', area: '95 ha', health: 90, alerts: 0 },
];

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  useEffect(() => {
    if (!loading && !isAdmin) {
      window.location.href = '/';
    }
  }, [isAdmin, loading]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <Zap className="h-4 w-4 text-green-500" />;
      case 'update':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'resolve':
        return <UserCheck className="h-4 w-4 text-purple-500" />;
      case 'export':
        return <Download className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="text-sm text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive system overview and management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Fields</p>
                <p className="text-2xl font-bold">{systemStats.totalFields.toLocaleString()}</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">{systemStats.activeAlerts}</p>
                <p className="text-xs text-red-600">+3 from yesterday</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="fields">Fields</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stackId="1"
                        stroke="#3b82f6" 
                        fill="#3b82f6"
                        fillOpacity={0.6}
                        name="Total Users"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="active" 
                        stackId="2"
                        stroke="#10b981" 
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Active Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Crop Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fieldDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {fieldDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topFields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{field.name}</p>
                        <p className="text-xs text-muted-foreground">{field.owner} • {field.area}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">
                          {field.health}% Health
                        </Badge>
                        {field.alerts > 0 && (
                          <Badge variant="outline" className="text-amber-600">
                            {field.alerts} Alert{field.alerts > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Administrators</span>
                  <Badge className="bg-red-500 text-white">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Agronomists</span>
                  <Badge className="bg-blue-500 text-white">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Farm Managers</span>
                  <Badge className="bg-purple-500 text-white">156</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Farmers</span>
                  <Badge className="bg-green-500 text-white">1034</Badge>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" asChild>
                    <Link href="/admin/users">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Activity Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Activity Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Total Users"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="active" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Active Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fields">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Field Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Field Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">3,456</p>
                    <p className="text-sm text-muted-foreground">Total Fields</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">2,890</p>
                    <p className="text-sm text-muted-foreground">Active Fields</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">156,780</p>
                    <p className="text-sm text-muted-foreground">Total Hectares</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">87.3%</p>
                    <p className="text-sm text-muted-foreground">Avg Health</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/fields">
                    <MapPin className="h-4 w-4 mr-2" />
                    View All Fields
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alerts Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={alertsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="critical" fill="#ef4444" name="Critical" />
                      <Bar dataKey="warning" fill="#f59e0b" name="Warning" />
                      <Bar dataKey="info" fill="#3b82f6" name="Info" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">System Uptime</span>
                  <Badge className="bg-green-500 text-white">{systemStats.systemUptime}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Points Collected</span>
                  <span className="font-medium">{systemStats.dataPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-medium">{systemStats.storageUsed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Response Time</span>
                  <Badge className="bg-green-500 text-white">45ms</Badge>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/devops">
                    <Server className="h-4 w-4 mr-2" />
                    System Status
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Resource Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="CPU %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Memory %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="storage" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Storage %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">45,678</p>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">12,345</p>
                    <p className="text-sm text-muted-foreground">API Calls</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">2,890</p>
                    <p className="text-sm text-muted-foreground">Reports Generated</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">156</p>
                    <p className="text-sm text-muted-foreground">ML Predictions</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Detailed Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/admin/roles">
                    <Shield className="h-4 w-4 mr-2" />
                    Roles & Permissions
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/alerts">
                    <Bell className="h-4 w-4 mr-2" />
                    System Alerts
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/iot">
                    <Wifi className="h-4 w-4 mr-2" />
                    IoT Devices
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/ml/dashboard">
                    <Activity className="h-4 w-4 mr-2" />
                    ML Dashboard
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}