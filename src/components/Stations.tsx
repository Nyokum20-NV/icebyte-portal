import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Thermometer, Wind, Compass, Radio, ExternalLink, RotateCcw } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  realm: string;
  coords: string;
  lat: number;
  lng: number;
  temp: string;
  wind: string;
  established: string;
  mission: string;
  desc: string;
  image: string;
}

const stations: Station[] = [
  {
    id: 'maitri',
    name: 'Maitri Station',
    realm: 'Antarctica (Schirmacher Oasis)',
    coords: '70°45′58″ S, 11°44′09″ E',
    lat: -70.766,
    lng: 11.735,
    temp: '-18°C',
    wind: '32 kts ENE',
    established: '1989',
    mission: 'Atmospheric Sciences, Geomagnetism & Paleoclimatology',
    desc: 'India’s second permanent Antarctic research base, featuring clean water access from Lake Priyadarshini.',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bharati',
    name: 'Bharati Station',
    realm: 'Antarctica (Larsemann Hills)',
    coords: '69°24′28″ S, 76°11′14″ E',
    lat: -69.407,
    lng: 76.187,
    temp: '-14°C',
    wind: '22 kts NE',
    established: '2012',
    mission: 'Oceanography, Continental Breakup Studies & Satellite Telemetry',
    desc: 'State-of-the-art modular station designed to withstand extreme katabatic winds and minimize ecological footprint.',
    image: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'himadri',
    name: 'Himadri Station',
    realm: 'Arctic (Ny-Ålesund, Svalbard)',
    coords: '78°55′00″ N, 11°56′00″ E',
    lat: 78.923,
    lng: 11.928,
    temp: '-4°C',
    wind: '14 kts W',
    established: '2008',
    mission: 'Aerosol Optical Depth, Arctic Glaciology & Monsoon Teleconnection',
    desc: 'India’s northernmost permanent research station located 1,200 km from the North Pole.',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'indarc',
    name: 'IndARC Observatory',
    realm: 'Arctic (Kongsfjorden Fjord)',
    coords: '78°59′00″ N, 12°00′00″ E',
    lat: 78.983,
    lng: 12.0,
    temp: '-1.8°C (Subsurface)',
    wind: 'Subsea Mooring',
    established: '2014',
    mission: 'Continuous Subsurface Oceanographic & Arctic Current Profiling',
    desc: 'India’s first multi-sensor moored underwater observatory in the Arctic fjord.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  }
];

// Simplified Continent Polygonal Outlines [Lat, Lng]
const CONTINENT_PATHS: [number, number][][] = [
  // Antarctica Outline
  [[-70, 0], [-68, 30], [-66, 60], [-68, 90], [-67, 120], [-70, 150], [-72, 180], [-74, -150], [-72, -120], [-65, -90], [-64, -60], [-70, -30], [-70, 0]],
  // Africa Outline
  [[35, -5], [37, 10], [31, 32], [12, 43], [-10, 40], [-34, 18], [-34, 26], [-15, 12], [5, 1], [15, -17], [30, -10], [35, -5]],
  // Eurasia (Europe & Asia + India)
  [[36, -9], [43, 5], [54, 8], [60, 28], [70, 40], [72, 120], [60, 160], [38, 140], [22, 114], [10, 105], [8, 77], [22, 69], [25, 60], [35, 45], [40, 26], [36, -9]],
  // North America & Greenland
  [[75, -40], [82, -20], [70, -50], [60, -65], [45, -60], [25, -80], [15, -85], [18, -105], [30, -115], [50, -125], [65, -165], [72, -155], [75, -95], [75, -40]],
  // South America
  [[12, -75], [5, -50], [-10, -35], [-23, -43], [-55, -68], [-45, -75], [-20, -70], [-5, -80], [12, -75]],
  // Australia
  [[-12, 130], [-15, 145], [-28, 153], [-38, 145], [-35, 115], [-22, 114], [-12, 130]]
];

export default function Stations() {
  const [activeStation, setActiveStation] = useState<Station>(stations[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotX, setRotX] = useState(0.35); // tilt
  const [rotY, setRotY] = useState(0);    // spin

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRotY = useRef<number | null>(null);
  const targetRotX = useRef<number | null>(null);

  // Handle Station Click Focus
  const focusOnStation = (st: Station) => {
    setActiveStation(st);
    targetRotY.current = - (st.lng * Math.PI) / 180 - Math.PI / 2;
    targetRotX.current = (st.lat * Math.PI) / 180 * 0.7;
  };

  // Drag handlers for mouse rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    targetRotY.current = null;
    targetRotX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotY((prev) => prev + dx * 0.006);
    setRotX((prev) => Math.max(-1.2, Math.min(1.2, prev + dy * 0.006)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Smooth camera interpolation towards target station
      if (targetRotY.current !== null && targetRotX.current !== null) {
        setRotY((prev) => prev + (targetRotY.current! - prev) * 0.08);
        setRotX((prev) => prev + (targetRotX.current! - prev) * 0.08);
      } else if (!isDragging) {
        setRotY((prev) => prev + 0.003); // gentle auto spin
      }

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep Atmospheric Outer Glow
      const atmos = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35);
      atmos.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
      atmos.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
      atmos.addColorStop(1, 'rgba(5, 11, 24, 0)');
      ctx.fillStyle = atmos;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Earth Ocean Sphere Base
      const ocean = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.05, cx, cy, radius);
      ocean.addColorStop(0, '#164e63');
      ocean.addColorStop(0.5, '#0e2338');
      ocean.addColorStop(1, '#030816');
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Coordinate Transform 3D helper
      const project = (lat: number, lng: number): { x: number; y: number; visible: boolean } => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lng * Math.PI) / 180 + rotY;

        const cosLat = Math.cos(phi);
        const sinLat = Math.sin(phi);
        const cosLng = Math.cos(theta);
        const sinLng = Math.sin(theta);

        // Apply pitch tilt (rotX)
        const cosTilt = Math.cos(rotX);
        const sinTilt = Math.sin(rotX);

        const x3 = cosLat * sinLng;
        const y3 = sinLat * cosTilt - cosLat * cosLng * sinTilt;
        const z3 = sinLat * sinTilt + cosLat * cosLng * cosTilt;

        return {
          x: cx + radius * x3,
          y: cy - radius * y3,
          visible: z3 > 0.05
        };
      };

      // Draw Continents & Countries
      CONTINENT_PATHS.forEach((path) => {
        ctx.beginPath();
        let first = true;
        let anyVisible = false;

        path.forEach(([lat, lng]) => {
          const pt = project(lat, lng);
          if (pt.visible) anyVisible = true;
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        });
        ctx.closePath();

        if (anyVisible) {
          ctx.fillStyle = 'rgba(13, 148, 136, 0.28)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // Draw Latitude / Longitude Graticule Rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 15) {
          const pt = project(lat, lng);
          if (lng === -180) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw Station Beacons & Pulse Rings
      stations.forEach((st) => {
        const pt = project(st.lat, st.lng);
        if (pt.visible) {
          const isSelected = activeStation.id === st.id;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 12 : 6, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? 'rgba(56, 189, 248, 0.8)' : 'rgba(6, 182, 212, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Center solid point
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 5 : 3, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#38bdf8' : '#06b6d4';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = isSelected ? 18 : 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pin Label
          ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
          ctx.font = isSelected ? 'bold 12px Inter, sans-serif' : '10px Inter, sans-serif';
          ctx.fillText(st.name.split(' ')[0], pt.x + 9, pt.y + 4);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rotX, rotY, isDragging, activeStation]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          Global Polar Observation Grid
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Interactive 3D Earth Station Telemetry
        </h2>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Click on any station button or drag the globe directly to inspect live sensors, coordinates, and ongoing expeditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        {/* Interactive 3D Earth Canvas */}
        <div 
          className="lg:col-span-7 flex flex-col items-center justify-center relative select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            width={520}
            height={520}
            className="w-full max-w-[440px] aspect-square cursor-grab active:cursor-grabbing rounded-full"
          />
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Drag to rotate globe
            </span>
            <button 
              onClick={() => focusOnStation(activeStation)} 
              className="flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
            >
              <RotateCcw className="w-3 h-3" /> Re-center
            </button>
          </div>
        </div>

        {/* Station Detail Drawer & Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-2.5">
            {stations.map((st) => (
              <button
                key={st.id}
                onClick={() => focusOnStation(st)}
                className={`px-4 py-3 rounded-xl text-xs font-semibold text-left transition border ${
                  activeStation.id === st.id
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950 ring-1 ring-cyan-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="block font-medium">{st.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">{st.realm.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 space-y-4 shadow-xl">
            <div className="relative h-40 rounded-lg overflow-hidden border border-slate-700/60">
              <img
                src={activeStation.image}
                alt={activeStation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                <div>
                  <h4 className="text-base font-bold text-white">{activeStation.name}</h4>
                  <p className="text-xs text-cyan-300">{activeStation.realm}</p>
                </div>
                <span className="text-[10px] bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                  Est. {activeStation.established}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStation.desc}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">Coordinates:</span>
                <span className="font-mono text-cyan-300 text-[11px]">{activeStation.coords}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Mission:</span>
                <span className="text-slate-200 text-[11px]">{activeStation.mission}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
