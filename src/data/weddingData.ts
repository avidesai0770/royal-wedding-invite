import type { WeddingEvent, LoveStoryStep, Wish, GuestPreset } from '../types/wedding';

export const COUPLE = {
  groomFirst: 'Avi',
  groomLast: 'Desai',
  brideFirst: 'Nupur',
  brideLast: 'Mahale',
  hashtag: '#AviKiNupur',
  city: 'vyara, Gujarat',
  venue: 'Vyara Dome',
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'garba',
    slug: 'garba',
    title: 'Garba & Sangeet',
    subtitle: 'A Royal Evening of Dance, Dhol & Raas',
    date: '12 December 2026',
    dayOfWeek: 'Saturday',
    time: '07:00 PM Onwards',
    venue: 'Society Common Plot ',
    address: 'Ravisankar Sankul Society Rd, Bhatar Char Rasta, Surat, Gujarat 395017',
    mapUrl: 'https://maps.app.goo.gl/iseK96qKDJRyg9N2A',
    description: 'An enchanting musical evening illuminated by starlight and fairy lights. Twirl to the rhythmic beats of traditional Garba, authentic dhol, and vibrant family dance performances.',
    dressCode: 'Royal Festive & Vibrant Chaniya Cholis / Sherwanis',
    emoji: '🪔',
    color: '#D4A017',
    timeline: [
      { time: '04:00 PM', title: 'Geet Sangeet', description: 'will be singing lagna songs' },
      { time: '07:00 PM', title: 'Aaradhna & Dandiya Raas', description: 'Traditional Aarti followed by vibrant Garba circles' },

    ],
  },
  {
    id: 'santek',
    slug: 'santek',
    title: 'Santek Pooja',
    subtitle: 'Auspicious Vedic Blessings Ceremony',
    date: '13 December 2026',
    dayOfWeek: 'Sunday',
    time: '09:30 AM Onwards',
    venue: 'Dayalji Ashram',
    address: 'Vijay Nagar, Majura Gate, Surat, Gujarat 395001',
    mapUrl: 'https://share.google/wWGUDToUgEJKcPWzd',
    description: 'A deeply sacred morning ritual invoking the divine grace of Lord Ganesha and our Kuldevata. Vedic hymns and sacred havan bless the bride, groom, and their families.',
    dressCode: 'Graceful Traditional Indian — Pastel Silk Sarees & Kurta Pajamas',
    emoji: '🪷',
    color: '#6B7F67',
    timeline: [
    
      { time: '02:00 PM', title: 'Santek', description: 'Grah Satak (often performed alongside Grah Shanti) is a traditional morning prayer ceremony in Gujarati weddings that invites Lord Ganesha to remove obstacles and bless the couple with happiness, peace, and prosperity' },
      { time: '06:30 PM', title: 'start of meal', description: '' },
    ],
  },
  {
    id: 'haldi',
    slug: 'haldi',
    title: 'Haldi Ceremony',
    subtitle: 'The Radiant Turmeric & Marigold Fiesta',
    date: '13 December 2026',
    dayOfWeek: 'Sunday',
    time: '10:00 AM Onwards',
    venue: 'Dayalji Ashram',
    address: 'Vijay Nagar, Majura Gate, Surat, Gujarat 395001',
    mapUrl: 'https://share.google/wWGUDToUgEJKcPWzd',
    description: 'Sunshine, laughter, and marigold showers! An auspicious bath of fragrant organic turmeric, sandalwood, and rose petals celebrating eternal radiance and joy.',
    dressCode: 'Shades of Yellow, Mustard & Floral Summer Kurtas',
    emoji: '💛',
    color: '#E8A735',
    timeline: [
     { time: '10:00 AM', title: 'Ubtan & Haldi Ritual', description: 'Applying sacred fragrant turmeric paste' },
{ time: '12:00 PM', title: 'Haldi Lunch', description: 'Feast together with loved ones after the ceremony' },
    ],
  },
  {
    id: 'wedding',
    slug: 'wedding',
    title: 'Wedding & Royal Baraat',
    subtitle: 'The Grand Pheras at SP Dome',
    date: '14 December 2026',
    dayOfWeek: 'Monday',
    time: '02:00 PM (Baraat) | 06:00 PM (Varmala & Pheras)',
    venue: 'SP Party Plot & Dom',
    address: 'Vyara, Gujarat 394650',
    mapUrl: 'https://share.google/2wluDo1ZGjO02XinW',
    description: 'The pinnacle of our union in the magical water palace. The regal Baraat arrives over illuminated royal boats, followed by the sacred Vedic Saat Pheras under the stars.',
    dressCode: 'Royal Indian Haute Couture — Bandhgalas, Achkans & Embroidered Lehengas',
    emoji: '👑',
    color: '#8A5A44',
    timeline: [
      { time: '02:00 PM', title: 'Grand Royal Baraat', description: 'Decorated royal boats, vintage nagadas & dancing Baraatis' },
      { time: '06:00 PM', title: 'Jaimala', description: 'Exchange of floral garlands' },
    ],
  },
];

export const LOVE_STORY: LoveStoryStep[] = [
  {
    year: '2019',
    title: 'First Glance in Udaipur',
    description: 'Two souls crossed paths by the tranquil waters of Ambrai Ghat at sunset. A shared smile over steaming kulhad chai turned into hours of effortless conversations.',
    emoji: '☕',
  },
  {
    year: '2021',
    title: 'Countless Memories',
    description: 'From exploring old city alleyways to quiet monsoon drives, every milestone revealed they were each other’s deepest confidant and dearest friend.',
    emoji: '🌿',
  },
  {
    year: '2024',
    title: 'The Royal Proposal',
    description: 'Under a sky of lanterns on a candlelit boat floating across Lake Pichola, Avi asked the question that changed forever into together. Nupur said yes with tears of pure joy.',
    emoji: '💍',
  },
  {
    year: '2026',
    title: 'Two Families, One Heart',
    description: 'Now, surrounded by those who matter the most, Avi and Nupur step into the sacred bond of marriage. Your presence and blessings make this celebration complete.',
    emoji: '✨',
  },
];

export const INITIAL_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Dadaji & Dadiji',
    message: 'May Lord Ganesha shower your married life with unbounded health, laughter, and timeless devotion. Shubh Vivah Avi & Nupur! 🪷',
    createdAt: '2026-10-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Rohan & Shweta',
    message: 'Still remember Udaipur 2019! So thrilled to see you two tie the knot in the most dreamy venue ever! Let’s rock the Sangeet! 💃🕺',
    createdAt: '2026-10-18T14:30:00Z',
  },
  {
    id: '3',
    name: 'Mami & Mama Ji',
    message: 'Heartiest congratulations to Desai and Mahale families. May your love grow deeper with every passing sunrise. Lots of blessings and love! 💖',
    createdAt: '2026-10-22T09:15:00Z',
  },
];

export const GUEST_PRESETS: GuestPreset[] = [
  { label: '🌟 Full Wedding (All 4 Events)', name: '', events: ['garba', 'santek', 'haldi', 'wedding'] },
  { label: '💃 Sangeet & Garba Only', name: '', events: ['garba'] },
  { label: '🪷 Santek Pooja Only', name: '', events: ['santek'] },
  { label: '👑 Baraat & Wedding Only', name: '', events: ['wedding'] },
  { label: '💛 Santek + Haldi Only', name: '', events: ['santek', 'haldi'] },
  { label: '✨ Sangeet + Baraat Only', name: '', events: ['garba', 'wedding'] },
];

export const WEDDING_DATE = new Date('2026-12-14T17:30:00+05:30');
