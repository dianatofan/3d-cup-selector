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

  { t: 'h', v: '1 · PROBLEMS IDENTIFIED' },
  { t: 'lead', b: 'Paradox of choice. ', v: 'Customers are shown several similar products, sizes, materials, print options and quantities. Without enough guidance, this flexibility becomes overwhelming.' },
  { t: 'lead', b: 'The journey is product-driven. ', v: "Customers must understand Limepack's range before they can decide. The experience should begin with what they already know — quantity, deadline, size and intended use." },
  { t: 'lead', b: 'The best option is unclear. ', v: "The page explains what is available but doesn't clearly recommend which cup best matches the customer's needs and budget." },
  { t: 'lead', b: 'No instant design preview. ', v: 'Customers can upload artwork, but must wait for the design team to return a proof before seeing it on the cup. This interrupts the purchasing journey.' },

  { t: 'h', v: '2 · THE CONCEPT' },
  { t: 'p', v: 'I changed the category page from a traditional product catalogue into an interactive product finder.' },
  { t: 'p', v: 'Customers choose:' },
  { t: 'li', v: 'Cup type' },
  { t: 'li', v: 'Deadline' },
  { t: 'li', v: 'Size' },
  { t: 'li', v: 'Print variant' },
  { t: 'li', v: 'Quantity' },
  { t: 'p', v: 'The page uses these answers to recommend the best-matching product. The unit price, total and delivery date update in real time.' },
  { t: 'p', v: 'Customers can compare the other products or override the recommendation, so the finder provides guidance without removing control.' },

  { t: 'h', v: '3 · DESKTOP EXPERIENCE' },
  { t: 'p', v: 'I started with a low-fidelity three-column layout:' },
  { t: 'li', v: 'Left — product choices and quantity controls' },
  { t: 'li', v: 'Centre — interactive 3D cup and recommendation' },
  { t: 'li', v: 'Right — live order receipt and next step' },
  { t: 'p', v: 'The 3D cup responds to the selections. It can be rotated, changes size and material, and previews uploaded artwork immediately.' },
  { t: 'p', v: "The instant preview doesn't replace Limepack's professional design service. It gives customers an early visualisation before the design team prepares the final proof." },

  { t: 'h', v: '4 · LIVE PRINTER EXPERIENCE' },
  { t: 'p', v: 'I wanted the order summary to feel like a live label printer, rather than a standard checkout panel.' },
  { t: 'p', v: 'When customers update an option, the receipt changes with a typewriter-style animation: the previous value is removed with a hand-drawn zigzag line, then the new value is typed in.' },
  { t: 'p', v: 'This makes the effect of every choice easier to follow. It also creates the feeling that a real, personalised order is being produced as the customer builds it.' },

  { t: 'h', v: '5 · RESPONSIVE APPROACH' },
  { t: 'p', v: 'The desktop version provides the full three-column experience, including the detailed printer interaction.' },
  { t: 'p', v: 'For mobile, I created a lighter single-column layout without the printer animation. It retains the essentials:' },
  { t: 'li', v: 'Interactive cup' },
  { t: 'li', v: 'Product recommendation' },
  { t: 'li', v: 'Selected options' },
  { t: 'li', v: 'Price and total' },
  { t: 'li', v: 'Delivery estimate' },
  { t: 'li', v: 'Main call to action' },
  { t: 'p', v: 'A deliberate trade-off: mobile users lose some visual detail, but the experience becomes faster and easier to use.' },
  { t: 'wireframe' },
  { t: 'p', v: 'With more time I would create a dedicated tablet design — a two-column layout combining the finder and 3D cup with a compact order summary.' },

  { t: 'h', v: '6 · TRUST & REASSURANCE' },
  { t: 'p', v: 'Trust elements are placed close to the recommendation and price, where customers decide whether to continue:' },
  { t: 'li', v: '7,500+ companies served' },
  { t: 'li', v: '35M+ cups printed' },
  { t: 'li', v: 'Free design setup and 3D proof' },
  { t: 'li', v: 'Transparent pricing and free shipping' },
  { t: 'li', v: 'Printed in Europe' },
  { t: 'li', v: 'Personal support by phone or email' },
  { t: 'li', v: 'Google rating and customer reviews' },

  { t: 'h', v: '7 · SCALABILITY' },
  { t: 'p', v: 'The finder is driven by product information such as minimum quantity, price, delivery time and print capabilities.' },
  { t: 'p', v: 'The same structure could support other Limepack categories, including paper cups, napkins, pizza boxes and food packaging.' },
  { t: 'p', v: 'Reusable patterns:' },
  { t: 'li', v: 'Product selectors' },
  { t: 'li', v: 'Quantity controls' },
  { t: 'li', v: 'Recommendation logic' },
  { t: 'li', v: 'Comparison views' },
  { t: 'li', v: 'Order summaries' },
  { t: 'li', v: '3D product previews' },
  { t: 'p', v: 'Currency, VAT, language and product rules can also be adapted for different markets.' },

  { t: 'h', v: '8 · IMPLEMENTATION & USE OF CLAUDE' },
  { t: 'p', v: 'I used Claude as a development tool to help build the frontend. I guided the concept, visual direction, interaction logic, component structure and responsive behaviour.' },
  { t: 'p', v: 'I directed it to use:' },
  { t: 'li', v: 'Reusable frontend components' },
  { t: 'li', v: 'Shared design tokens for colour, typography, spacing and sizing' },
  { t: 'li', v: 'Data-driven product and pricing rules' },
  { t: 'li', v: 'Minimal hardcoded styling values' },
  { t: 'li', v: 'Clear selected and interactive states' },
  { t: 'li', v: 'Purposeful layouts for desktop, tablet and mobile' },
  { t: 'p', v: 'The prototype was built with HTML, CSS, JavaScript and Three.js. It requires no backend or build step.' },

  { t: 'h', v: "9 · WHAT I'D IMPROVE NEXT" },
  { t: 'lead', b: 'Analytics & user behaviour. ', v: 'Track recommendations, product-page visits, completed orders and sales enquiries; review anonymised session recordings and heatmaps to see where customers hesitate.' },
  { t: 'lead', b: 'Accessibility. ', v: 'Improve keyboard navigation, focus states, labels and screen-reader support; announce changes to the recommendation, price and delivery date automatically.' },
  { t: 'lead', b: '3D fallback. ', v: 'Provide an optimised static image when WebGL is unavailable, the device is underpowered, or the user prefers reduced motion.' },

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
