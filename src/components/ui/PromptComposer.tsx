import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromptComposerProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  initialValue?: string;
  isLoading?: boolean;
}

export const PromptComposer: React.FC<PromptComposerProps> = ({
  onSubmit,
  placeholder = "Describe your perfect getaway...",
  initialValue = '',
  isLoading = false,
}) => {
  const [prompt, setPrompt] = useState(initialValue);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  
  const suggestions = [
    'Beachfront villa in Bali',
    'Skyline penthouse in Dubai',
    'Alpine retreat in Swiss Alps',
    'Desert oasis in Utah'
  ];

  useEffect(() => {
    setPrompt(initialValue);
  }, [initialValue]);

  // Typing effect for placeholders
  useEffect(() => {
    let timer: any;
    let suggestionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const currentFullText = suggestions[suggestionIndex];
      if (isDeleting) {
        setAnimatedPlaceholder(currentFullText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setAnimatedPlaceholder(currentFullText.substring(0, charIndex + 1));
        charIndex++;
      }

      let delta = 100 - Math.random() * 40;
      if (isDeleting) delta /= 2;

      if (!isDeleting && charIndex === currentFullText.length) {
        delta = 2500; // Stay at the full suggestion
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        suggestionIndex = (suggestionIndex + 1) % suggestions.length;
        delta = 500;
      }

      timer = setTimeout(tick, delta);
    };

    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    onSubmit(suggestion);
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* AI Prompt Box Container */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-2 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15">
        
        {/* Main Input Row */}
        <form onSubmit={handleSubmit} className="flex items-center gap-4 px-6 py-4">
          <Sparkles className="text-white/60 w-5 h-5 shrink-0" />
          
          <input
            type="text"
            placeholder={prompt ? '' : animatedPlaceholder || placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/40 text-lg w-full font-light focus:outline-none p-0"
          />
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-white text-primary p-3 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform flex-shrink-0 w-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5 text-primary" />
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 px-6 pb-6 pt-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 text-xs font-medium transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
