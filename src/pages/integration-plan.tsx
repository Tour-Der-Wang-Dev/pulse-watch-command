
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define phases and their details
const phases = [
  {
    name: "Phase 1: Network Infrastructure",
    timeline: "Weeks 1-4",
    tasks: [
      "Network infrastructure setup",
      "SNMP v2c/v3 configuration",
      "NetFlow v5/v9 collection setup",
      "Syslog receiver configuration",
      "Core monitoring system deployment"
    ],
    resources: ["2 Network Engineers", "1 System Architect"],
    deliverables: ["Network topology documentation", "Device inventory", "Connectivity test results"]
  },
  {
    name: "Phase 2: Core Systems",
    timeline: "Weeks 5-8",
    tasks: [
      "OAuth 2.0 implementation",
      "Role-based access control setup",
      "Time-series database deployment",
      "Document store configuration",
      "Data retention policy implementation"
    ],
    resources: ["2 Backend Developers", "1 Database Administrator"],
    deliverables: ["Authentication system documentation", "Database schema", "Data flow diagrams"]
  },
  {
    name: "Phase 3: Alerts & Integrations",
    timeline: "Weeks 9-12",
    tasks: [
      "Alert system development",
      "ServiceNow integration setup",
      "JIRA connector development",
      "Email/SMS notification system",
      "Slack & Teams webhook configuration"
    ],
    resources: ["2 Integration Specialists", "1 QA Engineer"],
    deliverables: ["Integration documentation", "Alert templates", "Test cases and results"]
  },
  {
    name: "Phase 4: Deployment",
    timeline: "Weeks 13-16",
    tasks: [
      "Load testing and optimization",
      "Security audit",
      "User acceptance testing",
      "Production deployment",
      "Staff training"
    ],
    resources: ["1 DevOps Engineer", "1 Security Specialist"],
    deliverables: ["Performance metrics", "Security report", "Training materials", "Maintenance guide"]
  }
];

// Section components
const RequirementSection = ({ title, items }: { title: string, items: string[] }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PhaseCard = ({ phase, index }: { phase: any, index: number }) => (
  <Card className="mb-4">
    <CardHeader className="bg-muted/40 pb-2">
      <CardTitle className="text-base font-medium flex items-center justify-between">
        {phase.name}
        <Badge variant="outline">{phase.timeline}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-1">Tasks:</h4>
          <ul className="text-sm space-y-1">
            {phase.tasks.map((task: string, i: number) => (
              <li key={i} className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">
                  {i+1}
                </div>
                {task}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Resources:</h4>
          <div className="flex flex-wrap gap-2">
            {phase.resources.map((resource: string, i: number) => (
              <Badge key={i} variant="secondary">{resource}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Deliverables:</h4>
          <ul className="text-sm space-y-1">
            {phase.deliverables.map((deliverable: string, i: number) => (
              <li key={i} className="flex items-start">
                <FileText className="h-3.5 w-3.5 text-muted-foreground mr-2 mt-0.5" />
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

const IntegrationPlan = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleDownload = () => {
    toast({
      title: "Document ready for download",
      description: "Integration Plan PDF is being prepared for download.",
    });
  };

  const networkRequirements = [
    "SNMP v2c/v3 for device status and metrics collection",
    "NetFlow v5/v9 for traffic analysis and bandwidth monitoring",
    "Syslog (TCP/UDP 514) for system logs and event capture",
    "WebSocket connections with 100ms maximum latency threshold",
    "Minimum bandwidth of 10 Mbps per 100 devices monitored",
    "Automatic reconnection handling with exponential backoff",
    "Designated port assignments and firewall rule configurations",
    "Bandwidth allocation optimized per protocol"
  ];

  const systemRequirements = [
    "OAuth 2.0 authentication with secure token management",
    "Role-based access control with 5 distinct permission levels",
    "Multi-factor authentication for administrative access",
    "Secure session management with token expiration",
    "Support for 10,000 concurrent device connections",
    "Horizontal scaling with containerized microservices",
    "Load balancing with health checks and failover capability",
    "Time-series database for performance metrics (30 days active storage)",
    "Document store for configuration and relationship mapping",
    "Archive storage with 1-year retention policy"
  ];

  const integrationRequirements = [
    "ServiceNow incident creation with bi-directional updates",
    "JIRA ticket management with custom field mapping",
    "SMS gateway integration for urgent notifications",
    "SMTP configuration for detailed email alerts",
    "Slack & Microsoft Teams webhook integrations",
    "RESTful API endpoints with comprehensive documentation",
    "Authentication tokens with scope-based permissions",
    "Rate limiting to prevent API abuse",
    "Customizable alert templates with variable substitution"
  ];

  const successCriteria = [
    "99.9% system uptime measured over 30-day periods",
    "Alert notification delivered within 30 seconds of trigger condition",
    "100% compliance with data retention policies",
    "All external service integrations verified and functional",
    "User acceptance testing completed with stakeholder approval",
    "Security audit with no critical or high-severity findings",
    "Performance testing showing successful load handling"
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>Network Monitoring System Integration Plan</title>
      </Helmet>
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Network Monitoring System Integration Plan</h1>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Export as PDF
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">
        This document outlines the comprehensive plan for implementing a scalable network monitoring system 
        with detailed requirements, timeline, resource allocation, and success criteria.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Technical Requirements</TabsTrigger>
          <TabsTrigger value="timeline">Timeline & Resources</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables & Success Criteria</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The Network Monitoring System Integration project aims to implement a comprehensive 
                monitoring solution capable of tracking network performance, device health, and system 
                events in real-time. The system will integrate with existing IT service management tools 
                and provide alerts through multiple notification channels.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Key Objectives</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Implement real-time monitoring of network devices and services
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Develop scalable architecture supporting 10,000+ devices
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Create comprehensive alerting with multiple notification methods
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Establish secure access with role-based permissions
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Integrate with existing service management platforms
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Project Scope</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Network connectivity and monitoring protocols
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Core system development (auth, storage, alerts)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      External service integrations
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Implementation and testing
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      Documentation and training
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Project Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">16 Weeks</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Four phases of implementation with defined milestones
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Team Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8 Specialists</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Engineers, developers, and domain experts
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Key Performance Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">99.9%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  System uptime with rapid alert notification
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">1. Network Connectivity Requirements</h3>
                <RequirementSection title="Monitoring Protocols" items={networkRequirements.slice(0, 3)} />
                <RequirementSection title="Connection Parameters" items={networkRequirements.slice(3, 6)} />
                <RequirementSection title="Network Configuration" items={networkRequirements.slice(6, 8)} />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">2. Core System Requirements</h3>
                <RequirementSection title="Authentication & Access Control" items={systemRequirements.slice(0, 4)} />
                <RequirementSection title="Scalability & Performance" items={systemRequirements.slice(4, 7)} />
                <RequirementSection title="Data Management" items={systemRequirements.slice(7, 10)} />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">3. Integration Requirements</h3>
                <RequirementSection title="Service Management Platforms" items={integrationRequirements.slice(0, 2)} />
                <RequirementSection title="Notification Channels" items={integrationRequirements.slice(2, 5)} />
                <RequirementSection title="API Capabilities" items={integrationRequirements.slice(5, 9)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline">
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <PhaseCard key={index} phase={phase} index={index} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="deliverables">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Documentation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Technical specification document</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Network topology diagrams</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>System architecture documentation</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>API documentation with examples</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Security implementation details</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Operational Assets</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Training materials for administrators</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>End-user documentation</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Deployment checklist</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Maintenance and backup procedures</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                      <span>Troubleshooting guides</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Project Reports</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-sm mb-2">Weekly Status Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Progress updates, issues, and upcoming tasks
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-sm mb-2">Test Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Performance metrics and test outcomes
                    </p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium text-sm mb-2">Security Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Findings and remediation measures
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Success Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {successCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center p-3 rounded-md bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <p>{criterion}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 border border-dashed rounded-md">
                <h3 className="font-medium mb-2">Approval Request</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please review this integration plan and provide approval to proceed with implementation.
                </p>
                <div className="flex justify-end">
                  <Button>Request Approval</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default IntegrationPlan;
