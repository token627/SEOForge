"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, FileText, Activity, TrendingUp } from "lucide-react";

const data = [
  { name: "Mon", audits: 4, generated: 12 },
  { name: "Tue", audits: 7, generated: 15 },
  { name: "Wed", audits: 5, generated: 20 },
  { name: "Thu", audits: 12, generated: 18 },
  { name: "Fri", audits: 8, generated: 25 },
  { name: "Sat", audits: 15, generated: 30 },
  { name: "Sun", audits: 10, generated: 22 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back to SEOForge AI. Here is an overview of your activity.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-violet-500/5 to-transparent border-violet-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
            <Activity className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">61</div>
            <p className="text-xs text-violet-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +14% since last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-sky-500/5 to-transparent border-sky-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metadata Generated</CardTitle>
            <FileText className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-sky-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +32% since last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
            <Search className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92/100</div>
            <p className="text-xs text-emerald-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" /> +5 points since last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500/5 to-transparent border-pink-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schemas Built</CardTitle>
            <FileText className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Consistent with last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your tool usage over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAudits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} fontSize={12} stroke="#888" />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} fontSize={12} stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="audits" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorAudits)" />
                <Area type="monotone" dataKey="generated" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorGenerated)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
            <CardDescription>Latest domains analyzed by the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { domain: "example.com", score: 95, date: "2 hours ago", color: "text-green-500" },
                { domain: "my-startup.io", score: 82, date: "5 hours ago", color: "text-green-500" },
                { domain: "blog.dev.to", score: 45, date: "1 day ago", color: "text-red-500" },
                { domain: "portfolio-v2.net", score: 68, date: "2 days ago", color: "text-yellow-500" },
                { domain: "ecommerce-store.shop", score: 91, date: "3 days ago", color: "text-green-500" },
              ].map((audit, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{audit.domain}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{audit.date}</p>
                  </div>
                  <div className={`font-bold text-lg ${audit.color}`}>
                    {audit.score}/100
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
