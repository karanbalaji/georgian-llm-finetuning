# Design System — Georgian Brand (verified)

This is the authoritative design reference for the "Fine-Tune & Ship" prototype. Every token below was extracted directly from georgian.io's live production CSS (`https://georgian.io/_next/static/chunks/*.css`), not eyeballed from a screenshot. It supersedes `../events/design.md`, which was built from an older/different project and has since drifted from Georgian's actual brand (it lists `#2563eb` and Outfit/Inter/Cormorant Garamond — neither matches the real site).

## Colors

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#2644d9` | Primary brand blue — buttons, links, italic hero accents, testimonial backgrounds |
| `--color-primary-mid` | `#334dcc` | Used specifically for shadow/ring tints at low opacity, not as a flat fill |
| `--color-navy` | `#19224d` | Headings, high-emphasis text |
| `--color-body` | `#292c3d` | Default body text |
| `--color-gold` | `#e6c41a` | Accent — icon highlights, secondary CTA emphasis. Used sparingly, never as a large fill |
| `--color-muted` | `#666e99` | Secondary text |
| `--color-muted-2` | `#52587a` | Tertiary text / captions |
| `--color-subtle` | `#7b819d` | Placeholder text, disabled states |
| `--color-border` | `#d7daea` | Default border |
| `--color-border-light` | `#e0e2eb` | Lighter border, on-white contexts |
| `--color-surface-1` | `#f0f1f5` | Light surface fill |
| `--color-surface-2` | `#f6f7fe` | Alternate light surface, slight blue cast |
| `--color-surface-3` | `#f7f8fc` | Page background base |
| `--color-surface-4` | `#f9f9fb` | Card background on white pages |
| `--color-white` | `#ffffff` | |
| `--color-error` | `#ff6b6b` | Form errors only |

Opacity-suffixed variants appear constantly in the real CSS (e.g. `#334dcc66`, `#19224d1a`, `#ffffff80`) — treat every color above as available at reduced alpha for shadows, overlays, and hover states, not just as flat fills. Prefer `color-mix()` or Tailwind's `/opacity` modifier (`bg-primary/10`) over hardcoding new hex+alpha pairs.

**Background gradient** (page-level, used for hero/section backgrounds):
```css
background: linear-gradient(180deg, #d7daea 0%, #ffffff 80vh);
```
Variants seen: `#d7daea 0%, #f1f1f4 80vh`, `#d7daea 0%, #f4f4f6 72vh, #fff 100%` — pick one per page, don't mix.

## Typography

Real values, from the site's own CSS custom properties:

```css
--font-sans: var(--font-satoshi);   /* body, UI, default */
--font-accent: var(--font-zodiak);  /* italic accent words in headlines */
--font-display: var(--font-zodiak); /* same family, used for display/serif moments */
--font-mono: "Monaco", "Menlo", "Courier New", monospace;
```

- **Satoshi** — sans-serif, primary font for everything: nav, body copy, buttons, cards. Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Zodiak** — serif, used narrowly and deliberately: an italicized word or short phrase inside an otherwise sans-serif headline (e.g. georgian.io's "Engineering Growth *Together*"). Don't set full paragraphs in it. Fallback: `Georgia, "Times New Roman", serif`.
- **Mono** — for code snippets, data/numeric values, terminal-style content (relevant for the technical walkthrough page's copy-pasteable commands).

Both Satoshi and Zodiak are free fonts distributed by **Fontshare** — load via `https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&f[]=zodiak@400,500&display=swap` rather than sourcing elsewhere or assuming Google Fonts availability (they're not on Google Fonts).

**Weights:** the real site uses 400–700 throughout, with 500–600 the most common for buttons, nav items, and emphasized text. Avoid going below 400 or above 700 — the brand doesn't use hairline or black weights.

## Radius

- `1rem` (16px) — the dominant card radius. Default for panels, cards, resource tiles.
- `100%` / pill (`9999px`) — buttons, avatars, tag pills, the floating nav bar
- `.5rem`–`.75rem` — tight elements: small badges, inline chips, form inputs

## Shadows

Never plain gray. Shadows are tinted with the primary blue at low opacity, and often layered (2–3 shadows stacked):

```css
/* card hover */
box-shadow: 0 4px 20px rgba(51, 77, 204, 0.4), 0 8px 40px rgba(51, 77, 204, 0.2);

/* button focus ring */
box-shadow: 0 0 0 3px rgba(51, 77, 204, 0.1), 0 4px 16px rgba(51, 77, 204, 0.2);

/* subtle resting elevation */
box-shadow: 0 2px 10px rgba(51, 77, 204, 0.4);
```

## Glassmorphism

The signature effect on nav bars, floating panels, and hero overlays. It's not a flat `blur()` — real usage layers `blur` with `saturate`, `brightness`, and `contrast`:

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(1.5) brightness(1.2) contrast(1.1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    0 24px 24px -16px rgba(15, 19, 36, 0.2);
}
```
Heavier variants (`blur(40px) saturate(180%) brightness(1.5)`) appear on prominent floating elements like the nav pill — reserve the strongest blur for the highest-priority chrome, not every card.

## Buttons

- **Primary**: filled `--color-primary` (`#2644d9`), white text, pill radius, colored shadow on hover (see Shadows above)
- **Secondary / gold**: filled `--color-gold` (`#e6c41a`), dark navy text — used for the single highest-priority secondary CTA on a page (e.g. "AI Report" on georgian.io), not for routine secondary actions
- **Outline / light**: transparent or `rgba(255,255,255,0.85)` background, subtle border, used inside dark or glass contexts

## Motion

Use the [Motion](https://motion.dev) library (`motion/react` — the current, actively maintained successor to Framer Motion). Animation should read as **polish, not spectacle** — this is a professional VC-brand site.

- **Section entrance**: fade + slight upward slide on scroll into view (`opacity 0→1`, `y: 16px→0`, ~0.4s ease-out), triggered once
- **Grid reveal**: staggered entrance for card grids (host cards, resource cards) — 40–60ms stagger between items, same fade/slide as above
- **Hover**: subtle lift on cards/buttons (`y: 0→-2px` with the tinted shadow from above growing slightly), never scale beyond ~1.02
- **Avoid**: parallax, bounce/spring easing, anything that delays content becoming readable, continuous/looping animation on primary content

## Notes for Implementation

- These tokens should be wired into `globals.css` as CSS custom properties and mapped into `tailwind.config`/shadcn's theme layer — don't hardcode hex values in components.
- `../events/design.md` remains as-is for the (separate) hackathon-brief project; do not merge or reconcile the two — they are different brands/products despite sharing the word "Georgian" in context.
