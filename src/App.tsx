
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NetworkDataProvider } from "@/contexts/NetworkDataContext";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import DevicesPage from "./pages/devices";
import IncidentsPage from "./pages/incidents";
import TrafficPage from "./pages/traffic";
import PerformancePage from "./pages/performance";
import NotFound from "./pages/NotFound";
import IntegrationPlan from "./pages/integration-plan";
import HistoryPage from "./pages/history";
import SettingsPage from "./pages/settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <NetworkDataProvider>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="/incidents" element={<IncidentsPage />} />
                <Route path="/traffic" element={<TrafficPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/integration-plan" element={<IntegrationPlan />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </NetworkDataProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
