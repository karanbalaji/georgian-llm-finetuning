import { ExternalLink, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface SlideShellProps {
  eyebrow: string;
  variant?: "light" | "navy";
  /** A supporting visual component, rendered in a right-hand column. */
  visual?: ReactNode;
  /** Let content stretch beyond the default reading width — for tables/lists that benefit from the full slide width instead of a visual. */
  wide?: boolean;
  /** Center the content block — for slides with nothing to put on the right. */
  center?: boolean;
  children: ReactNode;
}

const containerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function SlideShell({ eyebrow, variant = "light", visual, wide, center, children }: SlideShellProps) {
  const isNavy = variant === "navy";
  return (
    <motion.div
      variants={containerReveal}
      initial="hidden"
      animate="visible"
      className={`h-full w-full flex flex-col px-12 sm:px-20 py-14 sm:py-16 ${
        isNavy ? "bg-navy text-white" : "bg-hero-gradient text-body"
      }`}
    >
      <motion.span
        variants={itemReveal}
        className={`text-xs font-mono uppercase tracking-[0.2em] ${
          isNavy ? "text-white/50" : "text-muted-foreground"
        }`}
      >
        {eyebrow}
      </motion.span>

      {visual ? (
        <motion.div variants={itemReveal} className="flex-1 flex items-center gap-16">
          <div className="flex-1 max-w-2xl">{children}</div>
          <div className="flex-1 flex items-center justify-center">{visual}</div>
        </motion.div>
      ) : (
        <motion.div
          variants={itemReveal}
          className={`flex-1 flex flex-col justify-center ${
            center ? "items-center text-center max-w-4xl mx-auto" : wide ? "max-w-none" : "max-w-5xl"
          }`}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

export function SlideTitle({ children, size = "lg" }: { children: ReactNode; size?: "lg" | "md" }) {
  return (
    <h1
      className={`font-bold text-navy tracking-tight leading-[1.08] ${
        size === "lg" ? "text-6xl sm:text-7xl" : "text-5xl sm:text-6xl"
      }`}
    >
      {children}
    </h1>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="font-accent italic font-normal text-primary">{children}</span>;
}

export function SlideBody({ children }: { children: ReactNode }) {
  return <p className="text-xl sm:text-2xl text-body/85 leading-relaxed mt-6 max-w-3xl">{children}</p>;
}

export function StatCallout({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel rounded-2xl border-white/50 shadow-primary-md px-6 py-5">
      <div className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">{value}</div>
      <div className="text-sm sm:text-base text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export function PillarCard({ title, pillar, description }: { title: string; pillar: string; description: string }) {
  return (
    <div className="glass-panel rounded-2xl border-white/50 shadow-primary-sm p-6 flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2.5 py-1 w-fit">
        {pillar}
      </span>
      <h3 className="text-xl font-semibold text-navy">{title}</h3>
      <p className="text-base text-body/80 leading-relaxed">{description}</p>
    </div>
  );
}

export function PrecedentCard({
  name,
  href,
  gives,
}: {
  name: string;
  href: string;
  gives: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-panel rounded-xl border-white/50 shadow-primary-sm p-4 flex flex-col gap-1.5 hover:shadow-primary-md hover:-translate-y-0.5 transition-all group"
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-navy">{name}</span>
        <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p className="text-sm text-body/75 leading-relaxed">{gives}</p>
    </a>
  );
}

export function CompactPrecedentCard({
  name,
  href,
  gives,
}: {
  name: string;
  href: string;
  gives: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline gap-2 py-2.5 border-b border-border/40 hover:text-primary transition-colors group"
    >
      <span className="text-base font-semibold text-navy group-hover:text-primary shrink-0">{name}</span>
      <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
      <span className="text-sm text-body/70 leading-snug">— {gives}</span>
    </a>
  );
}

export function MiniTable({
  rows,
  columns,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="glass-panel rounded-2xl border-white/50 shadow-primary-sm overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border/60">
            {columns.map((col) => (
              <th key={col} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i !== rows.length - 1 ? "border-b border-border/40" : ""}>
              {row.map((cell, j) => (
                <td key={j} className={`px-5 py-3 text-base ${j === 0 ? "font-medium text-navy" : "text-body/85"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-lg sm:text-xl text-body/85 leading-relaxed">
          <span className="mt-2.5 size-1.5 rounded-full bg-primary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <ol className="flex flex-col gap-4 mt-2">
      {items.map((item, i) => (
        <li key={item.title} className="flex items-start gap-4">
          <span className="size-7 rounded-full bg-navy text-white text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-base sm:text-lg text-body/85 leading-relaxed">
            <strong className="text-navy">{item.title}</strong> — {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function NotDoingList({ items }: { items: string[] }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface-1/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        What Year 1 deliberately won&rsquo;t do
      </p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-body/75 leading-relaxed">
            <Minus className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CitationLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80"
    >
      {children}
    </a>
  );
}
