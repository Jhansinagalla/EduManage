import { useLogout, useMenu, useNavigation, useGetIdentity } from "@refinedev/core";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  UserCircle,
  LogOut,
  School
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Map resource names to icons
const ICONS: Record<string, any> = {
  dashboard: LayoutDashboard,
  students: Users,
  teachers: GraduationCap,
  classes: BookOpen,
  attendance: CalendarCheck,
  profile: UserCircle,
  results: GraduationCap,
};

export function Sidebar() {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();
  const { data: user } = useGetIdentity<{ name: string; role: string; avatar: string }>();
  const [location] = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-border sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
          <School className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-none">EduManage</h1>
          <p className="text-xs text-muted-foreground mt-1">School Portal</p>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="p-4 rounded-xl bg-accent/50 border border-border/50 flex items-center gap-3 mb-6">
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize truncate">{user?.role}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = ICONS[item.name.toLowerCase()] || LayoutDashboard;
            const isActive = selectedKey === item.key || location === item.route;
            
            return (
              <Link 
                key={item.key} 
                to={item.route ?? "/"} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
