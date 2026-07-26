import React from 'react';
import { color, font } from '../theme.js';

// Lo-fi wireframe of the responsive structure, printed on the receipt paper.
const FAINT = color.faint;
const box = { border: `1.4px dashed ${FAINT}`, borderRadius: 8, background: 'rgba(120,116,104,.06)', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 };
const solid = { ...box, borderStyle: 'solid' };
const tint = { ...box, background: 'rgba(118,184,42,.14)', borderColor: color.green };
const lbl = { fontFamily: font.mono, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: color.muted, display: 'flex', justifyContent: 'space-between', gap: 6 };
const nStyle = { color: color.greenDark, fontWeight: 700 };
const cap = { fontFamily: font.mono, fontSize: 8.5, letterSpacing: '.06em', color: color.greenDark, textAlign: 'center' };

const Bar = ({ w = '100%' }) => <span style={{ display: 'block', height: 5, borderRadius: 3, background: FAINT, opacity: 0.55, width: w }} />;
const Chip = ({ on }) => <span style={{ height: 15, width: 26, borderRadius: 999, border: `1px solid ${on ? color.green : FAINT}`, background: on ? color.green : 'transparent', flex: 'none' }} />;
const Tape = () => <div style={{ height: 16, marginTop: 2, borderTop: `1px solid ${FAINT}`, borderBottom: `1px solid ${FAINT}`, background: `repeating-linear-gradient(90deg, ${FAINT} 0 1px, transparent 1px 8px)`, position: 'relative' }}><span style={{ position: 'absolute', left: '50%', top: -2, bottom: -2, width: 2, background: color.green }} /></div>;
const Cup = ({ h = 60 }) => (
  <div style={{ position: 'relative', width: h * 0.8, height: h, margin: '0 auto', background: color.kraft, clipPath: 'polygon(20% 0,80% 0,70% 100%,30% 100%)' }}>
    <span style={{ position: 'absolute', left: 0, right: 0, top: '34%', height: '30%', background: color.green }} />
  </div>
);
const Row = () => <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><Bar w="36%" /><Bar w="26%" /></div>;
const Lbl = ({ n, r }) => <div style={lbl}><span style={nStyle}>{n}</span><span>{r}</span></div>;

const HeaderStrip = ({ icon }) => (
  <div style={{ ...solid, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px' }}>
    <span style={{ width: 42, height: 8, borderRadius: 2, background: `linear-gradient(90deg, ${color.green} 10px, ${FAINT} 10px)` }} />
    <span style={{ width: icon ? 18 : 56, height: 16, borderRadius: icon ? '50%' : 999, border: `1px solid ${FAINT}` }} />
  </div>
);

export default function LayoutWireframe() {
  return (
    <div style={{ margin: '6px 0 2px' }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

        {/* DESKTOP */}
        <div style={{ flex: '3 1 300px', minWidth: 0 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: color.muted, marginBottom: 5, letterSpacing: '.06em' }}>DESKTOP · ≥1200 · 3 columns</div>
          <div style={{ border: `1px solid ${FAINT}`, borderRadius: 8, padding: 8, background: 'rgba(255,255,255,.35)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <HeaderStrip />
            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr 1fr', gap: 6 }}>
              <div style={box}>
                <Lbl n="Left" r="params" />
                <Bar w="55%" />
                <div style={{ display: 'flex', gap: 4 }}><Chip on /><Chip /></div>
                <div style={{ display: 'flex', gap: 4 }}><Chip /><Chip on /></div>
                <Tape />
              </div>
              <div style={tint}>
                <Lbl n="Middle" r="3D cup" />
                <Cup h={64} />
                <div style={cap}>RECOMMENDED</div>
              </div>
              <div style={box}>
                <Lbl n="Right" r="receipt" />
                <Row /><Row /><Row />
                <span style={{ height: 16, borderRadius: 999, background: color.ink, marginTop: 2 }} />
              </div>
            </div>
            <div style={solid}>
              <Lbl n="Trust" r="reviews · companies · advice" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ border: `1px dashed ${FAINT}`, borderRadius: 6, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}><Bar /><Bar w="70%" /></div>)}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET */}
        <div style={{ flex: '1 1 150px', minWidth: 140, maxWidth: 210 }}>
          <div style={{ fontFamily: font.mono, fontSize: 10, color: color.muted, marginBottom: 5, letterSpacing: '.06em' }}>MOBILE / TABLET · &lt;1200 · 1 col</div>
          <div style={{ border: `1px solid ${FAINT}`, borderRadius: 8, padding: 8, background: 'rgba(255,255,255,.35)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <HeaderStrip icon />
            <div style={{ ...tint, position: 'relative' }}>
              <span style={{ position: 'absolute', top: 6, right: 6, fontFamily: font.mono, fontSize: 7.5, letterSpacing: '.08em', textTransform: 'uppercase', color: color.greenDark, border: `1px solid ${color.green}`, borderRadius: 999, padding: '1px 5px' }}>sticky</span>
              <Lbl n="1" r="3D cup" />
              <Cup h={52} />
            </div>
            <div style={box}>
              <Lbl n="2" r="options" />
              <div style={{ display: 'flex', gap: 4 }}><Chip on /><Chip /></div>
              <Tape />
            </div>
            <div style={box}>
              <Lbl n="3" r="summary" />
              <Row />
              <span style={{ height: 16, borderRadius: 999, background: color.green, marginTop: 2 }} />
            </div>
            <div style={solid}>
              <Lbl n="4" r="trust stats" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}><span style={{ height: 9, width: '60%', borderRadius: 2, background: color.green }} /><Bar w="70%" /></div>)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
