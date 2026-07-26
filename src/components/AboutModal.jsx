import React from 'react';
import { color, font, text } from '../theme.js';

const REPO = 'https://github.com/dianatofan/3d-cup-selector';

// Same torn-paper edge as the receipt.
const ZIGZAG = 'polygon(0 0,100% 0,100% calc(100% - 8px),96% 100%,92% calc(100% - 8px),88% 100%,84% calc(100% - 8px),80% 100%,76% calc(100% - 8px),72% 100%,68% calc(100% - 8px),64% 100%,60% calc(100% - 8px),56% 100%,52% calc(100% - 8px),48% 100%,44% calc(100% - 8px),40% 100%,36% calc(100% - 8px),32% 100%,28% calc(100% - 8px),24% 100%,20% calc(100% - 8px),16% 100%,12% calc(100% - 8px),8% 100%,4% calc(100% - 8px),0 100%)';

// Full case-study, printed onto the receipt paper. Scroll the receipt to read it all.
// Block types: title | sub | links | h (section) | p | lead (bold+rest) | li (bullet) | foot
const BLOCKS = [
  { t: 'title', v: 'LIMEPACK TAKE-HOME' },
  { t: 'sub', v: 'Plastic Cups Category' },
  { t: 'links' },

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

export default function AboutModal({ onClose }) {
  const anim = (i) => ({ animation: 'lp-type .45s steps(26,end) both', animationDelay: `${0.3 + i * 0.05}s` });

  const render = (n, i) => {
    switch (n.t) {
      case 'title':
        return <div key={i} style={{ ...anim(i), textAlign: 'center', fontWeight: 700, letterSpacing: '.2em', fontSize: text.title }}>{n.v}</div>;
      case 'sub':
        return <div key={i} style={{ ...anim(i), textAlign: 'center', color: color.gray, marginTop: 2 }}>{n.v}</div>;
      case 'links':
        return (
          <div key={i} style={{ ...anim(i), textAlign: 'center', margin: '10px 0 4px', fontSize: text.sm }}>
            <span style={{ color: color.gray }}>Prototype:</span> <span style={{ color: color.greenDark }}>you're looking at it</span>
            <br />
            <span style={{ color: color.gray }}>Source:</span>{' '}
            <a href={REPO} target="_blank" rel="noreferrer" style={{ color: color.greenDark, textDecoration: 'underline' }}>github.com/dianatofan/3d-cup-selector</a>
          </div>
        );
      case 'h':
        return <div key={i} style={{ ...anim(i), fontWeight: 700, color: color.greenDark, letterSpacing: '.12em', marginTop: 18, borderTop: `1px dashed ${color.faint}`, paddingTop: 12 }}>{n.v}</div>;
      case 'lead':
        return <div key={i} style={{ ...anim(i), color: color.muted, marginTop: 8 }}><b style={{ color: color.ink }}>{n.b}</b>{n.v}</div>;
      case 'li':
        return <div key={i} style={{ ...anim(i), color: color.muted, marginTop: 3, paddingLeft: 14, textIndent: -14 }}>• {n.v}</div>;
      case 'foot':
        return <div key={i} style={{ ...anim(i), textAlign: 'center', color: color.gray, marginTop: 20, fontSize: text.sm }}>{n.v}</div>;
      default:
        return <div key={i} style={{ ...anim(i), color: color.muted, marginTop: 8 }}>{n.v}</div>;
    }
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(19,19,19,.55)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(16px,5vh,56px) 16px', overflow: 'auto', animation: 'lp-fadeIn .25s ease both' }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 460, animation: 'lp-modalIn .5s cubic-bezier(.2,.8,.2,1) both' }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'sticky', top: 0, float: 'right', zIndex: 6, width: 34, height: 34, borderRadius: '50%', background: color.ink, color: color.white, border: 'none', fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,.35)', marginRight: -6 }}
        >
          ✕
        </button>

        {/* printer slot */}
        <div style={{ position: 'relative', zIndex: 2, margin: '0 8px', background: 'linear-gradient(180deg,#2e2e2e,#181818 70%,#101010)', borderRadius: '14px 14px 7px 7px', padding: '11px 18px 12px' }}>
          <div style={{ height: 5, borderRadius: 3, background: '#000', boxShadow: 'inset 0 2px 4px rgba(0,0,0,.9)' }} />
        </div>

        {/* paper */}
        <div style={{ overflow: 'hidden', position: 'relative', zIndex: 3, margin: '-13px 0 0', padding: '0 4px' }}>
          <div
            style={{
              fontFamily: font.mono, fontSize: text.base, color: color.ink, lineHeight: 1.7,
              background: 'repeating-linear-gradient(0deg,rgba(19,19,19,.035) 0,rgba(19,19,19,.035) 1px,transparent 1px,transparent 4px),repeating-linear-gradient(90deg,rgba(19,19,19,.015) 0,rgba(19,19,19,.015) 2px,transparent 2px,transparent 7px),linear-gradient(175deg,#fdfcf6,#f0eee1)',
              padding: '28px 26px 40px', borderRadius: '0 0 2px 2px',
              boxShadow: '0 26px 54px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.22),inset 0 14px 12px -12px rgba(0,0,0,.28)',
              clipPath: ZIGZAG,
            }}
          >
            <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.2em', color: color.greenDark }}>LIMEPACK</div>
            <div style={{ borderTop: `1px dashed ${color.faint}`, margin: '10px 0 14px' }} />
            {BLOCKS.map(render)}
          </div>
        </div>
      </div>
    </div>
  );
}
