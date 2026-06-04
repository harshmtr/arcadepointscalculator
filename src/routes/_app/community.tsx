import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageSquare, ArrowBigUp, Plus, Flame } from "lucide-react";
import { threads } from "@/data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/community")({
  head: () => ({ meta: [{ title: "Community — Arcade Mentor" }, { name: "description", content: "Discuss labs, share tips, and learn together." }] }),
  component: CommunityPage,
});

function CommunityPage() {
  const [q, setQ] = useState("");
  const filtered = threads.filter((t) => t.title.toLowerCase().includes(q.toLowerCase()));
  const trending = [...threads].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Community</h1>
          <p className="text-sm text-muted-foreground">Discussions, tips, and lab help from fellow learners.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Create Post</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Start a discussion</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Title</Label><Input placeholder="A clear, helpful title" /></div>
              <div><Label>Tags</Label><Input placeholder="Gemini, AI, Tips" /></div>
              <div><Label>Body</Label><Textarea rows={5} placeholder="Share what you're stuck on or what worked…" /></div>
            </div>
            <DialogFooter><Button onClick={() => toast.success("Post created (mock)")}>Publish</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search discussions…" className="pl-9" />
          </div>
          {filtered.length === 0 ? (
            <Card><CardContent className="grid place-items-center py-16 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
              <p className="mt-3 font-medium">No discussions yet</p>
              <p className="text-sm text-muted-foreground">Be the first to start one.</p>
            </CardContent></Card>
          ) : filtered.map((t) => (
            <Card key={t.id} className="transition hover:shadow-md">
              <CardContent className="flex gap-4 p-5">
                <Avatar><AvatarImage src={t.avatar} /><AvatarFallback>{t.author.slice(0,2)}</AvatarFallback></Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold leading-tight">{t.title}</h3>
                    <p className="text-xs text-muted-foreground">{t.author} • {t.createdAt}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.preview}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {t.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><ArrowBigUp className="h-4 w-4" />{t.upvotes}</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" />{t.replies}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Flame className="h-4 w-4 text-[color:var(--amber)]" />Trending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trending.map((t) => (
              <div key={t.id} className="space-y-1">
                <p className="text-sm font-medium leading-tight">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.upvotes} upvotes • {t.replies} replies</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}