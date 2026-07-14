import { BookOpen, ExternalLink } from "lucide-react";

interface ResearchCitationProps {
  href: string;
  label?: string;
  readMoreLabel?: string;
  children: React.ReactNode;
}

/**
 * Renders a non-obvious claim with a real, visible citation instead of a
 * narrative assertion — used wherever this app states something a technical
 * panel could reasonably ask "says who?" about.
 */
export function ResearchCitation({
  href,
  label = "Why this track exists",
  readMoreLabel = "Read the paper",
  children,
}: ResearchCitationProps) {
  return (
    <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
        <BookOpen className="size-3.5 text-gold" /> {label}
      </div>
      <p className="text-xs text-body/80 leading-relaxed">{children}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80"
      >
        {readMoreLabel} <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
