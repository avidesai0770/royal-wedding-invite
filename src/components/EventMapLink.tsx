import React from 'react';

export interface EventMapLinkProps {
  /**
   * Direct Google Maps link for this specific location.
   * Can be a short link (e.g. https://maps.app.goo.gl/xxx) or full URL.
   * If omitted, automatically generates a Google Maps search query using venue + address.
   */
  mapUrl?: string;

  /** Name of the venue (e.g. 'Society Common Plot', 'Taj Lake Palace') */
  venue: string;

  /** Full or partial address for fallback search */
  address?: string;

  /** Button/link label (defaults to '📍 Google Maps') */
  label?: string;

  /** Custom CSS classes (defaults to 'btn-ceremony-map') */
  className?: string;

  /** Display style: 'button' (default) or 'link' */
  variant?: 'button' | 'link';

  /** Children if caller wants to render custom content inside the link */
  children?: React.ReactNode;
}

/**
 * Reusable Common Component for Event Location Maps
 * Accepts location map link as a prop (`mapUrl`) with automatic fallback to Google Maps search.
 */
export const EventMapLink: React.FC<EventMapLinkProps> = ({
  mapUrl,
  venue,
  address = '',
  label = '📍 Google Maps',
  className = 'btn-ceremony-map',
  variant = 'button',
  children,
}) => {
  // If a custom mapUrl is passed and not empty, use it; otherwise generate query URL
  const targetUrl = mapUrl && mapUrl.trim().length > 0
    ? mapUrl.trim()
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${venue} ${address}`.trim()
      )}`;

  const ariaDescription = `Open Google Maps directions to ${venue}${address ? ` at ${address}` : ''}`;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaDescription}
      title={ariaDescription}
    >
      {children || <span>{label}</span>}
    </a>
  );
};

export default EventMapLink;
