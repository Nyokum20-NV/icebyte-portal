import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Thermometer, Wind, Compass, Radio, ExternalLink } from 'lucide-react';

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

export default function Stations() {
  const [activeStation, setActiveStation] = useState<Station>(stations[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      rotationRef.current += 0.005;
      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Outer Atmosphere Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.25);
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
      glowGrad.addColorStop(1, 'rgba(7, 11, 25, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Earth Sphere Background
      const sphereGrad = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1, centerX, centerY, radius);
      sphereGrad.addColorStop(0, '#1e293b');
      sphereGrad.addColorStop(0.7, '#0f172a');
      sphereGrad.addColorStop(1, '#020617');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Latitude and Longitude Grid Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;

      for (let lat = -60; lat <= 60; lat += 30) {
        const y = centerY + Math.sin((lat * Math.PI) / 180) * radius;
        const rLat = Math.cos((lat * Math.PI) / 180) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX, y, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 6; i++) {
        const angle = rotationRef.current + (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.abs(Math.cos(angle)), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Plot Stations on 3D Sphere Projection
      stations.forEach((st) => {
        const phi = (90 - st.lat) * (Math.PI / 180);
        const theta = (st.lng * Math.PI) / 180 + rotationRef.current;

        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY - radius * Math.cos(phi);
        const isVisible = Math.sin(phi) * Math.sin(theta) >= -0.2;

        if (isVisible) {
          const isSelected = activeStation.id === st.id;
          
          // Marker Pulse
          ctx.beginPath();
          ctx.arc(x, y, isSelected ? 8 : 4, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#38bdf8' : '#06b6d4';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = isSelected ? 15 : 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Label
          ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
          ctx.font = isSelected ? 'bold 12px Inter, sans-serif' : '10px Inter, sans-serif';
          ctx.fillText(st.name.split(' ')[0], x + 10, y + 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeStation]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          Global Polar Observation Grid
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Interactive 3D Station Telemetry
        </h2>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Select an Indian polar research station to track coordinates, environmental sensors, and scientific mission profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/40 border border-slate-800 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        {/* Interactive 3D Globe Canvas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            className="w-full max-w-[420px] aspect-square cursor-grab active:cursor-grabbing"
          />
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Live rotating projection (Antarctic & Arctic observation networks)
          </p>
        </div>

        {/* Station Detail Drawer & Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Station Selection Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {stations.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStation(st)}
                className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition border ${
                  activeStation.id === st.id
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="block">{st.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">{st.realm.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Station Card */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-4">
            <div className="relative h-36 rounded-lg overflow-hidden border border-slate-700/60">
              <img
                src={activeStation.image}
                alt={activeStation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                <div>
                  <h4 className="text-base font-bold text-white">{activeStation.name}</h4>
                  <p className="text-xs text-slate-300">{activeStation.realm}</p>
                </div>
                <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-cyan-300">
                  Est. {activeStation.established}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStation.desc}
            </p>

            {/* Quick Metrics */}
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