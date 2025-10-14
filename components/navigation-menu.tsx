"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Leaf, 
  BarChart2, 
  Map, 
  Bell, 
  Settings,
  Menu,
  X,
  Wifi,
  Server,
  Shield,
  Brain,
  Target,
  TrendingUp,
  Database
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/components/user-nav";
import { useAuth } from "@/hooks/use-auth";

export function NavigationMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAdmin, isAgronomist, isAuthenticated } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: BarChart2,
    },
    {
      href: "/fields",
      label: "Fields",
      icon: Map,
    },
    {
      href: "/crops",
      label: "Crops",
      icon: Leaf,
    },
    {
      href: "/alerts",
      label: "Alerts",
      icon: Bell,
    },
    {
      href: "/iot",
      label: "IoT Devices",
      icon: Wifi,
    },
    ...(isAdmin || isAgronomist ? [{
      href: "/ml/dashboard",
      label: "ML Dashboard",
      icon: Brain,
    }] : []),
    ...(isAdmin || isAgronomist ? [{
      href: "/ml/predictions",
      label: "AI Predictions",
      icon: Target,
    }] : []),
    ...(isAdmin || isAgronomist ? [{
      href: "/ml/models",
      label: "ML Models",
      icon: Database,
    }] : []),
    ...(isAdmin || isAgronomist ? [{
      href: "/ml/training",
      label: "Model Training",
      icon: TrendingUp,
    }] : []),
    ...(isAdmin ? [{
      href: "/admin",
      label: "Admin",
      icon: Shield,
    }] : []),
    ...(isAdmin ? [{
      href: "/devops",
      label: "System Status",
      icon: Server,
    }] : []),
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>AgriVision</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden md:inline-block">AgriVision</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Leaf className="h-6 w-6 text-green-600" />
              <span>AgriVision</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 pb-8 pt-6">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-lg font-medium transition-colors hover:text-foreground/80",
                    pathname === route.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={closeMenu}
                >
                  <Icon className="h-5 w-5" />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}