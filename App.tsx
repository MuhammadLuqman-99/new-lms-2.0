import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { ChatPage } from './pages/ChatPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage, BillingPage } from './pages/SettingsPage';
import { useAuthStore } from './store';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App = () => {
  // Check system dark mode preference on init
  React.useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/chat" element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        } />
        
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />

        <Route path="/settings" element={
            <PrivateRoute>
                <SettingsPage />
            </PrivateRoute>
        } />

        <Route path="/billing" element={
            <PrivateRoute>
                <BillingPage />
            </PrivateRoute>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
