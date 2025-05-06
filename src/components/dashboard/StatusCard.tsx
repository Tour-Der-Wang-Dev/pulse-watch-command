
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatusCard({ title, value, icon, className, trend }: StatusCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-primary">{icon}</div>
        </div>
        {trend && (
          <div className="mt-2 text-xs">
            <span className={cn(
              "inline-flex items-center",
              trend.positive ? "text-network-ok" : "text-network-critical"
            )}>
              <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
              {trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">vs last hour</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
