# PRD — Business Health Check (Area 1: Business Foundations)

## Problem

Business owners often run day to day without checking the foundations of the business. A quick
10-question Yes/No check turns those gaps into a score and a plain-language list of
weaknesses, each tied to its impact on the owner.

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
| D2 | Topic: business foundations (planning, finances, customers, systems, legal, owner time); impacts framed on the owner. Questions are fixed copy in `src/data/questions.ts` (table below). Changed 2026-11-03 from owner personal-health questions at Brainard's request. |
| D3 | One question per screen; answers are only Yes/No. Selecting an answer saves it and auto-advances. A Back control lets the user revisit and change the previous answer. |
| D4 | "Save" = answers persisted to `localStorage` (key `health-check:v1`). Refresh resumes where the user left off; finished users land back on the report. Corrupt/foreign storage data is ignored (fresh start). |
| D5 | Report shows `score/10`, a short verdict band, and one weakness card per No (question order). All-Yes shows an explicit "no weaknesses" state. Restart clears saved answers. |
| D6 | Scoring is a pure function (`buildReport`) — the single source of truth for score + weaknesses; UI never recomputes. |
| D7 | Tests: Vitest + Testing Library. Unit tests for domain logic AND component/flow tests for the UI. |
| D8 | Repo `~/health-check-app`, private GitHub `brainard23/health-check-app`; deployed to Vercel (https://health-check-app-mu.vercel.app) via CLI. |

## Questions

| id | Question | Impact (shown when answered No) |
|----|----------|---------------------------------|
| business-plan | Do you have a written business plan with clear goals for the next 12 months? | Without clear goals, your time and money go to whatever feels urgent rather than what actually grows the business. |
| break-even | Do you know your monthly break-even point (the sales needed to cover all costs)? | Without knowing your break-even point, you can't tell if the business is really making money until it's too late to fix. |
| separate-finances | Do you keep business and personal finances in separate bank accounts? | Mixing finances hides your true profit, complicates taxes, and puts your personal assets at risk. |
| monthly-pl | Do you review your profit and loss figures at least once a month? | Without regular reviews, rising costs and falling margins go unnoticed until they become a cash crisis. |
| cash-reserve | Do you have at least 3 months of operating expenses saved as a cash reserve? | Without a cash buffer, one slow month or late-paying client can force you into debt or closure. |
| ideal-customer | Do you clearly know who your ideal customer is? | Without a clear target customer, your marketing reaches the wrong people and wastes money. |
| processes | Do you have documented processes for your key business tasks? | Without written processes, the business depends on you for everything and can't run or grow without you. |
| runs-without-you | Could the business run for two weeks without you being there? | If the business stops when you step away, you have bought yourself a job, not built a business you can grow or sell. |
| legal-protection | Do you have the right business licenses, insurance and contracts in place? | Gaps in legal protection leave you open to fines, lawsuits and losses that could wipe out years of work. |
| work-on-business | Do you set aside time each week to work on the business, not just in it? | When all your time goes to daily tasks, there's none left for planning and improvements, so the business stays stuck. |

## Verdict bands (score → label)

- 9–10: "Excellent shape"
- 7–8: "Good, with room to improve"
- 4–6: "Needs attention"
- 0–3: "At risk"

## Out of scope

Accounts, server storage, multiple areas, analytics, PDF export, i18n.

## Slices

See `issues.md`.
