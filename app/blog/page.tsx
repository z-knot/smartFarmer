"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    id: 1,
    title: "The Future of Precision Agriculture",
    excerpt: "Exploring how AI and IoT are revolutionizing farming practices...",
    category: "Technology",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    excerpt: "Key strategies for reducing environmental impact while maximizing yield...",
    category: "Sustainability",
    author: "Michael Chen",
    date: "March 12, 2024",
    image: "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    title: "Weather Prediction in Agriculture",
    excerpt: "How modern weather forecasting is changing crop management...",
    category: "Climate",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    title: "Maximizing Crop Yield",
    excerpt: "Best practices for optimizing your farm's productivity...",
    category: "Farming",
    author: "David Kim",
    date: "March 8, 2024",
    image: "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 5,
    title: "The Rise of Smart Irrigation",
    excerpt: "How automated systems are transforming water management...",
    category: "Technology",
    author: "Sarah Johnson",
    date: "March 5, 2024",
    image: "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 6,
    title: "Soil Health Management",
    excerpt: "Understanding and improving your soil's fertility...",
    category: "Farming",
    author: "Michael Chen",
    date: "March 3, 2024",
    image: "https://images.pexels.com/photos/7728083/pexels-photo-7728083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const categories = ["All", "Technology", "Sustainability", "Climate", "Farming"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          AgriVision Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights and updates from the world of precision agriculture
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  By {post.author}
                </span>
                <Button variant="outline" size="sm">Read More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter for the latest insights and updates in precision agriculture.
        </p>
        <div className="flex gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}