import React from 'react';
import { color, radius, space } from '../../theme.js';

// White rounded panel used for trust cards, the mobile summary, compare table, etc.
export default function Card({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: color.white,
        border: `1px solid ${color.borderLight}`,
        borderRadius: radius.xl,
        padding: `${space.xxl}px ${space.xxxl}px`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
