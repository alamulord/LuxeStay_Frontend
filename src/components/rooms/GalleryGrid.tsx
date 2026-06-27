import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GalleryGridProps {
  images: string[];
  title: string;
}

export function GalleryGrid({ images, title }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectImage = (index: number) => {
    setSelectedIndex(index);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-surface-container-low rounded-lg flex items-center justify-center">
        <p className="text-on_surface_variant">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <img
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={cn(
              "aspect-square rounded-md overflow-hidden transition-all",
              selectedIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
            )}
          >
            <img
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}