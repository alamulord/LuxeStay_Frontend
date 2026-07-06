import React from 'react';
import { Mail } from 'lucide-react';
import { PremiumButton } from '../ui/PremiumButton';

export const InnerCircleCta: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for requesting access to the Inner Circle.');
  };

  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 mb-24">
      <div className="btn-primary-gradient relative overflow-hidden rounded-[2rem] py-16 px-8 md:px-16 text-center text-white shadow-xl border border-primary-container/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
            Join the Inner Circle
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-8 font-body leading-relaxed">
            Get early access to new property launches, exclusive member pricing, and private event invitations.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <div className="relative w-full sm:w-80">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 z-10" />
              <input
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-none text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/50 text-sm bg-white font-body"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>
            <PremiumButton
              type="submit"
              variant="secondary"
              className="w-full sm:w-auto font-bold tracking-wide"
            >
              Request Access
            </PremiumButton>
          </form>
          <p className="mt-4 text-[10px] text-white/50 font-body">
            By joining, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};
