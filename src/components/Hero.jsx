import React from 'react';
import { color, font } from '../theme.js';

// Compact title that sits at the top of the left column, above the Finder.
export default function Hero() {
  return (
    <div>
      <div style={{ fontSize: 10.5, letterSpacing: '.22em', fontWeight: 700, color: color.greenDark, lineHeight: 1.4 }}>
        PRINTED PLASTIC CUPS · FROM 250 PCS
      </div>
      <h1 style={{ margin: '7px 0 0', fontSize: 'clamp(27px,2.6vw,36px)', lineHeight: 1.03, fontWeight: 800, textTransform: 'uppercase' }}>
        Cups with <em style={{ fontFamily: font.serif, textTransform: 'none', color: color.greenDark, fontWeight: 500 }}>your</em> logo
      </h1>
      <p style={{ margin: '9px 0 0', maxWidth: 300, fontSize: 13, color: color.muted, lineHeight: 1.45, textWrap: 'pretty' }}>
        Set your order below and watch it print, live.
      </p>
    </div>
  );
}
