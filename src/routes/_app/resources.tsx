import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, ExternalLink, BookOpen, Bookmark, Search, FileText } from "lucide-react";
import { badges } from "@/data/badges";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/resources")({
  head: () => ({ meta: [{ title: "Resource Hub — Arcade Mentor" }, { name: "description", content: "Tutorials, official labs, and notes for every Arcade badge." }] }),
  component: ResourceHub,
});

function ResourceHub() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [diff, setDiff] = useState("all");
  const categories = Array.from(new Set(badges.map((b) => b.category)));

  const items = useMemo(() => badges.filter((b) =>
    b.name.toLowerCase().includes(q.toLowerCase()) &&
    (cat === "all" || b.category === cat) &&
    (diff === "all" || b.difficulty === diff)
  ), [q, cat, diff]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Resource Hub</h1>
        <p className="text-sm text-muted-foreground">Everything you need to crush each badge — tutorials, labs, and notes.</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources…" className="pl-9" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="md:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={diff} onValueChange={setDiff}>
          <SelectTrigger className="md:w-48"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All difficulties</SelectItem>
            <SelectItem value="Introductory">Introductory</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {items.length === 0 ? (
        <Card><CardContent className="grid place-items-center py-16 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium">No resources match your filters</p>
          <p className="text-sm text-muted-foreground">Try clearing search or switching category.</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <Card key={b.id} className="overflow-hidden transition hover:shadow-md">
              <div className="relative aspect-video gradient-brand">
                <div className="absolute inset-0 grid place-items-center text-white/90">
                  <BookOpen className="h-10 w-10 opacity-70" />
                </div>
                <Badge className="absolute right-2 top-2 bg-background/90 text-foreground">{b.points} pts</Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-tight">{b.name}</h3>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px]">{b.difficulty}</Badge>
                  <span>•</span><span>{b.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{b.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild size="sm" variant="default"><a href={`https://www.youtube.com/watch?v=${b.youtubeId}`} target="_blank" rel="noreferrer"><PlayCircle className="mr-1 h-4 w-4" />Tutorial</a></Button>
                  <Button asChild size="sm" variant="outline"><a href={b.labUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 h-4 w-4" />Lab</a></Button>
                  <Button asChild size="sm" variant="outline"><a href={b.notesUrl}><FileText className="mr-1 h-4 w-4" />Notes</a></Button>
                  <Button size="sm" variant="ghost" onClick={() => toast.success(`Saved ${b.name}`)}><Bookmark className="mr-1 h-4 w-4" />Save</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}