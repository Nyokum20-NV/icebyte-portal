import React from 'react';
import { ShieldAlert, Compass, Activity, Thermometer, Wind, Gauge, Sun } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-[92vh] bg-[#050b18] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Submerged Deep-Iceberg Split Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-100 opacity-60"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5, 11, 24, 0.4) 0%, rgba(5, 11, 24, 0.75) 45%, rgba(5, 11, 24, 0.95) 100%), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85')`
        }}
      />

      {/* Atmospheric Polar Ray Gradient */}
      <div className="absolute inset-0 bg-radial-at-c from-cyan-950/30 via-transparent to-transparent pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-24 pb-12">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-cyan-950/60">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Live Polar Telemetry Online</span>
        </div>

        {/* Crisp Gradient Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          ICEBYTE: Unlocking Earth’s{' '}
          <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">
            Polar Archive
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-light mb-12 drop-shadow-md">
          Real-time telemetry, deep-core paleoclimate records, and unified scientific data from India’s research expeditions across Antarctica, the Arctic, and the Himalayas.
        </p>

        {/* Station Telemetry Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
          {/* Maitri Card */}
          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-700/70 backdrop-blur-md hover:border-cyan-500/50 transition duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold text-white text-base">Maitri Station</h3>
                <p className="text-xs text-slate-400">Antarctica (70°45′S)</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Temp:</span>
                <span className="font-mono text-cyan-200">-18°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Wind className="w-3.5 h-3.5 text-cyan-400" /> Wind:</span>
                <span className="font-mono text-cyan-200">32 kts ENE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Gauge className="w-3.5 h-3.5 text-cyan-400" /> Barometer:</span>
                <span className="font-mono text-cyan-200">986 hPa</span>
              </div>
            </div>
          </div>

          {/* Bharati Card */}
          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-700/70 backdrop-blur-md hover:border-cyan-500/50 transition duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold text-white text-base">Bharati Station</h3>
                <p className="text-xs text-slate-400">Antarctica (69°24′S)</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Temp:</span>
                <span className="font-mono text-cyan-200">-14°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Activity className="w-3.5 h-3.5 text-cyan-400" /> Total Ozone:</span>
                <span className="font-mono text-cyan-200">284 DU</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Sun className="w-3.5 h-3.5 text-cyan-400" /> UV Index:</span>
                <span className="font-mono text-emerald-300">Low</span>
              </div>
            </div>
          </div>

          {/* Himadri Card */}
          <div className="p-4 rounded-xl bg-slate-950/75 border border-slate-700/70 backdrop-blur-md hover:border-cyan-500/50 transition duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-semibold text-white text-base">Himadri Station</h3>
                <p className="text-xs text-slate-400">Arctic (Svalbard)</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Temp:</span>
                <span className="font-mono text-cyan-200">-4°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><Compass className="w-3.5 h-3.5 text-cyan-400" /> Permafrost:</span>
                <span className="font-mono text-cyan-200">-2.1°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400"><ShieldAlert className="w-3.5 h-3.5 text-cyan-400" /> Sea Ice:</span>
                <span className="font-mono text-amber-300">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
