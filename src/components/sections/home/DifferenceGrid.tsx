import React from 'react';
import { Shield, Bell, Box } from 'lucide-react';
import { DifferenceCard } from './DifferenceCard';

export const DifferenceGrid: React.FC = () => {
  const differences = [
    {
      icon: Shield,
      title: 'Curated vs Crowdsourced',
      desc: 'Every property in our collection is hand-picked and personally inspected. We prioritize quality over quantity, ensuring only the top 1% of luxury homes make the cut.',
    },
    {
      icon: Bell,
      title: 'Concierge-Led vs Self-Service',
      desc: 'Skip the automated bots. Our dedicated local concierges handle everything from private chefs to custom itineraries, providing a truly high-touch human experience.',
    },
    {
      icon: Box,
      title: 'Immersive 3D vs Static Photos',
      desc: 'No surprises on arrival. Every listing features immersive 3D walkthroughs and spatial photography, so you can feel the layout before you even book.',
    },
  ];

  return (
    <section className="bg-surface-container py-24 mb-24 no-print select-none">
      <div className="max-w-page mx-auto px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4 block">
            The Distinction
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface">
            The LuxeStay Difference
          </h2>
          <p className="font-body text-sm text-on-surface-variant mt-4 max-w-2xl mx-auto leading-relaxed">
            Elevating hospitality beyond the standard rental experience through curation and concierge excellence.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {differences.map((diff, idx) => (
            <DifferenceCard
              key={idx}
              icon={diff.icon}
              title={diff.title}
              desc={diff.desc}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
