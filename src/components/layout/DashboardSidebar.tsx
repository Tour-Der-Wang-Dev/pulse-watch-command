
import { NavigationMenu } from "./NavigationMenu";

export function DashboardSidebar() {
  return (
    <aside className="w-16 md:w-64 border-r border-border shrink-0 bg-background">
      <div className="flex flex-col h-full p-2">
        <NavigationMenu />
      </div>
    </aside>
  );
}
