import React from 'react';

export const HeroOverlay: React.FC = () => {
  return (
    <>
      {/* Editorial vignettes - only dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 z-0 pointer-events-none" />
    </>
  );
};
