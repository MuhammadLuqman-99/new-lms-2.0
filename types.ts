export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  model: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  apiKey?: string;
  role: 'user' | 'admin';
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  isPro?: boolean;
}

export const MODELS: ModelOption[] = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and efficient' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro', description: 'Complex reasoning', isPro: true },
  { id: 'gemini-2.5-flash-thinking', name: 'Gemini 2.5 Flash Thinking', description: 'Advanced problem solving', isPro: true }
];
