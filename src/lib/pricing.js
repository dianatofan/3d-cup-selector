// Product catalogue + pricing. Swap these placeholder curves for real
// PrestaShop price tables / delivery promises when integrating.
export const PRODUCTS = {
  best: {
    key: 'best', name: 'Bestseller cups', model: '290',
    why: 'Flexible from 250 pcs, full-colour print.',
    cup: { body: '#f6f5f0', band: '#76B82A', text: 'YOUR LOGO' },
  },
  bulk: {
    key: 'bulk', name: 'Bulk cups', model: '250',
    why: 'Lowest unit price at your quantity.',
    cup: { body: '#131313', band: '#131313', text: 'YOUR LOGO', rim: '#131313' },
  },
  reuse: {
    key: 'reuse', name: 'Reusable cups', model: '284',
    why: 'Natural kraft, dishwasher-safe, for events & venues.',
    cup: { body: '#c8a678', band: '#5f9440', text: 'YOUR LOGO', rim: '#b08c58' },
  },
};

export const SIZES = [
  { value: '100', label: '100 ml', sub: 'Espresso', mul: 0.85, h: 0.68, r: 0.8 },
  { value: '240', label: '240 ml', sub: 'Between', mul: 1, h: 1, r: 1 },
  { value: '350', label: '350 ml', sub: 'Great', mul: 1.15, h: 1.16, r: 1.1 },
  { value: '450', label: '450 ml', sub: 'Extra large', mul: 1.28, h: 1.46, r: 1.32 },
];

export const VARIANTS = [
  { value: 'single', short: 'Single', sub: 'Matte', add: 0, receipt: 'SINGLE MATTE' },
  { value: 'dmatte', short: 'Double', sub: 'Matte +£0.06', add: 0.06, receipt: 'DOUBLE MATTE' },
  { value: 'dglossy', short: 'Double', sub: 'Glossy +£0.08', add: 0.08, receipt: 'DOUBLE GLOSSY' },
];

export const COMPARE_ROWS = [
  { label: 'Minimum order', a: '250 pcs', b: '5,000 pcs', c: '500 pcs' },
  { label: 'Unit price', a: '$$ · fair', b: '$ · lowest', c: '$$$ · reusable' },
  { label: 'Printing', a: 'Full colour', b: 'Advanced / photo-quality', c: 'Full colour' },
  { label: 'Delivery', a: '2–3 weeks', b: '4–6 weeks', c: '3–4 weeks' },
  { label: 'Best for', a: 'Most orders, flexibility', b: 'Large orders, lowest cost', c: 'Events, venues, sustainability' },
];

export function recommend({ qty, deadline, reuse }) {
  if (reuse) return 'reuse';
  if (qty >= 5000 && deadline !== 'asap') return 'bulk';
  return 'best';
}

// Quantity range the configurator allows.
export const QTY_MIN = 1000;
export const QTY_MAX = 30000;
export const QTY_STEP = 250;

// Volume promo: no sale below 2,000, then -22% at 2,000 growing +5% per extra
// 1,000 pcs, capped at -42% (reached from 6,000 pcs upward).
export function discountFor(qty) {
  if (qty < 2000) return 0;
  const tier = Math.floor(qty / 1000); // 2,3,4,5,6…
  return Math.min(0.42, 0.22 + (tier - 2) * 0.05);
}

export function unitPrice(kind, qty, size, variant) {
  const mul = SIZES.find((s) => s.value === size).mul;
  const add = VARIANTS.find((v) => v.value === variant).add;
  let u;
  if (kind === 'best') u = Math.max(0.16, 0.92 - 0.19 * Math.log10(qty));
  else if (kind === 'bulk') u = Math.max(0.11, 0.78 - 0.17 * Math.log10(qty));
  else u = Math.max(0.62, 2.1 - 0.34 * Math.log10(qty));
  return u * mul + add;
}

export function deliveryDate(kind, deadline) {
  const days = kind === 'bulk' ? 38 : kind === 'reuse' ? 26 : deadline === 'asap' ? 10 : 18;
  return new Date(Date.now() + days * 864e5).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

export const gbp = (n) => '£' + n.toFixed(2);
export const gbpRound = (n) => '£' + Math.round(n).toLocaleString('en-GB');
export const fmtQty = (n) => n.toLocaleString('en-GB');
