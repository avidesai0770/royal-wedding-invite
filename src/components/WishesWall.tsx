import React, { useState } from 'react';
import type { Wish } from '../types/wedding';
import { INITIAL_WISHES } from '../data/weddingData';

const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: msg.trim(),
      createdAt: new Date().toISOString(),
    };
    setWishes(prev => [newWish, ...prev]);
    setName('');
    setMsg('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section-sage-light" id="wishes">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Spread the Love</p>
          <h2 className="section-title" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '3rem' }}>Wishes Wall</h2>
          <div className="section-rule" />
        </div>

        {/* Submit form */}
        <form className="wish-form" onSubmit={handleSubmit}>
          <input
            className="wish-input"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={50}
            required
          />
          <textarea
            className="wish-textarea"
            placeholder="Write your blessings for Avi & Nupur..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
            rows={3}
            maxLength={300}
            required
          />
          <button type="submit" className="btn-sage">
            {submitted ? '✨ Wish Sent!' : 'Send Blessings 💐'}
          </button>
        </form>

        {/* Wishes grid */}
        <div className="wishes-grid">
          {wishes.map(wish => (
            <div key={wish.id} className="wish-card fade-in-up">
              <p className="wish-message">"{wish.message}"</p>
              <p className="wish-author">— {wish.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
