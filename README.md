# Fine-Tune & Ship — Builder Series · Season 1

Welcome to **Fine-Tune & Ship**, an interactive prototype designed to demonstrate the end-to-end developer experience of optimizing and hosting LLMs using **Georgian's open-source LLM Fine-Tuning Toolkit** and **Render's cloud deployment blueprints**.

This codebase serves as a premium portfolio demonstration of the Lead AI Advocate case study, built to satisfy all requirements of the community scaling framework.

---

## 🚀 Key Features

*   **Floating Navigation Pill:** Sleek, responsive floating navigation bar that dynamically scales and increases background blur as the user scrolls.
*   **Dialog Registration Portal:** A client-side dialog system permitting builders to register for specific tracks (Support triage, Document summarizer, or custom use cases) and receive starter cloud vouchers.
*   **Mentor & Host Showcase:** Interactive grid cards introducing the engineers from Georgian AI Lab, Render infrastructure teams, and community ambassadors.
*   **Kickoff Agenda:** Time-blocked timeline breakdown of the event kickoff day schedule.
*   **Walkthrough Guide:** A tabbed instructions page (`/walkthrough`) detailing local quantization settings, hyperparameter inputs, code-block copying, troubleshooting strategies, a live in-browser test of a real classifier (not mocked), and a one-click **"Deploy to Render"** trigger.
*   **Live Router Classifier (`/api/classify`):** A small TF-IDF + logistic-regression model, trained on a labeled dataset (`src/data/router-dataset.json`), served from a real Next.js Route Handler — a working, self-contained demonstration of the "local model vs. frontier API" routing decision described in `docs/02-tactics.md`, citing the [Stanford study](https://scalingintelligence.stanford.edu/pubs/ipw/) on ChatGPT query routability. Zero additional runtime dependencies — pure TypeScript math, no ML framework, no GPU.
*   **Research Citation & Hardware Check:** A reusable `ResearchCitation` component grounds the Stanford routability claim with a real, visible citation everywhere it's referenced (landing page and walkthrough), instead of an unsourced assertion. `HardwareCheck` runs a genuine WebGPU adapter request (not a user-agent sniff) to tell visitors whether their own device could run a model like this fine-tune client-side.
*   **Style Guide:** A dedicated style diagnostic page (`/style-guide`) confirming proper rendering of all design system components under dark/light themes.
*   **Presentation Deck (`/pitch`):** A 15-slide (14 main + appendix), keyboard-navigable deck built from `docs/04-deck-outline.md`, presented live in this Next.js app rather than exported to a separate file — reuses this app's own design system, with `motion`-driven slide transitions, per-slide content stagger, and hand-built React/SVG visuals (`src/components/pitch/visuals.tsx`) carrying real labels from the actual content — an org wheel, a pillar→series map, a real-data budget chart — not decorative stock imagery.

---

## 🎨 Design System

All styling coordinates directly with the authoritative production tokens documented in `/design.md`:
*   **Primary Brand Blue:** `#2644d9` (`--color-primary`) for primary CTAs and interactive highlights.
*   **Georgian Gold:** `#e6c41a` (`--color-gold`) utilized exclusively for the highest-priority secondary actions (AI Report triggers).
*   **Typography:** loaded via Fontshare CDN:
    *   **Satoshi:** Primary sans-serif font for all standard layout UI and body copy.
    *   **Zodiak:** Serif font used strategically to render italicized accent words in display headlines.
*   **Glassmorphism:** Custom `.glass-panel` utilities applying layered blur, saturate, and contrast adjustments:
    ```css
    backdrop-filter: blur(16px) saturate(1.5) brightness(1.2) contrast(1.1);
    ```
*   **Neutral Shadows:** Subtle, professional slate-tinted drop shadows supporting elevation tiers.

---

## 🛠️ Technology Stack

*   **Framework:** [Next.js 16.2](https://nextjs.org/) (App Router, static prerendering, Turbopack)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Components:** [Base UI](https://base-ui.com/) (`@base-ui/react`) for accessible primitives
*   **Animations:** [Motion](https://motion.dev/) (`motion/react`) for staggered grids and fade-in triggers
*   **Icons:** [Lucide React](https://lucide.dev/) (plus optimized inline SVGs for brand/social icons)

---

## 💻 Local Setup & Development

First, ensure you have Node.js (v20.9+) installed — see `.node-version`. Clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/karanbalaji/georgian-llm-finetuning.git
cd georgian-case-study

# Install packages
npm install
```

To run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the landing page, and [http://localhost:3000/walkthrough](http://localhost:3000/walkthrough) to view the documentation guide.

### Building for Production

Compile a production-optimized build and test TypeScript/linter integrations:

```bash
# Build the project
npm run build

# Run code formatting and linting
npm run lint
```
The build process compiles static routes (`/`, `/walkthrough`, `/style-guide`) plus the dynamic `/api/classify` route with zero errors.

To retrain the router classifier (e.g. after editing `src/data/router-dataset.json`):

```bash
npm run train:router
```
This regenerates `src/lib/router-model.json` and prints held-out accuracy — the model committed to the repo is not a fixture, it's a genuine training artifact.

---

## 🚀 Deploying to Render

This site itself is hosted on Vercel (https://georgian.karanbalaji.com/) — Render isn't needed to serve the marketing/demo pages. `render.yaml` at the repo root is a working [Render Blueprint](https://render.com/docs/blueprint-spec) that deploys exactly one service, the actual thing a workshop participant would replicate for their own fine-tune:

- **`hermes-triage-inference`** — the real fine-tuned model (`finetune/`, see below) served by [llama.cpp's official server image](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md), no GPU required. It auto-downloads the GGUF from Hugging Face at boot via `LLAMA_ARG_HF_REPO`/`LLAMA_ARG_HF_FILE` — no custom Dockerfile needed. This is what the walkthrough's Step 5 "Deploy to Render" button actually deploys: participants swap those two env vars to point the same blueprint at their own fine-tuned model instead of this repo's Hermes-3 support-triage reference.

To actually deploy: push this repo (or your own fork with your own fine-tune) to a GitHub remote, then in the Render dashboard choose **New → Blueprint** and point it at the repo — Render will pick up `render.yaml` automatically. This step requires a Render account and can't be done from this codebase alone.

## 🔧 Fine-tuning a real model (`finetune/`)

`finetune/` is a genuine, executed fine-tuning run — not a mockup of one — proving out the exact fine-tune → export → deploy loop this case study pitches. Base model [`mlx-community/Hermes-3-Llama-3.2-3B-4bit`](https://huggingface.co/mlx-community/Hermes-3-Llama-3.2-3B-4bit), LoRA-tuned with [MLX](https://github.com/ml-explore/mlx) on a support-ticket-triage dataset, fused, and exported to GGUF for CPU serving via `finetune/scripts/export_gguf.sh` — see `finetune/results/before_after.md` for real before/after examples and `finetune/results/train_log.txt` for the training run.
