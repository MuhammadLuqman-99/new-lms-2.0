import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message, User } from '../types';
import { User as UserIcon, Bot, Copy, RefreshCw } from 'lucide-react';
import { Button, cn } from './ui';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-4 p-6",
        isUser ? "bg-transparent" : "bg-muted/30"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border shadow-sm", isUser ? "bg-background" : "bg-primary text-primary-foreground")}>
          {isUser ? <UserIcon size={16} /> : <Bot size={16} />}
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-7">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative rounded-md overflow-hidden my-4 border">
                    <div className="flex items-center justify-between bg-muted px-4 py-2 text-xs text-muted-foreground">
                      <span>{match[1]}</span>
                      <button onClick={() => copyToClipboard(String(children))} className="hover:text-foreground">
                        <Copy size={12} />
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, borderRadius: 0 }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={cn("bg-muted px-1 py-0.5 rounded font-mono text-sm", className)} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        {!isUser && (
           <div className="mt-2 flex gap-2">
             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(message.content)}>
               <Copy size={12} />
             </Button>
           </div>
        )}
      </div>
    </motion.div>
  );
};