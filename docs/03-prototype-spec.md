# Prototype Spec — "Fine-Tune & Ship" Landing Page + Walkthrough

This is a wireframe-level spec for the interactive prototype to be built as the next step after this doc is reviewed. It's structurally modeled on a proven pattern from prior work (ClawBuilders.club's episode pages — Season/Episode tag, hero with badge pills, host grid, agenda, resource grid, tabbed technical walkthrough, closing social CTA), but **re-skinned entirely in Georgian's actual brand system**, not ClawBuilders' dark sci-fi theme. Two pages: an episode landing page, and a separate technical walkthrough page.

## Visual System (source of truth: `/design.md`)

All tokens live in the root **`design.md`**, extracted directly from georgian.io's live production CSS — not approximated from screenshots. Key values for quick reference:

- **Primary Blue** `#2644d9` — buttons, links, italic hero accents
- **Primary Mid** `#334dcc` — used only for blue-tinted shadow/ring layers at low opacity
- **Dark Navy** `#19224d` — headings; **Body** `#292c3d`
- **Gold** `#e6c41a` — the single highest-priority secondary CTA per page, never large fills
- **Background gradient** `linear-gradient(180deg, #d7daea 0%, #ffffff 80vh)`
- **Typography**: **Satoshi** (sans, everything) + **Zodiak** (italic serif accent words inside headlines, matching georgian.io's "Engineering Growth *Together*" pattern), both via Fontshare CDN; mono for command blocks
- **Buttons**: pill-shaped, primary blue filled; gold filled for the one high-contrast secondary CTA
- **Cards**: `1rem` radius, blue-tinted layered shadows (never plain gray)
- **Glass panels**: `backdrop-filter: blur(16px) saturate(1.5) brightness(1.2) contrast(1.1)` — the layered recipe, not a flat blur

This is a light, professional theme — a deliberate contrast to ClawBuilders' dark/neon aesthetic, because this is a Georgian-branded program, not a standalone community brand.

## Page 1: Episode Landing Page

**Top nav:** Georgian logo/wordmark, links (Events, Toolkit, Contact), "Builder Series · S1" tag pill, "Supported by Render" mark.

**Hero section:**
- Eyebrow tag: `BUILDER SERIES · SEASON 1 · EPISODE [N]`
- Title: "Fine-Tune & Ship" with an italicized accent word (Zodiak) echoing the georgian.io headline pattern
- One-paragraph description: what the challenge is, in plain language
- Badge pills: "Free Render Credits", "Team size: 1–3", "Any base model works"
- Dual CTA: primary blue "Register Now" button + outline "View Walkthrough" button
- Insider-tip callout box (glass panel): a genuinely useful tip, e.g. "The more specific your fine-tuning dataset, the better your deploy story — pick a narrow use case, not a general assistant."
- Date/format bar: kickoff date, virtual + Toronto in-person option, duration

**Behind the Episode:** grid of host/co-host glass-panel cards — a Georgian AI Lab engineer, a Render engineer, and (optionally) a Transferred Learnings Ambassador co-host. Each card: avatar, name, role tag, LinkedIn link.

**Supported by:** logo row — Georgian, Render, Vector Institute if involved.

**Agenda:** four time-blocked cards for kickoff day (mirroring the reference's Check-in / Hands-On / Demos / Wind-down structure), adapted: e.g. Kickoff & Intros → Toolkit Walkthrough → Render Deploy Demo → Q&A / Office Hours signup.

**The Toolkit & Ecosystem:** resource grid, same card pattern as the reference's tool grid — each card: name, category tag, one-line description, sign-up/docs link. Cards: Georgian LLM Fine-Tuning Toolkit (GitHub), Render (deploy docs + credits), a couple of base model options (e.g. an open-weights model), an eval/benchmarking tool.

**Show-us-what-you-built CTA (bottom):** "Launch something. Tag us for a reshare." — Post on LinkedIn / Post on X / Share in Discord buttons. This is the direct mechanism for the visibility goal raised during brainstorming: participants get a reason and a ready-made moment to post their work, which extends reach for free.

**Recap/Gallery (styled mockup):** a photo-grid section and a video-embed slot, populated with realistic placeholder content and labeled clearly as a preview of what will populate after Demo Day — not a functional upload widget, since the event is hypothetical. This lets the panel see the full lifecycle of the page without building unnecessary backend functionality for a prototype.

## Page 2: Technical Walkthrough

- **Tabbed paths** at the top: "Quickstart" / "Advanced — bring your own model" (mirrors the reference's Chat First / CLI Setup / Advanced pattern, adapted to two paths since the toolkit's actual entry points are narrower than the reference's multi-tool ecosystem)
- **Numbered steps**, each in a glass-panel card with a copy-pasteable command block:
  1. Clone the toolkit and install dependencies
  2. Point it at a base model + your dataset
  3. Run the fine-tuning job
  4. Push the resulting model to Render
  5. Deploy — including a literal embedded **"Deploy to Render" button** (Render's actual one-click deploy integration) as the hero technical moment of the page
  6. Verify the deployed endpoint
- **Troubleshooting** — collapsible section for common failure points
- **Resources list** at the bottom: toolkit GitHub, toolkit docs, Render deploy docs, base model links

## Build Notes (historical — from before the prototype existed)

These notes described the *planned* build before anything existed. Left here for context; where reality diverged, that's noted inline rather than silently deleted.

- **The scaffold already exists at the repo root**: Next.js 16 (App Router, TypeScript, Tailwind v4) + shadcn/ui with theme tokens remapped to the Georgian palette, Motion installed for animation, Satoshi/Zodiak wired via Fontshare, and a live `/style-guide` page verifying the whole system (`npm run build` passes; `npm run dev` → `localhost:3000/style-guide`).
- Available shadcn components: `button`, `card`, `badge`, `tabs`, `avatar`, `separator`, `dialog`. Custom utilities in `globals.css`: `glass-panel`, `glass-panel-strong`, `shadow-primary-sm/md/ring`, `bg-hero-gradient`.
- Motion usage per `/design.md`: fade + slight upward slide on section entrance, 40–60ms staggered grid reveals, subtle hover lift — polish, not spectacle.
- ~~No real backend needed~~ — superseded: the prototype grew a real backend (`/api/classify`, a genuine trained logistic-regression classifier) and a real deployment target (`render.yaml`'s `hermes-triage-inference` llama.cpp service), because a panel doing live technical scrutiny is a different bar than a presentation mockup. The Recap/Gallery section is still a styled placeholder, since that content only exists after a real Demo Day.
- Build as a real, clickable prototype (not mockup images), since the demo is walked through live in the panel session.
- ~~Verify the walkthrough page's commands against the actual LLM-Finetuning-Toolkit README~~ — superseded: rather than only checking commands against the toolkit's docs, `finetune/` actually runs the fine-tune → export → serve loop end to end (MLX LoRA, not the toolkit's own CLI, but the same underlying workflow the toolkit automates) — see `finetune/results/` for the real training log and before/after output, and `README.md#-fine-tuning-a-real-model-finetune`.
