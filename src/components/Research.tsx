import React, { useState, useEffect } from 'react';
import { Filter, Download, Eye, FileText, CheckCircle2, X } from 'lucide-react';

export interface Dataset {
  id: string;
  title: string;
  station: string;
  realm: string;
  discipline: string;
  year: number;
  abstract: string;
  recordsCount: string;
}

const datasets: Dataset[] = [
  {
    id: '1',
    title: 'Multidecadal Variations of Surface Ozone & Trace Gases at Bharati Station',
    station: 'Bharati',
    realm: 'Antarctica',
    discipline: 'Atmospheric Physics',
    year: 2023,
    recordsCount: '1.4M data points',
    abstract: 'Continuous surface ozone measurements analyzing polar vortex chemistry and long-term recovery patterns following Montreal Protocol enforcement.'
  },
  {
    id: '2',
    title: 'Ice Core δ18O Records from IndARC: 2,000-Year Temperature Reconstruction',
    station: 'IndARC',
    realm: 'Arctic',
    discipline: 'Glaciology & Ice Cores',
    year: 2021,
    recordsCount: '840 core slices',
    abstract: 'High-resolution oxygen isotope stratigraphy from Arctic fjord cores providing multi-centennial paleotemperature proxies.'
  },
  {
    id: '3',
    title: 'Microplastic Abundance in Southern Ocean Surface Waters Near Maitri',
    station: 'Maitri',
    realm: 'Southern Ocean',
    discipline: 'Oceanography',
    year: 2024,
    recordsCount: '320 water samples',
    abstract: 'FTIR spectroscopic quantification of synthetic polymer fibers and nurdles transported via circum-Antarctic currents.'
  },
  {
    id: '4',
    title: 'Geomagnetic Storm Signatures at Himadri: Effects on Polar Ionosphere',
    station: 'Himadri',
    realm: 'Arctic',
    discipline: 'Space Weather & Magnetism',
    year: 2022,
    recordsCount: '98,000 telemetry hrs',
    abstract: 'High-latitude fluxgate magnetometer and riometer observations tracking ionospheric current disturbances during major solar flares.'
  },
  {
    id: '5',
    title: 'Himalayan Glacial Retreat Patterns: 40-Year Satellite & Field Survey',
    station: 'IndARC',
    realm: 'Himalayas',
    discipline: 'Glaciology & Ice Cores',
    year: 2020,
    recordsCount: '45 glacier profiles',
    abstract: 'Geodetic mass-balance estimations across the Chandra-Bhaga basin documenting snout retreat and moraine-dammed lake expansions.'
  },
  {
    id: '6',
    title: 'Extremophile Microbial Communities in Antarctic Lake Ice Covers',
    station: 'Bharati',
    realm: 'Antarctica',
    discipline: 'Extremophile Biology',
    year: 2025,
    recordsCount: '180 genomic sequences',
    abstract: 'Metagenomic profiling of cold-tolerant psychrophilic bacteria extracted from the perennial ice cover of Lake Priyadarshini.'
  },
  {
    id: '7',
    title: 'Aerosol Optical Depth and Black Carbon Deposition over Ny-Ålesund',
    station: 'Himadri',
    realm: 'Arctic',
    discipline: 'Atmospheric Physics',
    year: 2023,
    recordsCount: '410,000 spectral scans',
    abstract: 'Sun-photometer and aethalometer monitoring characterizing long-range transport of Eurasian anthropogenic aerosols into the high Arctic.'
  },
  {
    id: '8',
    title: 'Subsurface Moored Current Dynamics in Kongsfjorden Fjord',
    station: 'IndARC',
    realm: 'Arctic',
    discipline: 'Oceanography',
    year: 2024,
    recordsCount: '52 ADCP deployments',
    abstract: 'Year-round acoustic Doppler profiling capturing Atlantic Water advection pulses and their impact on Arctic marine stratification.'
  },
  {
    id: '9',
    title: 'Permafrost Active-Layer Thermal Profiling in Schirmacher Oasis',
    station: 'Maitri',
    realm: 'Antarctica',
    discipline: 'Glaciology & Ice Cores',
    year: 2022,
    recordsCount: '24 borehole logs',
    abstract: 'Subsurface thermistor array logs recording freeze-thaw cycles and active-layer depth changes in Queen Maud Land bedrock.'
  },
  {
    id: '10',
    title: 'Benthic Fauna Diversity Along the Princess Elizabeth Land Coast',
    station: 'Bharati',
    realm: 'Southern Ocean',
    discipline: 'Extremophile Biology',
    year: 2023,
    recordsCount: '95 grab samples',
    abstract: 'Taxonomic and biomass analysis of macrobenthos collected via epibenthic sleds to gauge biodiversity responses to iceberg scouring.'
  },
  {
    id: '11',
    title: 'VLF Radio Wave Propagation Anomaly Detection in Polar Cap Absorption Events',
    station: 'Maitri',
    realm: 'Antarctica',
    discipline: 'Space Weather & Magnetism',
    year: 2021,
    recordsCount: '1,200 phase logs',
    abstract: 'Phase and amplitude recordings of sub-ionospheric VLF signals diagnosing energetic proton precipitation events over D-region heights.'
  },
  {
    id: '12',
    title: 'Chhota Shigri Glacier Mass Balance & Hydrological Runoff Modeling',
    station: 'Himadri',
    realm: 'Himalayas',
    discipline: 'Glaciology & Ice Cores',
    year: 2024,
    recordsCount: '310 discharge series',
    abstract: 'Stake-based ablation networks combined with automated weather station data evaluating glacial meltwater contribution to the Indus basin.'
  }
];

interface ResearchProps {
  externalSearchQuery?: string;
  onClearSearch?: () => void;
}

export default function Research({ externalSearchQuery = '', onClearSearch }: ResearchProps) {
  const [selectedRealm, setSelectedRealm] = useState('All');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');
  const [activeTag, setActiveTag] = useState<string>('');

  useEffect(() => {
    if (externalSearchQuery) {
      setActiveTag(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  const quickTags = [
    'Ozone Depletion',
    'Ice Core δ18O',
    'Microplastics',
    'Geomagnetic Storms',
    'Himalayan Glaciers',
    'Extremophile'
  ];

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag('');
      if (onClearSearch) onClearSearch();
    } else {
      setActiveTag(tag);
    }
  };

  const filteredDatasets = datasets.filter((item) => {
    const matchesRealm = selectedRealm === 'All' || item.realm.toLowerCase() === selectedRealm.toLowerCase();
    const matchesDiscipline = selectedDiscipline === 'All' || item.discipline === selectedDiscipline;
    const filterTerm = activeTag.toLowerCase();
    const matchesTag =
      filterTerm === '' ||
      item.title.toLowerCase().includes(filterTerm) ||
      item.discipline.toLowerCase().includes(filterTerm) ||
      item.abstract.toLowerCase().includes(filterTerm);

    return matchesRealm && matchesDiscipline && matchesTag;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      <div className="mb-8">
        <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Research Engine</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Research & Data Engine</h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          Search and filter across decades of polar expedition data by station, discipline, or expedition topic.
        </p>
      </div>

      {/* Filter and Quick Tags Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl backdrop-blur-md mb-8 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Polar Realm</label>
            <select
              value={selectedRealm}
              onChange={(e) => setSelectedRealm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Realms</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Himalayas">Himalayas</option>
              <option value="Southern Ocean">Southern Ocean</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Discipline</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Disciplines</option>
              <option value="Glaciology & Ice Cores">Glaciology & Ice Cores</option>
              <option value="Atmospheric Physics">Atmospheric Physics</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Space Weather & Magnetism">Space Weather & Magnetism</option>
              <option value="Extremophile Biology">Extremophile Biology</option>
            </select>
          </div>

          <div className="flex items-end">
            {(selectedRealm !== 'All' || selectedDiscipline !== 'All' || activeTag !== '') && (
              <button
                onClick={() => {
                  setSelectedRealm('All');
                  setSelectedDiscipline('All');
                  setActiveTag('');
                  if (onClearSearch) onClearSearch();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 transition"
              >
                <X className="w-3.5 h-3.5" /> Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 font-medium">Quick tags:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                activeTag.toLowerCase().includes(tag.toLowerCase().split(' ')[0])
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-950'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Counter */}
      <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
        <span>Showing <strong className="text-cyan-300">{filteredDatasets.length}</strong> of {datasets.length} datasets</span>
        {activeTag && (
          <span className="text-cyan-400">
            Filtered by: <span className="underline font-semibold">{activeTag}</span>
          </span>
        )}
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition duration-200 backdrop-blur-md shadow-xl"
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3 text-[10px] font-semibold">
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {ds.station}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {ds.realm}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                  {ds.discipline}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  {ds.year}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                {ds.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {ds.abstract}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">{ds.recordsCount}</span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => alert(`Opening Data Preview: ${ds.title}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 transition"
                >
                  <Eye className="w-3 h-3 text-cyan-400" /> Preview
                </button>
                <button 
                  onClick={() => alert(`Downloading CSV records for ${ds.title}...`)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-1 transition"
                >
                  <Download className="w-3 h-3" /> CSV
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
