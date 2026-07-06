import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  name: string;
  subtitle: string;
  image: string;
  bestFor: string;
  collection: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  subtitle,
  image,
  bestFor,
  collection
}) => {
  return (
    <Link
      to={`/search?location=${name}`}
      className="group relative aspect-[3/4.5] rounded-3xl overflow-hidden shadow-ambient-md border border-outline-variant/5 bg-surface flex flex-col justify-end p-6 select-none"
    >
      {/* Background Image with Ken Burns Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
          loading="lazy"
        />
        {/* Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Meta Indicators */}
      <div className="relative z-10 space-y-4">
        {/* Hidden on default, Staggered Slide Up on hover */}
        <div className="space-y-1">
          <span className="text-[9px] font-headline font-bold text-white/50 uppercase tracking-[0.2em] block">
            {collection}
          </span>
          <span className="text-[10px] font-headline font-semibold text-primary-fixed-dim bg-white/10 px-2 py-0.5 rounded-full inline-block">
            {bestFor}
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-3">
          <div>
            <h3 className="font-headline text-2xl font-bold text-white tracking-tight leading-none">
              {name}
            </h3>
            <p className="text-white/60 text-xs font-body mt-1">
              {subtitle}
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-500 transform group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Explore trigger text revealed smoothly */}
        <div className="h-0 overflow-hidden group-hover:h-4 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
          <p className="text-[10px] font-headline font-bold text-white uppercase tracking-widest flex items-center gap-1">
            Explore Collection
          </p>
        </div>
      </div>
    </Link>
  );
};
