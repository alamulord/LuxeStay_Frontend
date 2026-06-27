import React from 'react';
import { cn } from '../../lib/utils';

interface MapPanelProps {
  className?: string;
}

export function MapPanel({ className }: MapPanelProps) {
  return (
    <div className={cn(
      "bg-surface-container-low rounded-lg overflow-hidden relative",
      className
    )}>
      <div className="absolute inset-0 flex items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-on_surface_variant">Map View</p>
          <p className="text-sm text-on_surface_variant">Google Maps integration</p>
        </div>
      </div>
    </div>
  );
}