import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Arcade Mentor" }, { name: "description", content: "Configure your Arcade Mentor preferences." }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your appearance, notifications, and privacy.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Dark mode" hint="Toggle between light and dark theme">
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </Row>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Weekly progress digest" hint="A summary of your activity, every Sunday"><Switch defaultChecked /></Row>
          <Row label="New recommendation alerts"><Switch defaultChecked /></Row>
          <Row label="Community replies"><Switch /></Row>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Privacy</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Public profile" hint="Allow others to view your progress"><Switch defaultChecked /></Row>
          <Row label="Show on leaderboard"><Switch defaultChecked /></Row>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Account</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Display name</Label><Input defaultValue="Alex Patel" /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="alex@arcadementor.dev" /></div>
          <Button onClick={() => toast.success("Preferences saved")}>Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div><p className="text-sm font-medium">{label}</p>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</div>
      {children}
    </div>
  );
}