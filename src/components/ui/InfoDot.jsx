import React, { useState } from 'react';
import { color, radius, text, weight, tracking, transition, shadow } from '../../theme.js';

// Small "i" affordance that reveals a titled tooltip. Opens on hover (desktop)
// and on click/tap (touch). Click state is controlled by the parent
// (`open` / `onToggle`) so only one tooltip in a group stays pinned at a time.
// The glyph is an inline SVG so it stays perfectly centred at any size.
export default function InfoDot({ open, onToggle, title, children }) {
  const [hovered, setHovered] = useState(false);
  const show = open || hovered;
  const fg = show ? color.white : color.infoText;
  return (
    <span style={{ position: 'relative', display: 'inline-flex', verticalAlign: 'middle' }}>
      <span
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={title}
        style={{
          cursor: 'pointer', width: 17, height: 17, borderRadius: '50%', boxSizing: 'border-box',
          border: `1px solid ${show ? color.green : color.infoBorder}`,
          background: show ? color.green : 'transparent',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: transition.base, flexShrink: 0, userSelect: 'none',
        }}
      >
        <svg width="11" height="11" viewBox="0 0 16 16" fill={fg} aria-hidden="true">
          <circle cx="8" cy="4" r="1.45" />
          <rect x="6.55" y="6.7" width="2.9" height="6.6" rx="1.45" />
        </svg>
      </span>
      {show && (
        <span onClick={onToggle} style={{ position: 'absolute', top: 24, left: 0, width: 280, maxWidth: '80vw', zIndex: 40, background: color.white, border: `1px solid ${color.tooltipBorder}`, borderRadius: radius.lg, padding: '14px 16px', boxShadow: shadow.pop, cursor: 'pointer', display: 'block', textTransform: 'none', letterSpacing: tracking.normal }}>
          <span style={{ display: 'block', fontSize: text.base, fontWeight: weight.bold, color: color.greenDark, marginBottom: 5, lineHeight: 1.3 }}>{title}</span>
          <span style={{ display: 'block', fontSize: text.sm, fontWeight: weight.regular, color: color.muted, lineHeight: 1.55 }}>{children}</span>
        </span>
      )}
    </span>
  );
}
