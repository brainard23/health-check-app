import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HealthCheck } from "./HealthCheck";
import { questions } from "@/data/questions";

const KEY = "health-check:v1";

async function startQuiz() {
  const user = userEvent.setup();
  render(<HealthCheck />);
  await user.click(await screen.findByRole("button", { name: "Start the check" }));
  return user;
}

/** Answer every question; ids in `noIds` get No, the rest Yes. */
async function answerAll(user: ReturnType<typeof userEvent.setup>, noIds: string[]) {
  for (const q of questions) {
    await user.click(screen.getByRole("button", { name: noIds.includes(q.id) ? "No" : "Yes" }));
  }
}

describe("HealthCheck flow", () => {
  it("shows only the failing questions with impacts for a 7/10 run", async () => {
    const user = await startQuiz();
    const noIds = [questions[1].id, questions[4].id, questions[8].id];
    await answerAll(user, noIds);

    expect(screen.getByText("7/10")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your score: 7 out of 10" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Weaknesses (3)" })).toBeInTheDocument();
    for (const q of questions) {
      if (noIds.includes(q.id)) {
        expect(screen.getByText(q.text)).toBeInTheDocument();
        expect(screen.getByText(q.impact)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(q.text)).not.toBeInTheDocument();
        expect(screen.queryByText(q.impact)).not.toBeInTheDocument();
      }
    }
  });

  it("shows the no-weaknesses state for all Yes", async () => {
    const user = await startQuiz();
    await answerAll(user, []);
    expect(screen.getByText("10/10")).toBeInTheDocument();
    expect(screen.getByText(/No weaknesses found/)).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
  });

  it("shows 0/10 and ten cards for all No", async () => {
    const user = await startQuiz();
    await answerAll(user, questions.map((q) => q.id));
    expect(screen.getByText("0/10")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(10);
  });

  it("reflects a changed answer after Back", async () => {
    const user = await startQuiz();
    for (let i = 0; i < 9; i++) await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(screen.getByText("Question 10 of 10")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("Question 9 of 10")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "No" }));
    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(screen.getByText("9/10")).toBeInTheDocument();
    expect(screen.getByText(questions[8].text)).toBeInTheDocument();
  });

  it("updates progress text and answers with Y/N keys", async () => {
    const user = await startQuiz();
    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
    await user.keyboard("y");
    expect(screen.getByText("Question 2 of 10")).toBeInTheDocument();
    await user.keyboard("N");
    expect(screen.getByText("Question 3 of 10")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({
      [questions[0].id]: "yes",
      [questions[1].id]: "no",
    });
  });

  it("ignores Y/N with modifier keys", async () => {
    const user = await startQuiz();
    await user.keyboard("{Control>}y{/Control}");
    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  });

  it("Back on question 1 returns to the intro", async () => {
    const user = await startQuiz();
    await user.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});

describe("HealthCheck restore", () => {
  it("resumes at the first unanswered question", async () => {
    localStorage.setItem(KEY, JSON.stringify({ [questions[0].id]: "yes", [questions[1].id]: "no" }));
    render(<HealthCheck />);
    expect(await screen.findByText("Question 3 of 10")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: questions[2].text })).toBeInTheDocument();
  });

  it("shows the report when fully answered, and Retake clears storage", async () => {
    const all = Object.fromEntries(questions.map((q) => [q.id, "yes"]));
    localStorage.setItem(KEY, JSON.stringify(all));
    const user = userEvent.setup();
    render(<HealthCheck />);
    expect(await screen.findByText("10/10")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Retake the check" }));
    expect(screen.getByRole("button", { name: "Start the check" })).toBeInTheDocument();
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
