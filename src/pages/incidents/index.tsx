
import { useNetworkData } from "@/contexts/NetworkDataContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IncidentsList } from "@/components/dashboard/IncidentsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";

const IncidentsPage = () => {
  const { incidents, loading, refreshData } = useNetworkData();
  
  const activeIncidents = incidents.filter(incident => incident.status === 'active');
  const resolvedIncidents = incidents.filter(incident => incident.status === 'resolved');
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Incident Management</h1>
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
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">
              Active Incidents ({activeIncidents.length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({resolvedIncidents.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              All ({incidents.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <IncidentsList 
              incidents={activeIncidents} 
              title="Active Incidents" 
            />
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <IncidentsList 
              incidents={resolvedIncidents} 
              title="Resolved Incidents" 
            />
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            <IncidentsList 
              incidents={incidents} 
              title="All Incidents" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default IncidentsPage;
