import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  { text: "🌊 Somewhere peaceful by the sea", query: "I need somewhere quiet by the sea." },
  { text: "🏔 A quiet mountain escape with a fireplace", query: "Find a mountain retreat with a fireplace." },
  { text: "🏛 Modern architecture in Japan", query: "I want modern architecture in Japan." },
  { text: "🍷 Wine country villas perfect for romance", query: "Show me villas perfect for a honeymoon in wine country." },
  { text: "✨ Surprise me with extraordinary designs", query: "Show me your most extraordinary design-driven homes." },
];

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4 text-left select-none">
      <div className="flex items-center gap-2 text-white/40 text-[9px] font-headline font-bold uppercase tracking-[0.2em]">
        <Sparkles className="w-3.5 h-3.5 text-primary-fixed-dim" />
        <span>Curated Conversational Paths</span>
      </div>
      <div className="space-y-1.5">
        {suggestions.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(item.query)}
            className="w-full text-left px-4 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-white/10 text-xs text-white/70 hover:text-white font-body transition-all duration-300 flex items-center justify-between group"
          >
            <span>{item.text}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary-fixed-dim" />
          </button>
        ))}
      </div>
    </div>
  );
};
