import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Compass, MapPin, Star, Bot, Send, ShieldCheck } from 'lucide-react';
import { Room } from '../../types/room.types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { RoomVirtualTour } from './RoomVirtualTour';
import { AIChatBubble } from '../ui/AIChatBubble';
import { ThinkingIndicator } from '../ui/ThinkingIndicator';
import { useAuth } from '../../contexts/AuthContext';
import { useBookingStore } from '../../store/bookingStore';

interface RoomStoryDetailsProps {
  room: Room;
  is3dActive: boolean;
  setIs3dActive: (val: boolean) => void;
  amenitiesList: React.ReactNode;
  reviewsList: React.ReactNode;
  fromAi: boolean;
}

export const RoomStoryDetails: React.FC<RoomStoryDetailsProps> = ({
  room,
  is3dActive,
  setIs3dActive,
  amenitiesList,
  reviewsList,
  fromAi,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const bookingStore = useBookingStore();

  const [askInput, setAskInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askInput.trim()) return;

    setIsAiLoading(true);
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: askInput }];
    setChatHistory(updatedHistory);
    const userInput = askInput;
    setAskInput('');

    const text = userInput.toLowerCase();
    const isBookingIntent = text.includes('book') || text.includes('reserve') || text.includes('check-in') || text.includes('check in') || text.includes('arrange early') || text.includes('tomorrow to friday') || text.includes('starting from') || text.includes('tommorrow');

    if (isBookingIntent) {
      // Calculate check-in: tomorrow
      const checkInDate = new Date();
      checkInDate.setDate(checkInDate.getDate() + 1);
      const checkInStr = checkInDate.toISOString().split('T')[0];

      // Calculate check-out: next Friday or 4 days later
      let checkOutDate = new Date(checkInDate);
      if (text.includes('friday')) {
        const day = checkInDate.getDay();
        const diff = (5 - day + 7) % 7 || 7;
        checkOutDate.setDate(checkInDate.getDate() + diff);
      } else {
        checkOutDate.setDate(checkInDate.getDate() + 4);
      }
      const checkOutStr = checkOutDate.toISOString().split('T')[0];

      // Save states
      bookingStore.setCheckIn(checkInStr);
      bookingStore.setCheckOut(checkOutStr);
      bookingStore.setGuests(2);

      setTimeout(() => {
        let reply = "";
        if (isAuthenticated) {
          reply = `I would be delighted to arrange this for you. I have initialized your early check-in reservation from tomorrow (${checkInStr}) to Friday (${checkOutStr}) for 2 guests. I am now redirecting you to our secure checkout page to finalize your booking.`;
          setChatHistory([...updatedHistory, { role: 'assistant' as const, content: reply }]);
          setIsAiLoading(false);
          setTimeout(() => {
            navigate(`/checkout/${room.id}`);
          }, 3000);
        } else {
          reply = `I would be delighted to arrange this for you. I have initialized your early check-in reservation from tomorrow (${checkInStr}) to Friday (${checkOutStr}) for 2 guests. To complete this operation, you need to log in to your account. I'm redirecting you to our secure login page now, and you will continue directly to checkout where you stopped once you sign in.`;
          setChatHistory([...updatedHistory, { role: 'assistant' as const, content: reply }]);
          setIsAiLoading(false);
          setTimeout(() => {
            navigate(`/login?redirect=${encodeURIComponent(`/checkout/${room.id}`)}`);
          }, 5500);
        }
      }, 1500);
    } else {
      // Simulate concierge response matching room context
      setTimeout(() => {
        let reply = `Regarding "${room.title}", the suite is fully optimized for privacy. `;
        if (text.includes('beach') || text.includes('ocean') || text.includes('view')) {
          reply += "Yes, the master suite features direct floor-to-ceiling glass paneling looking out to the sea. You can watch the sunrise directly from the king-sized bed.";
        } else if (text.includes('chef') || text.includes('kitchen') || text.includes('food')) {
          reply += "A private chef is available upon request. The kitchen is stocked with local organic ingredients and custom glassware prior to your arrival.";
        } else {
          reply += "All details, including spatial layout and local concierge arrangements, have been inspected by our team to guarantee an exceptional stay. Let me know if you would like me to arrange early check-in.";
        }
        setChatHistory([...updatedHistory, { role: 'assistant' as const, content: reply }]);
        setIsAiLoading(false);
      }, 1500);
    }
  };

  return (
    <div className='space-y-12'>
      {/* ── 1. TITLE & RATING HEADER ── */}
      <div className='space-y-4'>
        <div className='flex items-center gap-3 flex-wrap'>
          <Badge variant='ai'>Premier Collection</Badge>
          <div className='flex items-center gap-1 text-xs text-on-surface-variant font-headline font-bold'>
            <Star className='w-3.5 h-3.5 fill-on-surface text-on-surface' />
            <span className='text-on-surface'>{room.rating.toFixed(2)}</span>
            <span>({room.reviewCount} Reviews)</span>
          </div>
        </div>
        <h1 className='font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-tight'>
          {room.title}
        </h1>
        <p className='text-sm text-on-surface-variant flex items-center gap-1 font-body'>
          <MapPin className='w-4 h-4 text-primary' />
          {room.city}, {room.country}
        </p>
      </div>

      {/* ── 2. AI CONCIERGE SUMMARY ── */}
      {fromAi && (
        <GlassCard className='p-6 border-primary/10 bg-primary/[0.01]'>
          <div className='flex items-start gap-4'>
            <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20'>
              <Sparkles className='w-5 h-5 text-primary' />
            </div>
            <div className='space-y-2'>
              <h3 className='font-headline font-bold text-sm uppercase tracking-wider text-primary'>
                AI Concierge Curation Summary
              </h3>
              <p className='text-sm text-on-surface font-headline font-bold italic leading-relaxed'>
                "An architectural sanctuary optimized for light, privacy, and
                seamless indoor-outdoor living."
              </p>
              <p className='text-xs text-on-surface-variant font-body leading-relaxed'>
                This residence is handpicked for its exceptional spatial
                configuration. The layout features natural stone,
                floor-to-ceiling glass paneling, and curated local textures to
                evoke a sense of calm. Our local host is prepared to arrange
                private transfers and bespoke wellness programs.
              </p>
            </div>
          </div>
        </GlassCard>
      )}
      {/* ── 8. AI CHAT ASSISTANT WIDGET ── */}
      <section className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Bot className='w-5 h-5 text-primary' />
          <h2 className='font-headline text-lg font-bold text-on-surface'>
            Ask the Concierge about this Stay
          </h2>
        </div>

        {chatHistory.length > 0 && (
          <div className='space-y-3 bg-surface-container-low/40 p-4 rounded-2xl border border-outline-variant/10 max-h-80 overflow-y-auto'>
            {chatHistory.map((msg, idx) => (
              <AIChatBubble key={idx} role={msg.role} content={msg.content} />
            ))}
            {isAiLoading && (
              <div className='flex gap-4 items-start'>
                <ThinkingIndicator />
              </div>
            )}
          </div>
        )}

        <form
          onSubmit={handleAskSubmit}
          className='flex gap-2 items-center bg-white p-2 border border-outline-variant/25 rounded-2xl shadow-ambient-sm'
        >
          <input
            type='text'
            placeholder='Ask about sunset views, private chef options, or amenities...'
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            disabled={isAiLoading}
            className='flex-grow bg-transparent border-0 text-xs font-body text-on-surface focus:ring-0 focus:outline-none px-3'
          />
          <button
            type='submit'
            disabled={isAiLoading || !askInput.trim()}
            className='w-9 h-9 rounded-xl bg-on-surface hover:bg-primary text-white flex items-center justify-center transition-all duration-300 disabled:opacity-40'
          >
            <Send className='w-3.5 h-3.5' />
          </button>
        </form>
      </section>

      {/* ── 4. ARCHITECTURE STORY ── */}
      <section className='space-y-4 pt-4 border-t border-outline-variant/10'>
        <h2 className='font-headline text-xl font-bold text-on-surface flex items-center gap-2'>
          <Compass className='w-5 h-5 text-primary' /> The Architectural Story
        </h2>
        <p className='text-sm text-on-surface-variant font-body leading-relaxed'>
          Crafted in harmony with the surrounding landscape, this suite
          represents the pinnacle of modern structural design. Utilizing local
          volcanic stone and soaring timber beams, the layout provides
          structural transparency while maintaining complete acoustic insulation
          and thermal privacy.
        </p>
      </section>

      {/* ── 5. PROPERTY HIGHLIGHTS ── */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10'>
        <div className='space-y-2'>
          <h3 className='font-headline font-bold text-sm text-on-surface'>
            Spatial Freedom
          </h3>
          <p className='text-xs text-on-surface-variant font-body leading-relaxed'>
            Unrestricted transition between indoor rooms and private terraces,
            designed to maximize daylight exposure.
          </p>
        </div>
        <div className='space-y-2'>
          <h3 className='font-headline font-bold text-sm text-on-surface'>
            Bespoke Curation
          </h3>
          <p className='text-xs text-on-surface-variant font-body leading-relaxed'>
            All furniture pieces are hand-selected, organic fabrications crafted
            by local designers.
          </p>
        </div>
      </section>

      {/* ── 6. LIFESTYLE EXPERIENCE ── */}
      <section className='space-y-4 pt-4 border-t border-outline-variant/10'>
        <h2 className='font-headline text-xl font-bold text-on-surface italic'>
          The Living Experience
        </h2>
        <p className='text-sm text-on-surface-variant font-body leading-relaxed italic'>
          "Wake to the gentle sound of nature, steps from your private infinity
          terrace. Afternoon breezes cool the open-air dining pavilion,
          preparing you for an evening culinary curation prepared by your
          dedicated host."
        </p>
      </section>

      {/* ── 7. AMENITIES ── */}
      <div className='pt-4 border-t border-outline-variant/10'>
        {amenitiesList}
      </div>

      {/* ── 9. VIRTUAL WALKTHROUGH ── */}
      <section className='pt-8 border-t border-outline-variant/10'>
        <RoomVirtualTour
          is3dActive={is3dActive}
          setIs3dActive={setIs3dActive}
          tour3dUrl={room.tour3dUrl}
        />
      </section>
      {/* ── 8. GUEST IMPRESSIONS ── */}
      <div className='pt-4 border-t border-outline-variant/10'>
        {reviewsList}
      </div>
    </div>
  );
};
