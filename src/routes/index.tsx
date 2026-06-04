import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator, BookOpen, Sparkles, Trophy, MessagesSquare, Users, BarChart3,
  Zap, ArrowRight, CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arcade Mentor — Learn. Build. Earn." },
      { name: "description", content: "Track your Google Cloud Arcade points, discover learning resources, and join a community of cloud learners." },
      { property: "og:title", content: "Arcade Mentor — Learn. Build. Earn." },
      { property: "og:description", content: "Track your Google Cloud Arcade points, discover learning resources, and join a community of cloud learners." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Calculator, title: "Arcade Point Calculator", desc: "Calculate points from your Google Skills profile in seconds." },
  { icon: BookOpen, title: "Learning Resource Hub", desc: "YouTube tutorials, official labs, and curated notes." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Personalized next-badge suggestions tuned to your pace." },
  { icon: Trophy, title: "Leaderboards", desc: "Climb weekly, monthly, and all-time rankings." },
  { icon: MessagesSquare, title: "Community", desc: "Share tips, ask for lab help, and learn together." },
  { icon: Users, title: "Study Groups", desc: "Join focused groups and ship goals together." },
  { icon: BarChart3, title: "Progress Analytics", desc: "Beautiful charts to track every milestone." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Features />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand text-white"><Zap className="h-4 w-4" /></div>
          <span className="font-semibold tracking-tight">Arcade Mentor</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
          <Link to="/resources" className="hover:text-foreground">Resources</Link>
          <Link to="/community" className="hover:text-foreground">Community</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm"><Link to="/dashboard">Open app</Link></Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-4 gap-1"><Sparkles className="h-3 w-3" />New • Smart recommendations</Badge>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              Track your Arcade Points. <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">Learn faster.</span> Earn more rewards.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Analyze your Google Cloud Arcade progress, discover the best tutorials and labs, and join a thriving community of cloud learners.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/login">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/leaderboard">View Leaderboard</Link></Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" />Free forever</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" />No credit card</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--success)]" />12k+ learners</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl gradient-brand opacity-20 blur-3xl" />
            <img src={heroImg} alt="Arcade Mentor dashboard with progress charts, badges, and leaderboard" className="rounded-2xl border shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything you need to level up</h2>
          <p className="mt-3 text-muted-foreground">From profile analysis to study groups — built for serious Cloud Arcade learners.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="transition hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><f.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to claim your next badge?</h2>
        <p className="mt-3 text-muted-foreground">Join thousands of learners using Arcade Mentor to plan, learn, and win rewards.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild size="lg"><Link to="/login">Get Started Free</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/dashboard">Explore the demo</Link></Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md gradient-brand text-white"><Zap className="h-3 w-3" /></div>
          <span>© 2026 Arcade Mentor</span>
        </div>
        <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div>
    </div>
    </footer>
  );
}
