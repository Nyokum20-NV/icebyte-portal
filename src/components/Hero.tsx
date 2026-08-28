import { Activity, Wind, Gauge, Thermometer, Radiation, Sun } from 'lucide-react';
import { telemetryData } from '@/data/mockData';

const readingIcons: Record<string, typeof Activity> = {
  Temperature: Thermometer,
  Wind: Wind,
  Barometer: Gauge,
  'Total Column Ozone': Radiation,
  'UV Index': Sun,
  'Permafrost Temp': Thermometer,
  'Sea Ice Extent': Activity,
};

export default function Hero() {
  return (
    <section id="hero" className="relative pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 aurora-bg pointer-events-none" />
      <div className="aurora-layer">
        <div className="aurora-stars" />
        <div className="aurora-band aurora-band-1" />
        <div className="aurora-band aurora-band-2" />
        <div className="aurora-band aurora-band-3" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-frost-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-polar-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass-panel border border-frost-cyan/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-frost-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-frost-cyan"></span>
            </span>
            <span className="text-xs font-mono text-frost-cyan tracking-widest">
              LIVE POLAR TELEMETRY ONLINE
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            ICEBYTE: Unlocking Earth's{' '}
            <span className="bg-gradient-to-r from-frost-cyan via-frost-blue to-frost-glow bg-clip-text text-transparent glow-text">
              Polar Archive
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Real-time telemetry, deep-core paleoclimate records, and unified scientific data from
            India's research expeditions across Antarctica, the Arctic, and the Himalayas.
          </p>
        </div>

        {/* Telemetry Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {telemetryData.map((card) => (
            <div
              key={card.id}
              className="glass-panel rounded-2xl p-5 hover:border-frost-cyan/30 transition-all duration-300 group animate-float-up"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white text-lg">{card.station}</h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{card.region}</p>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
                    {card.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {card.readings.map((reading) => {
                  const Icon = readingIcons[reading.label] || Activity;
                  return (
                    <div
                      key={reading.label}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-polar-bg/40 border border-polar-border/50 group-hover:border-frost-cyan/10 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-frost-cyan/70" />
                        <span className="text-sm text-slate-400">{reading.label}</span>
                      </div>
                      <span className="font-mono text-sm text-white font-medium">
                        {reading.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
