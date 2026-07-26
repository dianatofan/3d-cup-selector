import React, { useState } from 'react';
import { color, radius } from '../theme.js';
import { Card, Button } from './ui/index.js';
import Polaroid from './Polaroid.jsx';

const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13.5 };
const fieldStyle = { width: '100%', boxSizing: 'border-box', background: 'transparent', border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: '11px 12px', fontSize: 14, fontFamily: 'inherit', color: color.ink };

// Compact price summary shown instead of the printer receipt on mobile.
export default function MobileSummary({ order }) {
  const { product, qtyLabel, size, unitLabel, unitWasLabel, onSale, discountLabel, totalLabel, totalIncVatLabel, deliveryUpper, contact, setContact, logo, setLogo } = order;
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const email = contact.email;

  const pickLogo = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setLogo({ dataUrl: r.result, name: f.name });
    r.readAsDataURL(f);
  };

  return (
    <Card style={{ padding: '18px 20px', boxShadow: '0 6px 20px rgba(0,0,0,.05)' }}>
      <div style={{ fontSize: 10.5, letterSpacing: '.24em', fontWeight: 700, color: color.greenDark }}>
        {product.name.toUpperCase()}
      </div>
      <div style={{ fontSize: 12.5, color: color.gray, marginTop: 2 }}>{qtyLabel} pcs · {size} ml</div>

      <div style={{ ...ROW, marginTop: 12 }}>
        <span style={{ color: color.muted }}>Unit</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          {onSale && <span style={{ background: color.yellow, fontSize: 10.5, fontWeight: 700, padding: '1px 6px', borderRadius: 3 }}>{discountLabel}</span>}
          {onSale && <s style={{ color: color.gray }}>{unitWasLabel}</s>}
          <b>{unitLabel}</b>
        </span>
      </div>

      <div style={{ borderTop: `1px dashed ${color.border}`, margin: '12px 0' }} />

      <div style={{ ...ROW, alignItems: 'flex-end' }}>
        <span style={{ color: color.muted }}>Total <span style={{ fontSize: 11, color: color.gray }}>excl. VAT</span></span>
        <span style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{totalLabel}</span>
      </div>
      <div style={{ ...ROW, fontSize: 11.5, color: color.gray, marginTop: 3 }}>
        <span>Free delivery · by {deliveryUpper}</span>
        <span>{totalIncVatLabel} incl. VAT</span>
      </div>

      {!open && !sent && (
        <Button block variant="primary" onClick={() => setOpen(true)} style={{ marginTop: 16, fontSize: 15.5, padding: 14 }}>
          Start design →
        </Button>
      )}

      {open && !sent && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12.5, color: color.muted, textAlign: 'center', lineHeight: 1.5 }}>
            Free design setup · we email a print-ready 3D proof within 2 hours.
          </div>
          {/* Attach a logo / graphic — shows live on the cup above. */}
          {logo ? (
            <div style={{ border: `1.5px dashed ${color.green}`, borderRadius: radius.lg, padding: '24px 12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <Polaroid src={logo.dataUrl} onRemove={() => setLogo(null)} size={130} />
              <label style={{ fontSize: 11.5, color: color.muted, textDecoration: 'underline', cursor: 'pointer' }}>
                swap file
                <input type="file" accept="image/*" onChange={pickLogo} style={{ display: 'none' }} />
              </label>
            </div>
          ) : (
            <label style={{ display: 'block', textAlign: 'center', border: `1.5px dashed ${color.faint}`, borderRadius: radius.lg, padding: '14px 12px', cursor: 'pointer' }}>
              <div style={{ fontSize: 22, color: color.green, lineHeight: 1 }}>⬆</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginTop: 4 }}>Attach your logo or graphic</div>
              <div style={{ fontSize: 11, color: color.gray, marginTop: 2 }}>optional · PNG, JPG or SVG</div>
              <input type="file" accept="image/*" onChange={pickLogo} style={{ display: 'none' }} />
            </label>
          )}
          <input
            type="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            style={fieldStyle}
          />
          <Button block variant="green" disabled={!email.trim()} onClick={() => { if (email.trim()) setSent(true); }} style={{ fontSize: 15, padding: 13 }}>
            {logo ? 'Send my design →' : 'Send without graphic →'}
          </Button>
        </div>
      )}

      {sent && (
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 30, color: color.greenDark, lineHeight: 1 }}>✓</div>
          <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 4 }}>Your cup is with our design team!</div>
          <div style={{ fontSize: 12, color: color.muted, marginTop: 3, lineHeight: 1.5 }}>
            We'll email a print-ready proof to {email || 'you'} within 2 hours.
          </div>
          <span
            role="button"
            onClick={() => { setSent(false); setOpen(false); }}
            style={{ display: 'inline-block', marginTop: 10, fontSize: 12.5, fontWeight: 600, color: color.muted, textDecoration: 'underline', cursor: 'pointer' }}
          >
            Start another order
          </span>
        </div>
      )}
    </Card>
  );
}
