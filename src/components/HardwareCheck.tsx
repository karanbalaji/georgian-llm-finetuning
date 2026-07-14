"use client";

import { useEffect, useState } from "react";
import { Cpu, CircleCheck, CircleX, Loader2 } from "lucide-react";

type WebGPUStatus = "checking" | "supported" | "unsupported";

/**
 * Real WebGPU capability check (not a browser/UA sniff) — actually requests
 * a GPU adapter, since `"gpu" in navigator` alone is true in browsers that
 * expose the API but can't get a working adapter (e.g. disabled flags, no
 * compatible hardware).
 */
export function HardwareCheck() {
  const [status, setStatus] = useState<WebGPUStatus>("checking");
  const [adapterInfo, setAdapterInfo] = useState<string | null>(null);
  const [cores, setCores] = useState<number | null>(null);

  useEffect(() => {
    setCores(navigator.hardwareConcurrency ?? null);

    const gpu = (navigator as Navigator & { gpu?: unknown }).gpu as
      | { requestAdapter: () => Promise<{ info?: { vendor?: string; architecture?: string } } | null> }
      | undefined;

    if (!gpu) {
      setStatus("unsupported");
      return;
    }

    gpu
      .requestAdapter()
      .then((adapter) => {
        if (!adapter) {
          setStatus("unsupported");
          return;
        }
        setStatus("supported");
        const vendor = adapter.info?.vendor;
        const architecture = adapter.info?.architecture;
        setAdapterInfo([vendor, architecture].filter(Boolean).join(" · ") || null);
      })
      .catch(() => setStatus("unsupported"));
  }, []);

  return (
    <div className="rounded-xl border border-border bg-white/70 p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
        <Cpu className="size-3.5 text-primary" /> Could your device run this locally?
      </div>

      <div className="flex items-center gap-2 text-xs">
        {status === "checking" && (
          <>
            <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Checking for a WebGPU adapter…</span>
          </>
        )}
        {status === "supported" && (
          <>
            <CircleCheck className="size-3.5 text-primary shrink-0" />
            <span className="text-body/90">
              WebGPU adapter found{adapterInfo ? ` (${adapterInfo})` : ""} — a quantized 3B model like this fine-tune could run entirely client-side on this device.
            </span>
          </>
        )}
        {status === "unsupported" && (
          <>
            <CircleX className="size-3.5 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">
              No WebGPU adapter available in this browser — which is exactly why this demo&apos;s classifier runs server-side (<code className="text-[10.5px]">/api/classify</code>) instead of assuming every visitor&apos;s device can run local inference.
            </span>
          </>
        )}
      </div>

      {cores !== null && (
        <p className="text-[10.5px] text-muted-foreground/80 pt-1 border-t border-border/60 mt-2">
          {cores} logical CPU cores detected — real, matching hardware Render&apos;s no-GPU standard plan gives you.
        </p>
      )}
    </div>
  );
}
