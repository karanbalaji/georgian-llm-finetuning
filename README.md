# Fine-Tune & Ship — Builder Series · Season 1

Welcome to **Fine-Tune & Ship**, an interactive prototype designed to demonstrate the end-to-end developer experience of optimizing and hosting LLMs using **Georgian's open-source LLM Fine-Tuning Toolkit** and **Render's cloud deployment blueprints**.

This codebase serves as a premium portfolio demonstration of the Lead AI Advocate case study, built to satisfy all requirements of the community scaling framework.

---

## 🚀 Key Features

*   **Floating Navigation Pill:** Sleek, responsive floating navigation bar that dynamically scales and increases background blur as the user scrolls.
*   **Dialog Registration Portal:** A client-side dialog system permitting builders to register for specific tracks (Support triage, Document summarizer, or custom use cases) and receive starter cloud vouchers.
*   **Mentor & Host Showcase:** Interactive grid cards introducing the engineers from Georgian AI Lab, Render infrastructure teams, and community ambassadors.
*   **Kickoff Agenda:** Time-blocked timeline breakdown of the event kickoff day schedule.
*   **Walkthrough Guide:** A tabbed instructions page (`/walkthrough`) detailing local quantization settings, hyperparameter inputs, code-block copying, troubleshooting strategies, and a one-click **"Deploy to Render"** trigger.
*   **Style Guide:** A dedicated style diagnostic page (`/style-guide`) confirming proper rendering of all design system components under dark/light themes.

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

First, ensure you have Node.js (v18+) installed. Clone the repository and install the dependencies:

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
The build process compiles static HTML files and routes (`/`, `/walkthrough`, `/style-guide`) with zero errors.
