import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionToolbarProps {
  onAdd: () => void;
}

export function FloatingActionToolbar({ onAdd }: FloatingActionToolbarProps) {
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add New</span>
      </button>
    </div>
  );
}