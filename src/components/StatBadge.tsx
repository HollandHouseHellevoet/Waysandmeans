interface StatBadgeProps {
  value: string;
  label: string;
  sublabel?: string;
}

export default function StatBadge({ value, label, sublabel }: StatBadgeProps) {
  return (
    <div className="border-l-3 border-rojas-accent bg-rojas-card p-6">
      <div className="font-serif text-3xl sm:text-4xl text-rojas-accent font-bold">
        {value}
      </div>
      <div className="mt-1 text-sm font-sans font-semibold text-rojas-text">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs text-rojas-text-muted">{sublabel}</div>
      )}
    </div>
  );
}
