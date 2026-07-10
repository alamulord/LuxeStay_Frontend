import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

import { 
  Sparkles, Check, Trash, Plus, ChevronUp, ChevronDown, 
  ArrowLeft, RefreshCw, Eye, Edit3, X, Save, HelpCircle, AlertCircle
} from 'lucide-react';
import api from '../../lib/api';
import { cn } from '../../lib/utils';
import { Tour, TourScene, TourHotspot } from '../../types/tour.types';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { TourViewer } from '../../components/property/TourViewer';

export function AdminTourBuilder() {
  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Custom Notification Modal State
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'confirm' | 'info';
    onConfirm?: () => void;
  } | null>(null);

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setNotification({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      onConfirm,
    });
  };
  
  // Progress Simulation States
  const [generationType, setGenerationType] = useState<'tour' | 'hotspots' | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState('');

  const [activeScene, setActiveScene] = useState<TourScene | null>(null);
  
  // Hotspot Form Modal State
  const [isHotspotModalOpen, setIsHotspotModalOpen] = useState(false);
  const [newHotspotCoords, setNewHotspotCoords] = useState<{ x?: number; y?: number; yaw?: number; pitch?: number } | null>(null);
  const [hotspotLabel, setHotspotLabel] = useState('');
  const [hotspotType, setHotspotType] = useState<'navigation' | 'info' | 'cta'>('navigation');
  const [hotspotTargetSceneId, setHotspotTargetSceneId] = useState('');
  const [hotspotAction, setHotspotAction] = useState('book');

  // Editing existing hotspot
  const [editingHotspot, setEditingHotspot] = useState<TourHotspot | null>(null);

  // 360 Viewer ref
  const psvContainerRef = useRef<HTMLDivElement>(null);
  const psvInstanceRef = useRef<Viewer | null>(null);

  const fetchTour = async () => {
    try {
      setIsLoading(true);
      const res = await api.get<Tour>(`/rooms/${roomId}/tour`);
      setTour(res.data);
      
      if (res.data.scenes.length > 0) {
        const sorted = [...res.data.scenes].sort((a, b) => a.orderIndex - b.orderIndex);
        
        // Preserve active scene if it exists in the updated tour
        if (activeScene) {
          const stillExists = sorted.find(s => s.id === activeScene.id);
          if (stillExists) {
            setActiveScene(stillExists);
            return;
          }
        }
        
        setActiveScene(sorted[0]);
      } else {
        setActiveScene(null);
      }
    } catch (err) {
      console.log('No tour found for this room');
      setTour(null);
      setActiveScene(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [roomId]);

  const startProgressSimulation = (type: 'tour' | 'hotspots') => {
    setGenerationType(type);
    setGenerationProgress(0);
    
    const phases = type === 'tour'
      ? [
          { threshold: 15, text: "Initialising tour workspace..." },
          { threshold: 35, text: "Downloading and analyzing image aspect ratios..." },
          { threshold: 55, text: "Categorising scene frames (Standard vs 360 Panorama)..." },
          { threshold: 75, text: "Running NVIDIA NIM MiniMax-M3 Multimodal spatial suggestions..." },
          { threshold: 92, text: "Drafting interactive hotspot node coordinates..." },
          { threshold: 98, text: "Finalising tour configuration details..." }
        ]
      : [
          { threshold: 25, text: "Preparing scene assets for visual analysis..." },
          { threshold: 55, text: "Invoking NVIDIA NIM MiniMax-M3 Multimodal Vision API..." },
          { threshold: 85, text: "Drafting spatial coordinates and navigation labels..." },
          { threshold: 98, text: "Saving draft suggestions to database..." }
        ];

    setGenerationPhase(phases[0].text);

    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 98) {
          return 98; // Hold at 98% until request completes
        }
        
        const nextProgress = prev + Math.floor(Math.random() * 8) + 2;
        const boundedProgress = Math.min(nextProgress, 98);
        
        const matchedPhase = phases.find(p => boundedProgress <= p.threshold);
        if (matchedPhase) {
          setGenerationPhase(matchedPhase.text);
        }

        return boundedProgress;
      });
    }, 1200);

    return interval;
  };

  // Handle Tour Generation
  const handleGenerateTour = async () => {
    setIsGenerating(true);
    const progressInterval = startProgressSimulation('tour');
    try {
      const res = await api.post<Tour>(`/rooms/${roomId}/tour/generate`);
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationPhase("Tour generated successfully!");
      
      setTimeout(() => {
        setTour(res.data);
        if (res.data.scenes.length > 0) {
          const sorted = [...res.data.scenes].sort((a, b) => a.orderIndex - b.orderIndex);
          setActiveScene(sorted[0]);
        }
        setIsGenerating(false);
        setGenerationType(null);
      }, 1000);

    } catch (error: any) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setGenerationType(null);
      setGenerationProgress(0);
      const msg = error?.response?.data?.message || error?.message || 'Failed to generate tour. Verify that room has images.';
      showAlert('Error', msg, 'error');
    }
  };

  // Handle Hotspots Suggestions
  const handleSuggestHotspots = async () => {
    if (!tour) return;
    setIsSuggesting(true);
    const progressInterval = startProgressSimulation('hotspots');
    try {
      const res = await api.post<Tour>(`/tours/${tour.id}/suggest-hotspots`);
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationPhase("Hotspots suggested successfully!");
      
      setTimeout(() => {
        setTour(res.data);
        // Directly update activeScene from fresh response — no null flash
        if (activeScene) {
          const updatedScene = res.data.scenes.find((s: { id: string }) => s.id === activeScene.id);
          if (updatedScene) {
            setActiveScene({ ...updatedScene });
          }
        }
        setIsSuggesting(false);
        setGenerationType(null);
      }, 1000);

    } catch (error: any) {
      clearInterval(progressInterval);
      setIsSuggesting(false);
      setGenerationType(null);
      setGenerationProgress(0);
      const msg = error?.response?.data?.message || error?.message || 'Failed to suggest hotspots.';
      showAlert('Error', msg, 'error');
    }
  };

  // Reorder Scenes (Move Up/Down)
  const handleMoveScene = async (sceneId: string, direction: 'up' | 'down') => {
    if (!tour) return;
    const sorted = [...tour.scenes].sort((a, b) => a.orderIndex - b.orderIndex);
    const index = sorted.findIndex(s => s.id === sceneId);
    
    if (direction === 'up' && index > 0) {
      const prevScene = sorted[index - 1];
      const currScene = sorted[index];
      
      // Swap orderIndex
      const temp = prevScene.orderIndex;
      prevScene.orderIndex = currScene.orderIndex;
      currScene.orderIndex = temp;

      await Promise.all([
        api.patch(`/tour-scenes/${prevScene.id}`, { orderIndex: prevScene.orderIndex }),
        api.patch(`/tour-scenes/${currScene.id}`, { orderIndex: currScene.orderIndex })
      ]);
      
      fetchTour();
    } else if (direction === 'down' && index < sorted.length - 1) {
      const nextScene = sorted[index + 1];
      const currScene = sorted[index];

      // Swap orderIndex
      const temp = nextScene.orderIndex;
      nextScene.orderIndex = currScene.orderIndex;
      currScene.orderIndex = temp;

      await Promise.all([
        api.patch(`/tour-scenes/${nextScene.id}`, { orderIndex: nextScene.orderIndex }),
        api.patch(`/tour-scenes/${currScene.id}`, { orderIndex: currScene.orderIndex })
      ]);

      fetchTour();
    }
  };

  // Delete Scene
  const handleDeleteScene = async (sceneId: string) => {
    showConfirm(
      'Delete Scene',
      'Are you sure you want to delete this scene? All associated hotspots will be lost.',
      async () => {
        try {
          await api.delete(`/tour-scenes/${sceneId}`);
          if (activeScene?.id === sceneId) {
            setActiveScene(null);
          }
          fetchTour();
        } catch (err) {
          showAlert('Error', 'Failed to delete scene', 'error');
        }
      }
    );
  };

  // Capture Hotspot Clicks (Normal Walkthrough Images)
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (editingHotspot) return; // Ignore click when editing an existing one
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewHotspotCoords({ x, y });
    setHotspotLabel('');
    setHotspotType('navigation');
    
    // Default to first target scene option
    const otherScenes = tour?.scenes.filter(s => s.id !== activeScene?.id) || [];
    setHotspotTargetSceneId(otherScenes[0]?.id || '');
    setHotspotAction('book');
    setEditingHotspot(null);
    setIsHotspotModalOpen(true);
  };

  // 360 Panorama Click capture & rendering
  useEffect(() => {
    if (!activeScene || activeScene.type !== 'panorama' || !psvContainerRef.current || previewMode) {
      if (psvInstanceRef.current) {
        psvInstanceRef.current.destroy();
        psvInstanceRef.current = null;
      }
      return;
    }

    if (psvInstanceRef.current) {
      psvInstanceRef.current.destroy();
    }

    const viewer = new Viewer({
      container: psvContainerRef.current,
      panorama: activeScene.imageUrl,
      defaultYaw: activeScene.initialYaw ?? 0,
      defaultPitch: activeScene.initialPitch ?? 0,
      navbar: ['zoom', 'fullscreen'],
      plugins: [
        [MarkersPlugin, { markers: [] }],
      ],
    });

    psvInstanceRef.current = viewer;

    const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;

    // Render hotspots as markers
    viewer.addEventListener('ready', () => {
      activeScene.hotspots.forEach(hs => {
        if (hs.yaw === null || hs.pitch === null) return;
        
        let markerColor = hs.approved ? 'bg-primary' : 'bg-yellow-500 border-dashed border-yellow-300';
        if (hs.type === 'info') markerColor = hs.approved ? 'bg-blue-500' : 'bg-yellow-500 border-dashed';
        if (hs.type === 'cta') markerColor = hs.approved ? 'bg-emerald-500' : 'bg-yellow-500 border-dashed';

        markersPlugin.addMarker({
          id: hs.id,
          position: { yaw: hs.yaw as number, pitch: hs.pitch as number },
          html: `
            <div class="relative group cursor-pointer flex flex-col items-center">
              ${!hs.approved ? '<span class="absolute -top-3 text-[7px] font-bold text-yellow-300 bg-black/80 px-1 rounded animate-pulse">AI</span>' : ''}
              <div class="absolute inline-flex h-5 w-5 rounded-full ${hs.approved ? markerColor : 'bg-yellow-500'}/35 animate-ping"></div>
              <div class="relative inline-flex rounded-full h-3.5 w-3.5 ${markerColor} border border-white shadow flex items-center justify-center">
                <span class="w-1 h-1 rounded-full bg-white"></span>
              </div>
              <span class="mt-1 bg-black/80 text-white font-headline text-[8px] px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-80">
                ${hs.label}
              </span>
            </div>
          `,
        });
      });
    });

    // Capture click on 360 viewer to place a hotspot
    viewer.addEventListener('click', (e: any) => {
      // Ignore clicks on existing markers
      if (e.data.rightclick || e.data.marker) return;

      const { yaw, pitch } = e.data;
      setNewHotspotCoords({ yaw, pitch });
      setHotspotLabel('');
      setHotspotType('navigation');
      
      const otherScenes = tour?.scenes.filter(s => s.id !== activeScene?.id) || [];
      setHotspotTargetSceneId(otherScenes[0]?.id || '');
      setHotspotAction('book');
      setEditingHotspot(null);
      setIsHotspotModalOpen(true);
    });

    // Marker click event to edit or delete
    markersPlugin.addEventListener('select-marker', (e: any) => {
      const hsId = e.marker.id;
      const hotspot = activeScene.hotspots.find(h => h.id === hsId);
      if (hotspot) {
        setEditingHotspot(hotspot);
        setHotspotLabel(hotspot.label);
        setHotspotType(hotspot.type);
        setHotspotTargetSceneId(hotspot.targetSceneId || '');
        setHotspotAction(hotspot.action || 'book');
        setIsHotspotModalOpen(true);
      }
    });

    return () => {
      if (psvInstanceRef.current) {
        psvInstanceRef.current.destroy();
        psvInstanceRef.current = null;
      }
    };
  }, [activeScene, previewMode]);

  // Create or Update Hotspot
  const handleSaveHotspot = async () => {
    if (!hotspotLabel.trim()) {
      showAlert('Required Field', 'Label is required', 'info');
      return;
    }

    const payload: any = {
      sceneId: activeScene?.id,
      type: hotspotType,
      label: hotspotLabel,
      targetSceneId: hotspotType === 'navigation' ? hotspotTargetSceneId || null : null,
      action: hotspotType === 'cta' ? hotspotAction : null,
      approved: true, // Manually saved/modified hotspots are pre-approved
    };

    try {
      if (editingHotspot) {
        // Update Hotspot
        await api.patch(`/tour-hotspots/${editingHotspot.id}`, payload);
      } else if (newHotspotCoords) {
        // Create Hotspot
        payload.xPercent = newHotspotCoords.x ?? null;
        payload.yPercent = newHotspotCoords.y ?? null;
        payload.yaw = newHotspotCoords.yaw ?? null;
        payload.pitch = newHotspotCoords.pitch ?? null;
        payload.generatedBy = 'admin';

        await api.post('/tour-hotspots', payload);
      }

      setIsHotspotModalOpen(false);
      setEditingHotspot(null);
      setNewHotspotCoords(null);
      fetchTour();
    } catch (err) {
      showAlert('Error', 'Failed to save hotspot', 'error');
    }
  };

  // Delete Hotspot
  const handleDeleteHotspot = async (hotspotId: string) => {
    showConfirm('Delete Hotspot', 'Are you sure you want to delete this hotspot?', async () => {
      try {
        await api.delete(`/tour-hotspots/${hotspotId}`);
        setIsHotspotModalOpen(false);
        setEditingHotspot(null);
        fetchTour();
      } catch (err) {
        showAlert('Error', 'Failed to delete hotspot', 'error');
      }
    });
  };

  // Approve AI hotspot
  const handleApproveHotspot = async (hotspotId: string) => {
    try {
      await api.patch(`/tour-hotspots/${hotspotId}`, { approved: true });
      fetchTour();
    } catch (err) {
      showAlert('Error', 'Failed to approve hotspot', 'error');
    }
  };

  // Publish Tour
  const handlePublishTour = async () => {
    if (!tour) return;
    try {
      await api.post(`/tours/${tour.id}/publish`);
      fetchTour();
      showAlert('Success', 'Tour published successfully! Guests can now explore it.', 'success');
    } catch (err) {
      showAlert('Error', 'Failed to publish tour', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex text-on-surface font-body select-none">
      <AdminSidebar />

      <div className="flex-1 ml-[260px] flex flex-col min-w-0">
        <AdminTopBar title="Interactive Tour Builder" />

        <div className="flex-grow p-6 lg:p-10 space-y-6 overflow-y-auto">
          {/* Header Controls */}
          <div className="flex items-start justify-between flex-wrap gap-4 border-b border-outline-variant/10 pb-5">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/admin/rooms')}
                className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center border border-outline-variant/15 text-on-surface-variant transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="font-headline font-black text-2xl">Property Space Tour</h1>
                <p className="text-xs text-on-surface-variant">Configure visual walkthrough frames and 360 degree hotspots.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {/* AI Suggest Hotspots — always top of the button list when tour exists */}
              {tour && (
                <button
                  onClick={handleSuggestHotspots}
                  disabled={isSuggesting || isGenerating}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md ring-2 ring-indigo-200"
                  title="Generate draft hotspots using AI vision analysis"
                >
                  <Sparkles className={`w-4 h-4 ${isSuggesting ? 'animate-pulse' : ''}`} />
                  {isSuggesting ? 'Suggesting...' : 'AI Suggest Hotspots'}
                </button>
              )}

              {tour && (
                <>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 border shadow-sm ${
                      previewMode 
                        ? 'bg-primary text-white border-primary shadow-primary/20' 
                        : 'bg-white text-on-surface hover:bg-surface-container border-outline-variant/15'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {previewMode ? 'Exit Preview' : 'Guest Preview'}
                  </button>

                  <button
                    onClick={() => window.open(`/room/${roomId}`, '_blank')}
                    className="px-5 py-2.5 bg-white text-on-surface hover:bg-surface-container border border-outline-variant/15 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1.5"
                    title="Preview public room detail page with draft tour"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                    Preview Room Page
                  </button>

                  <button
                    onClick={handlePublishTour}
                    disabled={tour.status === 'published'}
                    className="px-5 py-2.5 bg-on-surface hover:bg-primary text-surface hover:text-white disabled:opacity-40 disabled:hover:bg-on-surface disabled:hover:text-surface rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    {tour.status === 'published' ? 'Published' : 'Publish Tour'}
                  </button>
                </>
              )}

              <button
                onClick={handleGenerateTour}
                disabled={isGenerating || isSuggesting}
                className="btn-primary-gradient px-5 py-2.5 rounded-xl text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Generating...' : tour ? 'Re-Generate Tour' : 'Generate Tour'}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="h-96 w-full flex items-center justify-center bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
              <LoadingSpinner size="lg" />
            </div>
          ) : !tour ? (
            /* empty state */
            <div className="max-w-xl mx-auto py-20 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-xl">Generate Interactive Tour</h3>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed">
                  LuxeStay property spaces support dual Tour frameworks. Ordinary photos transform into structural guided walkthrough slideshows. Equirectangular panorama photos load in Photo Sphere 360 degree canvases.
                </p>
              </div>
              <button
                onClick={handleGenerateTour}
                disabled={isGenerating}
                className="btn-primary-gradient px-8 py-3 rounded-full text-xs font-headline font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-1.5 mx-auto"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {isGenerating ? 'Analyzing photos...' : 'Auto-Generate Tour with AI'}
              </button>
            </div>
          ) : previewMode ? (
            /* Live Guest Preview Frame */
            <div className="space-y-4">
              <div className="bg-blue-500/5 text-blue-500 border border-blue-500/10 p-4 rounded-xl text-xs font-headline font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>You are currently previewing the guest experience. Toggle "Guest Preview" in the header to return to editing mode.</span>
              </div>
              <TourViewer tour={tour} />
            </div>
          ) : (
            /* Split Builder Interface */
            <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-8 items-start">
              
              {/* Scene orderer sidebar */}
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface">Tour Scenes</h3>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {tour.scenes.length} Scenes
                  </span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
                  {[...tour.scenes].sort((a,b)=>a.orderIndex - b.orderIndex).map((scene, idx, arr) => (
                    <div 
                      key={scene.id}
                      onClick={() => {
                        setActiveScene(scene);
                        setEditingHotspot(null);
                      }}
                      className={`relative flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-surface-container transition-all group ${
                        activeScene?.id === scene.id
                          ? 'border-primary bg-primary/[0.02]'
                          : 'border-outline-variant/10 bg-surface-container-lowest'
                      }`}
                    >
                      <div className="w-12 h-9 rounded-md overflow-hidden bg-black flex-shrink-0">
                        <img src={scene.imageUrl} alt={scene.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="min-w-0 flex-grow">
                        <h4 className="font-headline font-bold text-xs truncate text-on-surface group-hover:text-primary transition-colors">
                          {scene.title}
                        </h4>
                        <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">
                          {scene.type === 'panorama' ? '360° Panorama' : 'Walkthrough Frame'}
                        </span>
                      </div>

                      {/* Scene sorting arrow controls */}
                      <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button 
                          disabled={idx === 0} 
                          onClick={(e) => { e.stopPropagation(); handleMoveScene(scene.id, 'up'); }}
                          className="hover:text-primary disabled:opacity-30"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          disabled={idx === arr.length - 1} 
                          onClick={(e) => { e.stopPropagation(); handleMoveScene(scene.id, 'down'); }}
                          className="hover:text-primary disabled:opacity-30"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Stage - Canvas Editor */}
              {activeScene ? (
                <div className="space-y-6">
                  {/* Canvas block */}
                  <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/10 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-headline font-bold text-primary uppercase tracking-widest block">Editing Scene</span>
                        <h3 className="font-headline font-bold text-base text-on-surface leading-none">{activeScene.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDeleteScene(activeScene.id)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors border border-error/10 hover:border-error/20"
                          title="Delete scene"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      {activeScene.type === 'panorama' ? (
                        /* 360 canvas editor */
                        <div className="relative">
                          <div ref={psvContainerRef} className="w-full h-[500px]" />
                          <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/75 backdrop-blur-sm text-white text-[9px] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 uppercase font-headline tracking-wider">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Click on panorama canvas to place a hotspot marker</span>
                          </div>
                        </div>
                      ) : (
                        /* Walkthrough canvas editor */
                        <div className="relative w-full h-[500px] bg-zinc-950 flex items-center justify-center overflow-hidden">
                          <div 
                            onClick={handleImageClick}
                            className="relative max-h-full cursor-crosshair group flex items-center justify-center"
                          >
                            <img 
                              src={activeScene.imageUrl} 
                              alt="Active Walkthrough Scene" 
                              className="max-w-full max-h-[500px] object-contain select-none pointer-events-none"
                            />
                            
                            {/* Hotspot triggers overlay */}
                            {activeScene.hotspots.map(hs => {
                              if (hs.xPercent === null || hs.yPercent === null) return null;
                              
                              let hsColor = hs.approved ? 'bg-primary' : 'bg-yellow-500 border-dashed border-yellow-300';
                              if (hs.type === 'info') hsColor = hs.approved ? 'bg-blue-500' : 'bg-yellow-500 border-dashed';
                              if (hs.type === 'cta') hsColor = hs.approved ? 'bg-emerald-500' : 'bg-yellow-500 border-dashed';

                              return (
                                <button
                                  key={hs.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingHotspot(hs);
                                    setHotspotLabel(hs.label);
                                    setHotspotType(hs.type);
                                    setHotspotTargetSceneId(hs.targetSceneId || '');
                                    setHotspotAction(hs.action || 'book');
                                    setIsHotspotModalOpen(true);
                                  }}
                                  style={{ top: `${hs.yPercent}%`, left: `${hs.xPercent}%` }}
                                  className="absolute -translate-x-1/2 -translate-y-1/2 group/node z-20 flex flex-col items-center"
                                >
                                  <div className="relative flex items-center justify-center">
                                    {!hs.approved && <span className="absolute -top-3 text-[7px] font-bold text-yellow-300 bg-black/80 px-1 rounded animate-pulse">AI</span>}
                                    <span className={`absolute inline-flex h-7 w-7 rounded-full ${hs.approved ? hsColor : 'bg-yellow-500'}/35 animate-ping`}></span>
                                    <span className={`relative inline-flex rounded-full h-4 w-4 ${hsColor} border border-white shadow flex items-center justify-center`}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                    </span>
                                  </div>
                                  <span className="mt-1 bg-black/80 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-80">
                                    {hs.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          
                          <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/75 backdrop-blur-sm text-white text-[9px] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 uppercase font-headline tracking-wider">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Click on photo canvas to place a hotspot node</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI suggestion deck */}
                  {activeScene.hotspots.some(h => !h.approved) && (
                    <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h4 className="font-headline font-bold text-sm uppercase tracking-wider">AI Suggested Hotspots</h4>
                        </div>
                        <span className="text-[10px] font-bold text-yellow-700 bg-yellow-500/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Review Required
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeScene.hotspots.filter(h => !h.approved).map(hs => (
                          <div 
                            key={hs.id}
                            className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 flex items-center justify-between shadow-sm"
                          >
                            <div className="min-w-0">
                              <p className="font-headline font-bold text-xs text-on-surface truncate">{hs.label}</p>
                              <p className="text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">
                                {hs.type === 'navigation' ? 'Navigation Link' : hs.type === 'info' ? 'Information Popup' : 'CTA Booking'}
                              </p>
                              {hs.confidence && (
                                <span className="text-[8px] text-primary font-bold">Confidence: {Math.round(hs.confidence * 100)}%</span>
                              )}
                            </div>

                            <div className="flex gap-1.5 ml-3 flex-shrink-0">
                              <button
                                onClick={() => handleApproveHotspot(hs.id)}
                                className="w-8 h-8 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white flex items-center justify-center border border-emerald-500/10 transition-all active:scale-95"
                                title="Approve suggestion"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingHotspot(hs);
                                  setHotspotLabel(hs.label);
                                  setHotspotType(hs.type);
                                  setHotspotTargetSceneId(hs.targetSceneId || '');
                                  setHotspotAction(hs.action || 'book');
                                  setIsHotspotModalOpen(true);
                                }}
                                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-on-surface hover:text-surface flex items-center justify-center border border-outline-variant/10 transition-all active:scale-95"
                                title="Edit suggestion"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteHotspot(hs.id)}
                                className="w-8 h-8 rounded-lg bg-error/10 hover:bg-error text-error hover:text-white flex items-center justify-center border border-error/10 transition-all active:scale-95"
                                title="Reject/delete suggestion"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="h-96 w-full flex flex-col items-center justify-center bg-surface-container-lowest rounded-2xl border border-outline-variant/10 text-center p-6 text-on-surface-variant">
                  <AlertCircle className="w-10 h-10 mb-2 opacity-30" />
                  <p className="font-headline font-bold text-sm">No Active Scene Selected</p>
                  <p className="text-xs">Select a scene from the left panel to begin placing hotspots.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── HOTSPOT PLACEMENT FORM MODAL ── */}
      {isHotspotModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface-container-lowest border border-outline-variant/15 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
              <h3 className="font-headline font-bold text-base text-on-surface flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                {editingHotspot ? 'Edit Space Hotspot' : 'Add Space Hotspot'}
              </h3>
              <button 
                onClick={() => { setIsHotspotModalOpen(false); setEditingHotspot(null); }}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-headline font-bold">
              {/* Hotspot Label */}
              <div className="space-y-1.5">
                <label className="text-on-surface-variant uppercase tracking-wider block">Hotspot Label / Tooltip</label>
                <input 
                  type="text" 
                  placeholder="e.g. Master Bedroom, Marble Bathroom"
                  value={hotspotLabel}
                  onChange={(e) => setHotspotLabel(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container border border-outline-variant/15 rounded-xl font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              {/* Hotspot Type */}
              <div className="space-y-1.5">
                <label className="text-on-surface-variant uppercase tracking-wider block">Action Type</label>
                <select
                  value={hotspotType}
                  onChange={(e) => setHotspotType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-surface-container border border-outline-variant/15 rounded-xl font-body text-xs text-on-surface focus:outline-none"
                >
                  <option value="navigation">Navigation (Link to another scene)</option>
                  <option value="info">Info Popup (Open text popup)</option>
                  <option value="cta">Call to Action (Booking action)</option>
                </select>
              </div>

              {/* Conditional options depending on type */}
              {hotspotType === 'navigation' && (
                <div className="space-y-1.5">
                  <label className="text-on-surface-variant uppercase tracking-wider block">Target Scene</label>
                  <select
                    value={hotspotTargetSceneId}
                    onChange={(e) => setHotspotTargetSceneId(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/15 rounded-xl font-body text-xs text-on-surface focus:outline-none"
                  >
                    {tour?.scenes.filter(s => s.id !== activeScene?.id).map(scene => (
                      <option key={scene.id} value={scene.id}>{scene.title} ({scene.roomType})</option>
                    ))}
                    {tour?.scenes.filter(s => s.id !== activeScene?.id).length === 0 && (
                      <option value="">No other scenes available</option>
                    )}
                  </select>
                </div>
              )}

              {hotspotType === 'cta' && (
                <div className="space-y-1.5">
                  <label className="text-on-surface-variant uppercase tracking-wider block">Action Goal</label>
                  <select
                    value={hotspotAction}
                    onChange={(e) => setHotspotAction(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container border border-outline-variant/15 rounded-xl font-body text-xs text-on-surface focus:outline-none"
                  >
                    <option value="book">Open Booking Section</option>
                    <option value="contact">Contact Host Desk</option>
                  </select>
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-outline-variant/10">
              {editingHotspot ? (
                <button
                  type="button"
                  onClick={() => handleDeleteHotspot(editingHotspot.id)}
                  className="px-4 py-2.5 bg-error/10 hover:bg-error text-error hover:text-white rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold flex items-center gap-1 border border-error/10 hover:border-error/20"
                >
                  <Trash className="w-3.5 h-3.5" /> Delete
                </button>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setIsHotspotModalOpen(false); setEditingHotspot(null); }}
                  className="px-5 py-2.5 bg-surface-container hover:bg-outline-variant/10 text-on-surface-variant rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveHotspot}
                  className="px-5 py-2.5 bg-on-surface hover:bg-primary text-surface hover:text-white rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Hotspot
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── GENERATION PROGRESS FLOATING BAR ── */}
      {(isGenerating || isSuggesting) && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-in slide-in-from-bottom-12 duration-300">
          <div className="bg-[#121414]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                <span className="text-[10px] font-headline font-bold text-white uppercase tracking-widest">
                  {generationType === 'tour' ? 'Building Interactive Tour' : 'AI Hotspot Suggestions'}
                </span>
              </div>
              <span className="text-xs font-bold text-primary font-headline tracking-wider">
                {generationProgress}%
              </span>
            </div>
            
            <p className="text-[10px] text-white/60 font-body leading-none">
              {generationPhase}
            </p>

            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                style={{ width: `${generationProgress}%` }}
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(186,0,54,0.4)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOM NOTIFICATION / CONFIRMATION MODAL ── */}
      {notification && notification.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest border border-outline-variant/15 p-6 rounded-2xl w-full max-w-sm shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0",
                notification.type === 'success' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
                notification.type === 'error' && "bg-error/10 border-error/20 text-error",
                notification.type === 'confirm' && "bg-amber-500/10 border-amber-500/20 text-amber-500",
                notification.type === 'info' && "bg-primary/10 border-primary/20 text-primary"
              )}>
                {notification.type === 'success' && <Check className="w-5 h-5" />}
                {notification.type === 'error' && <X className="w-4 h-4" />}
                {notification.type === 'confirm' && <HelpCircle className="w-4.5 h-4.5" />}
                {notification.type === 'info' && <AlertCircle className="w-5 h-5" />}
              </div>
              <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider leading-none">
                {notification.title}
              </h3>
            </div>
            
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              {notification.message}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/10">
              {notification.type === 'confirm' ? (
                <>
                  <button
                    onClick={() => setNotification(null)}
                    className="px-4 py-2 bg-surface-container hover:bg-outline-variant/10 text-on-surface-variant rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (notification.onConfirm) notification.onConfirm();
                      setNotification(null);
                    }}
                    className="px-4 py-2 bg-on-surface hover:bg-primary text-surface hover:text-white rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold cursor-pointer"
                  >
                    Confirm
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setNotification(null)}
                  className="px-5 py-2 bg-on-surface hover:bg-primary text-surface hover:text-white rounded-xl text-[10px] uppercase tracking-wider transition-colors font-headline font-bold w-full cursor-pointer"
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
