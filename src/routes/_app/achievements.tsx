import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Medal, Sparkles, MessagesSquare, Users, Trophy, Flame, Crown, Lock } from "lucide-react";
import { achievements } from "@/data/mock";
import { cn } from "@/lib/utils";

const iconMap = { Award, Medal, Sparkles, MessagesSquare, Users, Trophy, Flame, Crown } as const;

export const Route = createFileRoute("/_app/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Arcade Mentor" }, { name: "description", content: "Earn badges and trophies as you level up." }] }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const tierColor = {
    Bronze: "from-orange-300 to-orange-500",
    Silver: "from-zinc-200 to-zinc-400",
    Gold: "from-amber-300 to-amber-500",
    Platinum: "from-indigo-300 to-fuchsia-400",
  } as const;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Achievements</h1>
        <p className="text-sm text-muted-foreground">Trophies you've earned and milestones still to unlock.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a) => {
          const Icon = iconMap[a.icon as keyof typeof iconMap] ?? Award;
          return (
            <Card key={a.id} className={cn("relative overflow-hidden text-center", !a.unlocked && "opacity-70")}>
              <CardContent className="flex flex-col items-center gap-3 p-6">
                <div className={cn("grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br text-zinc-900 shadow-md", tierColor[a.tier])}>
                  {a.unlocked ? <Icon className="h-7 w-7" /> : <Lock className="h-6 w-6" />}
                </div>
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
                </div>
                <Badge variant={a.unlocked ? "default" : "secondary"}>{a.unlocked ? "Unlocked" : "Locked"} • {a.tier}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}