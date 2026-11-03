import { questions } from "./questions";

describe("questions", () => {
  it("has exactly 10 questions with unique ids", () => {
    expect(questions).toHaveLength(10);
    expect(new Set(questions.map((q) => q.id)).size).toBe(10);
  });

  it("has text and impact for every question", () => {
    for (const q of questions) {
      expect(q.text.endsWith("?")).toBe(true);
      expect(q.impact.length).toBeGreaterThan(0);
    }
  });
});
