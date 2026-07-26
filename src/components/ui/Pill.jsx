import React from 'react';
import { color, radius, space, text, weight, transition } from '../../theme.js';

// Outlined pill used for secondary actions and contact links (phone, email,
// "+ N more"). Render as an <a> via `as="a"` for real links; `active` tints it green.
export default function Pill({ as: Tag = 'span', active = false, children, style, ...rest }) {
  return (
    <Tag
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        border: `1px solid ${active ? color.green : color.border}`,
        borderRadius: radius.pill,
        padding: `${space.sm}px ${space.lg}px`,
        fontSize: text.base,
        fontWeight: weight.semibold,
        color: active ? color.greenDark : color.ink,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: transition.base,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
