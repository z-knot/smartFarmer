"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Basic",
    price: "49",
    description: "Perfect for small farms and getting started",
    features: [
      "Up to 5 fields",
      "Basic weather forecasting",
      "Essential crop monitoring",
      "Email support",
      "Mobile app access",
      "7-day data history"
    ]
  },
  {
    name: "Professional",
    price: "99",
    description: "Ideal for growing farms with advanced needs",
    features: [
      "Up to 15 fields",
      "Advanced weather analytics",
      "Full crop monitoring suite",
      "Priority email & phone support",
      "Mobile app access",
      "30-day data history",
      "Custom alerts",
      "Basic AI recommendations"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "249",
    description: "Complete solution for large agricultural operations",
    features: [
      "Unlimited fields",
      "Premium weather analytics",
      "Advanced crop monitoring",
      "24/7 priority support",
      "Mobile app access",
      "Unlimited data history",
      "Custom alerts & workflows",
      "Advanced AI recommendations",
      "API access",
      "Custom integrations"
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that best fits your farm's needs. All plans include core features with no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${
              plan.popular 
                ? "border-green-500 shadow-lg scale-105" 
                : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "bg-green-500 hover:bg-green-600" 
                    : ""
                }`}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="text-left space-y-6">
          <div>
            <h3 className="font-medium mb-2">Can I change plans later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 14-day free trial on all plans. No credit card required.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}