import React from 'react';
import { color, radius, space, text, weight, transition } from '../../theme.js';

// Selectable rounded chip (cup type, size shortcuts, "also available" switches).
// `selected` drives the filled/active look; pass `style` for one-off tweaks.
export default function Chip({ selected = false, children, style, ...rest }) {
  return (
    <span
      style={{
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        padding: `9px ${space.lg}px`,
        borderRadius: radius.pill,
        fontSize: text.md,
        fontWeight: weight.semibold,
        border: `1px solid ${selected ? color.green : color.border}`,
        background: selected ? color.green : 'transparent',
        color: selected ? color.ink : color.muted,
        transition: transition.base,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
