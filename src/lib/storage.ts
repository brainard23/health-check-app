import { questions } from "@/data/questions";
import type { Answers } from "@/lib/report";

const KEY = "health-check:v1";

export function loadAnswers(): Answers {
  if (typeof window === "undefined") return {};
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "null");
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const raw = parsed as Record<string, unknown>;
    const answers: Answers = {};
    for (const { id } of questions) {
      const value = raw[id];
      if (value === "yes" || value === "no") answers[id] = value;
    }
    return answers;
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Answers): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    // storage unavailable (private mode / quota): keep working in memory
  }
}

export function clearAnswers(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
