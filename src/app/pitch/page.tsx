"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "./slides";

function PitchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramSlide = Number(searchParams.get("slide"));
  const initial = Number.isInteger(paramSlide) && paramSlide >= 1 && paramSlide <= slides.length ? paramSlide - 1 : 0;
  const [index, setIndex] = useState(initial);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      if (clamped === index) return;
      setDirection(clamped - index);
      setIndex(clamped);
      router.replace(`/pitch?slide=${clamped + 1}`, { scroll: false });
    },
    [router, index]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        goTo(index + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(index - 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo]);

  return (
    <div className="fixed inset-0 bg-navy overflow-hidden select-none">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0"
      >
        {slides[index]}
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gold transition-all duration-300 z-10" style={{ width: `${((index + 1) / slides.length) * 100}%` }} />

      {/* Slide counter */}
      <div className="absolute bottom-4 left-6 text-[11px] font-mono text-white mix-blend-difference z-10">
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Nav arrows */}
      <div className="absolute bottom-4 right-6 flex gap-2 z-10">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="size-9 rounded-full bg-white/80 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-primary-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-4 text-navy" />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          className="size-9 rounded-full bg-white/80 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-primary-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="size-4 text-navy" />
        </button>
      </div>
    </div>
  );
}

export default function PitchPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-navy" />}>
      <PitchClient />
    </Suspense>
  );
}
