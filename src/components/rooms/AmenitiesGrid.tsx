import React from 'react';
import { RoomAmenity } from '../../types/room.types';

interface AmenitiesGridProps {
  amenities: RoomAmenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const groupedAmenities = amenities.reduce((acc, item) => {
    if (!acc[item.amenity.type]) {
      acc[item.amenity.type] = [];
    }
    acc[item.amenity.type].push(item.amenity);
    return acc;
  }, {} as Record<string, RoomAmenity['amenity'][]>);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">What this place offers</h2>

      {Object.entries(groupedAmenities).map(([type, items]) => (
        <div key={type}>
          <h3 className="text-sm font-medium text-on_surface_variant uppercase tracking-wider mb-3">
            {type}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg">
                <div className="p-2 bg-surface-container-low rounded-full">
                  <span className="text-xl">{amenity.icon}</span>
                </div>
                <span className="text-sm">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}