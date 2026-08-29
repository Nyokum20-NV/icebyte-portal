import React, { useState, useEffect } from 'react';
import { Snowflake, Search, Menu, X, FileText, Globe, Video, ArrowRight } from 'lucide-react';
import { TabType } from '../App';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

// Searchable index covering papers, stations, tours, and outreach
const searchableData = [
  { id: '1', title: 'Maitri Station', category: 'Live Station', tab: 'stations' as TabType, desc: 'Antarctica base - Geomagnetism & Paleoclimate records' },
  { id: '2', title: 'Bharati Station', category: 'Live Station', tab: 'stations' as TabType, desc: 'Larsemann Hills - Oceanography & satellite telemetry' },
  { id: '3', title: 'Himadri Station', category: 'Live Station', tab: 'stations' as TabType, desc: 'Ny-Ålesund, Arctic - Glaciology & monsoon connection' },
  { id: '4', title: 'IndARC Observatory', category: 'Live Station', tab: 'stations' as TabType, desc: 'Moored subsurface observatory in Kongsfjorden fjord' },
  { id: '5', title: 'Ice Core Paleoclimatology (518m Drill)', category: 'Research', tab: 'research' as TabType, desc: 'Chemical profiling of Central Antarctic ice sheets' },
  { id: '6', title: 'Arctic Microplastics & Snow Deposition', category: 'Research', tab: 'research' as TabType, desc: 'Atmospheric transport of polymers in Ny-Ålesund' },
  { id: '7', title: 'Himalayan Glacial Mass Balance Survey', category: 'Research', tab: 'research' as TabType, desc: 'Chandra Basin ice retreat dynamics from 2012-2025' },
  { id: '8', title: 'Total Ozone Column Telemetry & UV Index', category: 'Research', tab: 'research' as TabType, desc: 'Dobson Spectrophotometer measurements over Maitri' },
  { id: '9', title: '360° Bharati Station Virtual Tour', category: 'Media', tab: 'media' as TabType, desc: 'Full immersive panoramic expedition walk' },
  { id: '10', title: 'Interactive Polar Science Quiz', category: 'Student Outreach', tab: 'outreach' as TabType, desc: 'Test knowledge of Indian polar research history' },
];

export default function Navbar({ activeTab, onSelectTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems: { id: TabType; label: string }[] = [
    { id: 'command', label: 'Command Hub' },
    { id: 'research', label: 'Research & Data' },
    { id: 'stations', label: 'Live Stations' },
    { id: 'media', label: 'Media & 360° Tours' },
    { id: 'outreach', label: 'Student Outreach' },
  ];

  // Shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredResults = searchQuery.trim() === ''
    ? []
    : searchableData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectResult = (tab: TabType) => {
    onSelectTab(tab);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div 
              onClick={() => onSelectTab('command')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/30 group-hover:border-cyan-400 transition">
                <Snowflake className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <div className="font-extrabold tracking-wider text-base text-white group-hover:text-cyan-300 transition">
                  ICEBYTE
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">
                  MoES | NCPOR
                </div>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition duration-150 ${
                    activeTab === item.id
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Interactive Search Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-white transition duration-200 shadow-sm"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search archive...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Search className="w-5 h-5 text-cyan-400" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === item.id
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Global Search Dialog Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-slate-950/80">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expeditions, research datasets, stations, ice cores..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">ESC</kbd>
              </button>
            </div>

            {/* Live Search Results View */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-800/40">
              {searchQuery.trim() === '' ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  Type to search across stations, paleoclimate datasets, and outreach media.
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No polar records found matching "<span className="text-cyan-300">{searchQuery}</span>".
                </div>
              ) : (
                filteredResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item.tab)}
                    className="pt-1.5 first:pt-0"
                  >
                    <div className="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                          {item.category === 'Live Station' && <Globe className="w-4 h-4" />}
                          {item.category === 'Research' && <FileText className="w-4 h-4" />}
                          {item.category === 'Media' && <Video className="w-4 h-4" />}
                          {item.category === 'Student Outreach' && <Snowflake className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
