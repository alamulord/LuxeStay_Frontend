import React, { useRef, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { AIChatBubble } from '../ui/AIChatBubble';
import { ThinkingIndicator } from '../ui/ThinkingIndicator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SearchAiConciergeProps {
  chatMessages: Message[];
  aiInput: string;
  setAiInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAiLoading: boolean;
}

export const SearchAiConcierge: React.FC<SearchAiConciergeProps> = ({
  chatMessages,
  aiInput,
  setAiInput,
  onSubmit,
  isAiLoading,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages or loading state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiLoading]);

  return (
    <div className="flex flex-col bg-surface-container-low border-b border-outline-variant/10 max-h-[350px] flex-shrink-0">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[290px] hide-scrollbar">
        {chatMessages.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <Bot className="w-8 h-8 text-primary mx-auto animate-pulse" />
            <p className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface">
              LuxeStay AI Concierge
            </p>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto font-body leading-relaxed">
              "Bonjour! Tell me about the setting, size, and amenities you need. I'll curate the perfect match."
            </p>
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <AIChatBubble
              key={index}
              role={msg.role}
              content={msg.content}
              matchPercentage={msg.role === 'assistant' ? 98 : undefined}
            />
          ))
        )}
        
        {isAiLoading && (
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <ThinkingIndicator />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={onSubmit}
        className="p-3 bg-white border-t border-outline-variant/10 flex gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Ask the concierge for a specific setting..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          className="flex-grow bg-surface-container-low border-0 rounded-xl py-2.5 px-4 text-xs font-body focus:ring-1 focus:ring-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={isAiLoading || !aiInput.trim()}
          className="w-10 h-10 rounded-xl bg-on-surface text-white flex items-center justify-center hover:bg-primary transition-all duration-300 shrink-0 disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
