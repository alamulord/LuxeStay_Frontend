export interface TourHotspot {
  id: string;
  sceneId: string;
  type: 'navigation' | 'info' | 'cta';
  label: string;
  targetSceneId?: string | null;
  action?: string | null;
  xPercent?: number | null; // For normal_image (0-100)
  yPercent?: number | null; // For normal_image (0-100)
  yaw?: number | null;      // For panorama (radians)
  pitch?: number | null;    // For panorama (radians)
  confidence?: number | null;
  generatedBy: 'admin' | 'ai';
  approved: boolean;
}

export interface TourScene {
  id: string;
  tourId: string;
  type: 'normal_image' | 'panorama';
  title: string;
  roomType: string;
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  aspectRatio: number;
  orderIndex: number;
  initialYaw?: number | null;
  initialPitch?: number | null;
  initialZoom?: number | null;
  createdAt: string;
  updatedAt: string;
  hotspots: TourHotspot[];
}

export interface Tour {
  id: string;
  roomId: string;
  mode: 'photo_walkthrough' | '360_virtual' | 'hybrid';
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  scenes: TourScene[];
}
