"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Book, Code, Laptop, FileText } from "lucide-react";

const docs = [
  {
    category: "Getting Started",
    items: [
      {
        title: "Quick Start Guide",
        description: "Get up and running with AgriVision in minutes",
        icon: Laptop,
        link: "/documentation/quick-start"
      },
      {
        title: "Platform Overview",
        description: "Learn about key features and capabilities",
        icon: Book,
        link: "/documentation/overview"
      }
    ]
  },
  {
    category: "API Reference",
    items: [
      {
        title: "REST API",
        description: "Complete API reference documentation",
        icon: Code,
        link: "/documentation/api"
      },
      {
        title: "Authentication",
        description: "Learn about API authentication methods",
        icon: FileText,
        link: "/documentation/auth"
      }
    ]
  }
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = docs.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about using AgriVision
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="space-y-12">
        {filteredDocs.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="transition-all hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={item.link}>Read More</a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Need More Help?</h3>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Button>Contact Support</Button>
      </div>
    </div>
  );
}