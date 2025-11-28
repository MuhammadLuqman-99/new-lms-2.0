import React, { useState } from 'react';
import { useAuthStore } from '../store';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from '../components/ui';
import { Sidebar } from './DashboardLayout';

export const SettingsPage = () => {
    const { user, updateUser } = useAuthStore();
    const [name, setName] = useState(user?.name || '');

    const handleSave = () => {
        updateUser({ name });
        alert('Settings saved!');
    };

    return (
        <div className="flex h-screen bg-background">
             <div className="w-64 border-r hidden md:block">
                <Sidebar />
             </div>
             <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>
                
                <div className="max-w-2xl space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input value={user?.email} disabled className="bg-muted" />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
             </div>
        </div>
    );
};

export const BillingPage = () => {
    const { user } = useAuthStore();
    return (
        <div className="flex h-screen bg-background">
             <div className="w-64 border-r hidden md:block">
                <Sidebar />
             </div>
             <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8">Billing</h1>
                <Card className="mb-8">
                    <CardHeader><CardTitle>Current Plan</CardTitle></CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold capitalize mb-1">{user?.plan} Plan</div>
                            <div className="text-muted-foreground">Renews on Aug 1, 2024</div>
                        </div>
                        <Badge variant="secondary" className="text-lg px-4 py-1">{user?.plan}</Badge>
                    </CardContent>
                </Card>

                <h2 className="text-xl font-bold mb-4">Invoice History</h2>
                <Card>
                    <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground bg-muted/50">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-6 py-4">July 1, 2024</td>
                                <td className="px-6 py-4">$19.00</td>
                                <td className="px-6 py-4"><Badge variant="default" className="bg-green-500 hover:bg-green-600">Paid</Badge></td>
                                <td className="px-6 py-4"><Button variant="link" className="p-0 h-auto">Download</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
             </div>
        </div>
    )
}