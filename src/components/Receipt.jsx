import React, { useEffect, useRef, useState } from 'react';
import { useScratch } from '../hooks/useScratch.js';
import { color, font, radius, text } from '../theme.js';
import Polaroid from './Polaroid.jsx';

const MONO = { fontFamily: font.mono };
const ROW = { display: 'flex', justifyContent: 'space-between' };
const DASH = { borderTop: `1px dashed ${color.faint}`, margin: '8px 0' };
const LINK = { textAlign: 'center', marginTop: 6, fontSize: 11.5, color: color.muted, textDecoration: 'underline', cursor: 'pointer' };
const FIELD = { width: '100%', boxSizing: 'border-box', background: 'transparent', border: `1px dashed ${color.faint}`, borderRadius: radius.sm, padding: '8px 10px', ...MONO, fontSize: 12.5, marginTop: 4 };

// A value that scratches out its old self and rewrites in place on change.
function Scratch({ value, highlight }) {
  const { old, scratchAnim, writeAnim } = useScratch(value);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <s style={{ position: 'absolute', right: 0, top: 0, whiteSpace: 'nowrap', opacity: 0, color: color.red, textDecorationStyle: 'wavy', textDecorationColor: color.red, animation: scratchAnim }}>{old}</s>
      <b style={{ display: 'inline-block', whiteSpace: 'nowrap', flexShrink: 0, animation: writeAnim, ...(highlight ? { background: '#cdeaa4', padding: '2px 8px', borderRadius: 3 } : {}) }}>{value}</b>
    </span>
  );
}

// Small, non-primitive CTA button local to the receipt (keeps the Button API but tighter metrics).
function Btn({ variant = 'dark', onClick, children }) {
  const bg = variant === 'green' ? color.green : color.ink;
  const fg = variant === 'green' ? color.ink : color.white;
  return (
    <span onClick={onClick} style={{ display: 'block', textAlign: 'center', marginTop: variant === 'green' ? 14 : 12, background: bg, color: fg, fontFamily: font.sans, fontWeight: 700, fontSize: text.cta, padding: 12, borderRadius: radius.pill, cursor: 'pointer' }}>
      {children}
    </span>
  );
}

export default function Receipt({ order }) {
  const { step, setStep, logo, setLogo, contact, setContact } = order;
  const printCount = useRef(0);
  const prevStep = useRef(step);
  const [, force] = useState(0);
  useEffect(() => {
    if (prevStep.current !== step) { printCount.current += 1; prevStep.current = step; force((n) => n + 1); }
  }, [step]);
  const paperAnim = printCount.current === 0
    ? 'lp-printIn 1.15s steps(26, end) both'
    : `lp-print${printCount.current % 2 ? 'A' : 'B'} 0.6s steps(15, end) both`;

  const pickLogo = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setLogo({ dataUrl: r.result, name: f.name });
    r.readAsDataURL(f);
  };

  return (
    <div style={{ maxWidth: 420, width: '100%', margin: '0 auto', boxSizing: 'border-box', alignSelf: 'flex-start', paddingTop: 14 }}>
      {/* printer slot */}
      <div style={{ position: 'relative', zIndex: 5, margin: '0 -14px', background: 'linear-gradient(180deg,#2e2e2e,#181818 70%,#101010)', borderRadius: '14px 14px 7px 7px', padding: '11px 18px 12px' }}>
        <div style={{ height: 5, borderRadius: 3, background: '#000', boxShadow: 'inset 0 2px 4px rgba(0,0,0,.9)' }} />
      </div>
      {/* paper clip window — reveals the sheet top-to-bottom as it feeds out from behind the slot */}
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 3, margin: '-13px -24px 0', padding: '0 24px 48px', animation: paperAnim, willChange: 'clip-path' }}>
        <div
          style={{
            ...MONO, fontSize: text.base, color: color.ink, lineHeight: 1.9,
            background: 'repeating-linear-gradient(0deg,rgba(19,19,19,.035) 0,rgba(19,19,19,.035) 1px,transparent 1px,transparent 4px),repeating-linear-gradient(90deg,rgba(19,19,19,.015) 0,rgba(19,19,19,.015) 2px,transparent 2px,transparent 7px),linear-gradient(175deg,#fdfcf6,#f0eee1)',
            margin: '0 4px', borderRadius: '0 0 2px 2px',
            padding: '26px 26px 24px',
            boxShadow: '0 26px 54px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.22),inset 0 14px 12px -12px rgba(0,0,0,.28)',
            clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),96% 100%,92% calc(100% - 8px),88% 100%,84% calc(100% - 8px),80% 100%,76% calc(100% - 8px),72% 100%,68% calc(100% - 8px),64% 100%,60% calc(100% - 8px),56% 100%,52% calc(100% - 8px),48% 100%,44% calc(100% - 8px),40% 100%,36% calc(100% - 8px),32% 100%,28% calc(100% - 8px),24% 100%,20% calc(100% - 8px),16% 100%,12% calc(100% - 8px),8% 100%,4% calc(100% - 8px),0 100%)',
          }}
        >
          <div style={{ textAlign: 'center', fontWeight: 700, letterSpacing: '.2em' }}>LIMEPACK</div>

          {step === 'order' && (
            <>
              <div style={{ textAlign: 'center', color: color.gray }}>ORDER DRAFT · STEP 1 OF 3</div>
              <div style={DASH} />
              <div style={{ ...ROW, alignItems: 'center' }}><span>CUP</span><Scratch value={order.product.name.toUpperCase()} highlight /></div>
              <div style={ROW}><span>QTY</span><Scratch value={`${order.qtyLabel} PCS`} /></div>
              <div style={ROW}><span>SIZE</span><Scratch value={`${order.size} ML`} /></div>
              <div style={ROW}><span>VARIANT</span><Scratch value={order.variantReceipt} /></div>
              <div style={ROW}><span>DESIGN</span><b>{logo ? 'YOUR FILE ✓' : 'FREE DRAFT BY LIMEPACK'}</b></div>
              <div style={{ ...ROW, alignItems: 'center' }}>
                <span>UNIT</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                  {order.onSale && <span style={{ background: color.yellow, fontSize: 10.5, fontWeight: 700, padding: '1px 6px', borderRadius: 3 }}>{order.discountLabel}</span>}
                  {order.onSale && <s style={{ color: color.gray }}>{order.unitWasLabel}</s>}
                  <Scratch value={order.unitLabel} />
                </span>
              </div>
              <div style={DASH} />
              <div style={{ ...ROW, fontSize: text.cta }}><span>TOTAL</span><Scratch value={order.totalLabel} /></div>
              <div style={{ ...ROW, fontSize: text.xs, color: color.gray, lineHeight: 1.4 }}><span>EXCL. VAT</span><span>{order.totalIncVatLabel} INCL. VAT</span></div>
              <div style={ROW}><span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>DELIVERY · FREE</span><Scratch value={`BY ${order.deliveryUpper}`} /></div>
              <Btn onClick={() => setStep('design')}>Continue to design →</Btn>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11.5, color: color.muted }}>
                or <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>add to cart, design later →</span>
              </div>
            </>
          )}

          {step === 'design' && (
            <>
              <div style={{ textAlign: 'center', color: color.gray }}>FREE DESIGN DRAFT · STEP 2 OF 3</div>
              <div style={DASH} />
              <div style={{ textAlign: 'center', fontSize: text.md + 0.5, fontWeight: 700, fontFamily: font.sans }}>Get your free design draft</div>
              <div style={{ textAlign: 'center', fontSize: 11.5, color: color.muted, lineHeight: 1.5, fontFamily: font.sans }}>
                We just need your logo or graphic.<br />Where can we find it?
              </div>
              {logo ? (
                <div style={{ border: `1.5px dashed ${color.green}`, borderRadius: radius.lg, padding: '26px 12px 18px', marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <Polaroid src={logo.dataUrl} onRemove={() => setLogo(null)} />
                  <label style={{ fontSize: text.xs, color: color.muted, textDecoration: 'underline', cursor: 'pointer' }}>
                    swap file
                    <input type="file" accept="image/*" onChange={pickLogo} style={{ display: 'none' }} />
                  </label>
                </div>
              ) : (
                <label style={{ display: 'block', textAlign: 'center', border: `1.5px dashed ${color.faint}`, borderRadius: radius.lg, padding: '16px 12px', marginTop: 12, cursor: 'pointer' }}>
                  <div style={{ fontSize: 24, color: color.green, lineHeight: 1 }}>⬆</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, fontFamily: font.sans, marginTop: 4 }}>Upload logo or graphic</div>
                  <div style={{ display: 'inline-block', marginTop: 8, background: color.green, color: color.ink, fontFamily: font.sans, fontWeight: 700, fontSize: 12.5, padding: '7px 18px', borderRadius: radius.pill }}>Select files</div>
                  <input type="file" accept="image/*" onChange={pickLogo} style={{ display: 'none' }} />
                </label>
              )}
              <Btn onClick={() => setStep('contact')}>{logo ? 'Print it on my cup →' : 'Continue without design →'}</Btn>
              <div style={LINK} onClick={() => setStep('contact')}>Skip, I will add graphics later</div>
              <div style={LINK} onClick={() => setStep('order')}>← back to my order</div>
            </>
          )}

          {step === 'contact' && (
            <>
              <div style={{ textAlign: 'center', color: color.gray }}>SEND MY DESIGN · STEP 3 OF 3</div>
              <div style={DASH} />
              <div style={{ textAlign: 'center', fontSize: text.title, fontWeight: 700, fontFamily: font.sans }}>Like what you see on the cup?</div>
              <div style={{ textAlign: 'center', fontSize: 11.5, color: color.muted, fontFamily: font.sans, lineHeight: 1.5 }}>
                This preview is instant. Our design team will turn it into a print-ready, hi-fi 3D proof. Free.
              </div>
              {logo && (
                <div style={{ ...ROW, alignItems: 'center', border: `1px dashed ${color.faint}`, borderRadius: radius.sm, padding: '6px 10px', marginTop: 10, fontSize: text.xs }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{logo.name} ✓</span>
                  <span onClick={() => setLogo(null)} style={{ cursor: 'pointer', color: color.gray, paddingLeft: 8 }}>×</span>
                </div>
              )}
              <div style={{ marginTop: 10, fontSize: text.xs, color: color.muted }}>SEND ME AN EMAIL AT</div>
              <input type="email" placeholder="you@company.com" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} style={FIELD} />
              <div style={{ marginTop: 8, fontSize: text.xs, color: color.muted }}>PHONE · OPTIONAL, IF WE HAVE QUESTIONS</div>
              <input type="tel" placeholder="+45 ..." value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} style={FIELD} />
              <div style={{ marginTop: 8, fontSize: text.xs, color: color.muted }}>ANYTHING FOR OUR DESIGN TEAM? · OPTIONAL</div>
              <textarea placeholder="Colours, placement, text to add..." value={contact.note} onChange={(e) => setContact({ ...contact, note: e.target.value })} rows={2} style={{ ...FIELD, resize: 'vertical' }} />
              <Btn variant="green" onClick={() => setStep('done')}>Send to our design team →</Btn>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: text.xs, color: color.muted }}>Free hi-fi proof, ready within 2 hours!</div>
              <div style={LINK} onClick={() => setStep('design')}>← back</div>
            </>
          )}

          {step === 'done' && (
            <>
              <div style={{ textAlign: 'center', color: color.gray }}>CONFIRMATION</div>
              <div style={DASH} />
              <div style={{ textAlign: 'center', fontSize: 34, lineHeight: 1.2, color: color.greenDark }}>✓</div>
              <div style={{ textAlign: 'center', fontSize: text.cta, fontWeight: 700, fontFamily: font.sans }}>Your cup is with our design team!</div>
              <div style={{ textAlign: 'center', fontSize: 11.5, color: color.muted, fontFamily: font.sans, marginTop: 2 }}>
                We'll email the print-ready hi-fi proof to {contact.email || 'you'} within 2 hours.
              </div>
              <div style={{ ...DASH, margin: '10px 0 8px' }} />
              <div style={ROW}><span>CUP</span><b>{order.product.name.toUpperCase()}</b></div>
              <div style={ROW}><span>QTY</span><b>{order.qtyLabel} PCS</b></div>
              <div style={{ ...ROW, fontSize: text.cta }}><span>TOTAL</span><b>{order.totalLabel}</b></div>
              <div style={ROW}><span>DELIVERY · FREE</span><b>BY {order.deliveryUpper}</b></div>
              <Btn onClick={() => setStep('order')}>Start another order →</Btn>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
