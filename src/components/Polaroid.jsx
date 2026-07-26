import React from 'react';
import { color } from '../theme.js';

// The attached graphic shown as a tilted Polaroid pinned to the board, with a
// pushpin and an ✕ remove button. `size` is the photo width in px.
export default function Polaroid({ src, onRemove, size = 150, rotate = -3 }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ display: 'block', background: color.white, padding: '10px 10px 26px', borderRadius: 3, boxShadow: '0 12px 26px rgba(0,0,0,.22)', transform: `rotate(${rotate}deg)` }}>
        <span style={{ display: 'block', width: size, height: Math.round(size * 0.84), backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#eee' }} />
      </span>
      {/* pushpin */}
      <span aria-hidden="true" style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', width: 16, height: 16, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #ff8b7a, #c0392b 70%)', boxShadow: '0 3px 5px rgba(0,0,0,.35)', pointerEvents: 'none' }} />
      {/* remove */}
      {onRemove && (
        <span
          role="button"
          aria-label="Remove graphic"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
          style={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, borderRadius: '50%', background: color.ink, color: color.white, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,.3)' }}
        >
          ✕
        </span>
      )}
    </span>
  );
}
