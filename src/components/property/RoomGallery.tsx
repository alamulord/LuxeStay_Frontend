import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface RoomGalleryProps {
  title: string;
  images: string[];
  onOpenCarousel: (index: number) => void;
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({
  title,
  images,
  onOpenCarousel,
}) => {
  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 pt-6">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-ambient border border-outline-variant/5">
        {/* Main Image */}
        <div
          className="col-span-2 row-span-2 relative img-hover-zoom cursor-pointer"
          onClick={() => onOpenCarousel(0)}
        >
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
          />
        </div>
        {/* Side Images */}
        {images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="relative img-hover-zoom cursor-pointer"
            onClick={() => onOpenCarousel(i + 1)}
          >
            <img
              src={img}
              alt={`${title} ${i + 2}`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
            />
            {i === 3 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCarousel(0);
                }}
                className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-2 rounded-xl text-xs font-headline font-bold text-on-surface hover:bg-white transition-all duration-300 shadow-ambient-sm active:scale-95"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                View All Photos
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
