import React, { useState } from 'react';
import { WEDDING_EVENTS } from '../data/weddingData';
import type { GuestConfig, WeddingEvent } from '../types/wedding';
import { EventMapLink } from './EventMapLink';

interface Props {
  guest: GuestConfig | null;
}

const TheDetails: React.FC<Props> = ({ guest }) => {
  const [activeTimelineId, setActiveTimelineId] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);

  // If guest is defined and has specified events, filter unless user clicks show all
  const invitedEvents = guest && guest.events.length > 0
    ? WEDDING_EVENTS.filter(e => guest.events.includes(e.slug))
    : WEDDING_EVENTS;

  const displayedEvents = (showAllEvents || invitedEvents.length === 0)
    ? WEDDING_EVENTS
    : invitedEvents;

  const isPersonalized = guest && guest.events.length > 0 && guest.events.length < WEDDING_EVENTS.length;

  // Calendar .ics generator for guests to add to their phone calendar
  const handleAddToCalendar = (event: WeddingEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Avi and Nupur Wedding//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Avi & Nupur Wedding — ${event.title}`,
      `DESCRIPTION:${event.description}\\nDress Code: ${event.dressCode}`,
      `LOCATION:${event.venue}, ${event.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.slug}-invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section-calendar" id="details">
      <div className="section-inner">
        {/* Section Header */}
        <div className="calendar-header-block text-center">
          <div className="calendar-shubh-badge">
            <span>॥ शुभ विवाह महोत्सव ॥</span>
          </div>
          <p className="calendar-eyebrow">Itinerary of Celebrations</p>
          <h2 className="calendar-headline">Mark Your Calendar</h2>
          <div className="calendar-gold-motif">
            <span className="motif-line" />
            <span className="motif-symbol">🪷 ✦ 🪷</span>
            <span className="motif-line" />
          </div>

          {/* Guest Personalization Notice */}
          {guest && (
            <div className="calendar-guest-notice">
              <div className="guest-notice-pill">
                <span>🌸 Specially Curated for <strong>{guest.name}</strong></span>
              </div>
              {isPersonalized && !showAllEvents && (
                <p className="guest-notice-sub">
                  Displaying your <strong>{invitedEvents.length}</strong> designated celebrations.
                  <button
                    className="view-all-toggle-btn"
                    onClick={() => setShowAllEvents(true)}
                  >
                    View Complete Wedding Program →
                  </button>
                </p>
              )}
              {isPersonalized && showAllEvents && (
                <p className="guest-notice-sub">
                  Showing all celebrations.
                  <button
                    className="view-all-toggle-btn"
                    onClick={() => setShowAllEvents(false)}
                  >
                    Show Only My Invited Events ({invitedEvents.length}) ←
                  </button>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ceremonies Cards Grid */}
        <div className="calendar-cards-container">
          {displayedEvents.map((event, index) => {
            const isGuestInvited = !guest || guest.events.includes(event.slug);
            const isTimelineOpen = activeTimelineId === event.id;

            return (
              <div
                key={event.id}
                className={`royal-ceremony-card ${isGuestInvited ? 'is-invited' : 'is-general'}`}
              >
                {/* Arch Top with Gold Trim */}
                <div className="royal-card-arch-top">
                  {/* Ornate Indian Arch SVG */}
                  <svg
                    className="arch-svg-shape"
                    viewBox="0 0 400 120"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 120 L0 30 Q100 30 200 0 Q300 30 400 30 L400 120 Z"
                      fill="#3F4F3D"
                    />
                    <path
                      d="M0 32 Q100 32 200 2 Q300 32 400 32"
                      stroke="#C5A059"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <div className="arch-header-content">
                    <span className="ceremony-index-pill">
                      Ceremony 0{index + 1}
                    </span>
                    <span className="ceremony-top-emoji">{event.emoji}</span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="royal-card-inner">
                  {/* Date & Day Ornate Medallion */}
                  <div className="date-medallion-badge">
                    <div className="medallion-circle">
                      <span className="medallion-day">{event.dayOfWeek}</span>
                      <span className="medallion-date-num">{event.date.split(' ')[0]}</span>
                      <span className="medallion-month">Dec 2026</span>
                    </div>
                    <div className="medallion-time-badge">
                      <span>⏰ {event.time}</span>
                    </div>
                  </div>

                  {/* Ceremony Titles */}
                  <div className="ceremony-titles-box">
                    <h3 className="ceremony-main-title">{event.title}</h3>
                    <p className="ceremony-subtitle">{event.subtitle}</p>
                  </div>

                  {/* Venue Details with direct map link */}
                  <EventMapLink
                    mapUrl={event.mapUrl}
                    venue={event.venue}
                    address={event.address}
                    className="ceremony-venue-box ceremony-venue-link"
                  >
                    <div className="venue-pin-icon">🏛️</div>
                    <div className="venue-text-group">
                      <strong className="venue-name-highlight">{event.venue}</strong>
                      <p className="venue-address-text">{event.address}</p>
                      <span className="venue-map-hint">📍 Open in Google Maps ↗</span>
                    </div>
                  </EventMapLink>

                  {/* Description */}
                  <p className="ceremony-description-paragraph">
                    {event.description}
                  </p>

                  {/* Dress Code Tag */}
                 

                  {/* Timeline Accordion */}
                  <div className="ceremony-timeline-section">
                    <button
                      className="ceremony-timeline-toggle"
                      onClick={() => setActiveTimelineId(isTimelineOpen ? null : event.id)}
                      aria-expanded={isTimelineOpen}
                    >
                      <span>{isTimelineOpen ? '▲ Hide Program Timeline' : '▼ View Program Timeline'}</span>
                      <span className="timeline-counter">({event.timeline.length} Milestones)</span>
                    </button>

                    {isTimelineOpen && (
                      <div className="ceremony-timeline-ribbon">
                        {event.timeline.map((item, idx) => (
                          <div key={idx} className="timeline-step-row">
                            <div className="step-time-pillar">
                              <span className="step-time-badge">{item.time}</span>
                              <div className="step-connecting-line" />
                            </div>
                            <div className="step-details-card">
                              <strong className="step-headline">{item.title}</strong>
                              <p className="step-subtext">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="ceremony-actions-row">
                    <EventMapLink
                      mapUrl={event.mapUrl}
                      venue={event.venue}
                      address={event.address}
                      label="📍 Google Maps"
                      className="btn-ceremony-map"
                    />
                    <button
                      className="btn-ceremony-calendar"
                      onClick={() => handleAddToCalendar(event)}
                      title="Add to Google / Apple Calendar"
                    >
                      <span>📅 Add to Calendar</span>
                    </button>
                  </div>

                  {/* Invited Guest Tag */}
                  {isGuestInvited && guest?.name && (
                    <div className="ceremony-guest-status-strip">
                      <span>✦ You are warmly invited to this celebration, {guest.name} ✦</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Auspicious note at bottom */}
        <div className="calendar-footer-quote">
          <p className="quote-mantra">
            "माङ्गल्यं तन्तुनानेन लोकयात्राविधानतः। कण्ठे बध्नामि सुभगे सञ्जीव शरदः शतम्॥"
          </p>
          <p className="quote-translation">
            May our journey be filled with happiness, companionship, and eternal love.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheDetails;
