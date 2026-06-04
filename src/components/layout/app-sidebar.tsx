import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Calculator, BookOpen, Sparkles, Trophy, MessagesSquare,
  Users, Award, User, Settings, Shield, Zap,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Point Calculator", url: "/calculator", icon: Calculator },
  { title: "Resource Hub", url: "/resources", icon: BookOpen },
  { title: "Recommendations", url: "/recommendations", icon: Sparkles },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];
const communityItems = [
  { title: "Community", url: "/community", icon: MessagesSquare },
  { title: "Study Groups", url: "/groups", icon: Users },
  { title: "Achievements", url: "/achievements", icon: Award },
];
const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Admin", url: "/admin", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => currentPath === p || currentPath.startsWith(p + "/");

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                <Link to={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-1">
          <div className="grid h-8 w-8 place-items-center rounded-lg gradient-brand text-white shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">Arcade Mentor</span>
              <span className="text-[10px] text-muted-foreground">Learn. Build. Earn.</span>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Learn", mainItems)}
        {renderGroup("Community", communityItems)}
        {renderGroup("Account", accountItems)}
      </SidebarContent>
      <SidebarFooter>
        {!collapsed && (
          <div className="rounded-lg border bg-card p-3 text-xs">
            <p className="font-medium">Next reward in 6 pts</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full gradient-brand" style={{ width: "86%" }} />
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}