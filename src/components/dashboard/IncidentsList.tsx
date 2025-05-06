
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident } from "@/types/network";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IncidentsListProps {
  incidents: Incident[];
  title: string;
}

export function IncidentsList({ incidents, title }: IncidentsListProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No incidents to report
            </div>
          ) : (
            incidents.map((incident) => (
              <div key={incident.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        incident.severity === 'low' && "bg-network-ok/10 text-network-ok border-network-ok/30",
                        incident.severity === 'medium' && "bg-network-warning/10 text-network-warning border-network-warning/30",
                        incident.severity === 'high' && "bg-network-critical/10 text-network-critical border-network-critical/30",
                        incident.severity === 'critical' && "bg-red-900/10 text-red-700 border-red-900/30 animate-pulse-orange"
                      )}
                    >
                      {incident.severity}
                    </Badge>
                    {incident.title}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(incident.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{incident.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <Badge variant={incident.status === 'active' ? "secondary" : "outline"}>
                    {incident.status}
                  </Badge>
                  {incident.resolvedAt && (
                    <span className="text-xs text-muted-foreground">
                      Resolved at {formatTime(incident.resolvedAt)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
