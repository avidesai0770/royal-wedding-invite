import React, { useState, useRef } from 'react';
import { weddingAudio } from '../utils/audioSynth';
import { WeddingMusicManager } from '../utils/musicManager';
import { WEDDING_EVENTS } from '../data/weddingData';
import type { GuestConfig } from '../types/wedding';

interface Props {
  onOpen: () => void;
  guest: GuestConfig | null;
}

const EnvelopeEntrance: React.FC<Props> = ({ onOpen, guest }) => {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');
  const audioStarted = useRef(false);

  const invitedEvents = guest && guest.events.length > 0
    ? WEDDING_EVENTS.filter(e => guest.events.includes(e.slug))
    : WEDDING_EVENTS;

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('opening');

    if (!audioStarted.current) {
      audioStarted.current = true;
      weddingAudio.playTempleChime();
      setTimeout(() => {
        WeddingMusicManager.playSong();
      }, 500);
    }

    // Flap opens, card slides up, then smoothly trigger site reveal
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 1200);
  };

  const particles = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="envelope-scene" onClick={handleClick}>
      {/* Background petals */}
      {particles.map(i => (
        <div
          key={i}
          className="env-petal"
          style={{
            left: `${(i * 5.8) % 100}%`,
            animationDelay: `${(i * 0.35) % 5}s`,
            animationDuration: `${7 + (i % 5)}s`,
            opacity: 0.5 + ((i % 4) * 0.12),
          }}
        />
      ))}

      {/* Guest Name Callout if personalized */}
      {guest?.name && (
        <div className="envelope-guest-banner fade-in-up">
          <span className="banner-knot">🪷</span>
          <span>Specially Handcrafted for <strong>{guest.name}</strong></span>
          <span className="banner-knot">🪷</span>
        </div>
      )}

      {/* Envelope wrapper */}
      <div className={`envelope-wrap ${phase === 'opening' ? 'opening' : ''} ${phase === 'done' ? 'done' : ''}`}>
        {/* Envelope body */}
        <div className="envelope-body">
          <div className="env-side-left" />
          <div className="env-side-right" />
          <div className="env-bottom" />

          {/* Flap */}
          <div className={`env-flap ${phase !== 'idle' ? 'open' : ''}`}>
            <div className="env-flap-inner" />
          </div>

          {/* Wax seal */}
          <div className={`wax-seal ${phase !== 'idle' ? 'fade-out' : ''}`}>
            <svg viewBox="0 0 60 60" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#FAF8F5" strokeWidth="1.5" />
              <text x="30" y="37" textAnchor="middle" fontSize="22" fontFamily="serif" fill="#FAF8F5">ॐ</text>
            </svg>
          </div>

          {/* Inner card that slides out */}
          <div className={`env-letter ${phase !== 'idle' ? 'rise' : ''}`}>
            <div className="env-letter-content">
              {/* Ganesha silhouette */}
              <svg viewBox="0 0 80 60" width="70" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 4 }}>
                <ellipse cx="40" cy="38" rx="18" ry="16" fill="#6B7F67" opacity="0.9" />
                <ellipse cx="40" cy="22" rx="12" ry="11" fill="#6B7F67" opacity="0.9" />
                <path d="M33 28 Q24 36 28 46 Q30 50 34 46" stroke="#6B7F67" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
                <ellipse cx="28" cy="22" rx="8" ry="6" fill="#8A9E86" opacity="0.8" />
                <ellipse cx="52" cy="22" rx="8" ry="6" fill="#8A9E86" opacity="0.8" />
                <circle cx="36" cy="13" r="2" fill="#C5A059" />
                <circle cx="40" cy="11" r="2.5" fill="#C5A059" />
                <circle cx="44" cy="13" r="2" fill="#C5A059" />
              </svg>

              <p className="env-letter-label">You are cordially invited to</p>
              <p className="env-letter-names">Avi & Nupur</p>
              <p className="env-letter-sub">12 – 14 December 2026 · Surat</p>

              {/* Invited Ceremonies Mini-List */}
              <div className="env-letter-events-row">
                {invitedEvents.map(ev => (
                  <span key={ev.id} className="env-letter-tag">
                    {ev.emoji} {ev.title.split('&')[0].trim()}
                  </span>
                ))}
              </div>

              {guest?.name && (
                <p className="env-letter-guest">With Warm Respects to {guest.name}</p>
              )}
            </div>
          </div>

          {/* Botanical corners */}
          <FloralCorner position="tl" />
          <FloralCorner position="tr" />
          <FloralCorner position="bl" />
          <FloralCorner position="br" />
        </div>

        {/* Click prompt with music notice */}
        <div className={`env-prompt ${phase !== 'idle' ? 'hide' : ''}`}>
          <span className="env-prompt-dot" />
          <span>Tap Wax Seal to Open</span>
          <span className="env-prompt-dot" />
        </div>
      </div>

      {/* Music notice & Title below envelope */}
      <div className="env-title-below">
        <div className="env-music-indicator">
          <span>🎵 Playing "Tune Kaha" (Prateek Kuhad)</span>
        </div>
      </div>
    </div>
  );
};

const FloralCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const transforms: Record<string, string> = {
    tl: 'rotate(0deg)',
    tr: 'rotate(90deg)',
    br: 'rotate(180deg)',
    bl: 'rotate(270deg)',
  };
  const positions: Record<string, React.CSSProperties> = {
    tl: { top: 8, left: 8 },
    tr: { top: 8, right: 8 },
    br: { bottom: 8, right: 8 },
    bl: { bottom: 8, left: 8 },
  };
  return (
    <svg
      viewBox="0 0 40 40"
      width="38"
      height="38"
      style={{ position: 'absolute', ...positions[position], transform: transforms[position], opacity: 0.7 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 38 Q2 2 38 2" stroke="#FAF8F5" strokeWidth="1" fill="none" />
      <circle cx="10" cy="10" r="3" fill="#FAF8F5" opacity="0.8" />
      <circle cx="7" cy="18" r="2" fill="#FAF8F5" opacity="0.6" />
      <circle cx="18" cy="7" r="2" fill="#FAF8F5" opacity="0.6" />
      <path d="M14 14 Q10 8 6 12 Q10 16 14 14Z" fill="#FAF8F5" opacity="0.5" />
      <path d="M22 6 Q18 2 15 6 Q18 10 22 6Z" fill="#FAF8F5" opacity="0.5" />
    </svg>
  );
};

export default EnvelopeEntrance;
