
import { Activity, ArrowDown, ArrowUp, Clock, Wifi } from "lucide-react";
import { StatusCard } from "./StatusCard";

interface StatusStatsProps {
  bandwidth: {
    total: number;
    trend: number;
  };
  latency: {
    value: number;
    trend: number;
  };
  devices: {
    count: number;
    trend: number;
  };
  uptime: {
    percentage: number;
    trend: number;
  };
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function StatusStats({ bandwidth, latency, devices, uptime }: StatusStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        title="Total Bandwidth"
        value={formatBytes(bandwidth.total) + "/s"}
        icon={<Activity className="h-5 w-5" />}
        trend={{
          value: bandwidth.trend,
          positive: bandwidth.trend > 0
        }}
      />
      <StatusCard
        title="Average Latency"
        value={`${latency.value} ms`}
        icon={<Clock className="h-5 w-5" />}
        trend={{
          value: latency.trend,
          positive: latency.trend < 0
        }}
      />
      <StatusCard
        title="Active Devices"
        value={devices.count}
        icon={<Wifi className="h-5 w-5" />}
        trend={{
          value: devices.trend,
          positive: devices.trend > 0
        }}
      />
      <StatusCard
        title="Uptime"
        value={`${uptime.percentage}%`}
        icon={uptime.trend >= 0 ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
        trend={{
          value: Math.abs(uptime.trend),
          positive: uptime.trend >= 0
        }}
      />
    </div>
  );
}
