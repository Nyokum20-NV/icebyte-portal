import { useState, useMemo } from 'react';
import {
  Filter,
  FileText,
  Download,
  Database,
  Quote,
  Eye,
  X,
  ChevronDown,
  Calendar,
  Tag,
} from 'lucide-react';
import {
  researchPapers,
  filterChips,
  type Realm,
  type StationName,
  type Discipline,
  type ResearchPaper,
} from '@/data/mockData';

const realms: ('All' | Realm)[] = ['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'];
const stationNames: ('All' | StationName)[] = ['All', 'Maitri', 'Bharati', 'Himadri', 'IndARC'];
const disciplines: ('All' | Discipline)[] = [
  'All',
  'Glaciology & Ice Cores',
  'Atmospheric Physics',
  'Oceanography',
  'Space Weather & Magnetism',
  'Extremophile Biology',
];

function LineChart({ paper }: { paper: ResearchPaper }) {
  const chart = paper.chart[0];
  const points = chart.points;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const W = 400;
  const H = 200;
  const pad = 40;

  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin || 1)) * (W - pad * 2);
  const sy = (y: number) => H - pad - ((y - yMin) / (yMax - yMin || 1)) * (H - pad * 2);

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`).join(' ');
  const areaPath = `${path} L ${sx(points[points.length - 1].x)} ${H - pad} L ${sx(points[0].x)} ${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id={`grad-${paper.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad}
          y1={pad + t * (H - pad * 2)}
          x2={W - pad}
          y2={pad + t * (H - pad * 2)}
          stroke="#1c2748"
          strokeWidth="0.5"
        />
      ))}
      {/* Area */}
      <path d={areaPath} fill={`url(#grad-${paper.id})`} />
      {/* Line */}
      <path d={path} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinejoin="round" />
      {/* Points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r="4" fill="#070b19" stroke="#38bdf8" strokeWidth="2" />
        </g>
      ))}
      {/* Y-axis labels */}
      {[0, 0.5, 1].map((t) => (
        <text
          key={t}
          x={pad - 8}
          y={pad + t * (H - pad * 2) + 4}
          fill="#64748b"
          fontSize="10"
          fontFamily="monospace"
          textAnchor="end"
        >
          {(yMax - t * (yMax - yMin)).toFixed(0)}
        </text>
      ))}
      {/* X-axis labels */}
      {[0, 0.5, 1].map((t) => (
        <text
          key={t}
          x={pad + t * (W - pad * 2)}
          y={H - pad + 16}
          fill="#64748b"
          fontSize="10"
          fontFamily="monospace"
          textAnchor="middle"
        >
          {(xMin + t * (xMax - xMin)).toFixed(0)}
        </text>
      ))}
      {/* Axis labels */}
      <text x={W / 2} y={H - 4} fill="#94a3b8" fontSize="10" textAnchor="middle">
        {chart.xLabel}
      </text>
      <text x={12} y={H / 2} fill="#94a3b8" fontSize="10" textAnchor="middle" transform={`rotate(-90 12 ${H / 2})`}>
        {chart.yLabel}
      </text>
    </svg>
  );
}

function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-lg hover:border-frost-cyan/30 transition-colors w-full min-w-[160px]"
      >
        <span className="text-xs text-slate-500 font-mono shrink-0">{label}</span>
        <span className="text-sm text-white font-medium flex-1 text-left truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 left-0 right-0 z-20 glass-panel rounded-lg overflow-hidden animate-scale-in">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-frost-cyan/10 transition-colors ${
                  value === opt ? 'text-frost-cyan bg-frost-cyan/5' : 'text-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Research() {
  const [realm, setRealm] = useState('All');
  const [station, setStation] = useState('All');
  const [discipline, setDiscipline] = useState('All');
  const [yearRange, setYearRange] = useState<[number, number]>([1981, 2026]);
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [quickLookPaper, setQuickLookPaper] = useState<ResearchPaper | null>(null);

  const filtered = useMemo(() => {
    return researchPapers.filter((p) => {
      if (realm !== 'All' && p.realm !== realm) return false;
      if (station !== 'All' && p.station !== station) return false;
      if (discipline !== 'All' && p.discipline !== discipline) return false;
      if (p.year < yearRange[0] || p.year > yearRange[1]) return false;
      if (activeChips.length > 0) {
        const hasChip = activeChips.some((chip) => p.tags.includes(chip));
        if (!hasChip) return false;
      }
      return true;
    });
  }, [realm, station, discipline, yearRange, activeChips]);

  const toggleChip = (chip: string) => {
    setActiveChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  return (
    <section id="research" className="relative py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[1px] bg-frost-cyan" />
            <span className="text-xs font-mono text-frost-cyan tracking-widest">RESEARCH ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Research & Data Engine</h2>
          <p className="text-slate-400 max-w-2xl">
            Search and filter across decades of polar expedition data. Filter by realm, station,
            discipline, or expedition year to explore India's polar science legacy.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-frost-cyan" />
            <span className="text-sm font-medium text-slate-300">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <Dropdown label="Realm" options={realms} value={realm} onChange={setRealm} />
            <Dropdown label="Station" options={stationNames} value={station} onChange={setStation} />
            <Dropdown
              label="Discipline"
              options={disciplines}
              value={discipline}
              onChange={setDiscipline}
            />
            <div className="flex flex-col gap-1 px-4 py-2.5 glass-panel rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">Expedition Year</span>
                <span className="text-xs font-mono text-frost-cyan">
                  {yearRange[0]} – {yearRange[1]}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="range"
                  min={1981}
                  max={2026}
                  value={yearRange[0]}
                  onChange={(e) =>
                    setYearRange([Math.min(Number(e.target.value), yearRange[1]), yearRange[1]])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min={1981}
                  max={2026}
                  value={yearRange[1]}
                  onChange={(e) =>
                    setYearRange([yearRange[0], Math.max(Number(e.target.value), yearRange[0])])
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-polar-border">
            <span className="text-xs text-slate-500 font-mono mr-1">Quick tags:</span>
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => toggleChip(chip)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  activeChips.includes(chip)
                    ? 'bg-frost-cyan/20 border-frost-cyan/50 text-frost-cyan'
                    : 'bg-polar-card border-polar-border text-slate-400 hover:border-frost-cyan/30 hover:text-slate-200'
                }`}
              >
                {chip}
              </button>
            ))}
            {(activeChips.length > 0 ||
              realm !== 'All' ||
              station !== 'All' ||
              discipline !== 'All' ||
              yearRange[0] !== 1981 ||
              yearRange[1] !== 2026) && (
              <button
                onClick={() => {
                  setRealm('All');
                  setStation('All');
                  setDiscipline('All');
                  setYearRange([1981, 2026]);
                  setActiveChips([]);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-slate-500">
          Showing <span className="text-frost-cyan font-medium">{filtered.length}</span> of{' '}
          {researchPapers.length} datasets
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((paper) => (
              <div
                key={paper.id}
                className="glass-panel rounded-2xl p-5 hover:border-frost-cyan/30 transition-all duration-300 flex flex-col"
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded-md bg-frost-cyan/10 border border-frost-cyan/20 text-[10px] font-mono text-frost-cyan">
                    {paper.station}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-frost-blue/10 border border-frost-blue/20 text-[10px] font-mono text-frost-blue">
                    {paper.realm}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                    {paper.discipline}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
                    {paper.year}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-base leading-snug mb-2">
                  {paper.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {paper.summary}
                </p>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  <button
                    onClick={() => setQuickLookPaper(paper)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 text-frost-cyan text-sm font-medium hover:bg-frost-cyan/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Quick Look
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-polar-card border border-polar-border text-xs text-slate-400 hover:text-white hover:border-frost-cyan/20 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-polar-card border border-polar-border text-xs text-slate-400 hover:text-white hover:border-frost-cyan/20 transition-colors">
                      <Database className="w-3.5 h-3.5" />
                      CSV
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-polar-card border border-polar-border text-xs text-slate-400 hover:text-white hover:border-frost-cyan/20 transition-colors">
                      <Quote className="w-3.5 h-3.5" />
                      Cite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-16 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No datasets match your current filters.</p>
            <p className="text-slate-600 text-sm mt-2">Try adjusting or clearing your filters.</p>
          </div>
        )}
      </div>

      {/* Quick Look Drawer */}
      {quickLookPaper && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setQuickLookPaper(null)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-xl glass-panel border-l border-frost-cyan/20 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-polar-surface/90 backdrop-blur-md px-6 py-4 border-b border-polar-border flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-frost-cyan" />
                <span className="font-semibold text-white">Quick Look</span>
              </div>
              <button
                onClick={() => setQuickLookPaper(null)}
                className="p-2 hover:bg-polar-card rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2 py-0.5 rounded-md bg-frost-cyan/10 border border-frost-cyan/20 text-[10px] font-mono text-frost-cyan">
                  {quickLookPaper.station}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
                  {quickLookPaper.year}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{quickLookPaper.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{quickLookPaper.summary}</p>

              {/* Chart */}
              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-frost-cyan" />
                  <span className="text-sm font-medium text-slate-200">
                    {quickLookPaper.chart[0].label}
                  </span>
                </div>
                <LineChart paper={quickLookPaper} />
              </div>

              {/* Tags */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-mono text-slate-500">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickLookPaper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-polar-card border border-polar-border text-xs text-slate-400"
                    >
                      {tag}
                    </span>
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
