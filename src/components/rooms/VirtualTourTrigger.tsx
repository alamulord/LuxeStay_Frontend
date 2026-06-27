import React from 'react';
import { Play } from 'lucide-react';

interface VirtualTourTriggerProps {
  onClick: () => void;
}

export function VirtualTourTrigger({ onClick }: VirtualTourTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-full hover:bg-surface-container-low transition-colors"
    >
      <Play className="w-4 h-4" />
      <span className="font-medium">Virtual Tour</span>
    </button>
  );
}