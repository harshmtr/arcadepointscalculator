import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown } from "lucide-react";
import { leaderboard } from "@/data/mock";

export const Route = createFileRoute("/_app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — Arcade Mentor" }, { name: "description", content: "See the top Cloud Arcade learners across weekly, monthly, and all-time." }] }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Compete with the global community of Arcade learners.</p>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="all">All-Time</TabsTrigger>
        </TabsList>

        {["weekly","monthly","all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            <div className="grid gap-3 md:grid-cols-3">
              <PodiumCard place="Silver" user={leaderboard[1]} icon={Medal} accent="bg-zinc-300" />
              <PodiumCard place="Gold" user={leaderboard[0]} icon={Crown} accent="bg-amber-300" featured />
              <PodiumCard place="Bronze" user={leaderboard[2]} icon={Trophy} accent="bg-orange-300" />
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="text-right">Labs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.slice(3).map((u) => (
                      <TableRow key={u.rank} className={u.you ? "bg-primary/5" : ""}>
                        <TableCell className="font-mono text-sm">#{u.rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8"><AvatarImage src={u.avatar} /><AvatarFallback>{u.name.slice(0,2)}</AvatarFallback></Avatar>
                            <span className="font-medium">{u.name}{u.you && <Badge variant="secondary" className="ml-2">You</Badge>}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{u.points}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{u.labs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function PodiumCard({ place, user, icon: Icon, accent, featured }: any) {
  return (
    <Card className={`relative overflow-hidden ${featured ? "md:-translate-y-2 ring-2 ring-primary/30" : ""}`}>
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <div className={`grid h-12 w-12 place-items-center rounded-full ${accent} text-zinc-900`}>
          <Icon className="h-6 w-6" />
        </div>
        <Avatar className="h-16 w-16"><AvatarImage src={user.avatar} /><AvatarFallback>{user.name.slice(0,2)}</AvatarFallback></Avatar>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{place} • {user.points} pts</p>
        </div>
      </CardContent>
    </Card>
  );
}