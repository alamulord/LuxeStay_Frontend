import React from 'react';
import { Star, User } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment?: string;
    createdAt: string;
    user: {
      firstName: string;
      lastName: string;
      avatar?: string;
    };
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-4 bg-surface-container-lowest rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
          {review.user.avatar ? (
            <img
              src={review.user.avatar}
              alt={`${review.user.firstName} ${review.user.lastName}`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-on_surface_variant" />
          )}
        </div>
        <div>
          <p className="font-medium">
            {review.user.firstName} {review.user.lastName}
          </p>
          <p className="text-sm text-on_surface_variant">{formatDate(review.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= review.rating ? 'fill-primary text-primary' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {review.comment && (
        <p className="text-on_surface_variant text-sm">{review.comment}</p>
      )}
    </div>
  );
}