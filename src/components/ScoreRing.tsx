const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreRing({ score, max }: { score: number; max: number }) {
  const offset = CIRCUMFERENCE * (1 - (max > 0 ? score / max : 0));
  return (
    <div
      role="meter"
      aria-label="Score"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={score}
      aria-valuetext={`${score} out of ${max}`}
      className="relative mx-auto size-40"
    >
      <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full -rotate-90">
        <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-line" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="stroke-primary"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold tabular-nums">
        {`${score}/${max}`}
      </span>
    </div>
  );
}
