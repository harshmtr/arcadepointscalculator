import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target } from "lucide-react";
import { groups } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/groups")({
  head: () => ({ meta: [{ title: "Study Groups — Arcade Mentor" }, { name: "description", content: "Join study groups and learn collaboratively." }] }),
  component: GroupsPage,
});

function GroupsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Study Groups</h1>
        <p className="text-sm text-muted-foreground">Learn faster together — join a group that matches your goals.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <Card key={g.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{g.name}</CardTitle>
                <Badge variant="secondary">{g.activity}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{g.members} members</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <div className="flex items-start gap-2 text-sm">
                <Target className="mt-0.5 h-4 w-4 text-primary" />
                <span>{g.goal}</span>
              </div>
              <div className="flex flex-wrap gap-1">{g.tags.map((t) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}</div>
              <Button className="mt-auto" onClick={() => toast.success(`Joined ${g.name}`)}>Join Group</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}