import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { EmergencyBanner } from './EmergencyBanner';

export function Layout() {
  const [showEmergency, setShowEmergency] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-night-900 text-foreground aurora-bg">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      
      {/* Emergency floating button */}
      <button
        onClick={() => setShowEmergency(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg pulse-emergency transition-all duration-300 hover:scale-110"
        aria-label="Urgence - Hotline d'aide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </button>

      {showEmergency && (
        <EmergencyBanner onClose={() => setShowEmergency(false)} />
      )}
    </div>
  );
}
