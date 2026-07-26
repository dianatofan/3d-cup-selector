// Static content / copy used across the marketing sections. Kept out of the
// components so wording and lists can be edited without touching layout code.
// (Product / pricing data lives separately in lib/pricing.js.)

import { color } from './theme.js';

export const NAV = ['PRODUCTS', 'DESIGN PROCESS', 'ABOUT', 'CONTACT'];

export const PHONE = { label: '89 88 77 57', href: 'tel:+4589887757' };

export const REVIEWS = [
  { text: '“Fantastic customer service, great quality products. My printed cups arrived early, and cheaper than many alternatives.”', who: 'Daniella, Old Amersham Gin' },
  { text: '“The 3D proof made it easy to get sign-off from our brand team. Reordering took two minutes.”', who: 'Marco, Tap+Brew' },
  { text: '“We needed 10,000 cups for a festival on short notice. They delivered a week early.”', who: 'Sofie, Five Senses' },
  { text: '“Colours matched our brand guide exactly. The kraft reusables were a hit at our launch.”', who: 'Jonas, Meat Locker' },
  { text: '“Ordering online was painless and the price was clear up front — no hidden setup fees.”', who: 'Amelia, Ballucci' },
  { text: '“Great advice on sizing over the phone. Ended up with the perfect cup for our cold brew.”', who: 'Priya, SHOT Coffee' },
];

// `s` selects a typographic treatment (see COMPANY_STYLE in Trust.jsx).
export const COMPANIES = [
  { name: 'Ballucci', s: 'serif' },
  { name: 'TAP+BREW', s: 'bold' },
  { name: 'SHOT', s: 'spaced' },
  { name: 'meat locker.', s: 'bold' },
  { name: "Mario's", s: 'serif' },
  { name: 'FIVE SENSES', s: 'bold' },
  { name: "Nando's", s: 'bold' },
  { name: 'VAPIANO', s: 'spaced' },
  { name: 'ORIGINALCOFFEE', s: 'bold' },
  { name: 'Mr Tipsy', s: 'serif' },
  { name: 'MONKEY 47', s: 'bold' },
  { name: 'Gordon Ramsay Bar & Grill', s: 'bold' },
  { name: 'THE WHEELBARROW', s: 'bold' },
  { name: 'Mellow Donuts', s: 'serif' },
];
export const TOTAL_COMPANIES = 7500;
export const MORE_COMPANIES = TOTAL_COMPANIES - COMPANIES.length;

export const SPECIALISTS = [
  { initials: 'SK', bg: '#404a5c' },
  { initials: 'MJ', bg: '#6b5744' },
  { initials: 'AL', bg: color.greenDark },
];

export const TRUST_STATS = [
  { big: '★ 4.8', small: 'Google' },
  { big: '7,500+', small: 'companies' },
  { big: '35M', small: 'cups printed' },
];

// Scrolling footer marquee.
export const FOOTER_ITEMS = ['✓ FREE DESIGN SETUP + 3D PROOF', 'FREE SHIPPING', 'PRINTED IN EUROPE', '★ 4.8 ON GOOGLE', '7,500+ COMPANIES', '35M CUPS PRINTED', 'TRANSPARENT ONLINE PRICES'];
