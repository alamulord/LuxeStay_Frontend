import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useFilterStore } from '../../store/filterStore';
import { GlassPanel } from '../shared/GlassPanel';

export function FilterBar() {
  const { setPriceRange, setGuests, setBedrooms, setAmenities, resetFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-outline_variant/15 rounded-full hover:bg-surface-container-low transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <GlassPanel className="absolute top-20 left-4 p-4 w-80 z-40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-on_surface_variant block mb-2">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input-field text-sm"
                  onChange={(e) => setPriceRange(Number(e.target.value), undefined)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="input-field text-sm"
                  onChange={(e) => setPriceRange(undefined, Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-on_surface_variant block mb-2">Guests</label>
              <select
                className="input-field text-sm"
                onChange={(e) => setGuests(Number(e.target.value) || undefined)}
              >
                <option value="">Any</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-on_surface_variant block mb-2">Bedrooms</label>
              <select
                className="input-field text-sm"
                onChange={(e) => setBedrooms(Number(e.target.value) || undefined)}
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full btn-tertiary text-sm"
            >
              Clear All Filters
            </button>
          </div>
        </GlassPanel>
      )}
    </div>
  );
}