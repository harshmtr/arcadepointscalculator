import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label, value, icon: Icon, hint, accent = "brand",
}: {
  label: string; value: string | number; icon: LucideIcon; hint?: string;
  accent?: "brand" | "amber" | "success" | "muted";
}) {
  const accentMap = {
    brand: "bg-primary/10 text-primary",
    amber: "bg-[color:var(--amber)]/15 text-[color:var(--amber)]",
    success: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
    muted: "bg-muted text-muted-foreground",
  } as const;
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("grid h-10 w-10 place-items-center rounded-lg", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}