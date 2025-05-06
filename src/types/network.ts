
export interface NetworkDevice {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  bandwidth: {
    incoming: number;
    outgoing: number;
  };
  latency: number;
  packetLoss: number;
}

export interface TrafficData {
  timestamp: string;
  incoming: number;
  outgoing: number;
}

export interface LatencyData {
  timestamp: string;
  value: number;
  packetLoss: number;
}

export interface ProtocolDistribution {
  protocol: string;
  percentage: number;
  color: string;
}

export interface Incident {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
  deviceId?: string;
  resolvedAt?: string;
}

export interface ThresholdConfig {
  bandwidth: {
    warning: number;
    critical: number;
  };
  latency: {
    warning: number;
    critical: number;
  };
  packetLoss: {
    warning: number;
    critical: number;
  };
}

export interface NetworkStatus {
  devicesOnline: number;
  devicesTotal: number;
  alertsActive: number;
  overallStatus: 'healthy' | 'degraded' | 'critical';
}
