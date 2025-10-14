"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

export default function ReportVulnerabilityPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Report a Vulnerability</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Help us keep AgriVision secure by reporting security vulnerabilities
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Report Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="type">Vulnerability Type</Label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input bg-background px-3 h-10"
                >
                  <option>Select type...</option>
                  <option>Security Vulnerability</option>
                  <option>Data Privacy Issue</option>
                  <option>Authentication Problem</option>
                  <option>Other Security Concern</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <select
                  id="severity"
                  className="w-full rounded-md border border-input bg-background px-3 h-10"
                >
                  <option>Select severity...</option>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <textarea
                  id="description"
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Please provide a detailed description of the vulnerability..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps">Steps to Reproduce</Label>
                <textarea
                  id="steps"
                  className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="List the steps to reproduce this vulnerability..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">Potential Impact</Label>
                <textarea
                  id="impact"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Describe the potential impact of this vulnerability..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Please do not include any sensitive data or personally identifiable information in your report.
                  We take all security reports seriously and will respond within 24 hours.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Report
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}