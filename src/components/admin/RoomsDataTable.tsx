import React from 'react';
import { MoreVertical, Edit, Trash, Eye } from 'lucide-react';
import { Room } from '../../types/room.types';
import { formatCurrency } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface RoomsDataTableProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
  onView: (room: Room) => void;
}

export function RoomsDataTable({ rooms, onEdit, onDelete, onView }: RoomsDataTableProps) {
  return (
    <div className="bg-surface-container-lowest rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-outline_variant/15">
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Room</th>
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Location</th>
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Price</th>
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Rating</th>
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Status</th>
            <th className="text-left p-4 text-sm font-medium text-on_surface_variant">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b border-outline_variant/15 hover:bg-surface-container-low">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium line-clamp-1">{room.title}</p>
                    <p className="text-xs text-on_surface_variant">
                      {room.bedrooms} bed, {room.bathrooms} bath
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm">
                <p>{room.city}</p>
                <p className="text-on_surface_variant">{room.country}</p>
              </td>
              <td className="p-4 text-sm font-medium">
                {formatCurrency(room.pricePerNight)}
              </td>
              <td className="p-4 text-sm">
                <span className="flex items-center gap-1">
                  {room.rating.toFixed(1)}
                </span>
              </td>
              <td className="p-4">
                <span className={cn(
                  "status-badge",
                  room.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                )}>
                  {room.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(room)}
                    className="p-2 hover:bg-surface-container-low rounded-md transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(room)}
                    className="p-2 hover:bg-surface-container-low rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(room)}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-md transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}