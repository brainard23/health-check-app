export type Answer = "yes" | "no";
export type Question = { id: string; text: string; impact: string };

export const questions: Question[] = [
  {
    id: "sleep",
    text: "Do you sleep at least 7 hours most nights?",
    impact:
      "Short sleep dulls focus and judgement, leading to slower and costlier business decisions.",
  },
  {
    id: "exercise",
    text: "Do you exercise at least 3 times a week?",
    impact:
      "Low physical activity drains your energy and stamina, reducing how much you get done each workday.",
  },
  {
    id: "nutrition",
    text: "Do you eat regular, balanced meals during work days?",
    impact:
      "Skipped or poor meals cause energy crashes that hurt your concentration during key meetings and tasks.",
  },
  {
    id: "hydration",
    text: "Do you drink enough water throughout the day?",
    impact:
      "Even mild dehydration causes fatigue and headaches that quietly cut your productivity.",
  },
  {
    id: "rest-day",
    text: "Do you take at least one full day off work each week?",
    impact:
      "Without real rest you head toward burnout, which can stall the whole business when you are its driving force.",
  },
  {
    id: "checkup",
    text: "Do you have a regular health check-up with a doctor each year?",
    impact:
      "Undetected health problems can turn into long absences that leave the business without its leader.",
  },
  {
    id: "stress",
    text: "Do you manage stress in a healthy way (not through alcohol, smoking, or overeating)?",
    impact:
      "Unhealthy coping wears down your health and temper, straining relationships with staff and clients.",
  },
  {
    id: "breaks",
    text: "Do you take short breaks during long work sessions?",
    impact:
      "Working nonstop lowers the quality of your work and raises the risk of costly mistakes.",
  },
  {
    id: "switch-off",
    text: "Do you limit work screen time in the evening so you can switch off?",
    impact:
      "Never switching off keeps you mentally tired, leaving less creativity and clear thinking for growing the business.",
  },
  {
    id: "support",
    text: "Do you have someone to talk to when work feels overwhelming?",
    impact:
      "Carrying pressure alone makes problems feel bigger and slows down how quickly you find solutions.",
  },
];
