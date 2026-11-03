import { act, renderHook } from "@testing-library/react";
import { questions } from "@/data/questions";
import { loadAnswers, saveAnswers } from "@/lib/storage";
import { useHealthCheck } from "./useHealthCheck";

const KEY = "health-check:v1";

describe("useHealthCheck", () => {
  it("starts on intro and flags hydration after mount", () => {
    const { result } = renderHook(() => useHealthCheck());
    expect(result.current.hydrated).toBe(true);
    expect(result.current.status).toBe("intro");
    expect(result.current.report).toBeNull();
    expect(result.current.total).toBe(10);
  });

  it("hydrated is false on the first render", () => {
    const seen: boolean[] = [];
    renderHook(() => {
      const h = useHealthCheck();
      seen.push(h.hydrated);
      return h;
    });
    expect(seen[0]).toBe(false);
    expect(seen.at(-1)).toBe(true);
  });

  it("start moves to the first question", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    expect(result.current.status).toBe("question");
    expect(result.current.index).toBe(0);
    expect(result.current.question).toEqual(questions[0]);
  });

  it("answer saves and advances", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    act(() => result.current.answer("no"));
    expect(result.current.index).toBe(1);
    expect(result.current.answers).toEqual({ sleep: "no" });
    expect(loadAnswers()).toEqual({ sleep: "no" });
  });

  it("last answer produces the report", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    for (let i = 0; i < 10; i++) {
      act(() => result.current.answer(i === 0 ? "no" : "yes"));
    }
    expect(result.current.status).toBe("report");
    expect(result.current.report?.score).toBe(9);
    expect(result.current.report?.weaknesses.map((w) => w.id)).toEqual(["sleep"]);
  });

  it("back goes to the previous question keeping answers, and answers can change", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    act(() => result.current.answer("yes"));
    act(() => result.current.back());
    expect(result.current.index).toBe(0);
    expect(result.current.answers).toEqual({ sleep: "yes" });
    act(() => result.current.answer("no"));
    expect(result.current.answers).toEqual({ sleep: "no" });
    expect(result.current.index).toBe(1);
  });

  it("back from the first question returns to intro", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    act(() => result.current.back());
    expect(result.current.status).toBe("intro");
  });

  it("restart clears storage and returns to intro", () => {
    const { result } = renderHook(() => useHealthCheck());
    act(() => result.current.start());
    act(() => result.current.answer("yes"));
    act(() => result.current.restart());
    expect(result.current.status).toBe("intro");
    expect(result.current.answers).toEqual({});
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("resumes at the first unanswered question after reload", () => {
    saveAnswers({ sleep: "yes", exercise: "no" });
    const { result } = renderHook(() => useHealthCheck());
    expect(result.current.status).toBe("question");
    expect(result.current.index).toBe(2);
    expect(result.current.answers).toEqual({ sleep: "yes", exercise: "no" });
  });

  it("lands on the report when fully answered", () => {
    saveAnswers(Object.fromEntries(questions.map((q) => [q.id, "yes" as const])));
    const { result } = renderHook(() => useHealthCheck());
    expect(result.current.status).toBe("report");
    expect(result.current.report?.score).toBe(10);
  });

  it("ignores corrupt storage", () => {
    localStorage.setItem(KEY, "garbage");
    const { result } = renderHook(() => useHealthCheck());
    expect(result.current.status).toBe("intro");
  });
});
