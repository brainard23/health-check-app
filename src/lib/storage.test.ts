import { clearAnswers, loadAnswers, saveAnswers } from "./storage";

const KEY = "health-check:v1";

describe("storage", () => {
  it("round-trips answers", () => {
    saveAnswers({ sleep: "yes", support: "no" });
    expect(loadAnswers()).toEqual({ sleep: "yes", support: "no" });
  });

  it("uses the v1 key", () => {
    saveAnswers({ sleep: "no" });
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({ sleep: "no" });
  });

  it("returns {} when empty", () => {
    expect(loadAnswers()).toEqual({});
  });

  it("returns {} on corrupt JSON", () => {
    localStorage.setItem(KEY, "{not json");
    expect(loadAnswers()).toEqual({});
  });

  it.each(["[]", "null", '"str"', "42"])("returns {} for non-object %s", (raw) => {
    localStorage.setItem(KEY, raw);
    expect(loadAnswers()).toEqual({});
  });

  it("filters unknown ids and invalid values", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ sleep: "yes", bogus: "no", exercise: "maybe", stress: 1 }),
    );
    expect(loadAnswers()).toEqual({ sleep: "yes" });
  });

  it("clearAnswers removes saved data", () => {
    saveAnswers({ sleep: "yes" });
    clearAnswers();
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(loadAnswers()).toEqual({});
  });

  describe("without window (SSR)", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("is safe to call", () => {
      vi.stubGlobal("window", undefined);
      expect(loadAnswers()).toEqual({});
      expect(() => saveAnswers({ sleep: "yes" })).not.toThrow();
      expect(() => clearAnswers()).not.toThrow();
    });
  });
});
