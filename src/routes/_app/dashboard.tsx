import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Award, Target, Flame, Zap, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUser, pointsGrowth, recentActivity, leaderboard } from "@/data/mock";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Arcade Mentor" }, { name: "description", content: "Your Google Cloud Arcade progress at a glance." }] }),
  component: Dashboard,
});

function Dashboard() {
  const progress = (mockUser.points / mockUser.targetPoints) * 100;
  const top = leaderboard.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {mockUser.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">Here's how your Arcade journey is going.</p>
        </div>
        <Button asChild><Link to="/calculator"><Zap className="mr-2 h-4 w-4" />Analyze profile</Link></Button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Arcade Points" value={mockUser.points} icon={Zap} accent="brand" />
        <StatCard label="Current Rank" value={`#${mockUser.rank}`} icon={Trophy} accent="amber" />
        <StatCard label="Completed" value={mockUser.completedBadges} icon={Award} accent="success" />
        <StatCard label="Missing" value={mockUser.missingBadges} icon={Target} accent="muted" />
        <StatCard label="Streak" value={`${mockUser.streak}d`} icon={Flame} accent="amber" />
        <StatCard label="Next Reward" value={`${mockUser.points}/${mockUser.targetPoints}`} icon={TrendingUp} accent="brand" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Progress to next reward</CardTitle>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progress} className="h-2.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {[10, 20, 30, 45, 60].map((m) => (
              <div key={m} className="flex flex-col items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${mockUser.points >= m ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <span>{m} pts</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Points growth</CardTitle></CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pointsGrowth}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="points" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3 text-sm">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p>{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top this week</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/leaderboard">View all</Link></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {top.map((u) => (
            <div key={u.rank} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <span className="w-6 text-sm font-mono text-muted-foreground">#{u.rank}</span>
                <Avatar className="h-8 w-8"><AvatarImage src={u.avatar} /><AvatarFallback>{u.name.slice(0,2)}</AvatarFallback></Avatar>
                <span className="text-sm font-medium">{u.name}{u.you && <Badge variant="secondary" className="ml-2">You</Badge>}</span>
              </div>
              <span className="text-sm font-semibold">{u.points} pts</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}