# Part II — Tactics & Execution: "Fine-Tune & Ship" with Render

## Why Render

The brief names five eligible companies: Render, Replit, You.com, Island, ClickUp. Replit and You.com are the obvious picks — both are AI-native companies where a fine-tuning toolkit is an easy, direct fit. That's exactly the risk: on a panel that sees multiple candidates, "I picked the AI company for the AI toolkit" is the least differentiated answer available.

**Render is the deliberate, sharper choice.** Georgian's LLM fine-tuning toolkit only tells half the lifecycle story — fine-tune a model, and then what? You have to deploy and serve it. Render's entire business *is* that second half: cloud hosting and deployment, increasingly for AI/inference workloads. The program's narrative becomes "fine-tuning is only half the job — here's the deploy/serve half," which:

- gives Georgian AI Lab's toolkit a genuine end-to-end story instead of a standalone demo
- targets a real, current Render hiring need: platform/infra engineers being pulled into AI-adjacent work, not just LLM researchers
- differentiates the pitch from whatever the "obvious pick" candidates present

## Program Concept

**"Fine-Tune & Ship" — a Builder Series episode, Season 1.**

A build challenge, not a workshop series or a single AMA. The format decision matters: a workshop proves attendance, an AMA proves reach, but a build challenge proves *skill* — Render sees actual working code and deployed services, which is a categorically better talent signal than a resume or a webinar sign-up sheet. It also produces real content: every submission is a case study Georgian and Render can both point to afterward.

Participants fine-tune a model using Georgian's open-source [LLM Fine-Tuning Toolkit](https://github.com/georgian-io/LLM-Finetuning-Toolkit), then deploy and serve it on Render. Judging rewards not just "did you fine-tune something" but "did you actually productionize it well" — that's the Render-specific bar that separates this from a generic hackathon.

### The Flagship Track: The Local-First Router

This track is grounded in a specific, citable finding, not a hunch: a [Stanford study](https://scalingintelligence.stanford.edu/pubs/ipw/) found that **71.3% of real-world ChatGPT queries could be accurately answered by a small, local model** instead of a frontier API — a figure [Hugging Face CEO Clement Delangue has pointed to](https://x.com/ClementDelangue/status/2071951499660292496?s=20) as a concrete rationale for local-first AI. Georgian's toolkit exists to make that 71.3% cheap, fast, and private, instead of routing everything through an expensive frontier API by default. This also frames the constraint above correctly: it isn't a limitation, it's the toolkit's core pitch — a small model fine-tuned on your data beats calling a frontier API on cost, latency, and privacy for narrow tasks.

Participants build and fine-tune a small classifier — using Georgian's toolkit — that inspects an incoming query and routes it: answered locally by a small fine-tuned model served on Render's standard (no-GPU) infrastructure, or forwarded to a frontier API only when the query genuinely needs one. Judging rewards:

1. Does the router's routing decision hold up against a held-out labeled set?
2. Is the "local" path actually served on Render — not simulated?
3. Is the cost/latency delta versus an all-frontier baseline measured and shown, not just asserted?

The prototype site itself ships a working, zero-GPU reference implementation of this exact pattern — see `/walkthrough`, Step 6 — a live classifier endpoint participants can test before building their own.

Participants can adapt the router to their own domain (support tickets, internal docs, code review) — same routing pattern, different training data — or bring an entirely different use case; the flagship track is scaffolding, not a wall.

## Distribution & Talent Sourcing

The brief's second goal is attracting *top-tier* talent, so how people find the challenge matters as much as what happens inside it:

- **TL + Luma** — announcement to the existing 1,000+ member base, with Luma's city-targeted discovery doing free geographic reach
- **Ambassadors** — amplification through their local networks (this is also the ambassador program's first real test)
- **Vector Institute + university ML groups** — the brief's academic channel, aimed at grad students and research engineers
- **Render's own channels** — community/changelog/social, reaching infra engineers who already like Render
- **Targeted outreach** — direct invitations to contributors of the fine-tuning toolkit and adjacent OSS repos: people who've already demonstrated exactly the skill profile Render wants

**Quality filter, deliberately light-touch:** registration asks for a GitHub/portfolio link (signal without gatekeeping), and the in-person kickoff evening itself acts as a self-selection gate — people who show up on a weeknight and still register are the ones who'll actually build.

## Timeline (8 weeks, within the 6–10 week window)

The 6–10 week window is the *program's* span — a real fine-tune-and-deploy isn't a one-sitting task. But the actual **events** are two single evenings that bookend a self-directed build period, not an 8-week-long event: Kickoff (Week 1) and Demo Day (Week 8), each in-person at Georgian's Toronto office, ~4 hours, weekday evening after 6pm — exactly the hands-on-builder-meetup format Toronto's AI communities already run (see Community Partnerships in `01-strategy.md`), and a natural first co-host night for one of them.

| Week | Milestone |
|---|---|
| 1 | **Launch.** In-person kickoff at Georgian's Toronto office — one evening, ~4 hours after 6pm. Hands-on: a Georgian AI Lab engineer and a Render engineer walk the room through the fine-tuning toolkit → Render deploy pipeline live, not just talk about it. Streamed for remote reach, but the room is the primary experience. This session doubles as the technical walkthrough content participants reference for the rest of the challenge. |
| 2–6 | **Build window.** Self-directed — participants fine-tune and deploy on their own time and their own machines/cloud, not at a single event. Office hours + Discord support staffed jointly by Georgian AI Lab and Render engineers. Submissions close end of week 6. |
| 7 | **Judging.** Georgian AI Lab + Render engineers score against the rubric below. |
| 8 | **Demo Day.** In-person at Georgian's Toronto office — one evening, ~4 hours, live showcase (streamed for remote reach), winners announced, recap video and photo gallery published, participants prompted to share their builds (tagging Georgian + Render) for their own visibility. Top performers get fast-tracked into Render's interview pipeline — the direct talent outcome. |

## Budget ($10,000 cap)

| Line item | Amount | Notes |
|---|---|---|
| Render compute/deploy credits for participants | $4,000 | Seed credits per participant/team so cost isn't a barrier to entry |
| Prizes | $2,500 | 1st / 2nd / 3rd + a "best use case" wildcard, split so creativity is rewarded alongside technical polish |
| Demo Day production | $2,000 | Venue, food, recording, photography — feeds the recap/gallery |
| Promo & swag | $1,000 | Launch push, participant swag |
| Buffer | $500 | |

## Judging Rubric

1. **Technical execution** — does the fine-tuned model actually work as intended
2. **Creativity of use case** — is the problem chosen interesting, not just a tutorial rerun
3. **Deployment quality** — the Render-specific differentiator: is the model properly served, not just running locally and screen-recorded

## Program Success Metrics

How we'd know it worked, mapped to the program's two stated goals:

**Toolkit promotion:**
- Toolkit adoption movement during the challenge window — GitHub stars, forks, clones, and issues opened by participants
- Content output: kickoff and Demo Day recording/recap views, participant posts tagging Georgian + Render

**Talent engagement:**
- Registrations, and registration → submission conversion (the honest measure of engagement depth)
- Number of deployed, working submissions
- Fast-track interviews and hires signalled by Render — the single most important number
- Demo Day attendance and NPS

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Low signups | Ambassador + Render channel push in week 1–2; extend registration into the build window if needed (rolling starts are fine for a 4-week build) |
| Mid-challenge drop-off | Weekly office-hours cadence, Discord nudges, and an explicit "ship something small" framing — a deployed tiny model beats an abandoned ambitious one |
| Low submission quality | The starter tracks + kickoff walkthrough are the scaffolding; office hours catch people before they stall |
| Judging load on AI Lab/Render engineers | Rubric-based scoring with a shortlisting pass so full review effort only goes to the top submissions |

## How This Plugs Into Part I

This is the concrete, working example of "Season 1, Builder Series" from the strategy doc — not a hypothetical program layered on top of it. It's designed to be a repeatable template: the same 8-week shape (in-person kickoff evening → self-directed build window with office hours → judging → in-person Demo Day evening) could run again with a different portfolio company and toolkit in a later Builder Series episode, without reinventing the format each time.
