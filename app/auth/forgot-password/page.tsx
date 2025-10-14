"use client";

import * as React from "react";
import Link from "next/link";
import { Leaf, ArrowLeft, Mail, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>AgriVision</span>
          </Link>
          
          {!isSubmitted ? (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button disabled={isLoading} className="w-full">
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Check your email
                </h1>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to {email}
                </p>
              </div>
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Didn't receive the email? Check your spam folder or try again.
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex items-center justify-center">
            <Link
              href="/auth/login"
              className="flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}