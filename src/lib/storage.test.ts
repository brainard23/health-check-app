import { clearAnswers, loadAnswers, saveAnswers } from "./storage";

const KEY = "health-check:v1";

describe("storage", () => {
  it("round-trips answers", () => {
    saveAnswers({ "business-plan": "yes", "work-on-business": "no" });
    expect(loadAnswers()).toEqual({ "business-plan": "yes", "work-on-business": "no" });
  });

  it("uses the v1 key", () => {
    saveAnswers({ "business-plan": "no" });
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({ "business-plan": "no" });
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
      JSON.stringify({ "business-plan": "yes", bogus: "no", "break-even": "maybe", processes: 1 }),
    );
    expect(loadAnswers()).toEqual({ "business-plan": "yes" });
  });

  it("clearAnswers removes saved data", () => {
    saveAnswers({ "business-plan": "yes" });
    clearAnswers();
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(loadAnswers()).toEqual({});
  });

  describe("without window (SSR)", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("is safe to call", () => {
      vi.stubGlobal("window", undefined);
      expect(loadAnswers()).toEqual({});
      expect(() => saveAnswers({ "business-plan": "yes" })).not.toThrow();
      expect(() => clearAnswers()).not.toThrow();
    });
  });
});
