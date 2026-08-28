import { useState } from 'react';
import { MapPin, X, Thermometer, Wind, Cloud, FileText, Navigation } from 'lucide-react';
import { stations, type StationInfo } from '@/data/mockData';

export default function Stations() {
  const [selected, setSelected] = useState<StationInfo | null>(null);

  return (
    <section id="stations" className="relative py-20">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-frost-cyan" />
            <span className="text-xs font-mono text-frost-cyan tracking-widest">STATION NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Polar Station Explorer</h2>
          <p className="text-slate-400 max-w-2xl">
            Interactive map of India's polar research stations. Click any pin to view coordinates,
            mission objectives, live weather, and recent publications.
          </p>
        </div>

        {/* Map */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="relative w-full aspect-[16/9] bg-polar-bg">
            {/* World map background */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 aurora-bg opacity-40" />

            {/* Latitude/Longitude lines */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {[20, 40, 60, 80].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="0"
                  y1={`${y}%`}
                  x2="100%"
                  y2={`${y}%`}
                  stroke="#1c2748"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line
                  key={`v-${x}`}
                  x1={`${x}%`}
                  y1="0"
                  x2={`${x}%`}
                  y2="100%"
                  stroke="#1c2748"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              ))}
            </svg>

            {/* Simplified continent shapes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56" preserveAspectRatio="none">
              {/* Northern continents */}
              <path d="M8,8 Q15,6 25,8 T45,9 L48,16 Q40,18 30,16 L15,15 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.6" />
              <path d="M45,10 Q55,8 70,10 L72,16 Q60,18 50,16 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.6" />
              {/* Equatorial/Africa */}
              <path d="M48,20 Q55,18 58,25 L56,32 Q52,34 50,30 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.6" />
              {/* Southern continents */}
              <path d="M30,35 Q40,33 50,36 L52,44 Q42,46 35,42 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.6" />
              <path d="M75,38 Q82,36 85,42 L83,48 Q78,49 76,45 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.6" />
              {/* Antarctica strip */}
              <path d="M5,50 Q50,48 95,50 L95,56 L5,56 Z" fill="#0d1326" stroke="#1c2748" strokeWidth="0.3" opacity="0.5" />
            </svg>

            {/* Station Pins */}
            {stations.map((station) => (
              <button
                key={station.name}
                onClick={() => setSelected(station)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${station.mapX}%`, top: `${station.mapY}%` }}
              >
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-frost-cyan/30 animate-ping" style={{ width: '24px', height: '24px', top: '-12px', left: '-12px' }} />
                  <div className="relative w-3 h-3 rounded-full bg-frost-cyan border-2 border-white shadow-lg" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.8)' }} />
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-polar-bg/80 border border-polar-border text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  {station.name}
                </div>
              </button>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-panel rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-frost-cyan" style={{ boxShadow: '0 0 8px rgba(6,182,212,0.8)' }} />
              <span className="text-xs font-mono text-slate-400">Research Station</span>
            </div>
            <div className="absolute bottom-4 right-4 glass-panel rounded-lg px-3 py-2">
              <span className="text-[10px] font-mono text-slate-500">Simplified projection · Not to scale</span>
            </div>
          </div>
        </div>

        {/* Station cards below map */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {stations.map((station) => (
            <button
              key={station.name}
              onClick={() => setSelected(station)}
              className="glass-panel rounded-xl p-4 hover:border-frost-cyan/30 transition-all text-left group"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-frost-cyan" />
                <span className="font-semibold text-white group-hover:text-frost-cyan transition-colors">
                  {station.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{station.coords}</p>
              <p className="text-xs text-slate-400 mt-1">{station.realm}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Station Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl glass-panel rounded-2xl border border-frost-cyan/20 overflow-hidden max-h-[85vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-polar-border bg-gradient-to-r from-frost-cyan/5 to-transparent">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 hover:bg-polar-card rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-frost-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selected.name} Station</h3>
                  <span className="text-xs font-mono text-frost-cyan">{selected.realm}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Coordinates & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-3.5 h-3.5 text-frost-cyan" />
                    <span className="text-[10px] font-mono text-slate-500">COORDINATES</span>
                  </div>
                  <p className="text-sm text-white font-mono">{selected.coords}</p>
                </div>
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-slate-500">ESTABLISHED</span>
                  </div>
                  <p className="text-sm text-white font-mono">{selected.established}</p>
                </div>
              </div>

              {/* Mission */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2">MISSION OBJECTIVES</span>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.mission}</p>
              </div>

              {/* Weather Widget */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 block mb-2">CURRENT WEATHER</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="glass-panel rounded-lg p-3 text-center">
                    <Thermometer className="w-4 h-4 text-frost-cyan mx-auto mb-1" />
                    <p className="text-lg font-mono text-white">{selected.weather.temp}</p>
                    <p className="text-[10px] text-slate-500">Temp</p>
                  </div>
                  <div className="glass-panel rounded-lg p-3 text-center">
                    <Wind className="w-4 h-4 text-frost-cyan mx-auto mb-1" />
                    <p className="text-sm font-mono text-white">{selected.weather.wind}</p>
                    <p className="text-[10px] text-slate-500">Wind</p>
                  </div>
                  <div className="glass-panel rounded-lg p-3 text-center">
                    <Cloud className="w-4 h-4 text-frost-cyan mx-auto mb-1" />
                    <p className="text-sm text-white">{selected.weather.condition}</p>
                    <p className="text-[10px] text-slate-500">Sky</p>
                  </div>
                </div>
              </div>

              {/* Publications */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-frost-cyan" />
                  <span className="text-[10px] font-mono text-slate-500">RECENT PUBLICATIONS</span>
                </div>
                <div className="space-y-2">
                  {selected.publications.map((pub, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 rounded-lg bg-polar-bg/40 border border-polar-border/50 hover:border-frost-cyan/20 transition-colors"
                    >
                      <span className="text-xs font-mono text-frost-cyan/60 mt-0.5">{i + 1}.</span>
                      <span className="text-sm text-slate-300">{pub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
