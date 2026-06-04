import { Bell, Search, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { mockUser } from "@/data/mock";

export function TopNavbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur md:px-6">
      <SidebarTrigger />
      <div className="relative ml-2 hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search badges, labs, threads…" className="pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]">3</Badge>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
          <AvatarFallback>{mockUser.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}