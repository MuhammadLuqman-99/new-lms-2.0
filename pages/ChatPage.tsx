import React, { useEffect, useRef, useState } from 'react';
import { useChatStore, useAuthStore } from '../store';
import { ChatBubble } from '../components/ChatComponents';
import { Button, Input, Select, cn } from '../components/ui';
import { MODELS, Message } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { Send, Plus, MoreVertical, Settings, Menu, Mic, Image as ImageIcon } from 'lucide-react';
import { Sidebar } from './DashboardLayout';

export const ChatPage = () => {
  const { 
    sessions, currentSessionId, createSession, selectSession, 
    addMessage, updateLastMessage, isGenerating, setGenerating,
    selectedModel, setModel, sidebarOpen, toggleSidebar 
  } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  useEffect(() => {
    if (!currentSessionId) createSession();
  }, [currentSessionId, createSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages, isGenerating]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating || !currentSessionId) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    addMessage(currentSessionId, userMsg);
    setInput('');
    setGenerating(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: Message = {
      id: modelMsgId,
      role: 'model',
      content: '', // Start empty
      timestamp: Date.now(),
      isStreaming: true
    };
    addMessage(currentSessionId, modelMsg);

    let fullResponse = '';

    // History context for API (exclude the message we just added visually to avoid dups if API handles it differently, 
    // but here we pass previous history + new prompt)
    const history = currentSession?.messages || [];

    await streamGeminiResponse(
      selectedModel,
      history,
      userMsg.content,
      (chunk) => {
        fullResponse += chunk;
        updateLastMessage(currentSessionId, fullResponse);
      }
    );

    setGenerating(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className={cn("fixed inset-y-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 w-64 border-r bg-muted/10", sidebarOpen ? "translate-x-0" : "-translate-x-full md:w-0 md:border-none")}>
         <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu size={20} />
                </Button>
                <div className="font-semibold">{currentSession?.title || 'New Chat'}</div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-48">
                    <Select 
                        value={selectedModel} 
                        onChange={setModel}
                        options={MODELS}
                    />
                </div>
            </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 scroll-smooth">
            {currentSession?.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <ImageIcon size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">How can I help you today?</h2>
                </div>
            ) : (
                currentSession?.messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
            <div className="max-w-3xl mx-auto relative">
                <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon" className="absolute left-2 text-muted-foreground">
                        <Plus size={20} />
                    </Button>
                    <Input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Message Nebula AI..."
                        className="pl-12 pr-24 py-6 text-base rounded-2xl shadow-sm"
                        disabled={isGenerating}
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                         <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                             <Mic size={20} />
                         </Button>
                         <Button type="submit" size="icon" disabled={!input.trim() || isGenerating} className="rounded-xl">
                            <Send size={18} />
                         </Button>
                    </div>
                </form>
                <div className="text-center text-xs text-muted-foreground mt-2">
                    Nebula AI can make mistakes. Check important info.
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
