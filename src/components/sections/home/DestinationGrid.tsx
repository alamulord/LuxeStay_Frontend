import React from 'react';
import { DestinationCard } from './DestinationCard';
import { SectionHeading } from '../../ui/SectionHeading';

interface Destination {
  name: string;
  subtitle: string;
  image: string;
  bestFor: string;
  collection: string;
}

interface DestinationGridProps {
  destinations: Destination[];
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({ destinations }) => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 py-16 no-print">
      <SectionHeading
        title="Curated Destinations"
        subtitle="Explore our hand-picked locations optimized for spatial beauty and luxury comfort."
        align="left"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.name}
            name={dest.name}
            subtitle={dest.subtitle}
            image={dest.image}
            bestFor={dest.bestFor}
            collection={dest.collection}
          />
        ))}
      </div>
    </section>
  );
};
