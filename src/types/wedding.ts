export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface WeddingEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dayOfWeek: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string; // Direct Google Maps URL for this specific event location
  description: string;
  dressCode?: string;
  emoji: string;
  timeline: TimelineItem[];
  color: string;
}

export interface Accommodation {
  name: string;
  distance: string;
  stars: number;
  priceRange: string;
  phone: string;
  mapUrl: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LoveStoryStep {
  year: string;
  title: string;
  description: string;
  emoji: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface GuestConfig {
  name: string;
  events: string[]; // slugs of invited events
}

export interface GuestPreset {
  label: string;
  name: string;
  events: string[];
}
