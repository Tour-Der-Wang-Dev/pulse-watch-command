
import { Home, Wifi, BarChart, Gauge, AlertTriangle, Clock, Settings } from "lucide-react";
import { NavLink } from "@/components/ui/nav-link";

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavigationMenuProps {
  items?: NavigationItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const defaultItems: NavigationItem[] = [
    { label: "Overview", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Devices", href: "/devices", icon: <Wifi className="h-5 w-5" /> },
    { label: "Traffic", href: "/traffic", icon: <BarChart className="h-5 w-5" /> },
    { label: "Performance", href: "/performance", icon: <Gauge className="h-5 w-5" /> },
    { label: "Incidents", href: "/incidents", icon: <AlertTriangle className="h-5 w-5" /> },
    { label: "History", href: "/history", icon: <Clock className="h-5 w-5" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const navigationItems = items || defaultItems;

  return (
    <nav className="space-y-1 py-2">
      {navigationItems.map((item) => (
        <NavLink 
          key={item.href} 
          href={item.href} 
          label={item.label} 
          icon={item.icon}
        />
      ))}
    </nav>
  );
}
