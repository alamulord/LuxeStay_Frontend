import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { useRoom } from '../hooks/useRooms';
import { Star, MessageSquare } from 'lucide-react';
import api from '../lib/api';

export function ReviewForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { room, isLoading } = useRoom(id || '');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await api.post('/reviews', {
        roomId: id,
        rating,
        comment,
      });
      alert('Review submitted successfully!');
      navigate(`/room/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit review. Note: you can only review rooms you have stayed in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !room) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-20 flex-grow px-4">
        <div className="max-w-xl mx-auto py-8">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-slate-200/20">
            <h1 className="font-plus text-2xl font-bold mb-2">Leave a review</h1>
            <p className="text-sm text-on_surface_variant mb-6">
              Share your experience staying at <span className="font-semibold">{room.title}</span>.
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-6 leading-relaxed border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-on_surface_variant">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 hover:scale-110 transition-transform text-amber-400"
                    >
                      <Star
                        className="w-8 h-8"
                        fill={(hoverRating !== null ? star <= hoverRating : star <= rating) ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-on_surface_variant">Your comments</label>
                <div className="relative">
                  <MessageSquare className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
                  <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Tell us what you liked, what could be improved, or how your stay went..."
                    className="w-full bg-surface-container-low border border-slate-200/50 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <LoadingSpinner size="sm" /> : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-tertiary px-6"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
