import React from 'react';
import { color, radius, font, gradient, text, weight } from '../../theme.js';

// Primary call-to-action. Variants:
//  - 'primary' : green brand gradient (hero / start-design CTAs)
//  - 'green'   : solid green (send / confirm)
//  - 'dark'    : near-black (receipt continue)
// `block` makes it full width; `disabled` dims and blocks the pointer.
const VARIANTS = {
  primary: { background: gradient.brand, color: color.ink },
  green: { background: color.green, color: color.ink },
  dark: { background: color.ink, color: color.white },
};

export default function Button({ variant = 'primary', block = false, disabled = false, children, style, onClick, ...rest }) {
  return (
    <span
      role="button"
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{
        display: block ? 'block' : 'inline-block',
        textAlign: 'center',
        fontFamily: font.sans,
        fontWeight: weight.heavy,
        fontSize: text.cta,
        padding: '13px 22px',
        borderRadius: radius.pill,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...VARIANTS[variant],
        ...(disabled ? { background: color.greenDisabled } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
