import React from 'react';
import { useIsMobile } from '../hooks/useScratch.js';
import { color, gutter, text, radius } from '../theme.js';

const DocIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4.5" y="3" width="11" height="14" rx="2" />
    <path d="M7.5 7h5M7.5 10h5M7.5 13h3" />
  </svg>
);

export default function Header({ onAbout }) {
  const isMobile = useIsMobile();
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: `14px ${gutter}`, borderBottom: `1px solid ${color.borderLight}`, background: color.bg }}>
      <img src="/limepack-logo.png" alt="LimePack" style={{ height: 'clamp(24px,4vw,28px)', display: 'block' }} />
      {isMobile ? (
        <button
          onClick={onAbout}
          title="About this prototype"
          aria-label="About this prototype"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '50%', border: `1px solid ${color.border}`, background: 'transparent', color: color.ink, cursor: 'pointer', padding: 0 }}
        >
          <DocIcon />
        </button>
      ) : (
        <button
          onClick={onAbout}
          title="About this prototype"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${color.border}`, borderRadius: radius.pill, padding: '8px 16px', background: 'transparent', color: color.ink, fontSize: text.base, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          <DocIcon />
          About this prototype
        </button>
      )}
    </header>
  );
}
