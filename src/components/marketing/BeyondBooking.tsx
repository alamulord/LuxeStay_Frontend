import React from 'react';
import { Eye, Headphones, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const BeyondBooking: React.FC = () => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 mb-20 overflow-hidden">
      <div className="bg-[#1a1c1c] rounded-[2rem] p-10 md:p-16 text-white relative border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              The Digital Concierge
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Beyond Just Booking.
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-body">
              Experience the future of hospitality where cutting-edge technology meets high-touch human curation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Large Feature: AI Virtual Tours */}
            <div className="lg:col-span-8 group cursor-pointer">
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  alt="AI Virtual Tour Room"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70"
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1c] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="p-3 bg-primary/20 rounded-xl text-primary block">
                      <Eye className="w-8 h-8" />
                    </span>
                    <h3 className="font-headline text-2xl font-bold text-white">
                      AI-Driven Virtual Tours
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed font-body">
                    Step inside before you arrive. Our high-fidelity digital twins allow for complete spatial immersion in every property.
                  </p>
                </div>
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase text-white">
                  Live Preview Available
                </div>
              </div>
            </div>

            {/* Side Grid for other features */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Feature 2 */}
              <GlassCard className="flex-1 p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Headphones className="w-6 h-6" />
                </div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">
                  24/7 Digital Concierge
                </h4>
                <p className="text-white/60 text-xs leading-relaxed font-body">
                  Instant assistance for everything from dinner reservations to private jet transfers, accessible directly through our app.
                </p>
              </GlassCard>

              {/* Feature 3 */}
              <GlassCard className="flex-1 p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">
                  Private Member Events
                </h4>
                <p className="text-white/60 text-xs leading-relaxed font-body">
                  Exclusive access to yacht parties, art gallery previews, and secret supper clubs in your destination city.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
