import {
  SlideShell,
  SlideTitle,
  Accent,
  StatCallout,
  PillarCard,
  PrecedentCard,
  MiniTable,
  CheckList,
  CitationLink,
  NumberedList,
  NotDoingList,
} from "@/components/pitch/primitives";
import {
  GrowthVisual,
  PillarSeriesFlow,
  ResourcingWheel,
  RenderPipeline,
  BudgetChart,
  Flywheel,
} from "@/components/pitch/visuals";
import { VisionTimeline } from "@/components/pitch/VisionTimeline";

const STANFORD_URL = "https://scalingintelligence.stanford.edu/pubs/ipw/";
const HF_URL = "https://huggingface.co/karanbalaji/hermes-3-support-triage";
const DELANGUE_URL = "https://x.com/ClementDelangue/status/2071951499660292496?s=20";

export const slides = [
  // 1 — Title
  <SlideShell key="title" eyebrow="Georgian.io · Lead AI Advocate Case Study" center>
    <span className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
      Transferred Learnings · Season 1
    </span>
    <h1 className="text-7xl sm:text-8xl font-bold text-navy tracking-tight leading-[1.05]">
      Genuinely technical.
      <br />
      Genuinely a{" "}
      <span className="font-accent italic font-normal text-primary">community</span> builder.
    </h1>
    <p className="text-2xl text-body/80 mt-6 max-w-2xl leading-relaxed">
      A 12-month plan for Transferred Learnings, and its first Builder Series flagship — Fine-Tune &amp; Ship,
      with Render — built and run, not just proposed.
    </p>
    <p className="text-base text-muted-foreground mt-10">Karan Balaji</p>
  </SlideShell>,

  // 2 — Roadmap: the brief's exact Part I questions, quoted directly, answered in order
  <SlideShell key="roadmap" eyebrow="Part I · Strategy & Vision" wide>
    <SlideTitle size="md">Four questions from the brief. Answered in order.</SlideTitle>
    <NumberedList
      items={[
        {
          title: "Vision & audiences",
          description: '"What is your 12-month vision for TL and its core audiences?"',
        },
        {
          title: "Prioritization",
          description: '"What initiatives would you prioritize to drive engagement and value?"',
        },
        {
          title: "Resourcing",
          description: '"How would you allocate resources and collaborate cross-functionally?"',
        },
        {
          title: "Success metrics",
          description: '"What does success look like in year one, and how would you measure it?"',
        },
      ]}
    />
    <p className="text-sm text-muted-foreground mt-5">
      Part II picks up right after — same rigor, applied to one company: Render.
    </p>
  </SlideShell>,

  // 3 — Problem → Vision
  <SlideShell key="problem-vision" eyebrow="Part I · Where We Start" visual={<GrowthVisual />}>
    <SlideTitle size="md">
      TL has scale. It doesn&rsquo;t have <Accent>gravity</Accent> — yet.
    </SlideTitle>
    <p className="text-lg sm:text-xl text-body/85 leading-relaxed mt-5">
      Today TL has 1,000+ members but is lightly active and not differentiated from any other AI newsletter or
      Slack. Season 1: from that mailing list to the <strong>default technical home</strong> for applied AI
      builders in Canada — with a recognized presence in SF and NYC. Talent, partnerships, and investment insight
      are second-order outcomes of that reputation, not the pitch.
    </p>
    <div className="flex gap-3 mt-6">
      <StatCallout value="1,000+" label="members today" />
      <StatCallout value="Low" label="active engagement" />
      <StatCallout value="0" label="clear differentiation" />
    </div>
  </SlideShell>,

  // 4 — Core Audiences (answers the brief's "12-month vision for TL and its core audiences" directly)
  <SlideShell key="audiences" eyebrow="Part I · Who This Serves" wide>
    <SlideTitle size="md">One base audience. Everyone else follows from it.</SlideTitle>
    <NumberedList
      items={[
        {
          title: "AI/LLM builders & engineers",
          description:
            "the base — if this group doesn't find real value, nothing else works. Canada first, with a deliberate SF/NYC push.",
        },
        {
          title: "Founders & technical leads",
          description:
            "Georgian portfolio companies first, broader ecosystem second — the relationship compounds into partnerships and pipeline.",
        },
        {
          title: "Researchers & academics",
          description: "via partners like the Vector Institute — credibility, and a recruiting source for the Lab Series.",
        },
        {
          title: "Georgian internal stakeholders",
          description:
            "AI Lab, Investment, RevOps, portfolio — beneficiaries of the community's momentum, not the audience being programmed for.",
        },
      ]}
    />
  </SlideShell>,

  // 5 — Three Pillars → Three Series
  <SlideShell key="pillars-series" eyebrow="Three-Pillar Framework" visual={<PillarSeriesFlow />}>
    <SlideTitle size="md">Every pillar has a named series.</SlideTitle>
    <div className="flex flex-col gap-3 mt-5">
      <PillarCard
        pillar="Research"
        title="Lab Series"
        description="Georgian AI Lab research and toolkit deep-dives — reaching researchers and academics via partners like the Vector Institute."
      />
      <PillarCard
        pillar="Talent"
        title="Builder Series"
        description="Hands-on build sessions and challenges — real working output from builders, the highest-signal talent channel."
      />
      <PillarCard
        pillar="Ecosystem"
        title="Founder Talks"
        description="Founder and portfolio-company spotlights — momentum for the community, not the audience being programmed for."
      />
    </div>
    <p className="text-base text-muted-foreground mt-4">
      &ldquo;Season 1 = Year 1.&rdquo; Every episode distributes through Luma — city-based discovery and RSVP data
      as a built-in metrics source.
    </p>
  </SlideShell>,

  // 6 — Sharp Prioritization: the 12-month vision, broken into quarters (interactive — click a quarter)
  <SlideShell key="prioritization" eyebrow="Part I · Sharp Prioritization" wide>
    <SlideTitle size="md">The next 12 months, one quarter at a time.</SlideTitle>
    <p className="text-base text-muted-foreground mt-2 mb-5 max-w-3xl">
      Q1 is the explicit order of operations for the first 90 days — everything after it builds on what Q1 proves.
      Click a quarter.
    </p>
    <div className="grid grid-cols-[1.6fr_1fr] gap-10 items-start">
      <VisionTimeline />
      <NotDoingList
        items={[
          "No paid member acquisition — growth comes from content quality and ambassador reach",
          "No new platforms or custom infrastructure — Luma + existing channels are enough",
          "No multi-city expansion before Toronto's cadence is proven",
          "No gating content behind Georgian sales motions",
        ]}
      />
    </div>
  </SlideShell>,

  // 7 — Ambassador program (no visual — the citations are the content; use the full width instead)
  <SlideShell key="ambassadors" eyebrow="Scaling Without Headcount" wide>
    <SlideTitle size="md">Transferred Learnings Ambassadors</SlideTitle>
    <p className="text-base text-muted-foreground mt-2 mb-5">
      Modeled on four real precedents, researched directly — not assumed.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <PrecedentCard
        name="Stripe Community Builders"
        href="https://stripe.com/en-ca/guides/become-a-stripe-community-builder"
        gives="Event-cost funding, Stripe experts as speakers, office access, public recognition — for 4+ events/year."
      />
      <PrecedentCard
        name="Cerebras Ambassadors"
        href="https://www.cerebras.ai/ambassadors"
        gives="Compute credits, venue/food funding, a global builder network — for hosting local 'Cafe Compute' meetups."
      />
      <PrecedentCard
        name="NVIDIA Developer Champions"
        href="https://developer.nvidia.com/developer-champions-program"
        gives="Expert access, channel amplification, a public directory — selected on demonstrated skill, not credentials."
      />
      <PrecedentCard
        name="OpenAI Codex Ambassadors"
        href="https://developers.openai.com/community/codex-ambassadors"
        gives="API/product credits, starter kits, direct team access — for ~2–4 hrs/week from proven community operators."
      />
    </div>
    <p className="text-base text-body/75 mt-5 leading-relaxed max-w-4xl">
      TL Ambassadors, synthesized: a capped stipend, AI Lab speaker access, Toronto office space, toolkit compute
      credits, and a &ldquo;Builder Series in a box&rdquo; starter kit — for 4+ TL-branded events/year and a
      feedback loop on what local builders are stuck on.
    </p>
  </SlideShell>,

  // 8 — Community Partnerships (the fastest lever — co-host with existing communities instead of recruiting new ones)
  <SlideShell key="community-partnerships" eyebrow="Community Partnerships · The Fastest Lever" wide>
    <SlideTitle size="md">Don&rsquo;t recruit an audience. Borrow one.</SlideTitle>
    <p className="text-base text-muted-foreground mt-2 mb-5 max-w-4xl">
      Ambassadors build new local presence from near-zero — months to recruit, vet, and ramp. Toronto&rsquo;s AI
      builder scene already exists and is already engaged; most of these groups just lack venue access and
      sponsorship. That gap closes in week 1, running in parallel with the 90-day plan, not waiting in line
      behind it.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <PrecedentCard
        name="AI Tinkerers Toronto"
        href="https://toronto.aitinkerers.org/"
        gives="The Toronto chapter of a 245-city, 116,000+ member global network built for hands-on builders — working prototypes and demos, not sales talks. The same ethos as the Builder Series."
      />
      <PrecedentCard
        name="BUILD FUTURE"
        href="https://buildfuture.ai/"
        gives="Toronto's own AI builder community — already runs events hosted at other companies' offices (a Claude Code meetup at ADA HQ, Feb 2026). Proof this exact model already works here."
      />
    </div>
    <div className="glass-panel rounded-2xl border-gold/30 bg-gold/10 shadow-primary-sm p-4 mt-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-navy mb-1.5">The mechanism</p>
      <p className="text-sm text-body/85 leading-relaxed">
        Georgian&rsquo;s Toronto office as the offer — the same venue already earmarked for Ambassadors. Co-host on{" "}
        <strong>Luma</strong>, not just cross-promote: Luma lets one event be submitted to another calendar so it
        appears on both simultaneously — a co-hosted event shows up on TL&rsquo;s calendar <em>and</em>{" "}the
        partner&rsquo;s own follower base at the same time. That&rsquo;s the actual mechanism behind &ldquo;reach
        their audience,&rdquo; not a hope.
      </p>
    </div>
  </SlideShell>,

  // 9 — Resourcing
  <SlideShell key="resourcing" eyebrow="Who Does What" visual={<ResourcingWheel />}>
    <SlideTitle size="md">
      One orchestrator. No single function runs this <Accent>alone</Accent>.
    </SlideTitle>
    <CheckList
      items={[
        "Lead AI Advocate — orchestrates the whole program",
        "AI Lab — technical substance, research, toolkit, speakers",
        "Marketing & Events — production, promotion, Luma management",
        "RevOps & Investment — portfolio intros, defines real talent/deal signal",
        "Portfolio companies (e.g. Render) — co-host flagship episodes",
        "Partners (e.g. Vector Institute) — speakers and academic credibility",
      ]}
    />
    <p className="text-sm text-muted-foreground mt-4">
      Cadence: one flagship, cross-functionally resourced program per quarter — lighter always-on content fills
      the gaps between.
    </p>
  </SlideShell>,

  // 10 — Year 1 metrics (grouped by the brief's own Objective language, not an arbitrary column split)
  <SlideShell key="metrics" eyebrow="Measuring What Matters" wide>
    <SlideTitle size="md">Talent magnet. Thought leader. Second-order outcomes.</SlideTitle>
    <p className="text-sm text-muted-foreground mt-2 mb-5 max-w-3xl">
      The brief&rsquo;s own framing for what TL should become — every metric below proves one of these three, not a
      vanity number.
    </p>
    <div className="grid grid-cols-3 gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Talent magnet</p>
        <CheckList
          items={[
            "Active contributor rate — over raw member count",
            "Community → portfolio-company talent conversions",
            "Ambassador program health — active ambassadors, events, spread",
          ]}
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Trusted thought leader</p>
        <CheckList
          items={["Content reach/engagement on Lab Series output", "Event NPS, tracked per series"]}
        />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Second-order outcomes</p>
        <CheckList
          items={[
            "Partnerships or deal flow traceable to a community relationship",
            "Luma subscriber growth per city",
            "Co-hosted events with partner communities, and net-new TL subscribers per event",
            "Quarterly community-signal brief delivered to Investment/AI Lab",
          ]}
        />
      </div>
    </div>
  </SlideShell>,

  // 11 — Why Render + flagship track
  <SlideShell key="why-render" eyebrow="Part II · Fine-Tune & Ship, with Render" visual={<RenderPipeline />}>
    <SlideTitle size="md">The deploy half of the story, not just the fine-tune half.</SlideTitle>
    <p className="text-lg text-body/85 leading-relaxed mt-5">
      Here&rsquo;s Season 1&rsquo;s first Builder Series flagship, in practice. An AI-native company is the obvious
      pick for a fine-tuning toolkit — the least differentiated answer on a panel that sees multiple candidates.
      Georgian&rsquo;s toolkit only tells half the lifecycle. Render&rsquo;s entire business is the other half:
      deploying and serving models.
    </p>
    <div className="glass-panel rounded-2xl border-gold/30 bg-gold/10 shadow-primary-sm p-4 mt-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-navy mb-1.5">
        The flagship track: the local-first router
      </p>
      <p className="text-sm text-body/85 leading-relaxed">
        A <CitationLink href={STANFORD_URL}>Stanford study</CitationLink> found{" "}
        <strong>71.3% of real-world ChatGPT queries</strong>{" "}could be answered by a small, local model instead of
        a frontier API — a figure{" "}
        <CitationLink href={DELANGUE_URL}>Hugging Face CEO Clement Delangue has cited</CitationLink> as rationale for local-first AI.
      </p>
    </div>
  </SlideShell>,

  // 12 — Timeline & Budget
  <SlideShell key="timeline-budget" eyebrow="8 Weeks · $10,000 Cap" visual={<BudgetChart />}>
    <SlideTitle size="md">Launch → build → judge → ship.</SlideTitle>
    <p className="text-sm text-muted-foreground mt-2 mb-3">
      The program spans 8 weeks — real fine-tune-and-deploy work isn&rsquo;t a one-sitting task. But Launch and
      Ship are each one in-person evening, not the whole 8 weeks; the budget on the right funds all four phases.
    </p>
    <MiniTable
      columns={["Week", "Phase", "What happens"]}
      rows={[
        ["1", "Launch", "In-person, ~4hrs, weekday evening at Georgian's Toronto office — hands-on kickoff co-hosted by AI Lab + Render engineers"],
        ["2–6", "Build", "Self-directed — participants build on their own time; office hours + Discord support. Submissions close end of week 6"],
        ["7", "Judge", "AI Lab + Render engineers score against the rubric"],
        ["8", "Ship", "In-person, ~4hrs, weekday evening — Demo Day, winners announced, deployed submissions go live"],
      ]}
    />
  </SlideShell>,

  // 13 — Proof slide (navy, terminal — its own visual, no generated image needed)
  <SlideShell key="proof" eyebrow="Not A Mockup" variant="navy">
    <h1 className="text-6xl sm:text-7xl font-bold text-white tracking-tight leading-[1.08]">
      This wasn&rsquo;t simulated. It was{" "}
      <span className="font-accent italic font-normal text-gold">actually run</span>.
    </h1>
    <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6 font-mono text-base max-w-3xl">
      <p className="text-primary/90">$ ollama run hermes-triage</p>
      <p className="text-white/50 mt-2">
        &gt;&gt;&gt; Ticket: Charger cable frayed and sparking. Let me know what you need from me.
      </p>
      <p className="mt-3 text-white/90">
        Category: <span className="text-gold">Hardware</span> | Priority: <span className="text-gold">High</span>{" "}
        | Reply: Thanks for flagging this — we&apos;ll escalate to hardware support and arrange a replacement or
        repair. Expect an update within 1 business day.
      </p>
    </div>
    <ul className="mt-6 space-y-2 text-lg text-white/80 max-w-3xl">
      <li>
        → A real LoRA fine-tune of Hermes-3 on a support-triage dataset — trained with MLX (Apple Silicon), the
        CUDA-free substitute for the toolkit&rsquo;s own bitsandbytes training step, same fine-tune → export → serve pipeline
      </li>
      <li>
        → A real, publicly downloadable model on{" "}
        <a href={HF_URL} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">
          Hugging Face
        </a>
      </li>
      <li>→ A real Render deployment blueprint — llama.cpp, no GPU required</li>
    </ul>
  </SlideShell>,

  // 14 — Both goals + the ask
  <SlideShell key="both-goals" eyebrow="The Payoff" visual={<Flywheel />}>
    <SlideTitle size="md">Toolkit gets real usage. Render sees real code — before it ever sees a resume.</SlideTitle>
    <div className="flex flex-col gap-4 mt-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1.5">Toolkit promotion</p>
        <CheckList items={["GitHub stars, forks, clones, issues opened", "Kickoff and Demo Day recording/recap views", "Participant posts tagging Georgian + Render"]} />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-1.5">Talent engagement</p>
        <CheckList items={["Registration → submission conversion", "Number of deployed, working submissions", "Fast-track interviews and hires signalled by Render"]} />
      </div>
    </div>
    <p className="text-xl font-semibold text-navy mt-6 leading-snug">
      Greenlight Transferred Learnings, Season 1 — starting with Fine-Tune &amp; Ship as the proof point.
    </p>
  </SlideShell>,

  // 15 — Appendix: Risks
  <SlideShell key="risks" eyebrow="Appendix · Risks & Mitigations" wide>
    <SlideTitle size="md">What could go wrong.</SlideTitle>
    <div className="mt-6">
      <MiniTable
        columns={["Risk", "Mitigation"]}
        rows={[
          ["Low signups", "Ambassador + Render channel push in week 1–2; rolling registration"],
          ["Mid-challenge drop-off", "Weekly office hours, Discord nudges, 'ship something small' framing"],
          ["Low submission quality", "Starter tracks + kickoff walkthrough as scaffolding; office hours catch stalls early"],
          ["Judging load on engineers", "Rubric-based scoring with a shortlisting pass"],
        ]}
      />
    </div>
  </SlideShell>,
];
