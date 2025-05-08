
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export function NavLink({ href, label, icon }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}
