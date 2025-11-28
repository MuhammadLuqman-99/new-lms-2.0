import { create } from 'zustand';
import { User, ChatSession, Message, MODELS } from './types';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    { name: 'nebula-auth' }
  )
);

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isGenerating: boolean;
  selectedModel: string;
  sidebarOpen: boolean;
  createSession: () => void;
  selectSession: (id: string) => void;
  addMessage: (sessionId: string, message: Message) => void;
  updateLastMessage: (sessionId: string, content: string) => void;
  deleteSession: (id: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  setModel: (modelId: string) => void;
  toggleSidebar: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      isGenerating: false,
      selectedModel: MODELS[0].id,
      sidebarOpen: true,

      createSession: () => {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: 'New Chat',
          messages: [],
          updatedAt: Date.now(),
          model: get().selectedModel,
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));
      },

      selectSession: (id) => set({ currentSessionId: id }),

      addMessage: (sessionId, message) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, message],
                  updatedAt: Date.now(),
                  // Auto-title generation could happen here in a real app
                  title: session.messages.length === 0 && message.role === 'user' 
                    ? message.content.slice(0, 30) + '...' 
                    : session.title
                }
              : session
          ),
        }));
      },

      updateLastMessage: (sessionId, content) => {
        set((state) => ({
          sessions: state.sessions.map((session) => {
            if (session.id !== sessionId) return session;
            const msgs = [...session.messages];
            if (msgs.length > 0) {
              msgs[msgs.length - 1] = { ...msgs[msgs.length - 1], content, isStreaming: false };
            }
            return { ...session, messages: msgs };
          }),
        }));
      },

      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
          currentSessionId: state.currentSessionId === id ? null : state.currentSessionId,
        })),

      setGenerating: (isGenerating) => set({ isGenerating }),
      setModel: (modelId) => set({ selectedModel: modelId }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: 'nebula-chat' }
  )
);
