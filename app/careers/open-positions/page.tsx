"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const positions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    description: "Join our core engineering team to build the future of agricultural technology...",
    requirements: [
      "Experience with React, Node.js, and cloud services",
      "Background in building scalable applications",
      "Strong problem-solving skills"
    ]
  },
  {
    id: 2,
    title: "Agricultural Data Scientist",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Help develop machine learning models for crop yield prediction...",
    requirements: [
      "MS/PhD in Data Science or related field",
      "Experience with Python and ML frameworks",
      "Knowledge of agricultural systems"
    ]
  }
];

export default function OpenPositionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    position.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Open Positions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our team and help build the future of agriculture
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search positions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Positions List */}
      <div className="space-y-6">
        {filteredPositions.map((position) => (
          <Card key={position.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>{position.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{position.department}</Badge>
                    <Badge variant="outline">{position.location}</Badge>
                    <Badge variant="outline">{position.type}</Badge>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{position.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {position.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No positions found matching your search.</p>
        </div>
      )}
    </div>
  );
}