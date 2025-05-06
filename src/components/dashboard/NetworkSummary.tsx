
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NetworkStatus } from "@/types/network";
import { cn } from "@/lib/utils";

interface NetworkSummaryProps {
  status: NetworkStatus;
}

export function NetworkSummary({ status }: NetworkSummaryProps) {
  const getStatusColor = (status: 'healthy' | 'degraded' | 'critical') => {
    switch (status) {
      case 'healthy':
        return 'text-network-ok';
      case 'degraded':
        return 'text-network-warning';
      case 'critical':
        return 'text-network-critical';
      default:
        return '';
    }
  };
  
  const devicePercentage = Math.round((status.devicesOnline / status.devicesTotal) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Network Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Network Status</span>
            <span className={cn("font-medium", getStatusColor(status.overallStatus))}>
              {status.overallStatus.charAt(0).toUpperCase() + status.overallStatus.slice(1)}
            </span>
          </div>
          <Progress 
            value={status.overallStatus === 'healthy' ? 100 : status.overallStatus === 'degraded' ? 50 : 20} 
            className={cn(
              status.overallStatus === 'healthy' && "bg-network-ok/30",
              status.overallStatus === 'degraded' && "bg-network-warning/30",
              status.overallStatus === 'critical' && "bg-network-critical/30"
            )}
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Devices Online</span>
            <span className="font-medium">{status.devicesOnline} / {status.devicesTotal}</span>
          </div>
          <Progress 
            value={devicePercentage} 
            className={cn(
              devicePercentage > 80 && "bg-network-ok/30",
              devicePercentage <= 80 && devicePercentage > 50 && "bg-network-warning/30",
              devicePercentage <= 50 && "bg-network-critical/30"
            )}
          />
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Active Alerts</span>
            <span className={cn(
              "font-medium",
              status.alertsActive === 0 ? "text-network-ok" : 
              status.alertsActive < 3 ? "text-network-warning" : 
              "text-network-critical"
            )}>
              {status.alertsActive}
            </span>
          </div>
          <Progress 
            value={Math.max(0, 100 - (status.alertsActive * 20))}
            className={cn(
              status.alertsActive === 0 && "bg-network-ok/30",
              status.alertsActive > 0 && status.alertsActive < 3 && "bg-network-warning/30",
              status.alertsActive >= 3 && "bg-network-critical/30"
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
