import React from 'react';
import { Shield, Bell, Box } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export const LuxeDifference: React.FC = () => {
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
    <section className="bg-surface-container-low py-20 border-y border-outline-variant/10">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHeading
          title="The LuxeStay Difference"
          subtitle="Elevating hospitality beyond the standard rental experience through curation and concierge excellence."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {differences.map((diff, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-ambient flex items-center justify-center mb-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:shadow-ambient-lg border border-outline-variant/5">
                <diff.icon className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-lg font-bold text-on-surface mb-3">
                {diff.title}
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs font-body">
                {diff.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
