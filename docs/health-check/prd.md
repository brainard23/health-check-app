# PRD — Owner Health Check (Area 1)

## Problem

Business owners rarely notice how their own health habits drag on the business. A quick
10-question Yes/No check turns those habits into a score and a plain-language list of
weaknesses, each tied to its business impact.

## Requirements (from the brief)

1. Save the user's answers to all 10 questions.
2. Score starts at 10/10; subtract 1 point for each **No**.
3. Every **No** is listed in the report as a weakness, with one sentence explaining how it
   impacts the business owner.
4. **Yes** answers show nothing in the report.

## Locked decisions

| # | Decision |
|---|----------|
| D1 | Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4. No backend, no auth. |
| D2 | Topic: the owner's personal health & wellbeing; impacts framed on the business. Questions are fixed copy in `src/data/questions.ts` (table below). |
| D3 | One question per screen; answers are only Yes/No. Selecting an answer saves it and auto-advances. A Back control lets the user revisit and change the previous answer. |
| D4 | "Save" = answers persisted to `localStorage` (key `health-check:v1`). Refresh resumes where the user left off; finished users land back on the report. Corrupt/foreign storage data is ignored (fresh start). |
| D5 | Report shows `score/10`, a short verdict band, and one weakness card per No (question order). All-Yes shows an explicit "no weaknesses" state. Restart clears saved answers. |
| D6 | Scoring is a pure function (`buildReport`) — the single source of truth for score + weaknesses; UI never recomputes. |
| D7 | Tests: Vitest + Testing Library. Unit tests for domain logic AND component/flow tests for the UI. |
| D8 | Repo `~/health-check-app`, local git only. GitHub + Vercel deploy later, on Brainard's go. |

## Questions

| id | Question | Impact (shown when answered No) |
|----|----------|---------------------------------|
| sleep | Do you sleep at least 7 hours most nights? | Short sleep dulls focus and judgement, leading to slower and costlier business decisions. |
| exercise | Do you exercise at least 3 times a week? | Low physical activity drains your energy and stamina, reducing how much you get done each workday. |
| nutrition | Do you eat regular, balanced meals during work days? | Skipped or poor meals cause energy crashes that hurt your concentration during key meetings and tasks. |
| hydration | Do you drink enough water throughout the day? | Even mild dehydration causes fatigue and headaches that quietly cut your productivity. |
| rest-day | Do you take at least one full day off work each week? | Without real rest you head toward burnout, which can stall the whole business when you are its driving force. |
| checkup | Do you have a regular health check-up with a doctor each year? | Undetected health problems can turn into long absences that leave the business without its leader. |
| stress | Do you manage stress in a healthy way (not through alcohol, smoking, or overeating)? | Unhealthy coping wears down your health and temper, straining relationships with staff and clients. |
| breaks | Do you take short breaks during long work sessions? | Working nonstop lowers the quality of your work and raises the risk of costly mistakes. |
| switch-off | Do you limit work screen time in the evening so you can switch off? | Never switching off keeps you mentally tired, leaving less creativity and clear thinking for growing the business. |
| support | Do you have someone to talk to when work feels overwhelming? | Carrying pressure alone makes problems feel bigger and slows down how quickly you find solutions. |

## Verdict bands (score → label)

- 9–10: "Excellent shape"
- 7–8: "Good, with room to improve"
- 4–6: "Needs attention"
- 0–3: "At risk"

## Out of scope

Accounts, server storage, multiple areas, analytics, PDF export, i18n.

## Slices

See `issues.md`.
