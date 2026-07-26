// Design tokens — the single source of truth for colour, radius, type and
// breakpoints. Everything visual references these instead of inline hex values,
// so the palette can be retuned in one place.

export const color = {
  // surfaces
  bg: '#f6f5f0',
  white: '#fff',
  // ink / text
  ink: '#131313',
  muted: '#6a6a60',
  gray: '#9a9a90',
  faint: '#b4b1a6',
  // lines
  border: '#d8d5ca',
  borderLight: '#e3e1d8',
  divider: '#eeece4',
  // brand greens
  green: '#76B82A',
  greenDark: '#3a7a10',
  greenLight: '#a8e05f',
  greenSoft: '#a3c780',
  greenTintBg: 'rgba(118,184,42,.1)',
  greenDisabled: '#c7dfa6',
  // accents
  kraft: '#c8a678',
  yellow: '#ffe14d',
  red: '#b3402e',
  // info tooltip
  infoText: '#8a887e',
  infoBorder: '#c2bfb4',
  tooltipBorder: '#cfe3ae',
};

export const gradient = {
  brand: `linear-gradient(100deg, ${color.greenLight}, ${color.green})`,
};

export const radius = { sm: 8, md: 10, lg: 12, xl: 16, pill: 999 };

// Spacing rhythm (px) for padding / gaps / margins that recur across the UI.
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 28 };

// Type scale (px) for the sizes shared between primitives and components.
export const text = { xs: 11, sm: 12, smd: 12.5, base: 13, label: 13.5, md: 14, cta: 15, title: 16 };

export const font = {
  sans: 'Archivo, system-ui, sans-serif',
  serif: "'Playfair Display', serif",
  mono: 'ui-monospace, Menlo, monospace',
};

// Font weights, letter-spacing, transitions and shadows — the remaining shared
// design values, so primitives never hardcode them.
export const weight = { regular: 400, medium: 500, semibold: 600, bold: 700, heavy: 800 };
export const tracking = { normal: 'normal', wide: '.14em', wider: '.22em', widest: '.26em' };
export const transition = { base: 'all .15s' };
export const shadow = {
  sm: '0 1px 3px rgba(0,0,0,.15)',
  pop: '0 16px 40px rgba(0,0,0,.18)',
};

// Below this width we use the mobile/tablet layout (sticky cup + summary);
// at or above it the desktop layout with the printer receipt. 1200 keeps phones
// and tablets (incl. landscape iPad ~1194) on the mobile layout.
export const breakpoint = { mobile: 1200 };

// Shared page gutter used by full-width sections.
export const gutter = 'clamp(20px,4vw,48px)';
