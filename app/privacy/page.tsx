"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We take your privacy seriously. Learn how we collect, use, and protect your data.
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground">Last Updated: March 21, 2024</p>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                Your data is encrypted and stored securely in our protected databases.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Privacy Controls</h3>
              <p className="text-sm text-muted-foreground">
                You have full control over your data sharing preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Clear information about how your data is used and processed.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Data Rights</h3>
              <p className="text-sm text-muted-foreground">
                Access, export, or delete your data at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
          <div className="space-y-4">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Account information (name, email, phone number)</li>
              <li>Farm data (field locations, crop types, sensor data)</li>
              <li>Usage information and analytics</li>
              <li>Communication preferences</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">2. How We Use Your Information</h2>
          <div className="space-y-4">
            <p>Your information is used to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and improve our services</li>
              <li>Send important notifications and updates</li>
              <li>Generate insights and recommendations</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">3. Data Sharing and Disclosure</h2>
          <div className="space-y-4">
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Service providers and partners</li>
              <li>Legal authorities when required by law</li>
              <li>Other users based on your sharing preferences</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">4. Your Rights and Choices</h2>
          <div className="space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5. Data Security</h2>
          <div className="space-y-4">
            <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
              <li>Employee training and compliance</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="mt-4">
            <p>Email: privacy@agrivision.com</p>
            <p>Phone: +1 (555) 0123</p>
            <p>Address: 123 AgriTech Drive, San Francisco, CA 94105</p>
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Have Questions About Your Privacy?</h3>
        <div className="flex justify-center gap-4">
          <Button>Contact Privacy Team</Button>
          <Button variant="outline">Download Privacy Policy</Button>
        </div>
      </div>
    </div>
  );
}