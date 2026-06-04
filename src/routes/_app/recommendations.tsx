import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, Zap, ArrowRight } from "lucide-react";
import { badges, recommendationReasons } from "@/data/badges";

export const Route = createFileRoute("/_app/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — Arcade Mentor" }, { name: "description", content: "Smart badge suggestions based on your progress." }] }),
  component: Recommendations,
});

function Recommendations() {
  const recs = badges.filter((b) => b.status === "Missing").slice(0, 6);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Recommended next badges</h1>
        <p className="text-sm text-muted-foreground">Tailored to your completed labs and learning pace.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recs.map((b) => (
          <Card key={b.id} className="flex flex-col overflow-hidden transition hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <Badge variant="secondary">{b.difficulty}</Badge>
              </div>
              <CardTitle className="mt-2 text-base">{b.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3" />{b.points} pts</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{b.duration}</span>
              </div>
              <div className="rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Why: </span>
                {recommendationReasons[b.id] ?? "High-value badge matching your current track."}
              </div>
              <Button className="mt-auto" asChild>
                <a href={b.labUrl} target="_blank" rel="noreferrer">Start Learning <ArrowRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}