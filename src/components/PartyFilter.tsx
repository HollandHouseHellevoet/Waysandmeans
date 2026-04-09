"use client";

interface PartyFilterProps {
  selected: "all" | "R" | "D";
  onChange: (party: "all" | "R" | "D") => void;
  counts: { all: number; R: number; D: number };
}

export default function PartyFilter({
  selected,
  onChange,
  counts,
}: PartyFilterProps) {
  const options: { value: "all" | "R" | "D"; label: string }[] = [
    { value: "all", label: `All Members (${counts.all})` },
    { value: "R", label: `Republican (${counts.R})` },
    { value: "D", label: `Democrat (${counts.D})` },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 text-xs tracking-[0.1em] uppercase font-sans font-medium transition-colors ${
            selected === opt.value
              ? "bg-rojas-accent text-white"
              : "border border-rojas-border text-rojas-text-secondary hover:border-rojas-accent hover:text-rojas-accent"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
