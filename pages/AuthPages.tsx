import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '../components/ui';
import { useAuthStore } from '../store';
import { User } from '../types';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email: email,
      plan: 'free',
      role: 'admin' // Enable admin for demo
    };
    login(mockUser);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export const RegisterPage = () => {
    // Simplified clone of Login for demo
    return <LoginPage />;
}
