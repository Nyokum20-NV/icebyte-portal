import { useState, useEffect, useRef } from 'react';
import { Snowflake, Search, X, Command } from 'lucide-react';
import { navLinks } from '@/data/mockData';

interface NavbarProps {
  onNavigate: (target: string, view: 'main' | 'media' | 'outreach') => void;
  activeView: 'main' | 'media' | 'outreach';
}

export default function Navbar({ onNavigate, activeView }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const searchResults = searchQuery
    ? navLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : navLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-polar-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => onNavigate('hero', 'main')}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-frost-cyan/20 to-frost-blue/10 flex items-center justify-center border border-frost-cyan/30">
                  <Snowflake
                    className="w-6 h-6 text-frost-cyan"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.7))' }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg tracking-wider text-white glow-text leading-none">
                  ICEBYTE
                </span>
                <span className="text-[10px] font-mono text-frost-cyan/70 tracking-widest mt-0.5">
                  MoES | NCPOR
                </span>
              </div>
            </button>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.target, link.view)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeView === link.view && link.view !== 'main'
                      ? 'text-frost-cyan bg-frost-cyan/5'
                      : 'text-slate-300 hover:text-frost-cyan hover:bg-frost-cyan/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-polar-card border border-polar-border rounded-lg hover:border-frost-cyan/40 transition-colors duration-200 group"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-frost-cyan transition-colors" />
              <span className="hidden sm:inline text-sm text-slate-400 group-hover:text-slate-300">
                Quick search...
              </span>
              <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-polar-bg border border-polar-border rounded text-[10px] font-mono text-slate-500">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl glass-panel rounded-2xl border border-frost-cyan/20 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-polar-border">
              <Search className="w-5 h-5 text-frost-cyan" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expeditions, stations, datasets..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 hover:bg-polar-card rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={result.label}
                    onClick={() => {
                      onNavigate(result.target, result.view);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-frost-cyan/10 transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-frost-cyan/10 flex items-center justify-center">
                      <Search className="w-4 h-4 text-frost-cyan" />
                    </div>
                    <span className="text-slate-200 group-hover:text-white font-medium">
                      {result.label}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-slate-500">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
