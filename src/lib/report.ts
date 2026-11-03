import type { Answer, Question } from "@/data/questions";

export type Answers = Partial<Record<string, Answer>>;
export type Weakness = { id: string; question: string; impact: string };
export type Report = {
  score: number;
  max: number;
  verdict: string;
  weaknesses: Weakness[];
};

function verdictFor(score: number): string {
  if (score >= 9) return "Excellent shape";
  if (score >= 7) return "Good, with room to improve";
  if (score >= 4) return "Needs attention";
  return "At risk";
}

export function buildReport(questions: Question[], answers: Answers): Report {
  const max = questions.length;
  const weaknesses = questions
    .filter((q) => answers[q.id] === "no")
    .map((q) => ({ id: q.id, question: q.text, impact: q.impact }));
  const score = max - weaknesses.length;
  return { score, max, verdict: verdictFor(score), weaknesses };
}
