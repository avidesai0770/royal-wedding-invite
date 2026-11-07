import React from 'react';
import type { GuestConfig } from '../types/wedding';
import { COUPLE, WEDDING_EVENTS } from '../data/weddingData';
import { formatEventsDateAndLocation } from '../utils/urlHelper';

interface Props {
  guest: GuestConfig | null;
}

const InvitationHero: React.FC<Props> = ({ guest }) => {
  const invitedEvents = guest && guest.events.length > 0
    ? WEDDING_EVENTS.filter(e => guest.events.includes(e.slug))
    : WEDDING_EVENTS;

  const { dateText } = formatEventsDateAndLocation(invitedEvents);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-arch-card fade-in-up">
        {/* Lord Ganesha Auspicious Emblem */}
        <div className="hero-ganesha">
          <GaneshaSvg />
        </div>

        <p className="hero-label">Together with their families</p>

        <h1 className="hero-groom">{COUPLE.groomFirst}</h1>
        <div className="hero-ampersand">&amp;</div>
        <h1 className="hero-bride">{COUPLE.brideFirst}</h1>

        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-divider-dot">✦</span>
          <span className="hero-divider-line" />
        </div>

        <p className="hero-date">{dateText}</p>    
        {/* Personalized Guest Badge */}
        {guest?.name && (
          <div className="hero-guest-badge">
            <span className="guest-badge-greeting">
              Dear <strong>{guest.name}</strong> — you are warmly invited to:
            </span>
            <div className="hero-guest-events">
              {invitedEvents.map(e => (
                <span key={e.id} className="hero-guest-tag">
                  {e.emoji} {e.title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="hero-cta-row">
          <button className="btn-sage" onClick={() => scrollTo('details')}>
            View Program & Details
          </button>
        </div>
      </div>

      {/* Floating botanical accents */}
      <div className="hero-floral-left"><FloralSprig /></div>
      <div className="hero-floral-right"><FloralSprig mirror /></div>
    </section>
  );
};

const GaneshaSvg = () => (
  <svg viewBox="0 0 120 110" width="90" height="82" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="80" rx="30" ry="26" fill="#6B7F67" opacity="0.85" />
    <path d="M30 70 Q16 58 22 46 Q26 40 32 48" stroke="#6B7F67" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
    <path d="M90 70 Q104 58 98 46 Q94 40 88 48" stroke="#6B7F67" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.8" />
    <ellipse cx="22" cy="48" rx="7" ry="8" fill="#C5A059" opacity="0.9" />
    <ellipse cx="60" cy="42" rx="20" ry="19" fill="#6B7F67" opacity="0.9" />
    <ellipse cx="38" cy="42" rx="13" ry="10" fill="#8A9E86" opacity="0.7" />
    <ellipse cx="82" cy="42" rx="13" ry="10" fill="#8A9E86" opacity="0.7" />
    <ellipse cx="39" cy="42" rx="7" ry="6" fill="#FAF8F5" opacity="0.3" />
    <ellipse cx="81" cy="42" rx="7" ry="6" fill="#FAF8F5" opacity="0.3" />
    <path d="M52 54 Q40 66 46 78 Q50 86 58 80" stroke="#6B7F67" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.85" />
    <circle cx="54" cy="38" r="3" fill="#FAF8F5" />
    <circle cx="66" cy="38" r="3" fill="#FAF8F5" />
    <circle cx="55" cy="38" r="1.5" fill="#3F4F3D" />
    <circle cx="67" cy="38" r="1.5" fill="#3F4F3D" />
    <ellipse cx="60" cy="30" rx="4" ry="5" fill="#C5A059" opacity="0.9" />
    <path d="M58 27 L60 22 L62 27" fill="#C5A059" opacity="0.7" />
    <path d="M44 28 L48 18 L55 26 L60 12 L65 26 L72 18 L76 28" stroke="#C5A059" strokeWidth="2" fill="none" strokeLinejoin="round" opacity="0.9" />
    <circle cx="60" cy="13" r="3" fill="#C5A059" />
    <circle cx="48" cy="19" r="2" fill="#C5A059" opacity="0.8" />
    <circle cx="72" cy="19" r="2" fill="#C5A059" opacity="0.8" />
    <path d="M70 50 Q78 46 76 38" stroke="#FAF8F5" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const FloralSprig: React.FC<{ mirror?: boolean }> = ({ mirror }) => (
  <svg viewBox="0 0 80 200" width="70" height="180" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined, opacity: 0.55 }}>
    <path d="M40 200 Q40 120 40 10" stroke="#6B7F67" strokeWidth="2" fill="none" />
    {[160, 130, 100, 75, 55].map((y, i) => (
      <g key={i}>
        <path d={`M40 ${y} Q${25 + i * 2} ${y - 18} ${28 - i * 2} ${y - 10} Q35 ${y - 4} 40 ${y}Z`}
          fill="#6B7F67" opacity="0.7" />
        <path d={`M40 ${y} Q${55 - i * 2} ${y - 18} ${52 + i * 2} ${y - 10} Q45 ${y - 4} 40 ${y}Z`}
          fill="#6B7F67" opacity="0.7" />
      </g>
    ))}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <ellipse key={i} cx={40 + 9 * Math.cos((angle * Math.PI) / 180)}
        cy={18 + 9 * Math.sin((angle * Math.PI) / 180)}
        rx="5" ry="8"
        transform={`rotate(${angle}, ${40 + 9 * Math.cos((angle * Math.PI) / 180)}, ${18 + 9 * Math.sin((angle * Math.PI) / 180)})`}
        fill="#FAF8F5" opacity="0.9" />
    ))}
    <circle cx="40" cy="18" r="5" fill="#C5A059" opacity="0.9" />
  </svg>
);

export default InvitationHero;
