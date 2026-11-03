# Slices — Business Health Check

PRD: `prd.md` · Design: `design.md`

## S1 — Domain: questions, scoring, persisted answers

**Blocked by:** none

Files: `src/data/questions.ts`, `src/lib/report.ts`, `src/lib/storage.ts`,
`src/hooks/useHealthCheck.ts` (+ colocated `*.test.ts`).

Contract:

```ts
export type Answer = "yes" | "no";
export type Question = { id: string; text: string; impact: string };
export type Answers = Partial<Record<string, Answer>>;      // keyed by question id
export type Weakness = { id: string; question: string; impact: string };
export type Report = { score: number; max: number; verdict: string; weaknesses: Weakness[] };

buildReport(questions: Question[], answers: Answers): Report
loadAnswers(): Answers        // safe on SSR, bad JSON, unknown ids, bad values → {}/filtered
saveAnswers(a: Answers): void
clearAnswers(): void

useHealthCheck() → {
  status: "intro" | "question" | "report"; hydrated: boolean;
  index: number; question: Question; total: number; answers: Answers;
  start(); answer(a: Answer); back(); restart(); report: Report | null;
}
```

Acceptance:
- [ ] 10 questions exactly as in PRD table, unique ids.
- [ ] Score = 10 − (#No); all Yes → 10, all No → 0; max is 10.
- [ ] Weaknesses = one per No, in question order, with the question's impact text; Yes answers produce nothing.
- [ ] Verdict bands per PRD (boundaries 9, 7, 4 tested).
- [ ] Answers persisted to localStorage `health-check:v1` on every answer; restored on mount; corrupt JSON / foreign values ignored.
- [ ] Hook: answer saves + advances; last answer → report; back goes to previous question keeping answers; restart clears storage → intro; reload mid-quiz resumes at first unanswered question; fully answered → report.
- [ ] Unit tests for report/storage, hook tests via `renderHook`. `npm test`, `npm run typecheck`, `npm run lint` green.

## S2 — UI: intro, question flow, report (design spec)

**Blocked by:** S1

Files: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`,
`src/components/{HealthCheck,Intro,QuestionStep,ProgressBar,AnswerButtons,Report,ScoreRing}.tsx` (+ tests).

Acceptance:
- [ ] Implements `design.md` (tokens, font, icons, layout, motion, a11y checklist).
- [ ] Clicking Yes/No advances immediately; `Y`/`N` keys work; Back works; progress shows "Question n of 10".
- [ ] Report shows `n/10`, verdict, one card per No with impact sentence, nothing for Yes; all-Yes empty state; Retake resets.
- [ ] No hydration mismatch (render nothing/skeleton until `hydrated`).
- [ ] Flow tests (Testing Library + user-event): full run with 3 No → score 7 and exactly those 3 weaknesses shown, Yes questions absent; all-Yes state; back changes an answer; reload restores.
- [ ] `npm test`, `typecheck`, `lint`, `npm run build` green.
