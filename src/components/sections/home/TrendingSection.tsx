import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Room } from '../../../types/room.types';
import { FeaturedPropertyCard } from './FeaturedPropertyCard';
import { LoadingSkeleton } from '../../ui/LoadingSkeleton';
import { SectionHeading } from '../../ui/SectionHeading';
import { staggerContainer, fadeIn } from '../../../lib/animations';

interface TrendingSectionProps {
  rooms: Room[];
  isLoading: boolean;
  category?: string;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ rooms = [], isLoading, category = 'all' }) => {
  const filteredRooms = React.useMemo(() => {
    if (!category || category === 'all') return rooms;
    
    return rooms.filter(room => {
      const titleLower = room.title.toLowerCase();
      const descLower = room.description.toLowerCase();
      const amenitiesLower = room.amenities?.map(a => a.amenity.name.toLowerCase()) || [];

      if (category === 'beachfront') {
        return titleLower.includes('beach') || 
               descLower.includes('beach') || 
               titleLower.includes('ocean') || 
               descLower.includes('ocean') ||
               amenitiesLower.includes('ocean view');
      }
      if (category === 'pools') {
        return titleLower.includes('pool') || 
               descLower.includes('pool') ||
               amenitiesLower.includes('private pool');
      }
      if (category === 'cabins') {
        return titleLower.includes('cabin') || 
               descLower.includes('cabin') || 
               titleLower.includes('mountain') || 
               descLower.includes('mountain') || 
               titleLower.includes('retreat');
      }
      if (category === 'mansions') {
        return titleLower.includes('mansion') || 
               descLower.includes('mansion') || 
               titleLower.includes('estate') || 
               descLower.includes('estate') || 
               titleLower.includes('villa') || 
               descLower.includes('villa');
      }
      return true;
    });
  }, [rooms, category]);

  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 py-8 mb-16 no-print">
      <SectionHeading
        title="Trending Stays"
        subtitle="Our guests are currently escaping to these extraordinary homes."
        align="left"
        className="mb-10"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <LoadingSkeleton variant="image" className="h-56" />
              <LoadingSkeleton variant="text" className="w-1/3 h-4" />
              <LoadingSkeleton variant="text" className="w-3/4 h-5" />
              <LoadingSkeleton variant="text" className="w-1/2 h-3" />
            </div>
          ))}
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-12 border border-outline-variant/10 rounded-2xl bg-surface-container-low/30">
          <p className="text-sm font-headline font-bold text-on-surface-variant">No retreats found in this collection</p>
          <p className="text-xs text-on-surface-variant/60 font-body mt-1">Check back later or explore other stays.</p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRooms.slice(0, 6).map((room) => (
            <motion.div key={room.id} variants={fadeIn}>
              <FeaturedPropertyCard room={room} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center mt-12">
        <Link
          to="/search"
          className="px-8 py-3.5 rounded-xl border border-outline-variant/30 text-xs font-headline font-bold text-on-surface hover:bg-on-surface hover:text-white transition-all duration-300 shadow-ambient uppercase tracking-wider"
        >
          Show More Residences
        </Link>
      </div>
    </section>
  );
};
