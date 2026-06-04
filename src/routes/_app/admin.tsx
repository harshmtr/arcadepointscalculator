import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Flag, BarChart3, ShieldAlert } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts";
import { pointsGrowth, leaderboard, threads } from "@/data/mock";
import { badges } from "@/data/badges";

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Admin — Arcade Mentor" }, { name: "description", content: "Admin dashboard." }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
        <Badge variant="secondary">Mock</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Total users" value="12,418" icon={Users} />
        <StatCard label="Resources" value={badges.length} icon={BookOpen} accent="success" />
        <StatCard label="Open reports" value="7" icon={Flag} accent="amber" />
        <StatCard label="Weekly active" value="3,902" icon={BarChart3} accent="brand" />
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="grid gap-4 lg:grid-cols-2">
          <Card><CardHeader><CardTitle>Sign-ups (weekly)</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer><BarChart data={pointsGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="points" fill="var(--color-chart-1)" radius={[6,6,0,0]} />
              </BarChart></ResponsiveContainer>
            </CardContent></Card>
          <Card><CardHeader><CardTitle>Engagement</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer><LineChart data={pointsGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="badges" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              </LineChart></ResponsiveContainer>
            </CardContent></Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Badge</TableHead><TableHead>Category</TableHead><TableHead>Points</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {badges.slice(0, 10).map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>{b.category}</TableCell>
                    <TableCell>{b.points}</TableCell>
                    <TableCell className="text-right space-x-2"><Button size="sm" variant="ghost">Edit</Button><Button size="sm" variant="ghost">Archive</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="moderation">
          <div className="space-y-2">
            {threads.slice(0, 3).map((t) => (
              <Card key={t.id}><CardContent className="flex items-center justify-between p-4">
                <div><p className="font-medium">{t.title}</p><p className="text-xs text-muted-foreground">by {t.author} • {t.replies} replies</p></div>
                <div className="flex gap-2"><Button size="sm" variant="outline">Approve</Button><Button size="sm" variant="destructive">Remove</Button></div>
              </CardContent></Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card><CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>User</TableHead><TableHead>Points</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {leaderboard.slice(0, 8).map((u) => (
                  <TableRow key={u.rank}>
                    <TableCell>#{u.rank}</TableCell><TableCell>{u.name}</TableCell><TableCell>{u.points}</TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="ghost">Adjust</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card><CardContent className="grid place-items-center py-16 text-center">
            <Flag className="h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-medium">No open reports</p>
            <p className="text-sm text-muted-foreground">Reports flagged by the community will appear here.</p>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}