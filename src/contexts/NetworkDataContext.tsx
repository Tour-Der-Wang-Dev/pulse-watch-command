
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  NetworkDevice, 
  TrafficData, 
  LatencyData, 
  ProtocolDistribution, 
  Incident, 
  NetworkStatus 
} from "@/types/network";
import { 
  generateTrafficData, 
  generateLatencyData, 
  generateProtocolDistribution, 
  generateNetworkDevices, 
  generateIncidents, 
  generateNetworkStatus,
  generateStatusStats
} from "@/services/mockNetworkData";
import { useToast } from "@/components/ui/use-toast";

interface NetworkDataContextType {
  trafficData: TrafficData[];
  latencyData: LatencyData[];
  protocolDistribution: ProtocolDistribution[];
  devices: NetworkDevice[];
  incidents: Incident[];
  networkStatus: NetworkStatus;
  statusStats: any;
  loading: boolean;
  lastUpdated: Date;
  refreshData: () => void;
  exportData: (type: 'csv' | 'json') => void;
}

const NetworkDataContext = createContext<NetworkDataContextType | undefined>(undefined);

export function NetworkDataProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);
  const [protocolDistribution, setProtocolDistribution] = useState<ProtocolDistribution[]>([]);
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    devicesOnline: 0,
    devicesTotal: 0,
    alertsActive: 0,
    overallStatus: 'healthy'
  });
  const [statusStats, setStatusStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Function to refresh data
  const refreshData = () => {
    try {
      setLoading(true);
      
      // Simulate API calls
      const newTrafficData = generateTrafficData();
      const newLatencyData = generateLatencyData();
      const newProtocolDistribution = generateProtocolDistribution();
      const newDevices = generateNetworkDevices();
      const newIncidents = generateIncidents();
      const newNetworkStatus = generateNetworkStatus();
      const newStatusStats = generateStatusStats();
      
      // Update state with new data
      setTrafficData(newTrafficData);
      setLatencyData(newLatencyData);
      setProtocolDistribution(newProtocolDistribution);
      setDevices(newDevices);
      setIncidents(newIncidents);
      setNetworkStatus(newNetworkStatus);
      setStatusStats(newStatusStats);
      setLastUpdated(new Date());
      
      setLoading(false);
      
      // Show toast notification
      toast({
        title: "Data refreshed",
        description: `Successfully updated network data at ${new Date().toLocaleTimeString()}`,
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
      setLoading(false);
      
      // Show error toast
      toast({
        title: "Refresh failed",
        description: "Could not update network data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Export data as CSV or JSON
  const exportData = (type: 'csv' | 'json') => {
    try {
      const data = {
        trafficData,
        latencyData,
        protocolDistribution,
        devices,
        incidents,
        networkStatus,
        exportedAt: new Date().toISOString()
      };
      
      let content: string;
      let filename: string;
      let mimeType: string;
      
      if (type === 'json') {
        content = JSON.stringify(data, null, 2);
        filename = `network-data-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
        mimeType = 'application/json';
      } else {
        // Simple CSV conversion for demonstration
        content = "Export type CSV is not fully implemented in this demo";
        filename = `network-data-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
        mimeType = 'text/csv';
      }
      
      // Create a download link
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: `Data exported as ${type.toUpperCase()}`,
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      
      toast({
        title: "Export failed",
        description: "Could not export network data. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Initial data load
  useEffect(() => {
    refreshData();
    
    // Set up 30-second refresh interval
    const interval = setInterval(() => {
      refreshData();
    }, 30000); // 30 seconds
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <NetworkDataContext.Provider value={{
      trafficData,
      latencyData,
      protocolDistribution,
      devices,
      incidents,
      networkStatus,
      statusStats,
      loading,
      lastUpdated,
      refreshData,
      exportData
    }}>
      {children}
    </NetworkDataContext.Provider>
  );
}

export function useNetworkData() {
  const context = useContext(NetworkDataContext);
  if (context === undefined) {
    throw new Error("useNetworkData must be used within a NetworkDataProvider");
  }
  return context;
}
