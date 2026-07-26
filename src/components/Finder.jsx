import React, { useCallback, useState } from 'react';
import { SIZES, VARIANTS, QTY_MIN, QTY_MAX, QTY_STEP } from '../lib/pricing.js';
import { color, radius } from '../theme.js';
import { FieldLabel, Chip, InfoDot } from './ui/index.js';

// A FieldLabel that lays out its text next to an InfoDot.
const LabelWithInfo = ({ children }) => (
  <FieldLabel style={{ display: 'flex', alignItems: 'center', gap: 7 }}>{children}</FieldLabel>
);

export default function Finder({ order }) {
  const { qty, setQty, deadline, setDeadline, reuse, setReuse, size, setSize, variant, setVariant } = order;
  const [info, setInfo] = useState(null);
  const toggle = (k) => setInfo((i) => (i === k ? null : k));

  const tapeDown = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX, startQty = qty;
    const move = (ev) => {
      const raw = startQty + (startX - ev.clientX) * 10.4;
      setQty(Math.min(QTY_MAX, Math.max(QTY_MIN, Math.round(raw / QTY_STEP) * QTY_STEP)));
    };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, [qty, setQty]);

  const tapePos = `${-(qty / QTY_STEP) * 24}px`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <LabelWithInfo>
          CUP TYPE
          <InfoDot open={info === 'type'} onToggle={() => toggle('type')} title="Type explained">
            Single-use cups are liquid-proofed with a thin PE or water-based bio coating. Reusable 🌱 cups are thicker, dishwasher-safe polypropylene, built for events and venues with deposit systems.
          </InfoDot>
        </LabelWithInfo>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Chip selected={!reuse} onClick={() => setReuse(false)}>Single-use</Chip>
          <Chip
            selected={reuse}
            onClick={() => setReuse(true)}
            style={reuse ? undefined : { borderColor: color.greenSoft, color: color.greenDark }}
          >
            Reusable 🌱
          </Chip>
        </div>
      </div>

      <div>
        <FieldLabel>DEADLINE</FieldLabel>
        <div style={{ display: 'flex', gap: 8 }}>
          <Chip selected={deadline === 'std'} onClick={() => setDeadline('std')}>Standard</Chip>
          <Chip selected={deadline === 'asap'} onClick={() => setDeadline('asap')}>ASAP</Chip>
        </div>
      </div>

      <div>
        <LabelWithInfo>
          SIZE
          <InfoDot open={info === 'size'} onToggle={() => toggle('size')} title="Size comparison">
            Sizes are recommended filling amounts: from the 100 ml espresso (60 mm tall) to the 450 ml extra large (137 mm). <b>The most popular size is 240 ml.</b> Watch the cup grow as you pick.
          </InfoDot>
        </LabelWithInfo>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 5 }}>
          {SIZES.map((s) => {
            const on = size === s.value;
            return (
              <div key={s.value} onClick={() => setSize(s.value)} style={{ cursor: 'pointer', textAlign: 'center', padding: '6px 2px', borderRadius: radius.sm, border: `1px solid ${on ? color.green : color.border}`, background: on ? color.greenTintBg : 'transparent', transition: 'all .15s' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: on ? color.greenDark : color.ink, whiteSpace: 'nowrap' }}>{s.label}</div>
                <div style={{ fontSize: 9, color: color.gray, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <LabelWithInfo>
          VARIANT
          <InfoDot open={info === 'variant'} onToggle={() => toggle('variant')} title="Variants explained">
            Single wall is the classic choice for cold and warm drinks. Double wall adds a second layer for heat insulation, ideal for hot drinks, in matte or glossy (40% recycled, white bottom).
          </InfoDot>
        </LabelWithInfo>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: `1px solid ${color.border}`, borderRadius: radius.lg, overflow: 'hidden' }}>
          {VARIANTS.map((v) => {
            const on = variant === v.value;
            return (
              <div key={v.value} onClick={() => setVariant(v.value)} style={{ cursor: 'pointer', textAlign: 'center', padding: '7px 2px', background: on ? 'rgba(118,184,42,.14)' : 'transparent', transition: 'all .15s' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: on ? color.greenDark : color.ink, whiteSpace: 'nowrap' }}>{v.short}</div>
                <div style={{ fontSize: 9, color: color.gray, whiteSpace: 'nowrap' }}>{v.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <FieldLabel>QUANTITY · DRAG THE TAPE</FieldLabel>
        <div style={{ fontWeight: 800, fontSize: 26 }}>
          {order.qtyLabel} <span style={{ fontSize: 13, fontWeight: 500, color: color.gray }}>pcs</span>
        </div>
        <div
          onPointerDown={tapeDown}
          style={{
            position: 'relative', height: 38, marginTop: 8, borderTop: `1px solid ${color.border}`, borderBottom: `1px solid ${color.border}`,
            cursor: 'grab', touchAction: 'none',
            backgroundImage: 'repeating-linear-gradient(90deg,#c9c6ba 0,#c9c6ba 2px,transparent 2px,transparent 24px),repeating-linear-gradient(90deg,#9a9a90 0,#9a9a90 2px,transparent 2px,transparent 120px)',
            backgroundSize: 'auto 34%,auto 62%', backgroundRepeat: 'repeat-x',
            backgroundPosition: `${tapePos} bottom,${tapePos} bottom`,
          }}
        >
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, background: color.green, transform: 'translateX(-1px)' }} />
          <div style={{ position: 'absolute', left: '50%', top: -5, width: 0, height: 0, border: '5px solid transparent', borderTopColor: color.green, transform: 'translateX(-5px)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: color.faint, marginTop: 4, fontWeight: 600, letterSpacing: '.08em' }}>
          <span>← FEWER</span><span>MORE →</span>
        </div>
      </div>
    </div>
  );
}
