"use client";

import { MoreHorizontal, ArrowUpRight } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const fields = [
  {
    id: "field1",
    name: "North Field",
    crop: "Corn",
    status: "Healthy",
    plantedArea: "15 ha",
    growthStage: "Vegetative",
    health: 92,
  },
  {
    id: "field2",
    name: "South Field",
    crop: "Soybeans",
    status: "Warning",
    plantedArea: "12 ha",
    growthStage: "Flowering",
    health: 76,
  },
  {
    id: "field3",
    name: "East Field",
    crop: "Wheat",
    status: "Healthy",
    plantedArea: "8 ha",
    growthStage: "Grain fill",
    health: 88, 
  },
  {
    id: "field4",
    name: "West Field",
    crop: "Cotton",
    status: "Critical",
    plantedArea: "10 ha",
    growthStage: "Boll development",
    health: 45,
  },
];

export function FieldsOverview() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Fields Overview</CardTitle>
            <CardDescription>
              Status and details for all your registered fields
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Add new field
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Growth Stage</TableHead>
                <TableHead className="hidden md:table-cell">Area</TableHead>
                <TableHead>Health</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell className="font-medium">{field.name}</TableCell>
                  <TableCell>{field.crop}</TableCell>
                  <TableCell>{field.growthStage}</TableCell>
                  <TableCell className="hidden md:table-cell">{field.plantedArea}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={field.health} 
                        className="h-2 w-16 md:w-24"
                        indicatorClassName={
                          field.health > 80 
                            ? "bg-green-500" 
                            : field.health > 60 
                            ? "bg-amber-500" 
                            : "bg-red-500"
                        }
                      />
                      <span className="text-xs tabular-nums">{field.health}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit field</DropdownMenuItem>
                        <DropdownMenuItem>View history</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete field
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}