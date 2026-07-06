import React from 'react';

export const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-container-low rounded-2xl w-fit">
      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
};
