# 3D Cup Selector

An interactive "printed cups" configurator built as a frontend prototype: pick
type / size / variant / quantity and watch a live 3D cup and a thermal-style
receipt update in real time.

> Take-home prototype — a category page reimagined as a guided product finder.

## Run

```bash
npm install
npm run dev      # dev server (HMR)
npm run build    # production build
```

## Architecture

The code separates **design tokens, content, and layout**:

```
src/
  theme.js                Design tokens — colour, gradient, radius, spacing, type scale, breakpoint
  content.js              Static copy/data — nav, reviews, company wall, specialists, stats, footer ticker
  App.jsx                 Page assembly + responsive branch (desktop grid vs mobile stack)

  hooks/
    useOrder.js           Single source of truth for the order (qty, size, variant, override, step, logo, contact)
    useScratch.js         Scratch-out/rewrite animation hook + useIsMobile(breakpoint)

  components/
    ui/                   Reusable, presentational primitives (no business logic)
      Card, Chip, Pill, Button, FieldLabel, InfoDot   (barrel: ui/index.js)
    Header.jsx            Logo + an "about this prototype" button
    Hero.jsx              Compact page title
    Finder.jsx            Type / deadline / size / variant chips + drag-the-tape quantity
    CupStage.jsx          Wraps the <cup-3d> web component; recommendation + overrides; sticky on mobile
    Receipt.jsx           Thermal receipt, 4 steps (order → design → contact → done) with printer-feed animation
    MobileSummary.jsx     Compact price summary + inline lead capture (mobile only)
    Polaroid.jsx          Attached graphic shown as a pinned Polaroid with remove
    CompareTable.jsx      Side-by-side product comparison
    Trust.jsx             Reviews carousel / company wall / ask-a-specialist (compact stat strip on mobile)
    Footer.jsx            Scrolling marquee + links
    AboutModal.jsx        Case-study notes printed on receipt paper with a typewriter reveal

  lib/pricing.js          Product catalogue, recommendation rule, price/delivery/discount curves (PLACEHOLDERS)

public/
  cup-3d.js               Framework-agnostic <cup-3d> web component (three.js from CDN)
```

### Reusable components & clean structure

- **`theme.js` tokens** are the single source of truth for visual values — colour,
  radius, spacing, type scale, weights, tracking, transitions, shadows. Components
  reference them instead of hardcoded hex/px.
- **`ui/` primitives** own the styling of every repeated interactive element. A
  component composes them and passes only what varies (`selected`, `variant`,
  `active`, `disabled`, plus a `style` escape hatch).
- **`content.js`** keeps copy and list data out of the components.

### Responsive strategy

- Single breakpoint: `breakpoint.mobile = 1200`, read via `useIsMobile()`.
- **Desktop** — three-column grid: params · 3D cup · receipt.
- **Mobile / tablet** — a purpose-built stack: the 3D cup is `position: sticky` at
  the top (always visible while the params and summary scroll underneath), followed
  by the options, a compact price summary, and a condensed trust stat strip.
- Fluid sizing via `clamp()`.

### Interactions

- Drag-the-tape quantity selector (snapped steps, with volume discount tiers).
- Variant switch alters the 3D cup surface live (matte vs glossy clearcoat).
- Cup type / size / override chips re-recommend and re-price instantly; the receipt
  "scratches out" and rewrites changed values.
- Reviews carousel, ask-a-specialist inline form, logo upload shown as a pinned
  Polaroid, drag-to-rotate/tilt 3D cup with idle spin.

## The 3D cup

`public/cup-3d.js` is a self-contained `<cup-3d>` custom element (three.js). React
sets `el.cups = [spec]` and it redraws: a tapered `CylinderGeometry` body, a torus
rim, an inner wall for the interior colour, and a `<canvas>`-drawn texture for the
print (or an uploaded image). Matte/glossy switch the material; the camera distance
scales with cup height so all sizes fit; pointer drag spins and tilts it. It lazy-boots
its WebGL context only when scrolled into view.

## Notes

- Pricing/delivery/discounts are placeholder curves in `lib/pricing.js` — swap for real API calls.
- Built with HTML, CSS, JavaScript and Three.js. No backend.
