import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number; // Target width (e.g. 400, 600, 1200)
  priority?: boolean;
}

const optimizeGoogleImageUrl = (url: string, targetWidth: number) => {
  if (!url) return '';
  if (!url.includes('googleusercontent.com') && !url.includes('google.com')) return url;
  // Google Photos/User Content CDN supports appending =wXXX at the end for resizing
  const baseUrl = url.split('=')[0];
  return `${baseUrl}=w${targetWidth}`;
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 800,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [highResSrc, setHighResSrc] = useState('');
  const [lowResSrc, setLowResSrc] = useState('');

  useEffect(() => {
    // Generate low-res and high-res sources
    const highRes = optimizeGoogleImageUrl(src, width);
    const lowRes = optimizeGoogleImageUrl(src, 30); // 30px thumbnail for rapid load
    
    setHighResSrc(highRes);
    setLowResSrc(lowRes);
    setIsLoaded(false);

    // Preload high-res image
    const img = new Image();
    img.src = highRes;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src, width]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer / Blur Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface-container-high animate-pulse z-10 flex items-center justify-center">
          {lowResSrc ? (
            <img
              src={lowResSrc}
              alt=""
              className="w-full h-full object-cover blur-md scale-105 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-surface-container-low via-surface-container-high to-surface-container-low animate-shimmer" />
          )}
        </div>
      )}

      {/* Main Image */}
      {highResSrc && (
        <img
          src={highResSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};
