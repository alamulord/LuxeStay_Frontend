import React from 'react';
import { Headphones, Sparkles, Bot, Globe } from 'lucide-react';
import { BeyondBookingHero } from './BeyondBookingHero';
import { ExperienceCard } from './ExperienceCard';

export const EditorialGrid: React.FC = () => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 mb-24 overflow-hidden no-print">
      <div className="bg-[#1a1c1c] rounded-[2.5rem] p-10 md:p-16 text-white relative border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary font-headline font-bold text-xs uppercase tracking-[0.4em] block">
              The Digital Concierge
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight">
              Beyond Just Booking.
            </h2>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-body">
              Experience the future of luxury hospitality where cutting-edge travel intelligence meets high-touch human curation.
            </p>
          </div>

          {/* Grid Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Immersive 3D Tour (8 Columns) */}
            <BeyondBookingHero />

            {/* Sidebar Cards (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <ExperienceCard
                icon={Headphones}
                title="24/7 Butler Service"
                desc="Instant messaging concierge for dinner curations, local reservations, and flight itineraries."
                badgeText="Human Touch"
              />
              <ExperienceCard
                icon={Sparkles}
                title="Private Member Events"
                desc="Exclusive invitations to yacht charters, art previews, and secret supper clubs."
                badgeText="Members Only"
              />
            </div>

            {/* Staggered Row 2 */}
            <div className="lg:col-span-6">
              <ExperienceCard
                icon={Bot}
                title="Travel Intelligence AI"
                desc="A private AI concierge trained on local archives that responds dynamically to your travel intentions and preferences."
                badgeText="AI Concierge"
              />
            </div>
            <div className="lg:col-span-6">
              <ExperienceCard
                icon={Globe}
                title="Spatially Inspected Stays"
                desc="Zero margin of error. Every suite is scanned for acoustics, daylight balance, and high-speed network connectivity before listings launch."
                badgeText="Quality Curation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
