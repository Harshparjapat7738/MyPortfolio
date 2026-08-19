# Design Specification — Portfolio Visual Language

Derived from live inspection of the reference site's rendered HTML, computed
inline styles, and shipped CSS/JS (Next.js + Tailwind v4). Content, images,
copy, and personal info are **excluded** — this captures only the design
system to reproduce with original content.

---

## 1. Page Structure & Section Order
Single-page scroller, one `<main>`, sections stacked full-width, alternating
background bands:

1. `#home` (Hero) — bg-primary
2. `#about` — bg-secondary
3. `#experience` (Timeline) — bg-primary
4. `#skills` — bg-secondary
5. `#projects` — bg-primary
6. `#education` (+ certifications) — bg-secondary
7. `#recommendations` (testimonial carousel) — bg-primary
8. `#contact` (info + form) — bg-secondary
9. `<footer>` — bg-primary

Pattern: **primary/secondary background alternates every section**, giving
visual rhythm without hard dividers (borders only on footer top).

Fixed overlay chrome (not in flow): header buttons (top-right), dot side-nav
(right-center, desktop only), scroll-to-top button (bottom-right, appears on
scroll), toast notification (bottom-right / top-center on mobile).

---

## 2–3. Color Palette / Backgrounds
CSS custom properties, theme-switchable via `[data-theme]` attribute (dark is
default):

| Token | Light | Dark |
|---|---|---|
| `--bg-primary` | `#ffffff` | `#0a0a0a` |
| `--bg-secondary` | `#f3f4f6` | `#1a1a1a` |
| `--text-primary` | `#111827` | `#f1f5f9` |
| `--text-secondary` | `#6b7280` | `#94a3b8` |
| `--accent` | `#3b82f6` | `#3b82f6` |
| `--accent-hover` | `#2563eb` | `#60a5fa` |
| `--card-bg` | `#ffffff` | `#1a1a1a` |
| `--card-bg-secondary` | `#f9fafb` | `#252525` |
| `--border` | `#e5e7eb` | `#2a2a2a` |
| `--shadow` | `0 4px 6px rgba(0,0,0,.05)` | `0 4px 6px rgba(0,0,0,.3)` |
| `--shadow-lg` | `0 10px 25px rgba(0,0,0,.08)` | `0 10px 25px rgba(0,0,0,.5)` |

One accent color only (blue), used consistently for links, headings, glow
effects, icons, timeline, avatar-initial badges. No secondary/tertiary brand
colors — palette is grayscale + single accent, theme-toggle swaps
light↔dark neutrals while accent stays constant.

Hero has a soft **radial-gradient blue glow** behind the profile photo
(`rgba(accent,0.6)→0.3→transparent`, `blur(50px)`, pulsing).

---

## 4–6. Typography & Heading Hierarchy
- **Font:** Inter (variable weight 100–900), system fallback stack.
- Section H2: `font-size:2.5rem` (clamp on some: `clamp(1.8rem,4vw,2.5rem)`),
  `font-weight:700`, colored with `--accent` (not text-primary — headings are
  accent-tinted, a distinctive signature).
- H3 (sub-headers, card titles): `1.3–1.5rem`, `700`.
- H4 (role/org labels): `1.1rem`, `500`.
- Hero name (H1): `clamp(2rem,5vw,4rem)`, `700`, `line-height:1.1`.
- Every section subtitle paragraph under the H2: `1rem`, `--text-secondary`,
  often with a trailing emoji (💪🛠️🎓📬🌟).

## 7. Body Text
- Paragraphs: `1.05rem`, `line-height:1.7–1.8`, `--text-secondary` color —
  body copy is deliberately *not* full-contrast, keeps text secondary to
  headings/accent.

---

## 8. Buttons
- Primary (filled): `background:accent; color:#fff; border-radius:12px;
  padding:0.9rem 2rem; font-weight:500`.
- Secondary (outline): `transparent bg; 2px solid border; border-radius:12px;
  font-weight:600`.
- Pill/tag toggle buttons (skills filter): smaller radius `8px`,
  `padding:0.6rem 1.3rem`, active = filled accent, inactive = transparent +
  border.
- Icon-only buttons (theme toggle, scroll-top): `44×44px`, `border-radius:12px`,
  card-bg + border + shadow.
- All buttons: `transition: all 0.3s ease`.

## 9. Border Radius Scale
Consistent, no sharp corners anywhere:
- Large containers/cards: `16px`–`20px`
- Buttons/inputs: `12px`
- Small pills/tags/badges: `8px`, or fully round `20px`/`50%` for chip tags
- Icon tiles: `12px`
- Avatars/dots: `50%`

## 10. Cards
Every content block (experience, skill, project, education, certification,
testimonial, contact form) is a **card**: `background:var(--card-bg);
border:1px solid var(--border); border-radius:16px (20px for form/testimonial);
box-shadow:var(--shadow); transition: all .3s ease`. No gradients on cards —
flat fill + hairline border + soft shadow is the entire card language.

## 11. Shadows / Glows
- Cards/buttons: subtle `--shadow` (barely visible, mostly for dark-mode
  depth).
- Hero photo: colored glow shadow using accent at low opacity
  (`0 20px 60px rgba(accent,.5), 0 0 40px rgba(accent,.3)`) + separate blurred
  radial-gradient halo behind it, pulsing via `animate-pulse-glow` (3s
  ease-in-out infinite, scale 1↔1.1, opacity .4↔.8).
- Form card / testimonial card: `--shadow-lg` for extra lift.

---

## 12. Navigation / Header
No traditional navbar/logo-left-links-right pattern. Instead:
- **Top-right floating buttons**: Resume (link button) + theme toggle
  (sun/moon icon), `position:fixed`, semi-transparent card styling.
- **Right-center dot nav** (desktop only, hidden on mobile, no
  replacement/hamburger): vertical stack of small circular buttons, one per
  section, active dot larger + full opacity + accent color, inactive dots
  muted/半-opacity — a minimalist scroll-spy indicator, not a text menu.
- **Scroll-to-top button**: bottom-right fixed, fades in/out based on scroll
  position (opacity/visibility toggle, not display).

## 13–15. Animations / Scroll Animations / Hover
- Sections start `opacity:0`, and get class `.fade-in` (via
  `IntersectionObserver`) triggering `fadeInUp` keyframe (`translateY(40px)→0`,
  `opacity 0→1`, `.8s ease-out`) — **reveal-on-scroll for every section**,
  once per section as it enters viewport.
- Hero role text rotates through multiple titles on an interval
  (`setInterval`, swapped in place, fixed-height container to avoid layout
  shift).
- Hero photo is a **3D flip card** (`perspective`, `transform-style:preserve-3d`,
  `rotateY`, `backface-visibility:hidden`) — front/back image swap on
  interaction, `1.5s ease-in-out` transform.
- Global hover convention: cards/buttons get `transition:all .3s ease`, with
  hover states lifting shadow/border/color (translateY or border-color shift
  implied by transition-all + hover selectors in JS-driven inline styles).

## 16. Project Card Interaction
- Image on top (fixed height crop, `object-fit:cover`), content below.
- Image has its own `transition:transform .3s ease` — scales up slightly on
  card hover (classic image-zoom-in-card hover).
- Tag chips (tech stack) below description, small rounded-8px badges.
- Row of text links with emoji prefixes (🔗 GitHub, 📁 Screenshots, 📄
  Publication) instead of icon buttons — accent-colored, no underline.

## 17. Skills Section Behavior
- Category filter pills at top (Frontend/Backend/DevOps/Database/etc.),
  single active state (filled accent), rest outlined — client-side filter,
  no page reload.
- Grid of icon-tile cards (`auto-fit, minmax(140px,1fr)`): square icon tile
  (accent-tinted translucent bg `accent10` + colored line icon) above a
  label, centered text, uniform card style matching global card language.
- Secondary "all skills" chip cloud below the grid (rounded-pill tags,
  card-bg fill) — a flat list overflow for tools not in the icon grid.

## 18. Timeline / Experience Presentation
- Vertical line (`3px`, accent @ 0.5 opacity) running down the left,
  connecting circular dots (`20px`, accent fill, ring border matching page bg)
  at each entry.
- Each entry is a card offset to the right of its dot (`margin-left:2rem`),
  standard card style, containing: date range (small, accent, bold) → role
  (H3) → org (H4, secondary) → description paragraph.
- Collapses to a plain stacked-card list on mobile (line/dots hidden entirely,
  no reduced-timeline fallback).

## 19. Contact Section
- Two-column: left = info column (intro text + icon-tile contact rows:
  email w/ copy-to-clipboard button, location), right = card-framed form
  (`shadow-lg`, `20px` radius).
- Form: labeled inputs, `bg-secondary` fill, `12px` radius, 2-col grid for
  name/email, full-width subject/message, full-width submit button (accent
  fill, icon + label).
- Success/error feedback via a toast notification (fixed position, slides
  in bottom-right desktop / top-center mobile).

## 20. Footer
- Two-column (`2fr 1fr`): brand name (accent H3) + tagline lines + italic
  "built by" credit line on the left; row of square icon-tile social links
  (GitHub etc., `44px`, `12px` radius, card-bg + border) right-aligned.
- Top border hairline separates from page; background matches primary.

---

## 21–22. Responsive Behavior / Mobile Nav
Single breakpoint at `768px` (mobile) / `769px` (desktop), heavy use of
`!important` overrides at that breakpoint:
- Hero grid → single column, photo reorders **above** or below text
  (photo order:2, stacks under intro on mobile), centered text alignment.
- Side dot-nav and timeline line/dots **fully hidden** on mobile — no
  hamburger/drawer replacement, navigation is scroll-only.
- All multi-column grids (projects, skills, certifications, footer,
  form name/email) collapse to `1fr`.
- Section padding shrinks (e.g. `4rem 2rem` → `3rem 1rem` / `6rem 1rem 2rem`
  for hero to clear fixed header buttons).
- Heading sizes step down via fixed overrides (`h2` → `2rem`, `h3` →
  `1.3rem`) layered on top of the `clamp()` fluid sizing already in place.
- Toast notification repositions from bottom-right corner to centered top.

## 23. Spacing System
Loose, generous, rem-based, roughly on an 0.5rem rhythm:
- Section vertical padding: `3rem–4rem` (`2rem` horizontal), hero taller
  (`8rem` top to clear fixed buttons).
- Card padding: `1.5rem` (compact/cert cards) → `2.5rem` (experience/
  education/contact-form cards).
- Section header block: title + subtitle, `margin-bottom:3rem–4rem` before
  content grid.
- Grids use `gap:1.5rem–3rem` depending on density.
- Max-width containers per section: `1000px`–`1200px`, centered.

## 24. Overall Visual Personality
Calm, minimal, developer-portfolio aesthetic: **dark-mode-first**, near-black
neutrals, one confident blue accent, generous whitespace, soft rounded
corners everywhere (no sharp edges), flat cards with hairline borders instead
of heavy shadows, subtle motion (fade-up reveals, glow pulse, 3D photo flip,
rotating role text) rather than flashy effects. Emoji used sparingly as
section-subtitle punctuation, not decoration overload. Reads as
"quietly polished engineer" rather than "designer flashy" — restraint over
ornamentation, consistency (same radius/shadow/spacing tokens reused
everywhere) over novelty per-section.

---

## Reusable Design Tokens Summary

```css
--radius-lg: 16px–20px      /* cards, containers */
--radius-md: 12px           /* buttons, inputs, icon tiles */
--radius-sm: 8px            /* small pills/tags */
--radius-pill: 20px / 50%   /* chips, avatars, dots */
--transition-standard: all 0.3s ease
--transition-reveal: opacity .6s ease-out, transform .6s ease-out (fadeInUp .8s on scroll-in)
--font-family: Inter, system fallback
--accent: #3b82f6 (constant across themes)
```

Theme is toggled by swapping a `data-theme` attribute at the root and letting
every color reference flow through CSS variables — no component-level
light/dark branching needed.
