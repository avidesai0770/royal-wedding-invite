import React, { useEffect, useState } from 'react';
import { WEDDING_DATE } from '../data/weddingData';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="section-sage-light" id="countdown">
      <div className="section-inner text-center">
        <p className="section-label">The Big Day Is</p>
        <h2 className="section-title">Coming Soon</h2>
        <div className="section-rule" />
        <div className="countdown-row">
          {units.map(u => (
            <div key={u.label} className="countdown-unit">
              <div className="countdown-num">{String(u.value).padStart(2, '0')}</div>
              <div className="countdown-label">{u.label}</div>
            </div>
          ))}
        </div>
        <p className="countdown-sub">Until Avi & Nupur say "I do" ✨</p>
      </div>
    </section>
  );
};

export default CountdownTimer;
