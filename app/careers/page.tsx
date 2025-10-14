"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Briefcase } from "lucide-react";
import { useState } from "react";

const jobs = [
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
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead the development of innovative agricultural software solutions...",
    requirements: [
      "Experience in agtech or related industry",
      "Strong analytical and communication skills",
      "Track record of successful product launches"
    ]
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Create intuitive interfaces for our farming platform...",
    requirements: [
      "Portfolio demonstrating web/mobile design",
      "Experience with Figma and design systems",
      "User-centered design approach"
    ]
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Denver, CO",
    type: "Full-time",
    experience: "2+ years",
    description: "Help our farming customers succeed with our platform...",
    requirements: [
      "Experience in customer success or account management",
      "Strong communication and problem-solving skills",
      "Agriculture industry knowledge preferred"
    ]
  }
];

const departments = ["All", "Engineering", "Data Science", "Product", "Design", "Customer Success"];
const locations = ["All", "San Francisco, CA", "Chicago, IL", "Denver, CO", "Remote"];

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === "All" || job.department === selectedDepartment;
    
    const matchesLocation = 
      selectedLocation === "All" || job.location === selectedLocation;

    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "multiply"
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Help us build the future of agriculture with technology and innovation
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Meaningful Impact</h3>
                <p className="text-muted-foreground">
                  Work on solutions that help feed the world sustainably
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  Flexible schedules and remote work options
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Join a diverse team making a worldwide impact
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-12">Open Positions</h2>
        
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
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
          
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <Button
                key={loc}
                variant={selectedLocation === loc ? "default" : "outline"}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{job.department}</Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{job.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Requirements:</h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Health & Wellness</h3>
              <p className="text-muted-foreground">Comprehensive medical, dental, and vision coverage</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Learning & Development</h3>
              <p className="text-muted-foreground">Professional development budget and mentorship programs</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Equity</h3>
              <p className="text-muted-foreground">Competitive stock options and equity packages</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2">Time Off</h3>
              <p className="text-muted-foreground">Generous PTO, paid holidays, and parental leave</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}