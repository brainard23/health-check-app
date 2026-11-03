"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { questions, type Answer, type Question } from "@/data/questions";
import { buildReport, type Answers, type Report } from "@/lib/report";
import { clearAnswers, loadAnswers, saveAnswers } from "@/lib/storage";

export type Status = "intro" | "question" | "report";

const total = questions.length;

function firstUnanswered(answers: Answers): number {
  return questions.findIndex((q) => !answers[q.id]);
}

export function useHealthCheck(): {
  status: Status;
  hydrated: boolean;
  index: number;
  question: Question;
  total: number;
  answers: Answers;
  start: () => void;
  answer: (a: Answer) => void;
  back: () => void;
  restart: () => void;
  report: Report | null;
} {
  const [status, setStatus] = useState<Status>("intro");
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  // Restore after mount only, so server and first client render match.
  useEffect(() => {
    const saved = loadAnswers();
    const next = firstUnanswered(saved);
    /* eslint-disable react-hooks/set-state-in-effect */
    setAnswers(saved);
    if (next === -1) {
      setStatus("report");
    } else if (Object.keys(saved).length > 0) {
      setIndex(next);
      setStatus("question");
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const start = useCallback(() => {
    setIndex(0);
    setStatus("question");
  }, []);

  const answer = useCallback(
    (a: Answer) => {
      const updated = { ...answers, [questions[index].id]: a };
      setAnswers(updated);
      saveAnswers(updated);
      const next = index + 1 < total ? index + 1 : firstUnanswered(updated);
      if (next === -1) {
        setStatus("report");
      } else {
        setIndex(next);
      }
    },
    [answers, index],
  );

  const back = useCallback(() => {
    if (index === 0) setStatus("intro");
    else setIndex(index - 1);
  }, [index]);

  const restart = useCallback(() => {
    clearAnswers();
    setAnswers({});
    setIndex(0);
    setStatus("intro");
  }, []);

  const report = useMemo(
    () => (firstUnanswered(answers) === -1 ? buildReport(questions, answers) : null),
    [answers],
  );

  return {
    status,
    hydrated,
    index,
    question: questions[index],
    total,
    answers,
    start,
    answer,
    back,
    restart,
    report,
  };
}
