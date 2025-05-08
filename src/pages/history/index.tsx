
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HistoryPage() {
  return (
    <>
      <Helmet>
        <title>History | Network Monitor</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Network History</h1>
            <p className="text-muted-foreground">
              View and analyze historical network data and events.
            </p>
          </div>
          
          <Tabs defaultValue="events">
            <TabsList>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="events" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Event History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Historical network events will be displayed here when data is available.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="traffic" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Historical traffic data will be displayed here when data is available.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Historical performance data will be displayed here when data is available.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
}
