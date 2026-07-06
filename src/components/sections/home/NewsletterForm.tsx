import React from 'react';
import { Mail } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for requesting access to the Inner Circle.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <div className="relative w-full sm:w-80">
        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant/55 z-10" />
        <input
          className="w-full pl-12 pr-6 py-4 rounded-full border-none text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-white/50 text-sm bg-white font-body focus:outline-none"
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full sm:w-auto px-10 py-4 bg-on-surface hover:bg-black text-white rounded-full font-bold transition-all duration-300 shadow-xl text-xs font-headline uppercase tracking-[0.15em] shrink-0"
      >
        Request Access
      </button>
    </form>
  );
};
