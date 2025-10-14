"use client";

import { useState } from "react";
import { Leaf, Search, Filter, Plus, ArrowUpDown } from "lucide-react";
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

const crops = [
  {
    id: "crop1",
    name: "Corn",
    variety: "Sweet Corn",
    plantingDate: "2024-03-15",
    harvestDate: "2024-08-15",
    status: "Growing",
    health: "Excellent",
    fields: ["North Field", "South Field"],
    image: "https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "crop2",
    name: "Soybeans",
    variety: "Williams 82",
    plantingDate: "2024-04-01",
    harvestDate: "2024-09-15",
    status: "Growing",
    health: "Good",
    fields: ["East Field"],
    image: "https://images.pexels.com/photos/6249/soybean-growth-growing-plant.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "crop3",
    name: "Wheat",
    variety: "Hard Red Winter",
    plantingDate: "2023-10-15",
    harvestDate: "2024-07-01",
    status: "Growing",
    health: "Warning",
    fields: ["West Field"],
    image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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

export default function CropsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.variety.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Crops</h1>
          <p className="text-muted-foreground">
            Monitor and manage your crops across all fields
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Crop
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search crops..."
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
              <DropdownMenuItem>All Crops</DropdownMenuItem>
              <DropdownMenuItem>Growing</DropdownMenuItem>
              <DropdownMenuItem>Harvested</DropdownMenuItem>
              <DropdownMenuItem>Planned</DropdownMenuItem>
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
              <DropdownMenuItem>Planting Date</DropdownMenuItem>
              <DropdownMenuItem>Harvest Date</DropdownMenuItem>
              <DropdownMenuItem>Health Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="overflow-hidden">
            <div className="relative h-48">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${crop.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-bold text-white text-xl">{crop.name}</h3>
                <p className="text-white/90 text-sm">{crop.variety}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="gap-1">
                    <Leaf className="h-3 w-3" />
                    {crop.status}
                  </Badge>
                  <Badge 
                    className={`${getHealthColor(crop.health)} text-white border-0`}
                  >
                    {crop.health}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Planting Date</p>
                    <p className="font-medium">{crop.plantingDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Harvest Date</p>
                    <p className="font-medium">{crop.harvestDate}</p>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Fields</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {crop.fields.map((field) => (
                      <Badge key={field} variant="secondary">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Edit Crop</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}