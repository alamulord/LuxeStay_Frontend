import React from 'react';
import { cn } from '../../lib/utils';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            activeCategory === category
              ? "bg-primary text-white"
              : "bg-surface-container-lowest text-on_surface_variant hover:bg-surface-container-low"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}