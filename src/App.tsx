import React, { useState, useEffect, useRef } from 'react';
import EnvelopeEntrance from './components/EnvelopeEntrance';
import InvitationHero from './components/InvitationHero';
import CountdownTimer from './components/CountdownTimer';
import TheDetails from './components/TheDetails';
import OurStory from './components/OurStory';
import WishesWall from './components/WishesWall';
import MusicPlayer from './components/MusicPlayer';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import HostGeneratorModal from './components/HostGeneratorModal';
import { parseGuestFromUrl } from './utils/urlHelper';
import type { GuestConfig } from './types/wedding';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [removeOverlay, setRemoveOverlay] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [guest, setGuest] = useState<GuestConfig | null>(() => parseGuestFromUrl());
  const petalsRef = useRef<HTMLDivElement>(null);

  // Re-read query params if user switches links
  useEffect(() => {
    const handlePopState = () => {
      setGuest(parseGuestFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleEnvelopeOpen = () => {
    setIsOpened(true);
    // Smoothly remove overlay from DOM once fade transition is complete
    setTimeout(() => {
      setRemoveOverlay(true);
    }, 850);
  };

  // Floating marigold / rose petals background animation
  useEffect(() => {
    const container = petalsRef.current;
    if (!container) return;

    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'floating-petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (7 + Math.random() * 7) + 's';
      petal.style.animationDelay = Math.random() * 3 + 's';
      petal.style.opacity = (0.25 + Math.random() * 0.45).toString();
      const size = 8 + Math.random() * 12;
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      container.appendChild(petal);
      setTimeout(() => petal.remove(), 15000);
    };

    const interval = setInterval(createPetal, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. Main Wedding Website (ALWAYS rendered behind overlay — NO white flash!) */}
      <div className="site-wrapper site-visible">
        <SiteNav onOpenGenerator={() => setShowGenerator(true)} />
        <MusicPlayer autoStart={false} />

        {/* Floating petals container */}
        <div ref={petalsRef} className="petals-container" aria-hidden="true" />

        <main>
          {/* Royal Arch Hero Invitation */}
          <InvitationHero guest={guest} />

          {/* Countdown to Dec 14 */}
          <CountdownTimer />

          {/* Redesigned Mark Your Calendar / Ceremonies with guest filtering */}
          <TheDetails guest={guest} />

        </main>

        <SiteFooter />
      </div>

      {/* 2. Interactive Wax Seal Envelope Entrance Overlay */}
      {!removeOverlay && (
        <div className={`envelope-screen ${isOpened ? 'fade-out' : ''}`}>
          <EnvelopeEntrance onOpen={handleEnvelopeOpen} guest={guest} />
        </div>
      )}

      {/* 3. Host Invitation Link Customizer Modal */}
      {showGenerator && (
        <HostGeneratorModal onClose={() => setShowGenerator(false)} />
      )}
    </>
  );
};

export default App;
