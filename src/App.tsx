import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Research from '@/components/Research';
import Stations from '@/components/Stations';
import Media from '@/components/Media';
import StudentOutreach from '@/components/StudentOutreach';
import { Snowflake } from 'lucide-react';

type View = 'main' | 'media' | 'outreach';

function App() {
  const [view, setView] = useState<View>('main');

  const handleNavigate = (target: string, targetView: 'main' | 'media' | 'outreach') => {
    if (targetView !== view) {
      setView(targetView);
      // Wait for view to render before scrolling
      setTimeout(() => {
        if (targetView === 'main') {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      if (targetView === 'main') {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Scroll to top when switching to a non-main view
  useEffect(() => {
    if (view !== 'main') {
      window.scrollTo({ top: 0 });
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-polar-bg text-slate-200">
      <Navbar onNavigate={handleNavigate} activeView={view} />
      <main>
        {view === 'main' && (
          <>
            <Hero />
            <Research />
            <Stations />
          </>
        )}
        {view === 'media' && <Media />}
        {view === 'outreach' && <StudentOutreach />}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-polar-border bg-polar-surface/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <button
              onClick={() => handleNavigate('hero', 'main')}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-frost-cyan/10 border border-frost-cyan/30 flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-frost-cyan" />
              </div>
              <div className="text-left">
                <span className="font-bold text-white tracking-wider">ICEBYTE</span>
                <span className="text-xs font-mono text-frost-cyan/70 ml-2">MoES | NCPOR</span>
              </div>
            </button>
            <p className="text-xs text-slate-500 text-center">
              Polar Science Knowledge & Outreach Portal · Built for the Ministry of Earth Sciences
            </p>
            <p className="text-xs font-mono text-slate-600">
              © 2026 ICEBYTE · All telemetry simulated
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
