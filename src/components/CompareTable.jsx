import React from 'react';
import { PRODUCTS, COMPARE_ROWS } from '../lib/pricing.js';
import { color, radius, text } from '../theme.js';

const HL = 'rgba(118,184,42,.12)'; // active-column tint, local to this table

export default function CompareTable({ order }) {
  const { active, rec, setOverride } = order;
  const keys = ['best', 'bulk', 'reuse'];
  const hl = (k) => (active === k ? HL : 'transparent');
  const cell = { padding: '12px 22px', borderTop: `1px solid ${color.divider}` };
  // Each row fades up shortly after the one above it, for an organic reveal.
  const rowAnim = (i) => ({ animation: 'lp-cellIn .45s ease both', animationDelay: `${0.1 + i * 0.06}s` });
  return (
    <section style={{ padding: '0 clamp(20px,4vw,60px) 34px', maxWidth: 1440, margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ border: `1px solid ${color.borderLight}`, borderRadius: radius.xl, overflow: 'auto', background: color.white, animation: 'lp-compareIn .5s cubic-bezier(.22,1,.36,1) both', transformOrigin: 'top center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr', fontSize: text.md, minWidth: 640 }}>
          <div style={{ padding: '14px 22px', color: color.gray, fontWeight: 700, fontSize: text.sm, letterSpacing: '.2em', alignSelf: 'center' }}>COMPARE</div>
          {keys.map((k, ki) => (
            <div key={k} onClick={() => setOverride(k === rec ? null : k)} style={{ cursor: 'pointer', padding: '14px 22px', fontWeight: 700, color: active === k ? color.greenDark : color.ink, background: hl(k), fontSize: text.cta, ...rowAnim(ki * 0.3) }}>
              {PRODUCTS[k].name.replace(' cups', '')}{k === rec ? ' ★' : ''}
            </div>
          ))}
          {COMPARE_ROWS.map((r, i) => (
            <React.Fragment key={r.label}>
              <div style={{ ...cell, color: color.gray, ...rowAnim(i + 1) }}>{r.label}</div>
              <div style={{ ...cell, background: hl('best'), ...rowAnim(i + 1) }}>{r.a}</div>
              <div style={{ ...cell, background: hl('bulk'), ...rowAnim(i + 1) }}>{r.b}</div>
              <div style={{ ...cell, background: hl('reuse'), ...rowAnim(i + 1) }}>{r.c}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 10, fontSize: text.smd, color: color.gray }}>
        Tap a column header to pick that cup · ★ = our recommendation for your order
      </div>
    </section>
  );
}
