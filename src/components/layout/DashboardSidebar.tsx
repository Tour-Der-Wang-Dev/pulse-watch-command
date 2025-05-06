
import { Activity, BarChart, Clock, Gauge, Home, Settings, Wifi } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", href: "/" },
  { icon: Wifi, label: "Devices", href: "/devices" },
  { icon: BarChart, label: "Traffic", href: "/traffic" },
  { icon: Gauge, label: "Performance", href: "/performance" },
  { icon: Activity, label: "Incidents", href: "/incidents" },
  { icon: Clock, label: "History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function DashboardSidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-16 md:w-64 border-r border-border shrink-0 bg-background">
      <nav className="flex flex-col h-full p-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-secondary",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
