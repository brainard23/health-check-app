import { Check, X } from "lucide-react";
import type { Answer } from "@/data/questions";

const options = [
  { value: "yes", label: "Yes", Icon: Check },
  { value: "no", label: "No", Icon: X },
] as const;

type Props = { selected?: Answer; onAnswer: (a: Answer) => void };

export function AnswerButtons({ selected, onAnswer }: Props) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {options.map(({ value, label, Icon }) => {
        const pressed = selected === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={pressed}
            onClick={() => onAnswer(value)}
            className={`flex min-h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-6 text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              pressed
                ? "border-primary bg-primary text-on-primary"
                : "border-line bg-surface text-ink hover:border-primary"
            }`}
          >
            <Icon aria-hidden="true" className="size-5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
