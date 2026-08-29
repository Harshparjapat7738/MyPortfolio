# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure
may all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` (resolved from this file's directory; in
monorepos the `next` package may not be visible from the repo root) before
writing any code. Heed deprecation notices.

Note: `next dev` auto-writes this same guidance into `AGENTS.md` on startup
(see `node_modules/next/dist/server/lib/generate-agent-files.js`). If that
file reappears after a dev-server run, that's expected — it's regenerated,
not hand-maintained; just let it be recommitted rather than fighting it.

---

## Content — source of truth

All portfolio copy (hero, about, experience, skills, projects, education,
contact, footer) lives in [lib/content.ts](lib/content.ts), consumed by the
matching components in [components/sections/](components/sections/). That
file is the only source of truth for content — don't add facts (companies,
dates, metrics, certifications, links) beyond what's already there or what
the user explicitly supplies; nothing is fabricated to fill out a layout.

Original planning docs (`PORTFOLIO_CONTENT.md`, based on the resume "HARSH
PARJAPAT — SOFTWARE ENGINEER | JAVA DEVELOPER") have been folded in and
removed — `lib/content.ts` has since diverged from them (skills, projects,
and links have all been added since), so it's the only place to check.

## Design system — source of truth

All design tokens (color, radius, shadow, spacing, motion) live in
[app/globals.css](app/globals.css) as CSS custom properties (`:root` for
light, `:root[data-theme="dark"]` override). Components consume them via
`var(--token)` rather than hardcoding values.

Design philosophy (still accurate, from the original `DESIGN_SPEC.md`):
- Single-page scroller, sections alternate `--bg-primary` / `--bg-secondary`
  bands for rhythm without hard dividers.
- One accent color only, used consistently for links, headings, icons,
  glows — no secondary/tertiary brand colors.
- Every content block is a **card**: flat fill + hairline `--border` +
  soft `--shadow-sm`/`--shadow-lg`, no gradients.
- Generous, consistent border-radius scale (`--radius-sm/md/lg/xl/full`) —
  no sharp corners anywhere.
- Motion is one shared vocabulary via `--ease-standard` (snappy
  hover/press/toggle feedback) and `--ease-premium` (slower expo-out for
  reveals/entrances) — not per-component timing choices.
- Restraint over ornamentation: subtle scroll-reveals and hover lifts
  rather than flashy effects.

Exact color values, section list, and breakpoints are **not** duplicated
here since they drift from the CSS as the site evolves — check
`app/globals.css` and `components/sections/*.module.css` directly rather
than trusting a written spec.
