import React, { useState } from 'react';
import { Snowflake, Search, Menu, X } from 'lucide-react';
import { TabType } from '../App';

interface NavbarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export default function Navbar({ activeTab, onSelectTab }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'command', label: 'Command Hub' },
    { id: 'research', label: 'Research & Data' },
    { id: 'stations', label: 'Live Stations' },
    { id: 'media', label: 'Media & 360° Tours' },
    { id: 'outreach', label: 'Student Outreach' },
  ];

  return (
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

          {/* Quick Search Shortcut Pill */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">⌘K</kbd>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
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
  );
}
