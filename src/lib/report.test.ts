import { questions } from "@/data/questions";
import { buildReport, type Answers } from "./report";

const all = (a: "yes" | "no"): Answers =>
  Object.fromEntries(questions.map((q) => [q.id, a]));

const withNos = (n: number): Answers =>
  Object.fromEntries(questions.map((q, i) => [q.id, i < n ? "no" : "yes"]));

describe("buildReport", () => {
  it("all yes scores 10/10 with no weaknesses", () => {
    const r = buildReport(questions, all("yes"));
    expect(r).toMatchObject({ score: 10, max: 10, weaknesses: [] });
  });

  it("all no scores 0 with a weakness per question", () => {
    const r = buildReport(questions, all("no"));
    expect(r.score).toBe(0);
    expect(r.weaknesses).toHaveLength(10);
  });

  it("lists only No answers, in question order, with impact text", () => {
    const r = buildReport(questions, {
      support: "no",
      sleep: "no",
      hydration: "yes",
    });
    expect(r.weaknesses.map((w) => w.id)).toEqual(["sleep", "support"]);
    expect(r.weaknesses[0]).toEqual({
      id: "sleep",
      question: questions[0].text,
      impact: questions[0].impact,
    });
    expect(r.weaknesses.map((w) => w.id)).not.toContain("hydration");
    expect(r.score).toBe(8);
  });

  it.each([
    [0, "Excellent shape"],
    [1, "Excellent shape"],
    [2, "Good, with room to improve"],
    [3, "Good, with room to improve"],
    [4, "Needs attention"],
    [6, "Needs attention"],
    [7, "At risk"],
    [10, "At risk"],
  ])("%i No answers -> %s", (nos, verdict) => {
    expect(buildReport(questions, withNos(nos)).verdict).toBe(verdict);
  });

  it("score boundaries 9/7/4 and 3/6/8", () => {
    const verdict = (score: number) => buildReport(questions, withNos(10 - score)).verdict;
    expect(verdict(9)).toBe("Excellent shape");
    expect(verdict(8)).toBe("Good, with room to improve");
    expect(verdict(7)).toBe("Good, with room to improve");
    expect(verdict(6)).toBe("Needs attention");
    expect(verdict(4)).toBe("Needs attention");
    expect(verdict(3)).toBe("At risk");
  });
});
