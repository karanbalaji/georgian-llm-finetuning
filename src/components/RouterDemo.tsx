"use client";

import { useState } from "react";
import { Loader2, Cpu, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassifyResponse {
  query: string;
  label: "local" | "frontier";
  probLocal: number;
  topFeatures: { token: string; contribution: number }[];
  modelMeta: {
    datasetSize: number;
    trainSize: number;
    heldOutSize: number;
    heldOutAccuracy: number;
    trainedAt: string;
  };
}

const EXAMPLE_QUERIES = [
  "Classify this support ticket: 'Password reset email never arrived'.",
  "Summarize this paragraph in one sentence.",
  "Design a fault-tolerant, multi-region database strategy for a fintech company.",
  "Help me reason through whether I should quit my job to start a company.",
];

export function RouterDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClassifyResponse | null>(null);

  async function classify(text: string) {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? `Request failed with ${res.status}`);
      }
      const data: ClassifyResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const isLocal = result?.label === "local";

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example}
            onClick={() => {
              setQuery(example);
              classify(example);
            }}
            className="text-[11px] px-3 py-1.5 rounded-full border border-border bg-white/70 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {example.length > 42 ? example.slice(0, 42) + "…" : example}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type any query and see whether the router sends it local or to a frontier API…"
          rows={2}
          className="flex-1 resize-none rounded-lg border border-border bg-white/90 px-3 py-2 text-xs text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <Button
          onClick={() => classify(query)}
          disabled={loading || !query.trim()}
          className="rounded-full bg-primary hover:bg-primary/95 text-white font-medium text-xs px-5 shrink-0"
        >
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : "Classify"}
        </Button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {result && (
        <div
          className={`rounded-xl border p-4 text-xs space-y-2 transition-colors ${
            isLocal
              ? "border-primary/20 bg-primary/5"
              : "border-gold/30 bg-gold/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1.5 font-semibold ${isLocal ? "text-primary" : "text-gold"}`}>
              {isLocal ? <Cpu className="size-3.5" /> : <Cloud className="size-3.5" />}
              {isLocal ? "Route: Local model" : "Route: Frontier API"}
            </div>
            <span className="text-muted-foreground">
              {(result.probLocal * 100).toFixed(1)}% confidence local
            </span>
          </div>

          {result.topFeatures.length > 0 && (
            <div className="text-muted-foreground">
              Top signal tokens:{" "}
              {result.topFeatures.map((f) => f.token).join(", ")}
            </div>
          )}

          <div className="pt-1 text-[10.5px] text-muted-foreground/80 border-t border-border/60 mt-2">
            Real inference from a logistic-regression classifier trained on{" "}
            {result.modelMeta.trainSize} examples — {(result.modelMeta.heldOutAccuracy * 100).toFixed(1)}%
            {" "}held-out accuracy. Not a canned response — every request runs the model fresh.
          </div>
        </div>
      )}
    </div>
  );
}
