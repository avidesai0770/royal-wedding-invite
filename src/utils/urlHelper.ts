import type { GuestConfig, WeddingEvent } from '../types/wedding';

// Normalize slug aliases (e.g. sangeet -> garba, barat -> wedding)
export function normalizeEventSlug(slug: string): string {
  const s = slug.trim().toLowerCase();
  if (['sangeet', 'garba', 'garba-sangeet', 'sangeet-garba'].includes(s)) return 'garba';
  if (['santek', 'pooja', 'santek-pooja', 'puja'].includes(s)) return 'santek';
  if (['haldi', 'pithi'].includes(s)) return 'haldi';
  if (['barat', 'baraat', 'wedding', 'shaadi', 'varmala', 'reception'].includes(s)) return 'wedding';
  return s;
}

export const ALL_EVENT_SLUGS = ['garba', 'santek', 'haldi', 'wedding'];

export function parseGuestFromUrl(): GuestConfig | null {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('guest') || params.get('to') || params.get('name');
  const eventsParam = params.get('events') || params.get('event');

  if (!name && !eventsParam) return null;

  let events: string[] = ALL_EVENT_SLUGS;

  if (eventsParam) {
    if (eventsParam.toLowerCase() === 'all') {
      events = ALL_EVENT_SLUGS;
    } else {
      const parsed = eventsParam
        .split(',')
        .map(e => normalizeEventSlug(e))
        .filter(e => ALL_EVENT_SLUGS.includes(e));
      if (parsed.length > 0) {
        events = Array.from(new Set(parsed));
      }
    }
  }

  return {
    name: name ? decodeURIComponent(name).trim() : 'Honoured Guest',
    events,
  };
}

export function isHostMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get('host') === 'true' ||
    params.get('host') === '1' ||
    params.get('admin') === 'true' ||
    params.get('admin') === '1' ||
    params.get('family') === 'true'
  );
}

export function buildHostAccessUrl(): string {
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  return `${origin}${pathname}?host=true`;
}

export function buildGuestUrl(name: string, events: string[]): string {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const params = new URLSearchParams();

  if (name.trim()) {
    params.set('guest', name.trim());
  }

  if (events.length === ALL_EVENT_SLUGS.length && ALL_EVENT_SLUGS.every(e => events.includes(e))) {
    params.set('events', 'all');
  } else {
    // Map internal slugs to friendly names if needed
    const eventAliases = events.map(e => {
      if (e === 'garba') return 'sangeet';
      if (e === 'wedding') return 'barat';
      return e;
    });
    params.set('events', eventAliases.join(','));
  }

  return `${origin}${pathname}?${params.toString()}`;
}

export function formatEventsDateAndLocation(events: WeddingEvent[]): { dateText: string; locationText: string } {
  if (!events || events.length === 0) {
    return { dateText: '12 – 14 December 2026', locationText: 'Surat & Vyara' };
  }

  // Collect unique dates preserving order
  const uniqueDates = Array.from(new Set(events.map(e => e.date)));

  let dateText = '';
  if (uniqueDates.length === 1) {
    // Single event date: e.g. "13 December 2026"
    dateText = uniqueDates[0];
  } else if (uniqueDates.length === 2) {
    const day1 = uniqueDates[0].split(' ')[0];
    const day2 = uniqueDates[1].split(' ')[0];
    dateText = `${day1} & ${day2} December 2026`;
  } else if (uniqueDates.length >= 3) {
    const dayFirst = uniqueDates[0].split(' ')[0];
    const dayLast = uniqueDates[uniqueDates.length - 1].split(' ')[0];
    dateText = `${dayFirst} – ${dayLast} December 2026`;
  } else {
    dateText = '12 – 14 December 2026';
  }

  const hasVyara = events.some(e => (e.venue && e.venue.includes('SP')) || (e.address && e.address.toLowerCase().includes('vyara')));
  const hasSurat = events.some(e => e.address && e.address.toLowerCase().includes('surat'));

  let locationText = 'Surat';
  if (hasSurat && hasVyara) {
    locationText = 'Surat & Vyara';
  } else if (hasVyara) {
    locationText = 'Vyara';
  } else {
    locationText = 'Surat';
  }

  return { dateText, locationText };
}
