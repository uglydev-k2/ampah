"use client";

import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { name: "Fulfillment", value: 94, fill: "#2563eb" },
  { name: "Rx Turnaround", value: 88, fill: "#059669" },
  { name: "Stock Health", value: 76, fill: "#f59e0b" },
  { name: "Customer Sat.", value: 92, fill: "#8b5cf6" },
];

export function PerformanceRings() {
  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="text-base">Performance Scorecard</CardTitle>
        <p className="text-xs text-gray-500">Operational health metrics</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div key={m.name} className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={90}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={8}
                  data={[{ ...m, max: 100 }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: "#e5e7eb" }} dataKey="value" cornerRadius={4} />
                </RadialBarChart>
              </ResponsiveContainer>
              <p className="text-lg font-bold" style={{ color: m.fill, marginTop: -28 }}>
                {m.value}%
              </p>
              <p className="text-[10px] font-medium text-gray-500">{m.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
