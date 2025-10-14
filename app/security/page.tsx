"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Key, 
  UserCheck,
  Server,
  AlertTriangle,
  FileCheck,
  RefreshCw
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Security at AgriVision</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn about our commitment to protecting your data and maintaining the security of our platform.
        </p>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Encryption</h3>
              <p className="text-sm text-muted-foreground">
                All data is encrypted in transit and at rest using industry-standard protocols.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Access Control</h3>
              <p className="text-sm text-muted-foreground">
                Role-based access control and multi-factor authentication.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Cloud infrastructure with multiple layers of security controls.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-muted-foreground">
                Continuous security updates and vulnerability patching.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Our Security Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>End-to-end encryption for all data</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure backup and disaster recovery</li>
                  <li>Compliance with industry standards</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Access Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Multi-factor authentication</li>
                  <li>Role-based access control</li>
                  <li>Session management and monitoring</li>
                  <li>Regular access reviews</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Compliance & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <FileCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">ISO 27001</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified information security management system
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
                  <p className="text-sm text-muted-foreground">
                    Independently audited security controls
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                    <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Meeting EU data protection requirements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>For Organizations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>Implement strong password policies</li>
                  <li>Regular security training for staff</li>
                  <li>Monitor system access and usage</li>
                  <li>Keep software and systems updated</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>Use strong, unique passwords</li>
                  <li>Enable two-factor authentication</li>
                  <li>Be cautious with third-party integrations</li>
                  <li>Report suspicious activities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Incident Response</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Security Incident Handling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We maintain a comprehensive incident response plan to quickly address any security concerns:
              </p>
              <ul className="space-y-2">
                <li>24/7 security monitoring</li>
                <li>Dedicated incident response team</li>
                <li>Regular incident response drills</li>
                <li>Transparent communication with affected users</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Have Security Concerns?</h3>
        <div className="flex justify-center gap-4">
          <Button>Contact Security Team</Button>
          <Button variant="outline">Report Vulnerability</Button>
        </div>
      </div>
    </div>
  );
}