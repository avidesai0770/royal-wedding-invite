import type { GuestConfig } from '../types/wedding';

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
