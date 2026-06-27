import React, { useEffect, useRef, useState } from 'react';
import { Room } from '../../types/room.types';

interface MapWidgetProps {
  rooms: Room[];
  focusedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

interface Attraction {
  name: string;
  lat: number;
  lng: number;
  category: string;
  distance: string;
  image: string;
}

// Curated landmarks, dining, and scenic spots around the room geolocations
const nearbyAttractions: Record<string, Attraction[]> = {
  azure: [
    { name: 'Oia Castle Sunset Point', lat: 36.4630, lng: 25.3725, category: 'Landmark', distance: '0.2 miles', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=150&h=100&fit=crop' },
    { name: 'Ammoudi Bay Seafood', lat: 36.4600, lng: 25.3700, category: 'Dining', distance: '0.5 miles', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=150&h=100&fit=crop' },
    { name: 'Katharos Beach', lat: 36.4680, lng: 25.3620, category: 'Beach', distance: '1.2 miles', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=100&fit=crop' }
  ],
  obsidian: [
    { name: 'Tumalo Falls Trail', lat: 44.0320, lng: -121.3320, category: 'Hiking', distance: '2.5 miles', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=100&fit=crop' },
    { name: 'Deschutes River Park', lat: 44.0650, lng: -121.3050, category: 'Nature', distance: '1.0 miles', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=150&h=100&fit=crop' }
  ],
  rose: [
    { name: 'Central Park Rowboats', lat: 40.7750, lng: -73.9680, category: 'Park', distance: '0.3 miles', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=150&h=100&fit=crop' },
    { name: 'The Met Museum of Art', lat: 40.7794, lng: -73.9632, category: 'Museum', distance: '0.4 miles', image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=150&h=100&fit=crop' }
  ],
  emerald: [
    { name: 'Sacred Monkey Forest', lat: -8.5190, lng: 115.2620, category: 'Sanctuary', distance: '1.5 miles', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=150&h=100&fit=crop' },
    { name: 'Campuhan Ridge Walk', lat: -8.5020, lng: 115.2530, category: 'Scenic Walk', distance: '1.2 miles', image: 'https://images.unsplash.com/photo-1598751337485-0d57b10214a8?w=150&h=100&fit=crop' }
  ],
  sunset: [
    { name: 'Coral Reef Dive Area', lat: 3.2050, lng: 73.2220, category: 'Reef', distance: '0.1 miles', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=150&h=100&fit=crop' },
    { name: 'Private Lagoon Dining', lat: 3.2010, lng: 73.2180, category: 'Dining', distance: '0.3 miles', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&h=100&fit=crop' }
  ],
  minimalist: [
    { name: 'Shibuya Crossing', lat: 35.6595, lng: 139.7005, category: 'Landmark', distance: '0.1 miles', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=150&h=100&fit=crop' },
    { name: 'Yoyogi Park Walkway', lat: 35.6710, lng: 139.6950, category: 'Park', distance: '0.9 miles', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=150&h=100&fit=crop' }
  ]
};

const getAttractionsForRoom = (roomTitle: string) => {
  const title = roomTitle.toLowerCase();
  if (title.includes('azure')) return nearbyAttractions.azure;
  if (title.includes('obsidian')) return nearbyAttractions.obsidian;
  if (title.includes('rose')) return nearbyAttractions.rose;
  if (title.includes('emerald')) return nearbyAttractions.emerald;
  if (title.includes('sunset')) return nearbyAttractions.sunset;
  if (title.includes('minimalist')) return nearbyAttractions.minimalist;
  return [];
};

export function MapWidget({ rooms, focusedRoomId, onSelectRoom }: MapWidgetProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const attractionMarkersRef = useRef<any[]>([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet CSS and JS dynamically from CDN
  useEffect(() => {
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.crossOrigin = '';
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;

    let centerLat = 20.0;
    let centerLng = 0.0;
    let initialZoom = 2;

    if (focusedRoomId) {
      const room = rooms.find(r => r.id === focusedRoomId);
      if (room && room.latitude && room.longitude) {
        centerLat = room.latitude;
        centerLng = room.longitude;
        initialZoom = 12;
      }
    } else if (rooms.length > 0) {
      const validRooms = rooms.filter(r => r.latitude !== null && r.longitude !== null);
      if (validRooms.length > 0) {
        centerLat = validRooms.reduce((sum, r) => sum + r.latitude!, 0) / validRooms.length;
        centerLng = validRooms.reduce((sum, r) => sum + r.longitude!, 0) / validRooms.length;
        initialZoom = validRooms.length === 1 ? 12 : 3;
      }
    }

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false, // Disables Leaflet default footer/attribution
    }).setView([centerLat, centerLng], initialZoom);

    // Premium light-themed tiles
    const geoapifyApiKey = '84624a1c611947058305920159e034c3';
    L.tileLayer(`https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=${geoapifyApiKey}`, {
      maxZoom: 20,
    }).addTo(map);

    L.control.zoom({
      position: 'topright',
    }).addTo(map);

    leafletMap.current = map;

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [leafletLoaded]);

  // Handle Markers & Nearby Attractions
  useEffect(() => {
    if (!leafletMap.current || !leafletLoaded) return;
    const L = (window as any).L;
    const map = leafletMap.current;

    // Clear main markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Clear attraction markers
    attractionMarkersRef.current.forEach(marker => marker.remove());
    attractionMarkersRef.current = [];

    rooms.forEach(room => {
      if (room.latitude === null || room.longitude === null || room.latitude === undefined || room.longitude === undefined) return;

      const isFocused = room.id === focusedRoomId;

      const pinHtml = `
        <div class="relative flex flex-col items-center cursor-pointer transition-transform duration-300 ${
          isFocused ? 'scale-110 z-[1000]' : 'hover:scale-105'
        }">
          <div class="px-3 py-1.5 rounded-full text-xs font-bold shadow-ambient border-2 transition-all duration-300 ${
            isFocused
              ? 'bg-[#ba0036] text-white border-white'
              : 'bg-white text-[#1a1c1c] border-outline-variant/30 hover:bg-[#ba0036] hover:text-white hover:border-white'
          }">
            £${room.pricePerNight}
          </div>
          <div class="w-2.5 h-2.5 rotate-45 -mt-1.5 border-r border-b transition-all duration-300 ${
            isFocused
              ? 'bg-[#ba0036] border-white'
              : 'bg-white border-outline-variant/30'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-map-pin',
        iconSize: [60, 36],
        iconAnchor: [30, 36],
      });

      const marker = L.marker([room.latitude, room.longitude], { icon: customIcon })
        .addTo(map)
        .on('click', (e: any) => {
          if (e.originalEvent) {
            e.originalEvent.stopPropagation();
          }
          onSelectRoom(room.id);
        });

      marker.bindPopup(`
        <div class="p-1 font-body text-[#1a1c1c] w-48">
          <img src="${room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'}" alt="${room.title}" class="w-full h-24 object-cover rounded-lg mb-2" />
          <h4 class="font-headline font-bold text-xs line-clamp-1 mb-0.5">${room.title}</h4>
          <p class="text-[10px] text-[#5c3f41] mb-1.5">${room.city}, ${room.country}</p>
          <div class="flex items-center justify-between border-t border-outline-variant/10 pt-1.5">
            <span class="font-bold text-xs text-[#ba0036]">£${room.pricePerNight} <span class="font-normal text-[10px] text-[#5c3f41]">/ night</span></span>
            <a href="/room/${room.id}" class="text-[10px] bg-[#ba0036] text-white px-2 py-0.5 rounded font-bold hover:bg-[#e21e4a] transition-colors decoration-none">Details</a>
          </div>
        </div>
      `, {
        closeButton: false,
        offset: [0, -26],
      });

      markersRef.current[room.id] = marker;

      if (isFocused) {
        marker.openPopup();

        // Render nearby attractions for focused room
        const attractions = getAttractionsForRoom(room.title);
        attractions.forEach(attraction => {
          const attractionPinHtml = `
            <div class="relative flex items-center justify-center cursor-pointer scale-90 z-[900]">
              <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center border-2 border-white shadow-ambient hover:scale-110 transition-transform">
                ★
              </div>
            </div>
          `;

          const attractionIcon = L.divIcon({
            html: attractionPinHtml,
            className: 'custom-attraction-pin',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const attractionMarker = L.marker([attraction.lat, attraction.lng], { icon: attractionIcon })
            .addTo(map);

          attractionMarker.bindPopup(`
            <div class="p-1 font-body text-[#1a1c1c] w-40">
              <img src="${attraction.image}" alt="${attraction.name}" class="w-full h-20 object-cover rounded-md mb-2" />
              <span class="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[8px] font-bold uppercase tracking-wider mb-1">${attraction.category}</span>
              <h4 class="font-bold text-xs leading-snug">${attraction.name}</h4>
              <p class="text-[10px] text-primary font-semibold mt-1">${attraction.distance} from suite</p>
            </div>
          `, {
            closeButton: false,
            offset: [0, -10],
          });

          attractionMarkersRef.current.push(attractionMarker);
        });
      }
    });
  }, [rooms, focusedRoomId, leafletLoaded]);

  // Center/Pan when focusedRoomId changes
  useEffect(() => {
    if (!leafletMap.current || !focusedRoomId) return;
    const map = leafletMap.current;
    const room = rooms.find(r => r.id === focusedRoomId);

    if (room && room.latitude !== undefined && room.longitude !== undefined && room.latitude !== null && room.longitude !== null) {
      map.setView([room.latitude, room.longitude], 13, {
        animate: true,
        duration: 0.8,
      });

      const marker = markersRef.current[room.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [focusedRoomId, rooms]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-r-xl select-none">
      {!leafletLoaded && (
        <div className="absolute inset-0 bg-surface-container-low flex items-center justify-center text-on-surface-variant text-sm font-semibold animate-pulse z-20">
          Loading editorial map...
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Floating Map Instructions Card */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-xl shadow-ambient border border-outline-variant/15 max-w-[230px]">
        <h4 className="text-[10px] font-extrabold text-[#1a1c1c] mb-1.5 uppercase tracking-widest text-[#ba0036]">Map Interaction</h4>
        <p className="text-[10px] text-[#5c3f41] leading-relaxed font-medium space-y-1">
          • Drag & scroll to explore.<br />
          • Click room price tags for preview.<br />
          • Select a room to view nearby attractions (★).
        </p>
      </div>
    </div>
  );
}
