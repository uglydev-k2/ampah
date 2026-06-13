"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { categoryBreakdown, ordersChart } from "@/data/admin-data";

export function RevenueOrdersChart() {
  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle>Revenue & Orders</CardTitle>
        <p className="text-sm text-gray-500">Monthly performance over the last 12 months</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={ordersChart}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
              formatter={(value, name) =>
                name === "revenue" ? formatPrice(Number(value)) : value
              }
            />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#059669" strokeWidth={2} dot={false} name="Orders" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryPieChart() {
  const data = categoryBreakdown.slice(0, 6);

  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <p className="text-sm text-gray-500">Revenue distribution</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatPrice(Number(value))} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function WeeklyOrdersChart() {
  const weekData = [
    { day: "Mon", orders: 28 },
    { day: "Tue", orders: 35 },
    { day: "Wed", orders: 42 },
    { day: "Thu", orders: 38 },
    { day: "Fri", orders: 51 },
    { day: "Sat", orders: 47 },
    { day: "Sun", orders: 32 },
  ];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={weekData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <Tooltip contentStyle={{ borderRadius: 12 }} />
        <Bar dataKey="orders" fill="#2563eb" radius={[6, 6, 0, 0]} name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const hourlyTraffic = [
  { hour: "6am", orders: 2 },
  { hour: "8am", orders: 8 },
  { hour: "10am", orders: 15 },
  { hour: "12pm", orders: 22 },
  { hour: "2pm", orders: 18 },
  { hour: "4pm", orders: 25 },
  { hour: "6pm", orders: 31 },
  { hour: "8pm", orders: 19 },
  { hour: "10pm", orders: 7 },
];

export function HourlyTrafficChart() {
  return (
    <Card className="border-gray-200/80 bg-white/80 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="text-base">Today&apos;s Traffic</CardTitle>
        <p className="text-xs text-gray-500">Orders by hour</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourlyTraffic}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
            <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
            <Tooltip contentStyle={{ borderRadius: 12 }} />
            <Bar dataKey="orders" fill="#059669" radius={[4, 4, 0, 0]} name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
