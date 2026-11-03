# Design spec — Owner Health Check

Derived from the ui-ux-pro-max rule set (accessibility → touch → layout → type/color → motion).
Style: **calm minimal wellness** — soft neutral canvas, one white card, one teal accent.

## Tokens (`src/app/globals.css`, Tailwind v4 `@theme`)

Semantic tokens only — no raw hex in components.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-canvas` | `#f6f7f9` | `#0b1215` | page bg |
| `--color-surface` | `#ffffff` | `#131c20` | card |
| `--color-ink` | `#0f172a` | `#e6edf0` | primary text |
| `--color-muted` | `#5b6474` | `#9aa8b0` | secondary text (≥4.5:1 on surface) |
| `--color-line` | `#e5e7eb` | `#24323a` | borders, track |
| `--color-primary` | `#0f766e` (teal-700) | `#2dd4bf` | accent, progress, Yes |
| `--color-on-primary` | `#ffffff` | `#04201d` | text on primary |
| `--color-danger` | `#be123c` (rose-700) | `#fb7185` | weakness icon/accent |
| `--color-danger-soft` | `#fff1f2` | `#2a1419` | weakness card tint |

Dark mode via `prefers-color-scheme`. Font: **Plus Jakarta Sans** via `next/font/google`
(weights 400/500/600/700), `display: swap`. Icons: `lucide-react` only (no emoji).

## Layout

- `min-h-dvh`, centered column, `max-w-xl`, `px-4` gutters, mobile-first.
- One card (`rounded-3xl`, `border-line`, soft shadow `shadow-sm`), `p-6 sm:p-10`.
- Body text 16px+, line-height 1.6. Question text `text-2xl sm:text-3xl font-semibold`.

## Screens

**Intro** — small eyebrow "Health Check · Area 1", h1 "How healthy are your habits?",
one-line subtitle ("10 quick yes/no questions. Takes about a minute."), single primary
CTA "Start the check" (only one primary action per screen).

**Question**
- Top row: Back button (ghost, `ChevronLeft` + "Back", hidden/disabled on Q1) · "Question 3 of 10" (tabular numerals).
- Progress bar: `role="progressbar"` with aria-valuenow/max; fill animates via `transform: scaleX` (not width).
- Question as `h2`.
- Two large answer buttons side-by-side on ≥sm, stacked on mobile: min height 56px,
  gap ≥12px, `Check` icon + "Yes", `X` icon + "No". Both outline style; previously
  chosen answer shows selected state (`aria-pressed`). Visible focus ring (2px primary, offset 2).
- Keyboard: `Y` / `N` shortcuts answer, buttons fully tab-reachable.
- Question change: 200ms fade + 8px slide-up, ease-out; disabled under `prefers-reduced-motion`.

**Report**
- Score ring (SVG circle, stroke-dashoffset) with large `7/10` in the middle + verdict label.
  Ring color = primary; meaning also stated in text (not color-only).
- Heading "Weaknesses (N)" then cards in question order: rose-tinted card, `AlertTriangle`
  icon, question text (semibold), impact sentence (muted). Cards stagger in 40ms each.
- All-Yes: `ShieldCheck` icon + "No weaknesses found — keep it up."
- Footer: secondary "Retake the check" button (`RotateCcw`).
- Screen reader: score announced via the heading text, e.g. "Your score: 7 out of 10".

## Accessibility checklist

Contrast ≥4.5:1, focus visible, 44px+ targets, heading order h1→h2→h3, `lang="en"`,
`aria-live="polite"` region announcing question changes, reduced-motion respected.
