
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NetworkDevice } from "@/types/network";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TopDevicesTableProps {
  devices: NetworkDevice[];
  title: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function TopDevicesTable({ devices, title }: TopDevicesTableProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Bandwidth</TableHead>
              <TableHead className="text-right">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>{device.ipAddress}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      device.status === 'online' && "bg-network-ok/10 text-network-ok border-network-ok/30",
                      device.status === 'warning' && "bg-network-warning/10 text-network-warning border-network-warning/30",
                      device.status === 'offline' && "bg-network-critical/10 text-network-critical border-network-critical/30"
                    )}
                  >
                    {device.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatBytes(device.bandwidth.incoming + device.bandwidth.outgoing)}
                </TableCell>
                <TableCell className="text-right">
                  {device.latency} ms
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
