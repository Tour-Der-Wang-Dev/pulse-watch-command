
import { NetworkDevice, TrafficData, LatencyData, ProtocolDistribution, Incident, NetworkStatus } from "@/types/network";

// Generate random traffic data
export const generateTrafficData = (count: number = 24): TrafficData[] => {
  const data: TrafficData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (count - i) * 300000); // 5 min intervals
    data.push({
      timestamp: timestamp.toISOString(),
      incoming: Math.floor(Math.random() * 100000000) + 5000000, // 5-105 MB
      outgoing: Math.floor(Math.random() * 50000000) + 1000000, // 1-51 MB
    });
  }
  
  return data;
};

// Generate random latency data
export const generateLatencyData = (count: number = 24): LatencyData[] => {
  const data: LatencyData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (count - i) * 300000); // 5 min intervals
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.floor(Math.random() * 50) + 5, // 5-55 ms
      packetLoss: Math.random() * 5, // 0-5%
    });
  }
  
  return data;
};

// Generate protocol distribution data
export const generateProtocolDistribution = (): ProtocolDistribution[] => {
  return [
    { protocol: "HTTP/HTTPS", percentage: 0.45, color: "#f97316" },
    { protocol: "SSH/SFTP", percentage: 0.20, color: "#3b82f6" },
    { protocol: "SMTP", percentage: 0.15, color: "#a855f7" },
    { protocol: "DNS", percentage: 0.10, color: "#10b981" },
    { protocol: "FTP", percentage: 0.07, color: "#f43f5e" },
    { protocol: "Other", percentage: 0.03, color: "#64748b" },
  ];
};

// Generate mock network devices
export const generateNetworkDevices = (count: number = 10): NetworkDevice[] => {
  const statusOptions: ('online' | 'offline' | 'warning')[] = ['online', 'warning', 'offline'];
  const devices: NetworkDevice[] = [];
  
  for (let i = 0; i < count; i++) {
    const status = statusOptions[Math.floor(Math.random() * (i === 0 ? 2 : 3))]; // Make sure first one is not offline
    
    devices.push({
      id: `device-${i+1}`,
      name: `Device ${i+1}`,
      ipAddress: `192.168.1.${10 + i}`,
      macAddress: `00:1A:2B:${i < 10 ? '0' + i : i}:${i*2 < 10 ? '0' + i*2 : i*2}:${i*3 < 10 ? '0' + i*3 : i*3}`,
      status: status,
      lastSeen: new Date(Date.now() - (Math.random() * 3600000)).toISOString(), // Up to 1 hour ago
      bandwidth: {
        incoming: Math.floor(Math.random() * 5000000) + 100000, // 100KB - 5MB
        outgoing: Math.floor(Math.random() * 2000000) + 50000, // 50KB - 2MB
      },
      latency: Math.floor(Math.random() * 50) + 5, // 5-55 ms
      packetLoss: Math.random() * 5, // 0-5%
    });
  }
  
  // Sort by bandwidth usage (descending)
  return devices.sort((a, b) => 
    (b.bandwidth.incoming + b.bandwidth.outgoing) - (a.bandwidth.incoming + a.bandwidth.outgoing)
  );
};

// Generate incidents
export const generateIncidents = (count: number = 5): Incident[] => {
  const severityOptions: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
  const incidents: Incident[] = [];
  
  for (let i = 0; i < count; i++) {
    const severity = severityOptions[Math.floor(Math.random() * 4)];
    const timestamp = new Date(Date.now() - (Math.random() * 86400000)).toISOString(); // Up to 24 hours ago
    const isResolved = Math.random() > 0.6; // 40% chance to be resolved
    
    incidents.push({
      id: `incident-${i+1}`,
      timestamp: timestamp,
      title: getIncidentTitle(severity),
      description: getIncidentDescription(severity),
      severity: severity,
      status: isResolved ? 'resolved' : 'active',
      deviceId: `device-${Math.floor(Math.random() * 10) + 1}`,
      ...(isResolved ? { resolvedAt: new Date(new Date(timestamp).getTime() + Math.random() * 3600000).toISOString() } : {})
    });
  }
  
  // Sort by timestamp (newest first)
  return incidents.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Generate network status summary
export const generateNetworkStatus = (): NetworkStatus => {
  const devicesTotal = 15;
  const devicesOnline = Math.floor(Math.random() * 5) + 10; // 10-15 online
  const alertsActive = Math.floor(Math.random() * 5); // 0-4 alerts
  
  let overallStatus: 'healthy' | 'degraded' | 'critical';
  
  if (devicesOnline === devicesTotal && alertsActive === 0) {
    overallStatus = 'healthy';
  } else if (devicesOnline >= devicesTotal * 0.8 || alertsActive <= 2) {
    overallStatus = 'degraded';
  } else {
    overallStatus = 'critical';
  }
  
  return {
    devicesOnline,
    devicesTotal,
    alertsActive,
    overallStatus
  };
};

// Helper functions for incident generation
function getIncidentTitle(severity: 'low' | 'medium' | 'high' | 'critical'): string {
  const titles = {
    low: [
      "Minor bandwidth fluctuation detected",
      "Intermittent latency increase",
      "Non-critical service slowdown"
    ],
    medium: [
      "Elevated packet loss on network segment",
      "Bandwidth threshold exceeded",
      "Multiple connection timeouts detected"
    ],
    high: [
      "Network congestion affecting critical services",
      "Significant latency increase detected",
      "Router performance degradation"
    ],
    critical: [
      "Network outage detected",
      "Critical service unavailable",
      "Security breach detected"
    ]
  };
  
  const options = titles[severity];
  return options[Math.floor(Math.random() * options.length)];
}

function getIncidentDescription(severity: 'low' | 'medium' | 'high' | 'critical'): string {
  const descriptions = {
    low: [
      "Minor increase in latency observed, monitoring situation",
      "Temporary bandwidth reduction, likely due to scheduled backup",
      "Some users reporting slightly reduced performance"
    ],
    medium: [
      "Packet loss rate increased to 2.5%, investigating cause",
      "Bandwidth utilization at 75% of capacity for over 15 minutes",
      "Database response time increased by 40%"
    ],
    high: [
      "Multiple critical services experiencing slowdowns",
      "Latency increased to over 200ms on primary links",
      "Redundancy systems activated due to primary system performance"
    ],
    critical: [
      "Complete loss of connectivity detected on primary network segment",
      "Security system detected potential intrusion attempt",
      "Critical infrastructure service down, emergency response initiated"
    ]
  };
  
  const options = descriptions[severity];
  return options[Math.floor(Math.random() * options.length)];
}

// Generate status statistics
export const generateStatusStats = () => {
  return {
    bandwidth: {
      total: Math.floor(Math.random() * 500000000) + 100000000, // 100MB-600MB
      trend: Math.floor(Math.random() * 20) - 5, // -5% to +15%
    },
    latency: {
      value: Math.floor(Math.random() * 25) + 10, // 10-35ms
      trend: Math.floor(Math.random() * 10) - 5, // -5% to +5%
    },
    devices: {
      count: Math.floor(Math.random() * 10) + 20, // 20-30 devices
      trend: Math.floor(Math.random() * 6) - 2, // -2% to +4%
    },
    uptime: {
      percentage: Math.floor(Math.random() * 3) + 97, // 97-100%
      trend: Math.floor(Math.random() * 2) - 0.5, // -0.5% to +1.5%
    }
  };
};
