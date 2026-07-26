import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS, SIZES } from '../lib/pricing.js';
import { useIsMobile } from '../hooks/useScratch.js';
import { color } from '../theme.js';
import { Chip } from './ui/index.js';

// Wraps the <cup-3d> web component (public/cup-3d.js).
function Cup3D({ spec, mobile }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.cups = [spec]; }, [spec]);
  return <cup-3d ref={ref} style={{ width: '100%', height: mobile ? 'min(300px,40vh)' : 'min(480px,80vw)', display: 'block', background: 'radial-gradient(closest-side,rgba(19,19,19,.06),transparent 72%)' }} />;
}

export default function CupStage({ order, onCompareToggle, compareOpen }) {
  const isMobile = useIsMobile();
  const { product, rec, recProduct, active, overridden, setOverride, size, variant, logo } = order;
  const sizeSpec = SIZES.find((s) => s.value === size);
  const [popKey, setPopKey] = useState(0);
  const prevActive = useRef(active);
  useEffect(() => {
    if (prevActive.current !== active) { setPopKey((k) => k + 1); prevActive.current = active; }
  }, [active]);

  const spec = {
    ...product.cup,
    sub: `${order.qtyLabel} PCS · ${size} ML · BY ${order.deliveryUpper}`,
    h: sizeSpec.h, r: sizeSpec.r,
    finish: variant === 'dglossy' ? 'glossy' : 'matte',
    wall: variant === 'single' ? 'single' : 'double',
    ...(logo ? { img: logo.dataUrl } : {}),
  };

  const alts = Object.values(PRODUCTS).filter((p) => p.key !== active);

  // The cup + name — pinned to the top of the viewport on mobile.
  const cupBlock = (
    <>
      <Cup3D spec={spec} mobile={isMobile} />
      <div style={{ fontSize: 10.5, letterSpacing: '.26em', fontWeight: 700, color: color.gray, marginTop: isMobile ? 6 : 18 }}>
        {overridden ? 'YOUR PICK' : 'RECOMMENDED CUP'}
      </div>
      <div key={popKey} style={{ fontSize: isMobile ? 20 : 25, fontWeight: 800, color: color.greenDark, textTransform: 'uppercase', lineHeight: 1.1, textAlign: 'center', animation: popKey ? `lp-pop${popKey % 2 ? 'A' : 'B'} .5s` : 'none' }}>
        {product.name}
      </div>
    </>
  );

  const details = (
    <>
      <div style={{ fontSize: 13, color: color.muted, marginTop: 3, textAlign: 'center' }}>{product.why}</div>
      {/* Also-available cup types + compare control. On mobile the label sits on its
          own line and the chips + icon share one non-wrapping row, so switching cups
          (which changes chip label widths) never reflows anything onto new rows. */}
      {(() => {
        const label = <span style={{ fontSize: 11.5, letterSpacing: '.22em', fontWeight: 700, color: color.faint }}>ALSO AVAILABLE</span>;
        const chipEls = alts.map((p) => (
          <Chip key={p.key} onClick={() => setOverride(p.key === rec ? null : p.key)} style={{ flexShrink: 0, padding: '8px 16px', fontSize: 13.5 }}>
            {p.name.replace(' cups', '')}{p.key === rec ? ' ★' : ''}
          </Chip>
        ));
        const compareEl = (
          <span
            onClick={onCompareToggle}
            aria-label={compareOpen ? 'Close compare' : 'Compare'}
            style={isMobile
              ? { flexShrink: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', border: `1px solid ${compareOpen ? color.green : color.border}`, fontSize: 14, color: compareOpen ? color.greenDark : color.gray }
              : { flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: compareOpen ? color.greenDark : color.gray, borderBottom: `1px dotted ${color.faint}`, paddingBottom: 1 }}
          >
            {isMobile ? (compareOpen ? '✕' : '⇄') : (compareOpen ? '✕ Close compare' : '⇄ Compare')}
          </span>
        );
        return isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 14 }}>
            {label}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'nowrap', justifyContent: 'center' }}>
              {chipEls}{compareEl}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            {label}{chipEls}{compareEl}
          </div>
        );
      })()}
      {overridden && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: color.muted, textAlign: 'center' }}>
          For this order we'd recommend <b style={{ color: color.greenDark }}>{recProduct.name}</b>.{' '}
          <span onClick={() => setOverride(null)} style={{ cursor: 'pointer', textDecoration: 'underline', color: color.greenDark }}>use recommended</span>
        </div>
      )}
      <div style={{ marginTop: 16, fontSize: 11.5, color: color.faint, textAlign: 'center' }}>
        {logo ? 'Your logo is on the cup · ' : ''}Free design setup · we send a 3D proof before printing
      </div>
    </>
  );

  if (isMobile) {
    // Fragment (no wrapper) so the pinned cup shares <body> as its containing block
    // and stays visible while the params/summary/trust siblings scroll underneath it.
    return (
      <>
        <div style={{ position: 'sticky', top: 0, zIndex: 20, background: color.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 16px 10px', boxShadow: '0 10px 12px -10px rgba(0,0,0,.14)' }}>
          {cupBlock}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 16px 0' }}>
          {details}
        </div>
      </>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 0 }}>
      {cupBlock}
      {details}
    </div>
  );
}
