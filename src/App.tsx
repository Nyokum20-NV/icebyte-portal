import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Research from './components/Research';
import Stations from './components/Stations';
import Media from './components/Media';
import StudentOutreach from './components/StudentOutreach';

export type TabType = 'command' | 'research' | 'stations' | 'media' | 'outreach';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('command');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Universal Fixed Navbar */}
      <Navbar activeTab={activeTab} onSelectTab={handleTabChange} />

      {/* Main View Router */}
      <main className="flex-grow pt-16">
        {activeTab === 'command' && (
          <div className="space-y-12">
            <Hero onExploreResearch={() => handleTabChange('research')} onExploreStations={() => handleTabChange('stations')} />
            <div id="quick-telemetry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Stations />
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="animate-fadeIn">
            <Research />
          </div>
        )}

        {activeTab === 'stations' && (
          <div className="animate-fadeIn py-6">
            <Stations />
          </div>
        )}

        {activeTab === 'media' && (
          <div className="animate-fadeIn">
            <Media />
          </div>
        )}

        {activeTab === 'outreach' && (
          <div className="animate-fadeIn">
            <StudentOutreach />
          </div>
        )}
      </main>

      {/* Unified Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <p>© 2026 ICEBYTE • Ministry of Earth Sciences (MoES) • National Centre for Polar and Ocean Research (NCPOR)</p>
      </footer>
    </div>
  );
}
