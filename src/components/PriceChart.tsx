import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartData {
  title: string;
  data: Array<{
    month: string;
    price: number;
  }>;
  currency: string;
  source: string;
}

interface PriceChartProps {
  data: ChartData;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-sm font-medium text-foreground">{data.title}</h3>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `${data.currency}${(value / 1000).toFixed(0)}k`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="mt-3 text-xs text-muted-foreground">Source: {data.source}</p>
    </div>
  );
};