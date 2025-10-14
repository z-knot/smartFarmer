"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddFieldPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just redirect back to the fields page
    router.push('/fields');
  };

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push('/fields')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Fields
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Add New Field</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Field Name</Label>
              <Input id="name" placeholder="Enter field name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (hectares)</Label>
              <Input 
                id="area" 
                type="number" 
                placeholder="Enter area in hectares" 
                min="0" 
                step="0.1"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="clay-loam">Clay Loam</SelectItem>
                  <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Current/Planned Crop</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="soybeans">Soybeans</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planting-date">Planting Date</Label>
              <Input 
                id="planting-date" 
                type="date" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <textarea 
                id="notes"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter any additional notes about the field"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/fields')}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Field
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}