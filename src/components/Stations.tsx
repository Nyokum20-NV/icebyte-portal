import React, { useState, useEffect, useRef } from 'react';
import { Radio, Compass, RotateCcw } from 'lucide-react';

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

// Simplified Continent Outlines [Lat, Lng]
const CONTINENTS: [number, number][][] = [
  // Antarctica
  [[-70, 0], [-68, 30], [-66, 60], [-68, 90], [-67, 120], [-70, 150], [-72, 180], [-74, -150], [-72, -120], [-65, -90], [-64, -60], [-70, -30], [-70, 0]],
  // Africa
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rotation state refs to prevent re-render thrashing
  const rotY = useRef<number>(0);
  const rotX = useRef<number>(0.2);
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotation = useRef<{ y: number; x: number } | null>(null);

  const focusOnStation = (st: Station) => {
    setActiveStation(st);
    targetRotation.current = {
      y: -(st.lng * Math.PI) / 180 - Math.PI / 2,
      x: (st.lat * Math.PI) / 180 * 0.6
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    targetRotation.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    rotY.current += dx * 0.005;
    rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current + dy * 0.005));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Smooth interpolation to target station or slow constant spin
      if (targetRotation.current) {
        rotY.current += (targetRotation.current.y - rotY.current) * 0.06;
        rotX.current += (targetRotation.current.x - rotX.current) * 0.06;
      } else if (!isDragging.current) {
        rotY.current += 0.002; // Very slow, stable auto-rotation
      }

      const w = canvas.width;
      const h = canvas.height;
      const r = Math.min(w, h) * 0.38;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Outer Glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.3);
      glow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      glow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Ocean Sphere
      const oceanGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.05, cx, cy, r);
      oceanGrad.addColorStop(0, '#0f314d');
      oceanGrad.addColorStop(0.6, '#081a2e');
      oceanGrad.addColorStop(1, '#020713');
      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3D Projection Helper
      const project = (lat: number, lng: number): { x: number; y: number; visible: boolean } => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lng * Math.PI) / 180 + rotY.current;

        const cosLat = Math.cos(phi);
        const sinLat = Math.sin(phi);
        const cosLng = Math.cos(theta);
        const sinLng = Math.sin(theta);

        const cosTilt = Math.cos(rotX.current);
        const sinTilt = Math.sin(rotX.current);

        const x3 = cosLat * sinLng;
        const y3 = sinLat * cosTilt - cosLat * cosLng * sinTilt;
        const z3 = sinLat * sinTilt + cosLat * cosLng * cosTilt;

        return {
          x: cx + r * x3,
          y: cy - r * y3,
          visible: z3 > 0.05
        };
      };

      // Draw Continents
      CONTINENTS.forEach((polygon) => {
        ctx.beginPath();
        let first = true;
        let anyVis = false;
        polygon.forEach(([lat, lng]) => {
          const pt = project(lat, lng);
          if (pt.visible) anyVis = true;
          if (first) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        });
        ctx.closePath();

        if (anyVis) {
          ctx.fillStyle = 'rgba(14, 165, 233, 0.22)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Graticule Lines (Lat/Long)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 20) {
          const pt = project(lat, lng);
          if (lng === -180) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw Station Pins
      stations.forEach((st) => {
        const pt = project(st.lat, st.lng);
        if (pt.visible) {
          const isSelected = activeStation.id === st.id;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 9 : 5, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(6, 182, 212, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Center Beacon
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isSelected ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#ffffff' : '#38bdf8';
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = isSelected ? 12 : 4;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pin Label
          ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
          ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '9px Inter, sans-serif';
          ctx.fillText(st.name.replace(' Station', '').replace(' Observatory', ''), pt.x + 8, pt.y + 3);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeStation]);

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
          Click on any station button or drag the globe to inspect real-time polar telemetry, coordinates, and ongoing expeditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        {/* Globe Canvas Container */}
        <div 
          className="lg:col-span-7 flex flex-col items-center justify-center relative select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            className="w-full max-w-[420px] aspect-square cursor-grab active:cursor-grabbing rounded-full"
          />
          <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Drag slowly to rotate
            </span>
            <button 
              onClick={() => focusOnStation(activeStation)} 
              className="flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
            >
              <RotateCcw className="w-3 h-3" /> Re-center
            </button>
          </div>
        </div>

        {/* Station Buttons & Detail Drawer */}
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
