
import { useNetworkData } from "@/contexts/NetworkDataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LatencyChart } from "@/components/dashboard/LatencyChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { NetworkDevice } from "@/types/network";
import { Helmet } from "react-helmet";
import { useIsMobile } from "@/hooks/use-mobile";

const PerformancePage = () => {
  const { latencyData, devices, loading, refreshData } = useNetworkData();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const selectedDeviceData = selectedDevice 
    ? devices.find(d => d.id === selectedDevice) 
    : null;
  
  // Determine performance score based on latency and packet loss
  const calculatePerformanceScore = (device: NetworkDevice) => {
    const latencyScore = Math.max(0, 100 - (device.latency * 2));
    const packetLossScore = Math.max(0, 100 - (device.packetLoss * 20));
    return Math.round((latencyScore + packetLossScore) / 2);
  };
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Network Performance Monitoring | Network Monitor</title>
        <meta name="description" content="Monitor network latency, packet loss, and overall performance metrics in real-time with detailed device-specific analytics." />
      </Helmet>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Network Performance</h1>
          <Button 
            variant="default" 
            size={isMobile ? "icon" : "sm"} 
            onClick={refreshData} 
            disabled={loading}
            aria-label="Refresh network performance data"
          >
            <RefreshCw className={`h-4 w-4 ${isMobile ? '' : 'mr-2'} ${loading ? 'animate-spin' : ''}`} />
            {!isMobile && "Refresh"}
          </Button>
        </div>
        
        <div className="mb-4">
          <Select
            value={selectedDevice || 'all-devices'}
            onValueChange={(value) => setSelectedDevice(value === 'all-devices' ? null : value)}
          >
            <SelectTrigger className="w-full md:w-[250px]" aria-label="Select a device to view performance">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-devices">All Devices</SelectItem>
              {devices.map((device) => (
                <SelectItem key={device.id} value={device.id}>{device.name} ({device.ipAddress})</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Avg. Latency</CardTitle>
              <CardDescription>Round-trip time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {selectedDeviceData ? 
                  `${selectedDeviceData.latency} ms` : 
                  `${Math.round(devices.reduce((acc, device) => acc + device.latency, 0) / devices.length)} ms`
                }
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Packet Loss</CardTitle>
              <CardDescription>Data transmission failures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {selectedDeviceData ? 
                  `${selectedDeviceData.packetLoss.toFixed(2)}%` : 
                  `${(devices.reduce((acc, device) => acc + device.packetLoss, 0) / devices.length).toFixed(2)}%`
                }
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Performance Score</CardTitle>
              <CardDescription>Overall network quality</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDeviceData ? (
                <>
                  <div className="text-2xl md:text-3xl font-bold">
                    {calculatePerformanceScore(selectedDeviceData)}/100
                  </div>
                  <Progress 
                    value={calculatePerformanceScore(selectedDeviceData)} 
                    className="mt-2"
                    aria-label={`Performance score: ${calculatePerformanceScore(selectedDeviceData)} out of 100`}
                  />
                </>
              ) : (
                <>
                  <div className="text-2xl md:text-3xl font-bold">
                    {Math.round(devices.reduce((acc, device) => acc + calculatePerformanceScore(device), 0) / devices.length)}/100
                  </div>
                  <Progress 
                    value={Math.round(devices.reduce((acc, device) => acc + calculatePerformanceScore(device), 0) / devices.length)} 
                    className="mt-2"
                    aria-label={`Average performance score: ${Math.round(devices.reduce((acc, device) => acc + calculatePerformanceScore(device), 0) / devices.length)} out of 100`}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <LatencyChart 
          data={latencyData} 
          title={`Latency & Packet Loss ${selectedDeviceData ? `- ${selectedDeviceData.name}` : '- All Devices'}`} 
        />
        
        {selectedDeviceData && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{selectedDeviceData.name} - Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">IP Address</p>
                  <p className="font-medium">{selectedDeviceData.ipAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">MAC Address</p>
                  <p className="font-medium">{selectedDeviceData.macAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="font-medium capitalize">{selectedDeviceData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Seen</p>
                  <p className="font-medium">
                    {new Date(selectedDeviceData.lastSeen).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Incoming Bandwidth</p>
                  <p className="font-medium">
                    {selectedDeviceData.bandwidth.incoming.toLocaleString()} bytes/s
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Outgoing Bandwidth</p>
                  <p className="font-medium">
                    {selectedDeviceData.bandwidth.outgoing.toLocaleString()} bytes/s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PerformancePage;
