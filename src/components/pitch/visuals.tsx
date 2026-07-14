import { ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const NAVY = "#19224d";
const PRIMARY = "#2644d9";
const GOLD = "#e6c41a";
const BORDER = "#d7daea";

export function GrowthVisual() {
  return (
    <div className="flex items-center gap-6 w-full justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative size-24">
          <span className="absolute top-0 left-3 size-2 rounded-full bg-muted-foreground/30" />
          <span className="absolute top-5 left-11 size-3 rounded-full bg-muted-foreground/40" />
          <span className="absolute bottom-3 left-1 size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="absolute bottom-0 left-14 size-2 rounded-full bg-muted-foreground/30" />
          <span className="absolute top-9 left-5 size-4 rounded-full bg-muted-foreground/50" />
          <span className="absolute top-2 left-16 size-1.5 rounded-full bg-muted-foreground/25" />
        </div>
        <span className="text-xs text-muted-foreground text-center leading-snug">
          1,000+ member
          <br />
          mailing list
        </span>
      </div>
      <ArrowRight className="size-6 text-primary shrink-0" />
      <div className="flex flex-col items-center gap-3">
        <div className="size-28 rounded-full bg-navy ring-4 ring-gold/40 flex items-center justify-center shadow-primary-md">
          <span className="text-white text-sm font-semibold text-center leading-tight px-2">
            Technical
            <br />
            Home
          </span>
        </div>
        <span className="text-xs text-muted-foreground text-center">Toronto · SF · NYC</span>
      </div>
    </div>
  );
}

export function PillarSeriesFlow() {
  const rows = [
    { pillar: "Research", series: "Lab Series" },
    { pillar: "Talent", series: "Builder Series" },
    { pillar: "Ecosystem", series: "Founder Talks" },
  ];
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {rows.map((r) => (
        <div key={r.pillar} className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded-full px-3 py-2 w-28 text-center shrink-0">
            {r.pillar}
          </span>
          <ArrowRight className="size-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-semibold text-navy bg-white rounded-lg px-4 py-2.5 shadow-primary-sm flex-1 text-center">
            {r.series}
          </span>
        </div>
      ))}
    </div>
  );
}

const WHEEL_SIZE = 340;
const WHEEL_CENTER = WHEEL_SIZE / 2;
const WHEEL_RADIUS = 140;
const wheelNodes = [
  { label: "AI Lab", angle: -90 },
  { label: "Marketing & Events", angle: -18 },
  { label: "RevOps & Investment", angle: 54 },
  { label: "Portfolio", angle: 126 },
  { label: "Partners", angle: 198 },
].map((n) => ({
  ...n,
  x: WHEEL_CENTER + WHEEL_RADIUS * Math.cos((n.angle * Math.PI) / 180),
  y: WHEEL_CENTER + WHEEL_RADIUS * Math.sin((n.angle * Math.PI) / 180),
}));

export function ResourcingWheel() {
  return (
    <div className="relative shrink-0" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
      <svg className="absolute inset-0" width={WHEEL_SIZE} height={WHEEL_SIZE}>
        {wheelNodes.map((n) => (
          <line key={n.label} x1={WHEEL_CENTER} y1={WHEEL_CENTER} x2={n.x} y2={n.y} stroke={BORDER} strokeWidth={2} />
        ))}
      </svg>
      <div
        className="absolute size-24 rounded-full flex items-center justify-center shadow-primary-md"
        style={{
          left: WHEEL_CENTER,
          top: WHEEL_CENTER,
          transform: "translate(-50%,-50%)",
          background: NAVY,
          boxShadow: `0 0 0 4px ${GOLD}66`,
        }}
      >
        <span className="text-white text-xs font-semibold text-center leading-tight px-1">
          Lead AI
          <br />
          Advocate
        </span>
      </div>
      {wheelNodes.map((n) => (
        <div
          key={n.label}
          className="absolute w-28 rounded-xl bg-white shadow-primary-sm px-2 py-2.5 text-center"
          style={{ left: n.x, top: n.y, transform: "translate(-50%,-50%)" }}
        >
          <span className="text-[11px] font-semibold text-navy leading-tight">{n.label}</span>
        </div>
      ))}
    </div>
  );
}

export function RenderPipeline() {
  return (
    <div className="flex items-center gap-4 w-full max-w-md">
      <div className="flex-1 rounded-2xl px-5 py-7 text-center shadow-primary-sm" style={{ background: NAVY }}>
        <p className="text-[10px] uppercase tracking-wide text-white/60 mb-1.5">Step 1</p>
        <p className="font-semibold text-white">Fine-Tune</p>
        <p className="text-xs text-white/70 mt-1">Georgian&rsquo;s Toolkit</p>
      </div>
      <ArrowRight className="size-6 shrink-0" style={{ color: PRIMARY }} />
      <div className="flex-1 rounded-2xl bg-white px-5 py-7 text-center shadow-primary-md" style={{ boxShadow: `0 0 0 2px ${GOLD}` }}>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">Step 2</p>
        <p className="font-semibold text-navy">Deploy &amp; Serve</p>
        <p className="text-xs text-body/70 mt-1">Render</p>
      </div>
    </div>
  );
}

const BUDGET = [
  { label: "Render compute/deploy credits", amount: 4000, color: NAVY },
  { label: "Prizes", amount: 2500, color: PRIMARY },
  { label: "Demo Day production", amount: 2000, color: "#8fa0d6" },
  { label: "Promo & swag", amount: 1000, color: "#c3ccec" },
  { label: "Buffer", amount: 500, color: GOLD },
];
const BUDGET_TOTAL = BUDGET.reduce((sum, b) => sum + b.amount, 0);

export function BudgetChart() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex h-9 w-full rounded-full overflow-hidden shadow-primary-sm">
        {BUDGET.map((b) => (
          <div key={b.label} style={{ width: `${(b.amount / BUDGET_TOTAL) * 100}%`, background: b.color }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {BUDGET.map((b) => (
          <div key={b.label} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-body/80">
              <span className="size-2.5 rounded-full shrink-0" style={{ background: b.color }} />
              {b.label}
            </span>
            <span className="font-semibold text-navy shrink-0">${b.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-right border-t border-border/60 pt-2">
        ${BUDGET_TOTAL.toLocaleString()} total
      </p>
    </div>
  );
}

function FlywheelNode({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-xl px-4 py-3.5 text-center text-xs font-semibold shadow-primary-sm flex-1 ${
        highlight ? "bg-gold/15 text-navy" : "bg-white text-navy"
      }`}
      style={highlight ? { boxShadow: `0 0 0 1px ${GOLD}80` } : undefined}
    >
      {label}
    </div>
  );
}

export function Flywheel() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3">
        <FlywheelNode label="Toolkit Usage" highlight />
        <ArrowRight className="size-4 shrink-0" style={{ color: PRIMARY }} />
        <FlywheelNode label="Talent Signal" />
      </div>
      <div className="flex justify-end pr-[calc(12.5%-8px)] my-2">
        <ArrowDown className="size-4" style={{ color: PRIMARY }} />
      </div>
      <div className="flex items-center gap-3">
        <FlywheelNode label="Case-Study Content" />
        <ArrowLeft className="size-4 shrink-0" style={{ color: PRIMARY }} />
        <FlywheelNode label="Hires" />
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-muted-foreground">
        <RotateCcw className="size-3" /> loops back into toolkit visibility
      </div>
    </div>
  );
}
