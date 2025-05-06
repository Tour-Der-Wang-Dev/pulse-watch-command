
import { useNetworkData } from "@/contexts/NetworkDataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { NetworkSummary } from "@/components/dashboard/NetworkSummary";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { LatencyChart } from "@/components/dashboard/LatencyChart";
import { ProtocolDistribution } from "@/components/dashboard/ProtocolDistribution";
import { TopDevicesTable } from "@/components/dashboard/TopDevicesTable";
import { IncidentsList } from "@/components/dashboard/IncidentsList";
import { StatusStats } from "@/components/dashboard/StatusStats";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Dashboard = () => {
  const { 
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
  } = useNetworkData();
  
  const [chartTimeRange, setChartTimeRange] = useState<'1h' | '6h' | '24h'>('1h');
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Network Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportData('json')}>
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData('csv')}>
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="default" 
              size="sm" 
              onClick={refreshData} 
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
        
        <StatusStats
          bandwidth={statusStats.bandwidth || { total: 0, trend: 0 }}
          latency={statusStats.latency || { value: 0, trend: 0 }}
          devices={statusStats.devices || { count: 0, trend: 0 }}
          uptime={statusStats.uptime || { percentage: 0, trend: 0 }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TrafficChart 
              data={trafficData.slice(-12)} 
              title={`Network Traffic (Last ${chartTimeRange})`} 
            />
          </div>
          <div>
            <NetworkSummary status={networkStatus} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <LatencyChart 
              data={latencyData.slice(-12)} 
              title="Latency & Packet Loss" 
            />
          </div>
          <div>
            <ProtocolDistribution 
              data={protocolDistribution} 
              title="Protocol Distribution" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TopDevicesTable 
            devices={devices.slice(0, 5)} 
            title="Top Talkers (By Bandwidth)" 
          />
          <IncidentsList 
            incidents={incidents.filter(inc => inc.status === 'active')} 
            title="Active Incidents" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
