import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui';
import { Sidebar } from './DashboardLayout';

const data = [
  { name: 'Jan', users: 400, queries: 2400 },
  { name: 'Feb', users: 300, queries: 1398 },
  { name: 'Mar', users: 200, queries: 9800 },
  { name: 'Apr', users: 278, queries: 3908 },
  { name: 'May', users: 189, queries: 4800 },
  { name: 'Jun', users: 239, queries: 3800 },
  { name: 'Jul', users: 349, queries: 4300 },
];

export const AdminPage = () => {
    return (
        <div className="flex h-screen bg-background">
             <div className="w-64 border-r hidden md:block">
                <Sidebar />
             </div>
             <div className="flex-1 overflow-y-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">12,345</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Queries (24h)</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">+573</div></CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Model Usage</CardTitle></CardHeader>
                        <CardContent><div className="text-2xl font-bold">98.2%</div></CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="h-[400px]">
                        <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
                        <CardContent className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                                    <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="h-[400px]">
                        <CardHeader><CardTitle>Query Volume</CardTitle></CardHeader>
                        <CardContent className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                                    <Bar dataKey="queries" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
             </div>
        </div>
    )
}
