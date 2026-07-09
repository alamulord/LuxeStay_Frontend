import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

import { 
  ChevronLeft, ChevronRight, Info, Sparkles, 
  MapPin, Calendar, X, ArrowRight, Eye 
} from 'lucide-react';
import { Tour, TourScene, TourHotspot } from '../../types/tour.types';
import { GlassCard } from '../ui/GlassCard';

interface TourViewerProps {
  tour: Tour;
  onClose?: () => void;
}

export const TourViewer: React.FC<TourViewerProps> = ({ tour, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<Viewer | null>(null);
  
  // Sort scenes by orderIndex
  const sortedScenes = [...tour.scenes].sort((a, b) => a.orderIndex - b.orderIndex);
  
  const [activeScene, setActiveScene] = useState<TourScene>(sortedScenes[0] || null);
  const [activeInfoHotspot, setActiveInfoHotspot] = useState<TourHotspot | null>(null);

  const activeIndex = sortedScenes.findIndex(s => s.id === activeScene.id);

  // Navigate to previous scene
  const handlePrevScene = () => {
    if (activeIndex > 0) {
      setActiveScene(sortedScenes[activeIndex - 1]);
    } else {
      setActiveScene(sortedScenes[sortedScenes.length - 1]); // Wrap around
    }
    setActiveInfoHotspot(null);
  };

  // Navigate to next scene
  const handleNextScene = () => {
    if (activeIndex < sortedScenes.length - 1) {
      setActiveScene(sortedScenes[activeIndex + 1]);
    } else {
      setActiveScene(sortedScenes[0]); // Wrap around
    }
    setActiveInfoHotspot(null);
  };

  // Switch scene to a specific scene ID
  const handleSwitchScene = (sceneId: string) => {
    const scene = sortedScenes.find(s => s.id === sceneId);
    if (scene) {
      setActiveScene(scene);
      setActiveInfoHotspot(null);
    }
  };

  // Handle hotspot action (CTA or Info)
  const handleHotspotClick = (hotspot: TourHotspot) => {
    if (hotspot.type === 'navigation' && hotspot.targetSceneId) {
      handleSwitchScene(hotspot.targetSceneId);
    } else if (hotspot.type === 'info') {
      setActiveInfoHotspot(hotspot);
    } else if (hotspot.type === 'cta') {
      if (hotspot.action === 'book') {
        const bookingSection = document.getElementById('booking-sidebar');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          alert('Opening booking interface...');
        }
      } else {
        alert(`${hotspot.label} action triggered!`);
      }
    }
  };

  // ── PHOTO SPHERE VIEWER (360° Panorama Mode) ──
  useEffect(() => {
    if (activeScene.type !== 'panorama' || !containerRef.current) {
      // If we switched to normal image mode, clean up existing viewer
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
      return;
    }

    // Clean up previous viewer instance before rebuilding
    if (viewerInstanceRef.current) {
      viewerInstanceRef.current.destroy();
    }

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: activeScene.imageUrl,
      caption: `${activeScene.title} (${activeScene.roomType})`,
      loadingImg: 'https://photo-sphere-viewer.js.org/assets/loader.gif',
      defaultYaw: activeScene.initialYaw ?? 0,
      defaultPitch: activeScene.initialPitch ?? 0,
      defaultZoomLvl: activeScene.initialZoom ?? 50,
      navbar: [
        'autorotate',
        'zoom',
        'fullscreen',
        'caption',
      ],
      plugins: [
        [MarkersPlugin, {
          markers: [],
        }],
      ],
    });

    viewerInstanceRef.current = viewer;

    const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;

    // Load markers after viewer is ready
    viewer.addEventListener('ready', () => {
      // Add markers from scene hotspots
      activeScene.hotspots.forEach(hs => {
        if (hs.yaw === null || hs.pitch === null) return;
        
        let markerColor = 'bg-primary';
        if (hs.type === 'info') markerColor = 'bg-blue-500';
        if (hs.type === 'cta') markerColor = 'bg-emerald-500';

        markersPlugin.addMarker({
          id: hs.id,
          position: { yaw: hs.yaw as number, pitch: hs.pitch as number },
          html: `
            <div class="relative group cursor-pointer flex flex-col items-center">
              <div class="absolute inline-flex h-6 w-6 rounded-full ${markerColor}/40 animate-ping"></div>
              <div class="relative inline-flex rounded-full h-4 w-4 ${markerColor} border-2 border-white shadow-ambient flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              </div>
              <div class="mt-1.5 scale-95 opacity-90 transition-all duration-300 pointer-events-none">
                <span class="bg-black/85 backdrop-blur-md text-white font-headline text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-lg border border-white/10 whitespace-nowrap">
                  ${hs.label}
                </span>
              </div>
            </div>
          `,
          tooltip: {
            content: hs.label,
            position: 'top center',
          },
        });
      });
    });

    // Listen to marker click events
    markersPlugin.addEventListener('select-marker', (e: any) => {
      const hsId = e.marker.id;
      const hotspot = activeScene.hotspots.find(h => h.id === hsId);
      if (hotspot) {
        handleHotspotClick(hotspot);
      }
    });

    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.destroy();
        viewerInstanceRef.current = null;
      }
    };
  }, [activeScene]);

  return (
    <div className="relative w-full h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/15 select-none flex flex-col justify-between">
      
      {/* ── HEADER PANEL ── */}
      <div className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-6 pointer-events-none flex items-start justify-between">
        <div className="text-white space-y-1">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-[9px] font-headline font-bold text-primary uppercase border border-primary/25">
            <Sparkles className="w-3 h-3 animate-pulse" />
            {tour.mode === 'hybrid' ? 'Interactive Tour' : tour.mode === '360_virtual' ? '360 Virtual Tour' : 'Photo Walkthrough'}
          </span>
          <h3 className="font-headline font-black text-xl md:text-2xl leading-none">
            {activeScene.title}
          </h3>
          <p className="text-white/60 text-xs font-body font-light flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {activeScene.roomType}
          </p>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          {onClose && (
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors shadow-lg active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── VIEWER CONTAINER ── */}
      <div className="relative w-full flex-grow overflow-hidden">
        {activeScene.type === 'panorama' ? (
          /* 360° Equirectangular Viewer */
          <div ref={containerRef} className="w-full h-full" />
        ) : (
          /* Standard Photo Walkthrough with Absolute Hotspots */
          <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
            <img 
              src={activeScene.imageUrl} 
              alt={activeScene.title} 
              className="w-full h-full object-cover transition-all duration-700 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Render absolute-positioned walkthrough hotspots */}
            {activeScene.hotspots.map(hs => {
              if (hs.xPercent === null || hs.yPercent === null) return null;
              
              let hotspotColor = 'bg-primary';
              if (hs.type === 'info') hotspotColor = 'bg-blue-500';
              if (hs.type === 'cta') hotspotColor = 'bg-emerald-500';

              return (
                <button
                  key={hs.id}
                  onClick={() => handleHotspotClick(hs)}
                  style={{ top: `${hs.yPercent}%`, left: `${hs.xPercent}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center cursor-pointer active:scale-90 transition-transform duration-200"
                >
                  <div className="relative flex items-center justify-center">
                    <span className={`absolute inline-flex h-8 w-8 rounded-full ${hotspotColor}/40 animate-ping`}></span>
                    <span className={`relative inline-flex rounded-full h-5 w-5 ${hotspotColor} border-2 border-white shadow-ambient flex items-center justify-center`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>
                  </div>
                  
                  {/* Tooltip Label */}
                  <span className="mt-2 scale-95 opacity-90 transition-all duration-300 pointer-events-none bg-black/85 backdrop-blur-md text-white font-headline text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-lg border border-white/10 whitespace-nowrap block">
                    {hs.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* ── ARROW NAVIGATION (WALKTHROUGH GESTURES) ── */}
        <button 
          onClick={handlePrevScene}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={handleNextScene}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/30 hover:bg-black/55 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── BOTTOM THUMBNAIL STRIP ── */}
      <div className="bg-gradient-to-t from-black/90 to-black/30 p-5 pt-8 z-30 flex items-center gap-3 overflow-x-auto no-scrollbar justify-start md:justify-center border-t border-white/5 pointer-events-auto">
        {sortedScenes.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => handleSwitchScene(scene.id)}
            className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md ${
              activeScene.id === scene.id
                ? 'border-primary scale-105 shadow-primary/20'
                : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-102'
            }`}
          >
            <img 
              src={scene.thumbnailUrl} 
              alt={scene.title} 
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            {scene.type === 'panorama' && (
              <span className="absolute bottom-1 right-1 px-1 rounded bg-black/75 text-[7px] font-headline font-bold text-white flex items-center gap-0.5">
                <Eye className="w-2.5 h-2.5" /> 360°
              </span>
            )}
            <div className="absolute inset-0 bg-black/10" />
          </button>
        ))}
      </div>

      {/* ── INFO POPUP DIALOG OVERLAY ── */}
      {activeInfoHotspot && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <GlassCard className="max-w-md w-full p-6 space-y-4 border-white/10 bg-surface-container-lowest/90 relative shadow-2xl animate-in fade-in duration-300">
            <button 
              onClick={() => setActiveInfoHotspot(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-5 h-5" />
              <h4 className="font-headline font-bold text-base text-on-surface uppercase tracking-wider">
                {activeInfoHotspot.label}
              </h4>
            </div>
            <p className="text-sm font-body text-on-surface-variant leading-relaxed">
              Explore the premium detailing of this suite selection. Handcrafted spatial spacing designed exclusively for LuxeStay guests.
            </p>
            <button
              onClick={() => setActiveInfoHotspot(null)}
              className="px-5 py-2.5 bg-on-surface text-surface hover:bg-primary hover:text-white rounded-lg font-headline font-bold text-xs uppercase tracking-wider transition-colors w-full"
            >
              Close details
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
