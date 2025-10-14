"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Filter, 
  Plus, 
  Leaf, 
  ArrowUpDown,
  Layers,
  Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fields = [
  {
    id: "field1",
    name: "North Field",
    crop: "Corn",
    area: "15 ha",
    health: "Excellent",
    lastInspection: "2 days ago",
    image: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "field2",
    name: "South Field",
    crop: "Soybeans",
    area: "12 ha",
    health: "Warning",
    lastInspection: "5 days ago",
    image: "https://images.pexels.com/photos/46168/field-paddle-lake-blue-46168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "field3",
    name: "East Field",
    crop: "Wheat",
    area: "8 ha",
    health: "Good",
    lastInspection: "1 week ago",
    image: "https://images.pexels.com/photos/2679323/pexels-photo-2679323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "field4",
    name: "West Field",
    crop: "Cotton",
    area: "10 ha",
    health: "Critical",
    lastInspection: "2 weeks ago",
    image: "https://images.pexels.com/photos/158179/lake-constance-sheep-pasture-sheep-blue-158179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "field5",
    name: "River Field",
    crop: "Rice",
    area: "6 ha",
    health: "Good",
    lastInspection: "3 days ago",
    image: "https://images.pexels.com/photos/4963956/pexels-photo-4963956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "field6",
    name: "Hill Field",
    crop: "Alfalfa",
    area: "7 ha",
    health: "Excellent",
    lastInspection: "4 days ago",
    image: "https://images.pexels.com/photos/175415/pexels-photo-175415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const getHealthColor = (health: string) => {
  switch (health.toLowerCase()) {
    case "excellent":
      return "bg-green-500 hover:bg-green-600";
    case "good":
      return "bg-green-400 hover:bg-green-500";
    case "warning":
      return "bg-amber-500 hover:bg-amber-600";
    case "critical":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function FieldsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "map">("grid");
  
  const filteredFields = fields.filter(field => 
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Fields</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your fields in one place
          </p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => router.push('/fields/add')}
        >
          <Plus className="h-4 w-4" /> Add Field
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fields or crops..."
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
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter Fields</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  By Crop
                </DropdownMenuLabel>
                <DropdownMenuItem>Corn</DropdownMenuItem>
                <DropdownMenuItem>Soybeans</DropdownMenuItem>
                <DropdownMenuItem>Wheat</DropdownMenuItem>
                <DropdownMenuItem>Cotton</DropdownMenuItem>
                <DropdownMenuItem>Rice</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  By Health Status
                </DropdownMenuLabel>
                <DropdownMenuItem>Excellent</DropdownMenuItem>
                <DropdownMenuItem>Good</DropdownMenuItem>
                <DropdownMenuItem>Warning</DropdownMenuItem>
                <DropdownMenuItem>Critical</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" /> Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>Area (High-Low)</DropdownMenuItem>
              <DropdownMenuItem>Area (Low-High)</DropdownMenuItem>
              <DropdownMenuItem>Health Status</DropdownMenuItem>
              <DropdownMenuItem>Last Inspection</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="hidden sm:block">
            <Tabs defaultValue="grid" onValueChange={(v) => setView(v as "grid" | "map")}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Layers className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="map">
                  <Eye className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map((field) => (
            <Card key={field.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${field.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-bold text-white drop-shadow-sm">{field.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      className={`${getHealthColor(field.health)} text-white border-0`}
                    >
                      {field.health}
                    </Badge>
                    <span className="text-xs text-white/90">Last inspection: {field.lastInspection}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{field.crop}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{field.area}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/fields/${field.id}`)}
                  >
                    Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/fields/${field.id}/analyze`)}
                  >
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="h-[600px] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/11245185/pexels-photo-11245185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            {/* This would be replaced with an actual interactive map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold mb-2">Map View</h3>
                <p className="text-muted-foreground">
                  This would be an interactive map with field boundaries in a real application.
                </p>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-md shadow text-xs">
              <h4 className="font-medium mb-1">Field Health</h4>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <span>Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}