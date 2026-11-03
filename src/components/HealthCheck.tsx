"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";
import { Intro } from "./Intro";
import { QuestionStep } from "./QuestionStep";
import { Report } from "./Report";

export function HealthCheck() {
  const hc = useHealthCheck();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl items-center px-4 py-8">
      <div className="w-full rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-10">
        {!hc.hydrated ? (
          <div aria-busy="true" aria-label="Loading" className="h-64" />
        ) : hc.status === "intro" ? (
          <Intro onStart={hc.start} />
        ) : hc.status === "question" ? (
          <QuestionStep
            question={hc.question}
            index={hc.index}
            total={hc.total}
            selected={hc.answers[hc.question.id]}
            onAnswer={hc.answer}
            onBack={hc.back}
          />
        ) : hc.report ? (
          <Report report={hc.report} onRetake={hc.restart} />
        ) : null}
      </div>
    </main>
  );
}
