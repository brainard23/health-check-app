import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";
import { ScoreRing } from "./ScoreRing";

describe("ProgressBar", () => {
  it("exposes aria values", () => {
    render(<ProgressBar current={3} total={10} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "10");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
  });
});

describe("ScoreRing", () => {
  it("exposes score as a meter with text", () => {
    render(<ScoreRing score={7} max={10} />);
    const meter = screen.getByRole("meter");
    expect(meter).toHaveAttribute("aria-valuenow", "7");
    expect(meter).toHaveAttribute("aria-valuemax", "10");
    expect(meter).toHaveAttribute("aria-valuetext", "7 out of 10");
    expect(screen.getByText("7/10")).toBeInTheDocument();
  });
});
