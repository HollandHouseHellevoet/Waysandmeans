interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  number,
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center px-2 py-0.5 border border-rojas-accent text-rojas-accent text-xs font-sans font-medium tracking-wider">
          {number}
        </span>
        <span className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium">
          {label}
        </span>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-rojas-text font-bold">
        {title}
      </h2>
      {description && (
        <>
          <p className="mt-4 text-rojas-text-secondary leading-relaxed max-w-3xl">
            {description}
          </p>
          <div className="mt-4 w-16 h-0.5 bg-rojas-accent" />
        </>
      )}
    </div>
  );
}
