
import { useNetworkData } from "@/contexts/NetworkDataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { ProtocolDistribution } from "@/components/dashboard/ProtocolDistribution";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";

const TrafficPage = () => {
  const { trafficData, protocolDistribution, loading, refreshData } = useNetworkData();
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "24h">("6h");
  
  // Simulate different time ranges by slicing the data
  const getDataForTimeRange = () => {
    switch (timeRange) {
      case "1h":
        return trafficData.slice(-12); // Last 12 data points (1 hour)
      case "6h":
        return trafficData.slice(-18); // Last 18 data points (6 hours simulated)
      case "24h":
        return trafficData; // All data (24 hours simulated)
      default:
        return trafficData;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Network Traffic</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
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
        
        <Tabs 
          defaultValue="bandwidth" 
          className="mb-4"
        >
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant={timeRange === "1h" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("1h")}
              >
                1h
              </Button>
              <Button 
                variant={timeRange === "6h" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("6h")}
              >
                6h
              </Button>
              <Button 
                variant={timeRange === "24h" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeRange("24h")}
              >
                24h
              </Button>
            </div>
          </div>
          
          <TabsContent value="bandwidth" className="mt-4">
            <TrafficChart 
              data={getDataForTimeRange()} 
              title={`Network Bandwidth (Last ${timeRange})`} 
            />
          </TabsContent>
          
          <TabsContent value="protocols" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProtocolDistribution 
                data={protocolDistribution} 
                title="Protocol Distribution" 
              />
              
              <div className="card p-6 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Protocol Details</h3>
                <div className="space-y-4">
                  {protocolDistribution.map((protocol) => (
                    <div key={protocol.protocol} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: protocol.color }}
                        ></div>
                        <span>{protocol.protocol}</span>
                      </div>
                      <span className="font-medium">
                        {(protocol.percentage * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TrafficPage;
