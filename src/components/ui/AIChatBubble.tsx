import React, { useState } from 'react';
import { Bot, ChevronDown, ChevronUp, Sparkles, User } from 'lucide-react';
import { Badge } from './Badge';

interface AIChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  matchPercentage?: number;
}

export const AIChatBubble: React.FC<AIChatBubbleProps> = ({
  role,
  content,
  reasoning,
  matchPercentage,
}) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const isAssistant = role === 'assistant';

  return (
    <div
      className={`flex gap-4 p-5 rounded-2xl w-full transition-all duration-300 ${
        isAssistant
          ? 'bg-surface-container-lowest border border-outline-variant/10 shadow-ambient'
          : 'bg-primary/5 border border-primary/10'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isAssistant ? 'bg-primary/15 text-primary' : 'bg-on-surface/10 text-on-surface'
        }`}
      >
        {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="font-headline font-bold text-xs uppercase tracking-wider text-on-surface-variant">
            {isAssistant ? 'LuxeStay Concierge' : 'You'}
          </span>
          {isAssistant && matchPercentage && (
            <Badge variant="ai">{matchPercentage}% Match Score</Badge>
          )}
        </div>

        {/* Reasoning details */}
        {isAssistant && reasoning && (
          <div className="border border-outline-variant/10 rounded-lg overflow-hidden bg-surface-container-lowest">
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-on-surface-variant bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              <span className="flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-primary" />
                AI Reasoning Process
              </span>
              {showReasoning ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showReasoning && (
              <div className="p-3 text-xs text-on-surface-variant/80 border-t border-outline-variant/10 leading-relaxed font-body bg-surface-container-lowest/50 italic whitespace-pre-line">
                {reasoning}
              </div>
            )}
          </div>
        )}

        <div className="text-on-surface text-sm md:text-base leading-relaxed font-body whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};
