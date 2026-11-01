import React, { useState } from 'react';
import { COUPLE } from '../data/weddingData';

const navItems = [
  { label: 'Program & Details', href: '#details' },
  { label: 'Countdown', href: '#countdown' },
];

interface Props {
  onOpenGenerator: () => void;
}

const SiteNav: React.FC<Props> = ({ onOpenGenerator }) => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="site-nav">
      <a className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {COUPLE.groomFirst} &amp; {COUPLE.brideFirst}
      </a>

      {/* Desktop links */}
      <div className="nav-links">
        {navItems.map(item => (
          <a key={item.label} className="nav-link" onClick={() => scrollTo(item.href)}>
            {item.label}
          </a>
        ))}
        <button
          className="nav-generator-pill-btn"
          onClick={onOpenGenerator}
          title="Create custom invitation links for guests"
        >
          <span>💌 Create Guest Links</span>
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        <span /><span /><span />
      </button>

      {open && (
        <div className="nav-mobile-menu">
          {navItems.map(item => (
            <a key={item.label} className="nav-mobile-link" onClick={() => scrollTo(item.href)}>
              {item.label}
            </a>
          ))}
          <a
            className="nav-mobile-link highlight-link"
            onClick={() => { setOpen(false); onOpenGenerator(); }}
          >
            💌 Create Guest Links (Host Tool)
          </a>
        </div>
      )}
    </nav>
  );
};

export default SiteNav;
