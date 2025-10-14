"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Shield, Scale, HelpCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Please read these terms carefully before using our services.
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground">Last Updated: March 21, 2024</p>
      </div>

      {/* Key Points Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <ScrollText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Agreement Overview</h3>
              <p className="text-sm text-muted-foreground">
                By using our services, you agree to these terms and conditions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                We protect your data according to our privacy policy and applicable laws.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-sm text-muted-foreground">
                Understand your rights and responsibilities when using our platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
          <div className="space-y-4">
            <p>
              By accessing or using AgriVision's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">2. Use License</h2>
          <div className="space-y-4">
            <p>Permission is granted to temporarily access and use our services for personal, non-commercial use, subject to the following conditions:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>You must not modify or copy our materials</li>
              <li>You must not use the materials for commercial purposes</li>
              <li>You must not attempt to reverse engineer any software</li>
              <li>You must not remove any copyright or proprietary notations</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">3. Service Description</h2>
          <div className="space-y-4">
            <p>AgriVision provides:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Agricultural monitoring and management tools</li>
              <li>Data analytics and insights</li>
              <li>Sensor integration and IoT capabilities</li>
              <li>Reporting and visualization features</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">4. User Obligations</h2>
          <div className="space-y-4">
            <p>As a user, you agree to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws</li>
              <li>Not interfere with service operation</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">5. Payment Terms</h2>
          <div className="space-y-4">
            <p>For paid services:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Payments are processed securely</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Refunds are subject to our refund policy</li>
              <li>Prices may change with notice</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">6. Intellectual Property</h2>
          <div className="space-y-4">
            <p>
              All content, features, and functionality are owned by AgriVision and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">7. Limitation of Liability</h2>
          <div className="space-y-4">
            <p>
              AgriVision shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">8. Changes to Terms</h2>
          <div className="space-y-4">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
            </p>
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Questions About Our Terms?</h3>
        <div className="flex justify-center gap-4">
          <Button>Contact Legal Team</Button>
          <Button variant="outline">Download Terms</Button>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-muted rounded-lg p-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold">Need Help?</h3>
        </div>
        <p className="text-center text-muted-foreground mb-6">
          Our support team is available to help you understand our terms and answer any questions.
        </p>
        <div className="flex justify-center">
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  );
}