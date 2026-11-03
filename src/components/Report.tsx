"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, RotateCcw, ShieldCheck } from "lucide-react";
import type { Report as ReportData } from "@/lib/report";
import { ScoreRing } from "./ScoreRing";

export function Report({ report, onRetake }: { report: ReportData; onRetake: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);

  const { score, max, verdict, weaknesses } = report;
  return (
    <section className="animate-rise-in">
      <h2 ref={heading} tabIndex={-1} className="sr-only outline-none">
        Your score: {score} out of {max}
      </h2>
      <ScoreRing score={score} max={max} />
      <p className="mt-4 text-center text-lg font-semibold">{verdict}</p>

      {weaknesses.length === 0 ? (
        <p className="mt-8 flex items-center justify-center gap-2 font-medium text-primary">
          <ShieldCheck aria-hidden="true" className="size-6 shrink-0" />
          No weaknesses found — keep it up.
        </p>
      ) : (
        <>
          <h2 className="mt-8 text-xl font-semibold">Weaknesses ({weaknesses.length})</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {weaknesses.map((w, i) => (
              <li
                key={w.id}
                style={{ animationDelay: `${i * 40}ms` }}
                className="animate-rise-in flex gap-3 rounded-2xl bg-danger-soft p-4"
              >
                <AlertTriangle aria-hidden="true" className="mt-1 size-5 shrink-0 text-danger" />
                <div>
                  <h3 className="font-semibold">{w.question}</h3>
                  <p className="mt-1 text-muted">{w.impact}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        type="button"
        onClick={onRetake}
        className="mt-8 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-line px-6 font-semibold hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <RotateCcw aria-hidden="true" className="size-5" />
        Retake the check
      </button>
    </section>
  );
}
