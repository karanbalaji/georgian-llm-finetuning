import { useState } from "react";

const QUARTERS = [
  {
    label: "Q1",
    months: "Months 1–3",
    title: "Foundation + First Flagship",
    items: [
      "Baseline audit of TL's member data and Luma history — every later decision keys off this",
      "Stand up Lab Series first — fastest credible win, content already exists",
      "Launch and run the Fine-Tune & Ship Challenge with Render, through Demo Day",
      "Recruit the first 3–5 ambassadors from members those two programs surface",
      "In parallel, no dependency on the above: co-host first joint events with 2–3 aligned Toronto AI communities",
    ],
  },
  {
    label: "Q2",
    months: "Months 4–6",
    title: "Prove The Cadence",
    items: [
      "Founder Talks launches — portfolio and partner spotlights",
      "First ambassador-led events, Toronto",
      "First quarterly community-signal brief delivered to Investment/AI Lab",
      "Measure Q1's real toolkit-adoption and talent-pipeline outcomes",
    ],
  },
  {
    label: "Q3",
    months: "Months 7–9",
    title: "Second Flagship + SF/NYC Push",
    items: [
      "Second Builder Series flagship — same 8-week shape, different portfolio company + toolkit",
      "Ambassadors expand into SF and NYC — the case study's technical-hub requirement, without an office",
      "Lab Series cadence continues with Vector Institute speakers",
    ],
  },
  {
    label: "Q4",
    months: "Months 10–12",
    title: "Prove Year 1, Plan Season 2",
    items: [
      "Third flagship or steady-state cadence, depending on Q1–Q3 signal",
      "Year-1 metrics reviewed against every target set in this plan",
      "Season 2 vision drafted — only once Season 1's cadence is proven",
    ],
  },
];

export function VisionTimeline() {
  const [active, setActive] = useState(0);
  const quarter = QUARTERS[active];

  return (
    <div className="w-full">
      <div className="flex items-stretch gap-2">
        {QUARTERS.map((q, i) => (
          <button
            key={q.label}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`flex-1 flex flex-col items-start gap-1.5 pb-3 border-b-4 text-left transition-colors cursor-pointer ${
              active === i ? "border-primary" : "border-border/50 hover:border-border"
            }`}
          >
            <span className={`text-xs font-mono ${active === i ? "text-primary" : "text-muted-foreground"}`}>
              {q.label} · {q.months}
            </span>
            <span className={`text-sm font-semibold leading-tight ${active === i ? "text-navy" : "text-muted-foreground"}`}>
              {q.title}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-white shadow-primary-sm p-5 min-h-[172px]">
        <ul className="space-y-2.5">
          {quarter.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-body/85 leading-relaxed">
              <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
