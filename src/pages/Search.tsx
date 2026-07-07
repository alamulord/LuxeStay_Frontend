import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, MessageSquare } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { PropertyCard } from '../components/search/PropertyCard';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useRooms, prefetchRoom } from '../hooks/useRooms';
import { useFilterStore } from '../store/filterStore';
import { fadeIn, staggerContainer } from '../lib/animations';
import { MapWidget } from '../components/search/MapWidget';
import { FilterModal } from '../components/search/FilterModal';
import { SearchAiConcierge } from '../components/ai/SearchAiConcierge';
import { SearchFilterBar } from '../components/search/SearchFilterBar';
import api from '../lib/api';
import { Room } from '../types/room.types';

export function Search() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const focusRoomIdFromQuery = searchParams.get('focus');
  const aiPromptFromQuery = searchParams.get('ai_prompt');
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);

  // Traditional filter store
  const filters = useFilterStore();
  const { rooms: traditionalRooms, isLoading: isTraditionalLoading, error: traditionalError } = useRooms({
    location: filters.location,
    guests: filters.guests,
    bedrooms: filters.bedrooms,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    amenities: filters.amenities,
  });

  // AI Concierge State
  const [isAiMode, setIsAiMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [aiRooms, setAiRooms] = useState<(Room & { compatibilityScore?: number })[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Sync focusRoomId from query params
  useEffect(() => {
    if (focusRoomIdFromQuery) {
      setFocusedRoomId(focusRoomIdFromQuery);
    }
  }, [focusRoomIdFromQuery]);

  // Sync URL query parameters to the filter store
  useEffect(() => {
    const queryLocation = searchParams.get('location');
    if (queryLocation) {
      filters.setLocation(queryLocation);
    }
  }, [searchParams]);

  // Handle initial AI search prompt from URL query
  useEffect(() => {
    if (aiPromptFromQuery && chatMessages.length === 0) {
      setIsAiMode(true);
      handleSendAiSearch(decodeURIComponent(aiPromptFromQuery));
      // Remove query parameter to prevent repeated triggers
      const params = new URLSearchParams(searchParams);
      params.delete('ai_prompt');
      setSearchParams(params);
    }
  }, [aiPromptFromQuery]);

  const handleSelectRoom = (roomId: string) => {
    setFocusedRoomId(roomId);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('focus', roomId);
    setSearchParams(newParams);
    prefetchRoom(roomId);
  };

  const handleSendAiSearch = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;

    setIsAiLoading(true);
    const updatedMessages = [...chatMessages, { role: 'user' as const, content: userPrompt }];
    setChatMessages(updatedMessages);
    setAiInput('');

    try {
      const response = await api.post('/ai-search', { messages: updatedMessages });
      const reply = response.data.reply || "I've analyzed our portfolio for you.";
      
      setChatMessages([...updatedMessages, { role: 'assistant' as const, content: reply }]);
      
      if (response.data.results) {
        setAiRooms(response.data.results);
      }
    } catch (err: any) {
      console.error(err);
      setChatMessages([
        ...updatedMessages,
        { role: 'assistant' as const, content: "I encountered a connection issue. Let me try using our portfolio backup index to find the best matched Stays." }
      ]);
      // Fallback: copy traditional rooms
      setAiRooms(traditionalRooms.map(r => ({ ...r, compatibilityScore: 85 })));
    } finally {
      setIsAiLoading(false);
    }
  };

  const displayRooms = isAiMode ? aiRooms : traditionalRooms;
  const isLoading = isAiMode ? isAiLoading : isTraditionalLoading;
  const error = isAiMode ? null : traditionalError;

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      <Navbar />

      {/* Main Container - Standard Vertical Scroll */}
      <main className="pt-[88px] flex-grow flex flex-col">
        {/* Title & Mode Switcher Section */}
        <div className="max-w-page mx-auto w-full px-6 lg:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-outline-variant/10">
          <div className="flex gap-4">
            <button
              onClick={() => setIsAiMode(false)}
              className={`pb-2 text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all duration-300 ${
                !isAiMode 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Filters Search
            </button>
            <button
              onClick={() => setIsAiMode(true)}
              className={`pb-2 text-xs font-headline font-bold uppercase tracking-wider border-b-2 transition-all duration-300 flex items-center gap-1.5 ${
                isAiMode 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> AI Concierge
            </button>
          </div>
          
          {!isAiMode && (
            <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface-variant">
              {displayRooms.length} Stays Found
            </span>
          )}
        </div>

        {/* Filter Bar (Traditional mode only) - Placed under header, full width */}
        {!isAiMode && (
          <div className="max-w-page mx-auto w-full px-6 lg:px-10 py-2 border-b border-outline-variant/10">
            <SearchFilterBar
              filters={filters}
              onOpenFilterModal={() => setIsFilterModalOpen(true)}
            />
          </div>
        )}

        {/* Side-by-Side Listings and Map Section */}
        <div className="max-w-page mx-auto w-full px-6 lg:px-10 py-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_45%] gap-10 items-start">
            
            {/* Left Column: Listings List & AI Chat Panel */}
            <div className="space-y-8">
              
              {/* Curation / Title Header */}
              <div>
                <h1 className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
                  {isAiMode ? 'AI Curation Results' : `Exquisite Stays${filters.location ? ` in ${filters.location}` : ''}`}
                </h1>
                <p className="text-[10px] text-on-surface-variant mt-1 font-headline font-bold uppercase tracking-widest">
                  {isAiMode ? 'Curated based on your conversation with the AI concierge' : 'Handpicked editorial collection of luxury retreats and boutiques'}
                </p>
              </div>

              {/* AI Concierge Chat Panel (AI Mode only) */}
              {isAiMode && (
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 overflow-hidden shadow-ambient-md">
                  <SearchAiConcierge
                    chatMessages={chatMessages}
                    aiInput={aiInput}
                    setAiInput={setAiInput}
                    isAiLoading={isAiLoading}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAiSearch(aiInput);
                    }}
                  />
                </div>
              )}

              {/* List of Stays */}
              {isLoading && chatMessages.length === 0 ? (
                <div className="space-y-6">
                  <LoadingSkeleton variant="card" className="h-[360px]" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <LoadingSkeleton variant="card" className="h-[280px]" />
                    <LoadingSkeleton variant="card" className="h-[280px]" />
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-error font-headline font-bold">{error}</p>
                </div>
              ) : displayRooms.length === 0 ? (
                <div className="text-center py-20 space-y-2">
                  <MessageSquare className="w-10 h-10 text-primary/30 mx-auto" />
                  <p className="text-on-surface-variant text-sm font-headline font-bold">No properties matched this description.</p>
                  <p className="text-[11px] text-on-surface-variant/60 font-body">Try describing a location, specific amenities, or budget range.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {isAiMode ? (
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                      {displayRooms.map((room) => (
                        <motion.div key={room.id} variants={fadeIn}>
                          <PropertyCard 
                            room={room} 
                            focusedRoomId={focusedRoomId}
                            onSelectRoom={handleSelectRoom}
                            isAiMode={isAiMode}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <>
                      {/* Asymmetric layout: Large card first */}
                      {displayRooms.length > 0 && (
                        <div className="mb-4">
                          <PropertyCard 
                            room={displayRooms[0]} 
                            variant="default" 
                            focusedRoomId={focusedRoomId}
                            onSelectRoom={handleSelectRoom}
                          />
                        </div>
                      )}

                      {/* Remaining Properties Grid */}
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        {displayRooms.slice(1).map((room) => (
                          <motion.div key={room.id} variants={fadeIn}>
                            <PropertyCard 
                              room={room} 
                              focusedRoomId={focusedRoomId}
                              onSelectRoom={handleSelectRoom}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Interactive Sticky Map */}
            <div className="sticky top-[108px] hidden md:block w-full h-[calc(100vh-140px)] min-h-[600px] max-h-[850px] rounded-[2rem] overflow-hidden shadow-ambient-lg border border-outline-variant/10 z-10 bg-surface-container-low">
              <MapWidget 
                rooms={displayRooms}
                focusedRoomId={focusedRoomId}
                onSelectRoom={handleSelectRoom}
              />
            </div>

          </div>
        </div>
      </main>

      {/* Full Width Footer at the bottom */}
      <Footer />

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </div>
  );
}