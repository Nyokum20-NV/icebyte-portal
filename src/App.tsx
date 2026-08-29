import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stations from './components/Stations';
import Research from './components/Research';
import Media from './components/Media';
import StudentOutreach from './components/StudentOutreach';

export type TabType = 'command' | 'stations' | 'research' | 'media' | 'outreach';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('command');

  // Smooth scroll directly to section when navbar item is clicked
  const handleScrollToSection = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'command') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(tab);
    if (element) {
      const offset = 70; // account for fixed navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Automatically highlight active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections: TabType[] = ['outreach', 'media', 'research', 'stations', 'command'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        if (section === 'command') {
          setActiveTab('command');
          break;
        }
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Universal Fixed Navbar */}
      <Navbar activeTab={activeTab} onSelectTab={handleScrollToSection} />

      {/* Unified Full-Length Page */}
      <main className="flex-grow pt-16 space-y-16">
        {/* Command Hub & Hero Banner */}
        <section id="command">
          <Hero />
        </section>

        {/* 3D Interactive Globe & Station Telemetry */}
        <section id="stations" className="scroll-mt-20">
          <Stations />
        </section>

        {/* Deep Paleoclimate & Research Archive */}
        <section id="research" className="scroll-mt-20">
          <Research />
        </section>

        {/* 360° Tours & Expedition Media */}
        <section id="media" className="scroll-mt-20">
          <Media />
        </section>

        {/* Student Outreach & Polar Quiz Engine */}
        <section id="outreach" className="scroll-mt-20 pb-16">
          <StudentOutreach />
        </section>
      </main>

      {/* Unified Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-center text-xs text-slate-400">
        <p>© 2026 ICEBYTE • Ministry of Earth Sciences (MoES) • National Centre for Polar and Ocean Research (NCPOR)</p>
      </footer>
    </div>
  );
}
