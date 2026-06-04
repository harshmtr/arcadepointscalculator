import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, CheckCircle2, XCircle, ExternalLink, Sparkles } from "lucide-react";
import { badges } from "@/data/badges";
import { mockUser, categoryBreakdown } from "@/data/mock";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/calculator")({
  head: () => ({ meta: [{ title: "Point Calculator — Arcade Mentor" }, { name: "description", content: "Analyze your Google Skills profile and project Arcade rewards." }] }),
  component: CalculatorPage,
});

const COLORS = ["var(--color-chart-1)","var(--color-chart-2)","var(--color-chart-3)","var(--color-chart-4)","var(--color-chart-5)","var(--color-muted-foreground)"];

function CalculatorPage() {
  const [url, setUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [diffFilter, setDiffFilter] = useState<string>("all");

  const filtered = useMemo(() => badges.filter((b) =>
    (statusFilter === "all" || b.status === statusFilter) &&
    (diffFilter === "all" || b.difficulty === diffFilter)
  ), [statusFilter, diffFilter]);

  const analyze = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAnalyzed(true); toast.success("Profile analyzed"); }, 900);
  };

  const completionPct = Math.round((mockUser.completedBadges / (mockUser.completedBadges + mockUser.missingBadges)) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Point Calculator</h1>
        <p className="text-sm text-muted-foreground">Paste your Google Skills profile URL or enter badges manually.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 md:flex-row">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.cloudskillsboost.google/public_profiles/…" className="flex-1" />
            <Button onClick={analyze} disabled={loading} className="md:w-44">
              <Sparkles className="mr-2 h-4 w-4" />{loading ? "Analyzing…" : "Analyze Profile"}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Demo: no real scraping — uses mock data.</p>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <StatBlock label="Current Points" value={mockUser.points} />
            <StatBlock label="Estimated Rank" value={`#${mockUser.rank}`} />
            <StatBlock label="Completed" value={mockUser.completedBadges} />
            <StatBlock label="Missing" value={mockUser.missingBadges} />
            <StatBlock label="Progress" value={`${completionPct}%`} />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reward Eligibility</CardTitle>
              <Badge className="gap-1"><Zap className="h-3 w-3" />Tier 1 unlocked</Badge>
            </CardHeader>
            <CardContent>
              <Progress value={(mockUser.points / 60) * 100} className="h-2" />
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <span>Tier 1: 10 pts ✓</span><span>Tier 2: 30 pts ✓</span><span>Tier 3: 60 pts — {60 - mockUser.points} to go</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Category breakdown</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                      {categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Points by difficulty</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Introductory", pts: 8 }, { name: "Intermediate", pts: 22 }, { name: "Advanced", pts: 9 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Bar dataKey="pts" fill="var(--color-chart-1)" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Badge analysis</CardTitle>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Missing">Missing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={diffFilter} onValueChange={setDiffFilter}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All difficulties</SelectItem>
                  <SelectItem value="Introductory">Introductory</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Badge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Resource</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>
                      {b.status === "Completed"
                        ? <span className="inline-flex items-center gap-1 text-[color:var(--success)]"><CheckCircle2 className="h-4 w-4" />Completed</span>
                        : <span className="inline-flex items-center gap-1 text-muted-foreground"><XCircle className="h-4 w-4" />Missing</span>}
                    </TableCell>
                    <TableCell>{b.points}</TableCell>
                    <TableCell><Badge variant="secondary">{b.difficulty}</Badge></TableCell>
                    <TableCell>{b.duration}</TableCell>
                    <TableCell><a href={b.labUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">Lab <ExternalLink className="h-3 w-3" /></a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <Card><CardContent className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </CardContent></Card>
  );
}