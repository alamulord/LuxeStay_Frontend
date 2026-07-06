import React from 'react';
import { Bot } from 'lucide-react';
import { PromptSuggestions } from './PromptSuggestions';

interface AIWelcomeCardProps {
  onSelectPrompt: (prompt: string) => void;
}

export const AIWelcomeCard: React.FC<AIWelcomeCardProps> = ({ onSelectPrompt }) => {
  return (
    <div className="w-full text-left space-y-6">
      {/* Concierge Title Block */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shrink-0">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-headline font-bold text-xs text-white uppercase tracking-wider leading-none flex items-center gap-1.5">
            LuxeStay Concierge
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-[10px] text-white/40 font-body mt-1">Ready to curate your next destination</p>
        </div>
      </div>

      {/* Suggested Paths List */}
      <div className="border-t border-white/5 pt-5">
        <PromptSuggestions onSelect={onSelectPrompt} />
      </div>
    </div>
  );
};
