
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LatencyData } from "@/types/network";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Brush } from 'recharts';

interface LatencyChartProps {
  data: LatencyData[];
  title: string;
}

export function LatencyChart({ data, title }: LatencyChartProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full h-[400px]">
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Packet Loss (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle' } }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'value') return [`${value} ms`, 'Latency'];
                if (name === 'packetLoss') return [`${value} %`, 'Packet Loss'];
                return [value, name];
              }}
              labelFormatter={(label) => formatTime(label)}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '12px'
              }}
            />
            <Legend 
              payload={[
                { value: 'Latency', type: 'line', color: '#f97316' },
                { value: 'Packet Loss', type: 'line', color: '#ef4444' }
              ]}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="value" 
              name="Latency"
              stroke="#f97316" 
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="packetLoss" 
              name="Packet Loss"
              stroke="#ef4444" 
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Brush dataKey="timestamp" height={20} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
