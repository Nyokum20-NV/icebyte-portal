import { useState, useRef, useCallback } from 'react';
import {
  Camera,
  Video,
  PlayCircle,
  Compass,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Maximize,
  Minimize,
} from 'lucide-react';
import { mediaItems, panoramaImage, type MediaItem } from '@/data/mockData';

const typeIcons: Record<MediaItem['type'], typeof Camera> = {
  Photo: Camera,
  Video: Video,
  '360° Tour': Compass,
  'Drone Footage': PlayCircle,
};

const typeColors: Record<MediaItem['type'], string> = {
  Photo: 'bg-frost-cyan/10 border-frost-cyan/20 text-frost-cyan',
  Video: 'bg-frost-blue/10 border-frost-blue/20 text-frost-blue',
  '360° Tour': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  'Drone Footage': 'bg-amber-500/10 border-amber-500/20 text-amber-300',
};

function VideoLightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs font-mono text-slate-500">{item.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass-panel rounded-md hover:bg-polar-card transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden border border-frost-cyan/20 bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-slate-400 mt-3">{item.description}</p>
      </div>
    </div>
  );
}

function PhotoLightbox({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs font-mono text-slate-500">{item.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass-panel rounded-md hover:bg-polar-card transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>
        <div className="relative rounded-xl overflow-hidden border border-frost-cyan/20 bg-polar-bg">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>
        <p className="text-sm text-slate-400 mt-3">{item.description}</p>
      </div>
    </div>
  );
}

function PanoramaViewer({ onClose }: { onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panX, setPanX] = useState(50);
  const [panY, setPanY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 50, panY: 50 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX, panY };
  }, [panX, panY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const newPanX = Math.max(0, Math.min(100, dragStart.current.panX + (dx / (2 / zoom))));
    const newPanY = Math.max(0, Math.min(100, dragStart.current.panY + (dy / (2 / zoom))));
    setPanX(newPanX);
    setPanY(newPanY);
  }, [isDragging, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              360° Virtual Tour — Bharati Station
            </h3>
            <p className="text-xs font-mono text-slate-500">Larsemann Hills, Antarctica</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass-panel rounded-md hover:bg-polar-card transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Panorama viewport */}
        <div
          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-emerald-500/20 bg-polar-bg cursor-grab select-none"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 transition-transform duration-100"
            style={{
              transform: `scale(${zoom}) translate(${panX - 50}%, ${panY - 50}%) rotate(${rotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            <img
              src={panoramaImage}
              alt="Bharati Station 360° panorama"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Compass overlay */}
          <div className="absolute top-4 left-4 glass-panel rounded-lg px-3 py-2 flex items-center gap-2">
            <Compass
              className="w-4 h-4 text-emerald-400"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
            <span className="text-xs font-mono text-slate-300">
              {Math.round(rotation)}°
            </span>
          </div>

          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 glass-panel rounded-lg px-3 py-2">
            <span className="text-xs font-mono text-slate-300">{zoom.toFixed(1)}x</span>
          </div>

          {/* Drag hint */}
          {!isDragging && zoom === 1 && rotation === 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel rounded-lg px-4 py-2 flex items-center gap-2 animate-fade-in">
              <Move className="w-4 h-4 text-frost-cyan" />
              <span className="text-xs text-slate-300">Drag to look around · Use controls to zoom</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            className="p-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-slate-300" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="px-3 py-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors text-xs font-mono text-slate-300"
            title="Reset zoom"
          >
            <Maximize className="w-5 h-5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="p-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-slate-300" />
          </button>
          <div className="w-px h-8 bg-polar-border mx-1" />
          <button
            onClick={() => setRotation((r) => (r - 15) % 360)}
            className="p-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors"
            title="Rotate left"
          >
            <RotateCw className="w-5 h-5 text-slate-300 scale-x-[-1]" />
          </button>
          <button
            onClick={() => setRotation((r) => (r + 15) % 360)}
            className="p-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors"
            title="Rotate right"
          >
            <RotateCw className="w-5 h-5 text-slate-300" />
          </button>
          <div className="w-px h-8 bg-polar-border mx-1" />
          <button
            onClick={() => {
              setZoom(1);
              setRotation(0);
              setPanX(50);
              setPanY(50);
            }}
            className="px-3 py-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors text-xs font-mono text-slate-300"
          >
            <Minimize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Media() {
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);
  const [panoramaOpen, setPanoramaOpen] = useState(false);

  const handleCardClick = (item: MediaItem) => {
    if (item.type === '360° Tour') {
      setPanoramaOpen(true);
    } else {
      setLightbox(item);
    }
  };

  const photoItems = mediaItems.filter((m) => m.type === 'Photo');
  const videoItems = mediaItems.filter((m) => m.type !== 'Photo' && m.type !== '360° Tour');
  const tourItem = mediaItems.find((m) => m.type === '360° Tour');

  return (
    <section className="relative pt-16 min-h-screen">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-frost-cyan" />
            <span className="text-xs font-mono text-frost-cyan tracking-widest">MEDIA LIBRARY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Media & 360° Tours</h2>
          <p className="text-slate-400 max-w-2xl">
            Explore high-resolution polar imagery, expedition video footage, and immersive 360°
            virtual tours of India's research stations.
          </p>
        </div>

        {/* 360° Tour Feature Card */}
        {tourItem && (
          <div className="mb-10">
            <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Virtual Tour
            </h3>
            <button
              onClick={() => setPanoramaOpen(true)}
              className="group relative w-full max-h-[400px] rounded-2xl overflow-hidden glass-panel hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                <img
                  src={tourItem.imageUrl}
                  alt={tourItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-polar-bg via-polar-bg/40 to-transparent" />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-400/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300">
                    <Maximize2 className="w-8 h-8 text-emerald-300" />
                  </div>
                </div>
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 mb-2">
                    <Compass className="w-3 h-3" />
                    360° INTERACTIVE TOUR
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-1">{tourItem.title}</h4>
                  <p className="text-sm text-slate-300 max-w-lg">{tourItem.description}</p>
                  <p className="text-xs font-mono text-slate-500 mt-2">
                    Click to enter · Pan & zoom controls available
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Video Gallery */}
        <div className="mb-10">
          <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <Video className="w-4 h-4 text-frost-blue" />
            Video & Drone Footage
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoItems.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="glass-panel rounded-xl overflow-hidden hover:border-frost-cyan/30 transition-all text-left group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-polar-bg/80 via-transparent to-transparent" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-frost-cyan/20 backdrop-blur-sm border-2 border-frost-cyan/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-frost-cyan/30 transition-all duration-300">
                        <PlayCircle className="w-7 h-7 text-frost-cyan" />
                      </div>
                    </div>
                    <div
                      className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-mono ${typeColors[item.type]}`}
                    >
                      <Icon className="w-3 h-3" />
                      {item.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-frost-cyan transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mb-2">{item.location}</p>
                    <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Gallery */}
        <div>
          <h3 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4 text-frost-cyan" />
            Photo Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photoItems.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="glass-panel rounded-xl overflow-hidden hover:border-frost-cyan/30 transition-all text-left group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-polar-bg/60 via-transparent to-transparent" />
                    <div
                      className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-mono ${typeColors[item.type]}`}
                    >
                      <Icon className="w-3 h-3" />
                      {item.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-frost-cyan transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mb-2">{item.location}</p>
                    <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightboxes */}
      {lightbox && lightbox.videoId && (
        <VideoLightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
      {lightbox && !lightbox.videoId && (
        <PhotoLightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
      {panoramaOpen && <PanoramaViewer onClose={() => setPanoramaOpen(false)} />}
    </section>
  );
}
