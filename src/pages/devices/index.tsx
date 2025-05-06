
import { useNetworkData } from "@/contexts/NetworkDataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TopDevicesTable } from "@/components/dashboard/TopDevicesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";

const DevicesPage = () => {
  const { devices, loading, refreshData } = useNetworkData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "bandwidth" | "latency" | "status">("bandwidth");
  
  // Filter devices based on search term
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ipAddress.includes(searchTerm)
  );
  
  // Sort devices based on selected sort option
  const sortedDevices = [...filteredDevices].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "bandwidth":
        return (b.bandwidth.incoming + b.bandwidth.outgoing) - (a.bandwidth.incoming + a.bandwidth.outgoing);
      case "latency":
        return a.latency - b.latency;
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Network Devices</h1>
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
        
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("bandwidth")}>
                Bandwidth (Highest)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("latency")}>
                Latency (Lowest)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("status")}>
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <TopDevicesTable 
          devices={sortedDevices} 
          title={`All Devices (${filteredDevices.length})`} 
        />
      </div>
    </DashboardLayout>
  );
};

export default DevicesPage;
