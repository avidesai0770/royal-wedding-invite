import React from 'react';
import { LOVE_STORY } from '../data/weddingData';

const OurStory: React.FC = () => {
  return (
    <section className="section-white" id="story">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">How It All Began</p>
          <h2 className="section-title" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3rem' }}>Our Story</h2>
          <div className="section-rule" />
        </div>

        <div className="story-timeline">
          {LOVE_STORY.map((step, i) => (
            <div key={i} className={`story-step fade-in-up ${i % 2 === 1 ? 'story-step-right' : ''}`}>
              {/* Polaroid card */}
              <div className="polaroid">
                <div className="polaroid-photo">
                  {/* Abstract botanical art as photo placeholder */}
                  <PolaroidArt index={i} />
                </div>
                <p className="polaroid-caption">{step.title}</p>
              </div>
              {/* Text */}
              <div className="story-text">
                <span className="story-year">{step.year}</span>
                <h3 className="story-step-title">{step.emoji} {step.title}</h3>
                <p className="story-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const colors = ['#6B7F67', '#8A9E86', '#C5A059', '#D4B896', '#9B8EA8'];
const PolaroidArt: React.FC<{ index: number }> = ({ index }) => {
  const c1 = colors[index % colors.length];
  const c2 = colors[(index + 2) % colors.length];
  return (
    <svg viewBox="0 0 200 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`pg${index}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c1} stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#pg${index})`} />
      {/* Botanical overlay */}
      {[0, 1, 2].map(j => (
        <g key={j} transform={`translate(${30 + j * 55}, ${20 + j * 15}) rotate(${-15 + j * 15})`} opacity="0.5">
          <path d={`M0 60 Q0 0 0 -20`} stroke="#FAF8F5" strokeWidth="1.5" fill="none" />
          {[-1, 1].map(side => [30, 50, 70].map(y => (
            <path key={`${side}-${y}`}
              d={`M0 ${y} Q${side * 12} ${y - 12} ${side * 8} ${y - 5} Q4 ${y - 2} 0 ${y}Z`}
              fill="#FAF8F5" opacity="0.6" />
          )))}
        </g>
      ))}
      {/* Center circle */}
      <circle cx="100" cy="80" r="25" fill="#FAF8F5" opacity="0.15" />
      <circle cx="100" cy="80" r="15" fill="#FAF8F5" opacity="0.2" />
    </svg>
  );
};

export default OurStory;
