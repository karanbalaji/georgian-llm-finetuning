# Interactive Case Study Prototype — Build Plan & Progress

This file tracks the build plan and progress for the "Fine-Tune & Ship" landing page and technical walkthrough prototype, built inside `georgian-case-study`.

The design language follows `/design.md` (extracted from georgian.io's live CSS tokens), featuring Satoshi for body text, Zodiak for italic serif heading accents, and custom glassmorphism and shadow styles.

## Progress

| # | Phase | Status | Progress |
|---|-------|--------|----------|
| 1 | [Scaffold & Design Token Integration](01-strategy.md) | done | 100% |
| 2 | [Episode Landing Page - Layout, Nav & Hero](03-prototype-spec.md) | done | 100% |
| 3 | [Episode Landing Page - Host Grid & Agenda](03-prototype-spec.md) | done | 100% |
| 4 | [Episode Landing Page - Resource Grid, Recap & CTA](03-prototype-spec.md) | done | 100% |
| 5 | [Technical Walkthrough Page - Layout & Steps](03-prototype-spec.md) | done | 100% |
| 6 | [Technical Walkthrough Page - Tabs & One-Click Deploy](03-prototype-spec.md) | done | 100% |
| 7 | [Verification, Build Check & Final Polish](04-deck-outline.md) | done | 100% |
| 8 | [Local-First Router Classifier (`/api/classify`, `RouterDemo`)](02-tactics.md) | done | 100% |
| 9 | [Real Hermes-3 LoRA Fine-Tune (MLX, Ollama)](../README.md#-fine-tuning-a-real-model-finetune) | done | 100% |
| 10 | [Render llama.cpp Inference Service + Deploy Button Fix](../render.yaml) | done | 100% |
| 11 | [Research Citation & Hardware Check Components](03-prototype-spec.md) | done | 100% |
| 12 | [GGUF Export Pipeline Fix & Hugging Face Upload](../finetune/scripts/export_gguf.sh) | done | 100% |
| 13 | [Landing Page Hero Redesign (two-column, trailer placeholder)](../src/app/page.tsx) | done | 100% |
| 14 | [Presentation Deck (`/pitch`), live in the Next.js app](04-deck-outline.md) | done | 100% |
| 15 | [Deck Consolidation (15→12 slides) + Custom Labeled Visuals](../src/components/pitch/visuals.tsx) | done | 100% |
| 16 | [Deck Content Audit vs. `case-study.md`: Added Core Audiences + Sharp Prioritization Slides](04-deck-outline.md) | done | 100% |
| 17 | [Brief-Questions Roadmap Slide + Interactive Quarterly Vision Timeline](../src/components/pitch/VisionTimeline.tsx) | done | 100% |
| 18 | [Timeline/Budget + Metrics Slide Rework (fixed title/table mismatch, real metric grouping)](../src/app/pitch/slides.tsx) | done | 100% |
| 19 | [Community Partnerships Strategy + Slide (co-hosting with existing Toronto AI communities)](01-strategy.md) | done | 100% |
| 20 | [Challenge Format Fix: In-Person Evening Events, Not an 8-Week-Long Event](02-tactics.md) | done | 100% |

**Overall: 100%** (weighted evenly across 20 phases)

## Status Legend

- `pending` — not started
- `in progress` — actively being worked
- `done` — completed and verified

## Verification Checks

- [x] All design tokens align with `/design.md`
- [x] Responsive layout for all page components
- [x] Glassmorphism blur, saturate, brightness layers work
- [x] Motion fade-up and staggered entrance transitions
- [x] `npm run build` runs and compiles clean
- [x] Router classifier verified via a live `/api/classify` call (real inference, not a fixture)
- [x] Hermes-3 fine-tune verified via both raw `llama-server` and Ollama's OpenAI-compatible endpoint
- [x] Fine-tuned GGUF uploaded to Hugging Face (`karanbalaji/hermes-3-support-triage`) and confirmed publicly downloadable
- [x] `render.yaml`'s new `hermes-triage-inference` service cross-checked against Render's Blueprint spec and llama.cpp server docs (YAML parse-validated locally; live deploy not yet triggered — requires a Render account)
- [x] `/pitch`'s slide transitions verified with a scripted click-through of all slides (checking rendered content per slide, not just that the counter/URL updated) — caught and fixed a real bug where `AnimatePresence` silently failed to swap slide content in this React 19.2 / Next 16 / Motion 12 combination; replaced with a remount-triggered `motion.div` animation instead
- [x] All 12 `/pitch` slides visually re-verified after consolidating 15→11 main slides — first pass used AI-generated images, which read as generic/unlabeled; replaced with hand-built React/SVG components carrying the actual content's real labels (org roles, pillar names, dollar amounts), reviewed individually per slide
- [x] Deck content checked line-by-line against `case-study.md`'s four explicit Part I questions — found two under-answered ("...and its core audiences", "what initiatives would you prioritize") despite `docs/01-strategy.md` already having the content written; added as two new slides rather than assuming existing slides implicitly covered them
- [x] Added a roadmap slide quoting the brief's four Part I questions verbatim, and replaced the static 90-day list with a click-through quarterly timeline (`VisionTimeline.tsx`) — verified the click interaction actually swaps content (not just a visual state change) via a scripted click on Q3 and confirming its distinct real content rendered
- [x] User flagged the Timeline & Budget and Year-1 Metrics slides as "doesn't make sense" — found real defects on inspection: the timeline's title ("Launch → Build → Judge → Ship") didn't match its own table's row labels, and "Ship" never appeared anywhere; the metrics slide split 8 items into two columns with no grouping logic. Fixed by adding an explicit Phase column matching the title verbatim, and regrouping metrics under the brief's own Objective language (talent magnet / thought leader / second-order outcomes) instead of position
- [x] Community Partnerships researched and verified as real before writing into the strategy doc or deck: confirmed AI Tinkerers Toronto (245-city network) and BUILD FUTURE (Toronto AI builder community, has run events at other companies' offices) are currently active via web search, and confirmed Luma's actual cross-calendar submission mechanism (not assumed) before citing it as "the mechanism" in both `01-strategy.md` and the new slide
- [x] User flagged confusion between the brief's "6–10 weeks" constraint and their vision of the actual event as one in-person, ~4hr, weekday-evening hands-on meetup — clarified via question rather than guessing: the 8-week span is the program (real fine-tune+deploy work needs more than one sitting), but Launch and Demo Day are each a single in-person evening bookending a self-directed build window. Fixed every "kickoff livestream" reference across `02-tactics.md`, `01-strategy.md`, and the deck to say this explicitly, and connected both evenings to Community Partnerships as ready-made co-host nights
