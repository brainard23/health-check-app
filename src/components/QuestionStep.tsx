"use client";

import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import type { Answer, Question } from "@/data/questions";
import { AnswerButtons } from "./AnswerButtons";
import { ProgressBar } from "./ProgressBar";

type Props = {
  question: Question;
  index: number;
  total: number;
  selected?: Answer;
  onAnswer: (a: Answer) => void;
  onBack: () => void;
};

export function QuestionStep({ question, index, total, selected, onAnswer, onBack }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const el = e.target;
      if (el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "y") onAnswer("yes");
      else if (key === "n") onAnswer("no");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onAnswer]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex min-h-11 cursor-pointer items-center gap-1 rounded-xl px-2 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
          Back
        </button>
        <p aria-live="polite" className="text-sm text-muted tabular-nums">
          Question {index + 1} of {total}
        </p>
      </div>
      <ProgressBar current={index + 1} total={total} />
      <h2 key={question.id} className="animate-rise-in mt-8 text-2xl font-semibold sm:text-3xl">
        {question.text}
      </h2>
      <AnswerButtons selected={selected} onAnswer={onAnswer} />
      <p className="mt-4 hidden text-sm text-muted sm:block">Tip: press Y for Yes or N for No.</p>
    </section>
  );
}
