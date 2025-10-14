"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with AgriVision?",
        answer: "Getting started is easy! Simply sign up for a free trial, and our onboarding team will guide you through the setup process. We'll help you map your fields, connect your sensors, and start monitoring your crops."
      },
      {
        question: "What equipment do I need?",
        answer: "The basic requirements are a computer or mobile device with internet access. For advanced features, we support integration with various agricultural sensors and IoT devices. Our team can recommend compatible equipment based on your needs."
      },
      {
        question: "Is training provided?",
        answer: "Yes! We provide comprehensive training through video tutorials, documentation, and live webinars. Enterprise customers also receive personalized training sessions."
      }
    ]
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        question: "What types of crops does AgriVision support?",
        answer: "AgriVision supports all major crop types including grains, vegetables, fruits, and specialty crops. Our system is customizable to accommodate specific crop requirements and growing conditions."
      },
      {
        question: "Can I use AgriVision offline?",
        answer: "While most features require internet connectivity, our mobile app includes offline functionality for field data collection. Data syncs automatically when connection is restored."
      },
      {
        question: "How accurate are the weather forecasts?",
        answer: "We integrate with multiple professional weather services to provide hyperlocal forecasts with up to 95% accuracy. Forecasts are updated hourly and include detailed agricultural metrics."
      }
    ]
  },
  {
    category: "Data & Security",
    questions: [
      {
        question: "How is my farm data protected?",
        answer: "We employ industry-leading security measures including encryption, secure data centers, and regular security audits. Your data remains your property and is never shared without your explicit permission."
      },
      {
        question: "Can I export my data?",
        answer: "Yes, you can export your data in various formats including CSV, PDF, and JSON. We also provide API access for enterprise customers to integrate with other systems."
      },
      {
        question: "How long is historical data stored?",
        answer: "Data retention varies by plan. Basic plans include 7 days of history, Professional plans 30 days, and Enterprise plans unlimited historical data storage."
      }
    ]
  },
  {
    category: "Billing & Support",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans. Billing is monthly or annually, with discounts for annual payments."
      },
      {
        question: "Can I change my subscription plan?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle, with prorated adjustments for upgrades."
      },
      {
        question: "How do I get support?",
        answer: "Support is available through email, chat, and phone depending on your plan. Enterprise customers receive dedicated support representatives and priority response times."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Find answers to common questions about AgriVision. Can't find what you're looking for? Contact our support team.
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search FAQs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto space-y-8">
        {filteredFaqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <div className="bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help. Contact us for personalized assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </div>
      </div>
    </div>
  );
}