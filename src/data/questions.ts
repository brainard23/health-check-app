export type Answer = "yes" | "no";
export type Question = { id: string; text: string; impact: string };

export const questions: Question[] = [
  {
    id: "business-plan",
    text: "Do you have a written business plan with clear goals for the next 12 months?",
    impact:
      "Without clear goals, your time and money go to whatever feels urgent rather than what actually grows the business.",
  },
  {
    id: "break-even",
    text: "Do you know your monthly break-even point (the sales needed to cover all costs)?",
    impact:
      "Without knowing your break-even point, you can't tell if the business is really making money until it's too late to fix.",
  },
  {
    id: "separate-finances",
    text: "Do you keep business and personal finances in separate bank accounts?",
    impact:
      "Mixing finances hides your true profit, complicates taxes, and puts your personal assets at risk.",
  },
  {
    id: "monthly-pl",
    text: "Do you review your profit and loss figures at least once a month?",
    impact:
      "Without regular reviews, rising costs and falling margins go unnoticed until they become a cash crisis.",
  },
  {
    id: "cash-reserve",
    text: "Do you have at least 3 months of operating expenses saved as a cash reserve?",
    impact:
      "Without a cash buffer, one slow month or late-paying client can force you into debt or closure.",
  },
  {
    id: "ideal-customer",
    text: "Do you clearly know who your ideal customer is?",
    impact:
      "Without a clear target customer, your marketing reaches the wrong people and wastes money.",
  },
  {
    id: "processes",
    text: "Do you have documented processes for your key business tasks?",
    impact:
      "Without written processes, the business depends on you for everything and can't run or grow without you.",
  },
  {
    id: "runs-without-you",
    text: "Could the business run for two weeks without you being there?",
    impact:
      "If the business stops when you step away, you have bought yourself a job, not built a business you can grow or sell.",
  },
  {
    id: "legal-protection",
    text: "Do you have the right business licenses, insurance and contracts in place?",
    impact:
      "Gaps in legal protection leave you open to fines, lawsuits and losses that could wipe out years of work.",
  },
  {
    id: "work-on-business",
    text: "Do you set aside time each week to work on the business, not just in it?",
    impact:
      "When all your time goes to daily tasks, there's none left for planning and improvements, so the business stays stuck.",
  },
];
