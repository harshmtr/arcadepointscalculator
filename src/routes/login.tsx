import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Arcade Mentor" }, { name: "description", content: "Sign in to track your Google Cloud Arcade progress." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const enter = () => navigate({ to: "/dashboard" });
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full gradient-brand opacity-30 blur-3xl" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white shadow-md"><Zap className="h-5 w-5" /></div>
          <div className="leading-tight"><p className="text-lg font-semibold">Arcade Mentor</p><p className="text-xs text-muted-foreground">Learn. Build. Earn.</p></div>
        </Link>
        <Card className="border-border/60 shadow-xl backdrop-blur">
          <CardContent className="space-y-5 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="mt-1 text-sm text-muted-foreground">Sign in to continue your Arcade journey.</p>
            </div>
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={enter}>
                <GoogleIcon className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={enter}>
                Continue as Guest <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">By continuing you agree to our Terms and Privacy Policy.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 01-1.995 3.018v2.51h3.227c1.89-1.741 2.986-4.305 2.986-7.351z"/><path fill="#34A853" d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.227-2.51c-.895.6-2.04.955-3.391.955-2.605 0-4.81-1.76-5.595-4.122H3.073v2.59A9.997 9.997 0 0012 22z"/><path fill="#FBBC05" d="M6.405 13.9A6.01 6.01 0 016.09 12c0-.66.114-1.3.314-1.9V7.51H3.073A9.997 9.997 0 002 12c0 1.614.386 3.14 1.073 4.49l3.332-2.59z"/><path fill="#EA4335" d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.96 2.99 14.696 2 12 2 8.09 2 4.71 4.245 3.073 7.51l3.332 2.59C7.19 7.737 9.395 5.977 12 5.977z"/></svg>
  );
}