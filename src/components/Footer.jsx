import React from 'react';
import { color, gutter, text } from '../theme.js';
import { FOOTER_ITEMS } from '../content.js';

// Non-breaking spaces keep the double gap around each separator — regular spaces
// would collapse to one under white-space: nowrap.
const NB = String.fromCharCode(0xa0);
const SEP = NB + NB + '✳' + NB + NB;
const ITEMS = FOOTER_ITEMS.join(SEP) + SEP;

export default function Footer({ padBottom = '18px' }) {
  return (
    <footer style={{ borderTop: `1px solid ${color.borderLight}`, color: color.gray }}>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0', fontSize: text.base, fontWeight: 500, letterSpacing: '.12em', borderBottom: `1px solid ${color.divider}` }}>
        <div style={{ display: 'inline-block', animation: 'lp-tick 90s linear infinite' }}>
          <span>{ITEMS}{ITEMS}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, padding: `18px ${gutter} ${padBottom}`, fontSize: text.smd }}>
        <span>© 2026 Limepack · limepack.co.uk</span>
        <span>Plastic cups · Paper cups · Pizza boxes · Napkins</span>
      </div>
    </footer>
  );
}
