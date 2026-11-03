export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-label="Progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      className="h-2 w-full overflow-hidden rounded-full bg-line"
    >
      <div
        className="h-full origin-left rounded-full bg-primary transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${total > 0 ? current / total : 0})` }}
      />
    </div>
  );
}
