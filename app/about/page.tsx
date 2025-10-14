"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Heart,
  Award,
  Globe,
  Sprout
} from "lucide-react";

const stats = [
  { label: "Farmers Served", value: "10,000+" },
  { label: "Countries", value: "25+" },
  { label: "Acres Monitored", value: "1M+" },
  { label: "Crop Yield Increase", value: "18%" }
];

const values = [
  {
    icon: Heart,
    title: "Farmer First",
    description: "Everything we do is focused on empowering farmers and improving their operations."
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Promoting sustainable agriculture practices for future generations."
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Continuously pushing the boundaries of agricultural technology."
  },
  {
    icon: Sprout,
    title: "Growth",
    description: "Supporting the growth of both farms and communities worldwide."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Agriculture",
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "David Kim",
    role: "Lead Engineer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url(https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "multiply"
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Empowering farmers with technology to feed the world sustainably
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <div 
                  className="absolute inset-0 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-900 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for agriculture and technology.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" size="lg">
              View Open Positions
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}