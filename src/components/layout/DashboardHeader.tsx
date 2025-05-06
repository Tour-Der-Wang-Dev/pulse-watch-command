
import { Bell, Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "/lovable-uploads/b21771a3-5c5b-4ff3-b0e0-23d00baa3b0f.png";

export function DashboardHeader() {
  return (
    <header className="border-b border-border px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Network Monitor" className="h-10 w-auto" />
          <h1 className="text-xl font-semibold hidden sm:block">
            Network<span className="text-primary">Monitor</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Export data">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
