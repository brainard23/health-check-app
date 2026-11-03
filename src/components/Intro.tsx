export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="animate-rise-in">
      <p className="text-sm font-medium text-primary">Business Health Check · Area 1</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">How healthy is your business?</h1>
      <p className="mt-3 text-muted">10 quick yes/no questions. Takes about a minute.</p>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 min-h-14 w-full cursor-pointer rounded-2xl bg-primary px-6 text-lg font-semibold text-on-primary transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
      >
        Start the check
      </button>
    </section>
  );
}
