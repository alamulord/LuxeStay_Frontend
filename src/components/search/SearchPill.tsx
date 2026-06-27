import React from 'react';
import { X } from 'lucide-react';

interface SearchPillProps {
  label: string;
  value?: string;
  onRemove: () => void;
}

export function SearchPill({ label, value, onRemove }: SearchPillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-full text-sm">
      <span className="text-on_surface_variant">{label}:</span>
      <span className="font-medium">{value}</span>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-surface-container-low rounded-full transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}