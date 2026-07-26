import React, { useEffect, useMemo, useState } from 'react';
import { color, font, text } from '../theme.js';
import LayoutWireframe from './LayoutWireframe.jsx';

const REPO = 'https://github.com/dianatofan/3d-cup-selector';

const ZIGZAG = 'polygon(0 0,100% 0,100% calc(100% - 8px),96% 100%,92% calc(100% - 8px),88% 100%,84% calc(100% - 8px),80% 100%,76% calc(100% - 8px),72% 100%,68% calc(100% - 8px),64% 100%,60% calc(100% - 8px),56% 100%,52% calc(100% - 8px),48% 100%,44% calc(100% - 8px),40% 100%,36% calc(100% - 8px),32% 100%,28% calc(100% - 8px),24% 100%,20% calc(100% - 8px),16% 100%,12% calc(100% - 8px),8% 100%,4% calc(100% - 8px),0 100%)';

// Full case-study, typed live onto the paper.
// Types: title | sub | p | h (section) | lead (bold b + rest v) | li (bullet) | source | foot
const BLOCKS = [
  { t: 'title', v: 'LIMEPACK TAKE-HOME' },
  { t: 'sub', v: 'Plastic Cups Category · prototype notes' },
  { t: 'p', v: "Prototype: you're looking at it." },
  { t: 'source', pre: 'Source: ', url: 'github.com/dianatofan/3d-cup-selector', href: REPO },

  { t: 'h', v: '1 · PROBLEMS' },
  { t: 'lead', b: 'Paradox of choice. ', v: 'Many similar products, sizes, materials and quantities — flexibility without guidance overwhelms.' },
  { t: 'lead', b: 'Product-driven journey. ', v: "Customers must learn the range before deciding, instead of starting from what they know — quantity, deadline, size, use." },
  { t: 'lead', b: 'Best option unclear. ', v: "The page lists what's available but never recommends the right cup for the need and budget." },
  { t: 'lead', b: 'No instant preview. ', v: 'Uploaded artwork only appears on the cup once the design team returns a proof.' },

  { t: 'h', v: '2 · CONCEPT' },
  { t: 'p', v: 'The catalogue becomes an interactive product finder: pick type, deadline, size, variant and quantity, and it recommends the best cup — price, total and delivery update live.' },
  { t: 'p', v: 'Compare the alternatives or override the pick: guidance without removing control.' },

  { t: 'h', v: '3 · DESKTOP' },
  { t: 'p', v: 'Three columns — left: choices + quantity; centre: 3D cup + recommendation; right: live receipt.' },
  { t: 'p', v: 'The cup rotates and changes size/material, and previews your artwork instantly — an early look before the team prepares the final proof.' },

  { t: 'h', v: '4 · LIVE PRINTER' },
  { t: 'p', v: 'The order summary behaves like a label printer: on each change the old value is scratched out with a zigzag and the new one is typed in.' },
  { t: 'p', v: "Every choice's effect is obvious, and it feels like a real, personalised order being produced." },

  { t: 'h', v: '5 · RESPONSIVE' },
  { t: 'p', v: 'Desktop keeps the full three columns. Below 1200px, one column serves phone and tablet — a sticky cup, the options, a price summary and stats — dropping the printer animation for speed.' },
  { t: 'wireframe' },
  { t: 'p', v: 'A dedicated two-column tablet view would be the natural next step.' },

  { t: 'h', v: '6 · TRUST' },
  { t: 'p', v: 'Reassurance sits next to the recommendation and price:' },
  { t: 'li', v: '7,500+ companies · 35M+ cups printed' },
  { t: 'li', v: 'Free design setup + 3D proof · free shipping' },
  { t: 'li', v: 'Transparent pricing · printed in Europe' },
  { t: 'li', v: 'Phone/email support · Google reviews' },

  { t: 'h', v: '7 · SCALABILITY' },
  { t: 'p', v: 'The finder is driven by product data (min quantity, price, delivery, print), so the same structure fits paper cups, napkins, boxes and packaging.' },
  { t: 'p', v: 'Reusable pieces: selectors, quantity controls, recommendation logic, comparison, summaries and 3D previews — with currency, VAT and language adapting per market.' },

  { t: 'h', v: '8 · BUILD & CLAUDE' },
  { t: 'p', v: 'Built with Claude as a tool — I directed the concept, interactions, component structure and responsive behaviour.' },
  { t: 'p', v: 'Reusable components, shared design tokens, data-driven pricing, minimal hardcoded values. HTML, CSS, JS and Three.js — no backend.' },

  { t: 'h', v: "9 · WHAT'S NEXT" },
  { t: 'lead', b: 'Analytics. ', v: 'Track recommendations, visits, orders and enquiries; heatmaps to find where customers hesitate.' },
  { t: 'lead', b: 'Accessibility. ', v: 'Keyboard nav, focus states, labels, and announcing price/recommendation changes.' },
  { t: 'lead', b: '3D fallback. ', v: 'A static image when WebGL is unavailable or reduced motion is preferred.' },

  { t: 'foot', v: 'A take-home prototype · not a production store.' },
];

const Caret = () => <span style={{ display: 'inline-block', width: '0.55ch', height: '1.05em', background: color.ink, verticalAlign: '-0.15em', marginLeft: 1, animation: 'lp-caret 1s steps(1) infinite' }} />;

export default function AboutModal({ onClose }) {
  // Precompute each block's plain text + its start offset in the global stream.
  const { items, total } = useMemo(() => {
    let acc = 0;
    const its = BLOCKS.map((b) => {
      const txt = b.t === 'lead' ? b.b + b.v : b.t === 'source' ? b.pre + b.url : b.t === 'wireframe' ? '' : b.v;
      const start = acc;
      acc += b.t === 'wireframe' ? 40 : txt.length + 2; // wireframe holds a short pause while it draws in
      return { ...b, txt, start };
    });
    return { items: its, total: acc };
  }, []);

  const [typed, setTyped] = useState(0);
  const done = typed >= total;
  const chunk = Math.max(2, Math.round(total / 480)); // ~8s total regardless of length

  useEffect(() => {
    const id = setInterval(() => {
      setTyped((t) => (t >= total ? t : Math.min(total, t + chunk)));
    }, 16);
    return () => clearInterval(id);
  }, [total, chunk]);

  const HEAD = { fontWeight: 700, color: color.greenDark, letterSpacing: '.12em', marginTop: 18, borderTop: `1px dashed ${color.faint}`, paddingTop: 12 };

  const renderBlock = (item, i) => {
    if (item.t === 'wireframe') {
      if (typed < item.start) return null;
      return <div key={i} style={{ margin: '16px 0 6px', animation: 'lp-cellIn .5s ease both' }}><LayoutWireframe /></div>;
    }
    const rev = Math.max(0, Math.min(item.txt.length, typed - item.start));
    if (rev <= 0) return null; // not yet reached — keeps the paper filling top-down
    const active = !done && typed < item.start + item.txt.length;
    const caret = active ? <Caret /> : null;

    if (item.t === 'title') return <div key={i} style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.2em', fontSize: text.title }}>{item.txt.slice(0, rev)}{caret}</div>;
    if (item.t === 'sub') return <div key={i} style={{ textAlign: 'center', color: color.gray, marginTop: 2 }}>{item.txt.slice(0, rev)}{caret}</div>;
    if (item.t === 'h') return <div key={i} style={HEAD}>{item.txt.slice(0, rev)}{caret}</div>;
    if (item.t === 'li') return <div key={i} style={{ color: color.muted, marginTop: 3, paddingLeft: 16, textIndent: -16 }}>• {item.txt.slice(0, rev)}{caret}</div>;
    if (item.t === 'foot') return <div key={i} style={{ textAlign: 'center', color: color.gray, marginTop: 20, fontSize: text.sm }}>{item.txt.slice(0, rev)}{caret}</div>;
    if (item.t === 'lead') {
      const bl = item.b.length;
      return <div key={i} style={{ color: color.muted, marginTop: 8 }}><b style={{ color: color.ink }}>{item.txt.slice(0, Math.min(rev, bl))}</b>{rev > bl ? item.txt.slice(bl, rev) : ''}{caret}</div>;
    }
    if (item.t === 'source') {
      const pl = item.pre.length;
      return (
        <div key={i} style={{ color: color.muted, marginTop: 2 }}>
          {item.txt.slice(0, Math.min(rev, pl))}
          {rev > pl && <a href={item.href} target="_blank" rel="noreferrer" style={{ color: color.greenDark, textDecoration: 'underline' }}>{item.url.slice(0, rev - pl)}</a>}
          {caret}
        </div>
      );
    }
    return <div key={i} style={{ color: color.muted, marginTop: 8 }}>{item.txt.slice(0, rev)}{caret}</div>;
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(19,19,19,.55)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(16px,5vh,56px) 16px', overflow: 'auto', animation: 'lp-fadeIn .25s ease both' }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 820, animation: 'lp-modalIn .45s cubic-bezier(.2,.8,.2,1) both' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          style={{ position: 'absolute', top: -12, right: -6, zIndex: 6, width: 34, height: 34, borderRadius: '50%', background: color.ink, color: color.white, border: 'none', fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,.35)' }}
        >
          ✕
        </button>

        {/* printer slot */}
        <div style={{ position: 'relative', zIndex: 2, margin: '0 8px', background: 'linear-gradient(180deg,#2e2e2e,#181818 70%,#101010)', borderRadius: '14px 14px 7px 7px', padding: '11px 18px 12px' }}>
          <div style={{ height: 5, borderRadius: 3, background: '#000', boxShadow: 'inset 0 2px 4px rgba(0,0,0,.9)' }} />
        </div>

        {/* paper */}
        <div style={{ position: 'relative', zIndex: 3, margin: '-13px 0 0', padding: '0 4px' }}>
          <div
            onClick={(e) => { e.stopPropagation(); if (!done) setTyped(total); }}
            style={{
              fontFamily: font.mono, fontSize: text.base, color: color.ink, lineHeight: 1.7,
              background: 'repeating-linear-gradient(0deg,rgba(19,19,19,.035) 0,rgba(19,19,19,.035) 1px,transparent 1px,transparent 4px),repeating-linear-gradient(90deg,rgba(19,19,19,.015) 0,rgba(19,19,19,.015) 2px,transparent 2px,transparent 7px),linear-gradient(175deg,#fdfcf6,#f0eee1)',
              padding: '30px clamp(26px,5vw,54px) 40px', borderRadius: '0 0 2px 2px',
              boxShadow: '0 26px 54px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.22),inset 0 14px 12px -12px rgba(0,0,0,.28)',
              clipPath: ZIGZAG, cursor: done ? 'default' : 'pointer',
            }}
          >
            <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.2em', color: color.greenDark }}>LIMEPACK</div>
            <div style={{ borderTop: `1px dashed ${color.faint}`, margin: '10px 0 14px' }} />
            {/* The paper simply grows as it types — the reader stays at the top. */}
            {items.map(renderBlock)}
            {!done && <div style={{ textAlign: 'center', color: color.faint, fontSize: text.xs, marginTop: 18 }}>· click to skip ·</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
