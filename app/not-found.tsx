import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Leaf className="h-8 w-8 text-green-600" />
        <span>AgriVision</span>
      </div>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <p className="text-center text-muted-foreground max-w-[500px] mb-4">
        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
      >
        Return Home
      </Link>
    </div>
  );
}