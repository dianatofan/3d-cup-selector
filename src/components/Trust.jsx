import React, { useState } from 'react';
import { useIsMobile } from '../hooks/useScratch.js';
import { color, radius, gutter, font } from '../theme.js';
import { REVIEWS, COMPANIES, MORE_COMPANIES, SPECIALISTS, TRUST_STATS, PHONE } from '../content.js';
import { Card, Pill, Button } from './ui/index.js';

// Typographic treatments for the company wall — keyed by each company's `s`.
const COMPANY_STYLE = {
  serif: { fontFamily: font.serif, fontStyle: 'italic', fontSize: 17 },
  bold: { fontWeight: 800, fontSize: 14, letterSpacing: '.04em' },
  spaced: { fontWeight: 700, fontSize: 13, letterSpacing: '.28em' },
};

const cardStyle = { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 10 };
const fieldStyle = { width: '100%', boxSizing: 'border-box', background: 'transparent', border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', color: color.ink };

function AvatarCluster() {
  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <span style={{ display: 'inline-flex' }}>
        {SPECIALISTS.map((s, n) => (
          <span key={s.initials} title={s.initials} style={{ width: 38, height: 38, borderRadius: '50%', background: s.bg, color: color.white, fontWeight: 700, fontSize: 12.5, letterSpacing: '.02em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${color.white}`, boxShadow: '0 1px 3px rgba(0,0,0,.15)', marginLeft: n === 0 ? 0 : -10 }}>
            {s.initials}
          </span>
        ))}
      </span>
      <span title="Specialists online now" style={{ position: 'absolute', right: -2, bottom: 0, width: 11, height: 11, borderRadius: '50%', background: color.green, border: `2px solid ${color.white}`, boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
    </div>
  );
}

export default function Trust() {
  const isMobile = useIsMobile();
  const [i, setI] = useState(0);
  const nav = (d) => setI((n) => (n + d + REVIEWS.length) % REVIEWS.length);

  const [askOpen, setAskOpen] = useState(false);
  const [ask, setAsk] = useState({ email: '', question: '' });
  const [sent, setSent] = useState(false);

  if (isMobile) {
    return (
      <section style={{ padding: `clamp(20px,5vw,32px) ${gutter}` }}>
        <Card style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', textAlign: 'center', padding: '18px 12px', gap: 8 }}>
          {TRUST_STATS.map((s) => (
            <div key={s.small} style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: color.greenDark, lineHeight: 1.1, whiteSpace: 'nowrap' }}>{s.big}</div>
              <div style={{ fontSize: 11, color: color.gray, marginTop: 3 }}>{s.small}</div>
            </div>
          ))}
        </Card>
      </section>
    );
  }

  return (
    <section style={{ padding: `clamp(24px,4vw,44px) ${gutter}`, maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 18, alignItems: 'stretch' }}>
      <Card style={cardStyle}>
        <div style={{ fontWeight: 800, fontSize: 22, color: color.greenDark }}>
          ★★★★★ <span style={{ fontSize: 13, color: color.gray, fontWeight: 500 }}>Google · 4.8 · 145 reviews</span>
        </div>
        <p style={{ margin: 0, fontSize: 14.5, color: color.ink, lineHeight: 1.6, textWrap: 'pretty', minHeight: 90 }}>{REVIEWS[i].text}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12.5, color: color.gray }}>{REVIEWS[i].who}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11.5, color: color.faint, fontVariantNumeric: 'tabular-nums' }}>{i + 1}/{REVIEWS.length}</span>
            <span onClick={() => nav(-1)} style={{ cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', border: `1px solid ${color.border}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>←</span>
            <span onClick={() => nav(1)} style={{ cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', border: `1px solid ${color.border}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>→</span>
          </span>
        </div>
      </Card>

      <Card style={cardStyle}>
        <div style={{ fontSize: 11.5, letterSpacing: '.22em', fontWeight: 700, color: color.gray }}>TRUSTED BY 7,500+ COMPANIES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 28px', alignItems: 'center', color: color.muted }}>
          {COMPANIES.map((c) => (
            <span key={c.name} style={COMPANY_STYLE[c.s]}>{c.name}</span>
          ))}
        </div>
        <div>
          <Pill style={{ marginTop: 4, fontSize: 12.5, color: color.muted }}>+ {MORE_COMPANIES.toLocaleString('en-GB')} more</Pill>
        </div>
      </Card>

      <Card style={cardStyle}>
        <AvatarCluster />
        <div style={{ fontWeight: 700, fontSize: 16 }}>Need personal advice?</div>
        <div style={{ fontSize: 13.5, color: color.muted }}>Our specialists answer by phone or email, in your language.</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
          <Pill as="a" href={PHONE.href}>☎ {PHONE.label}</Pill>
          <Pill active={askOpen} role="button" onClick={() => setAskOpen((o) => !o)}>✉ Ask our specialists</Pill>
        </div>

        {askOpen && (
          sent ? (
            <div style={{ marginTop: 4, fontSize: 13.5, color: color.greenDark, fontWeight: 600 }}>
              ✓ Thanks — a specialist will reply within the hour.
              <div
                role="button"
                onClick={() => { setSent(false); setAsk({ email: '', question: '' }); }}
                style={{ marginTop: 6, fontSize: 12.5, fontWeight: 600, color: color.muted, textDecoration: 'underline', cursor: 'pointer' }}
              >
                Ask another question
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              <input
                type="email"
                placeholder="you@company.com"
                value={ask.email}
                onChange={(e) => setAsk({ ...ask, email: e.target.value })}
                style={fieldStyle}
              />
              <textarea
                rows={2}
                placeholder="Your question, e.g. 'Can you match Pantone colours?'"
                value={ask.question}
                onChange={(e) => setAsk({ ...ask, question: e.target.value })}
                style={{ ...fieldStyle, resize: 'vertical' }}
              />
              <Button
                variant="green"
                disabled={!ask.email.trim()}
                onClick={() => { if (ask.email.trim()) setSent(true); }}
                style={{ alignSelf: 'flex-start', fontSize: 14, padding: '10px 22px' }}
              >
                Send question →
              </Button>
            </div>
          )
        )}
      </Card>
    </section>
  );
}
