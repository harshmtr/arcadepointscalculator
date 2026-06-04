import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockUser, recentActivity, groups } from "@/data/mock";
import { badges } from "@/data/badges";
import { Trophy, Award, Zap, Bookmark } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — Arcade Mentor" }, { name: "description", content: "Your Arcade Mentor profile and activity." }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const earned = badges.filter((b) => b.status === "Completed");
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-24 gradient-brand" />
        <CardContent className="-mt-10 flex flex-col gap-4 md:flex-row md:items-end">
          <Avatar className="h-20 w-20 ring-4 ring-background">
            <AvatarImage src={mockUser.avatar} /><AvatarFallback>{mockUser.name.slice(0,2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">{mockUser.name}</h1>
            <p className="text-sm text-muted-foreground">{mockUser.email} • Joined {mockUser.joinedDate}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="gap-1"><Trophy className="h-3 w-3" />#{mockUser.rank}</Badge>
            <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" />{mockUser.points} pts</Badge>
            <Badge variant="secondary" className="gap-1"><Award className="h-3 w-3" />{mockUser.completedBadges} badges</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="badges">Earned Badges</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-2">
          {recentActivity.map((a) => (
            <Card key={a.id}><CardContent className="flex items-center justify-between p-4">
              <span className="text-sm">{a.text}</span>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </CardContent></Card>
          ))}
        </TabsContent>
        <TabsContent value="badges">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {earned.map((b) => (
              <Card key={b.id}><CardContent className="flex items-center gap-3 p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Award className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0"><p className="font-medium truncate">{b.name}</p><p className="text-xs text-muted-foreground">{b.category} • {b.points} pts</p></div>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <Card><CardContent className="grid place-items-center py-12 text-center">
            <Bookmark className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-medium">No saved resources yet</p>
            <p className="text-sm text-muted-foreground">Save tutorials from the Resource Hub to find them here.</p>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="groups">
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.slice(0, 3).map((g) => (
              <Card key={g.id}><CardHeader><CardTitle className="text-base">{g.name}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{g.goal}</p></CardContent></Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}