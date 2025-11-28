import React from 'react';
import { useChatStore, useAuthStore } from '../store';
import { Button, cn } from '../components/ui';
import { MessageSquare, Plus, Settings, LogOut, User, LayoutDashboard, CreditCard } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Sidebar = () => {
    const { sessions, currentSessionId, selectSession, createSession, deleteSession } = useChatStore();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className="flex flex-col h-full bg-muted/10">
            <div className="p-4">
                <Button onClick={createSession} className="w-full justify-start gap-2" variant="outline">
                    <Plus size={16} /> New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-2">Recent</div>
                {sessions.map(session => (
                    <button
                        key={session.id}
                        onClick={() => { selectSession(session.id); navigate('/chat'); }}
                        className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm truncate transition-colors flex items-center gap-2 group",
                            currentSessionId === session.id && location.pathname === '/chat' ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                        )}
                    >
                        <MessageSquare size={14} />
                        <span className="truncate flex-1">{session.title}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 border-t space-y-1">
                {user?.role === 'admin' && (
                     <Link to="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                            <LayoutDashboard size={16} /> Admin Panel
                        </Button>
                    </Link>
                )}
                <Link to="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                        <Settings size={16} /> Settings
                    </Button>
                </Link>
                <Link to="/billing">
                    <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
                        <CreditCard size={16} /> Billing
                    </Button>
                </Link>
                
                <div className="flex items-center gap-2 mt-4 px-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 truncate text-sm font-medium">
                        {user?.name}
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <LogOut size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
