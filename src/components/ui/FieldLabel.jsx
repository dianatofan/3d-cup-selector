import React from 'react';
import { color, space, text, weight, tracking } from '../../theme.js';

// Small uppercase, wide-tracked label used above form groups and as section
// eyebrows. Pass `style` to adjust colour/margins per use.
export default function FieldLabel({ children, style, ...rest }) {
  return (
    <div
      style={{
        fontSize: text.xs,
        letterSpacing: tracking.widest,
        fontWeight: weight.bold,
        color: color.gray,
        marginBottom: space.md,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
