import type { Donation } from "@/lib/types";

function SectorTag({ sector }: { sector: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-rojas-accent border border-rojas-accent/40">
      {sector}
    </span>
  );
}

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
}

export default function DonorRecord({ donation }: { donation: Donation }) {
  const pacPct = Math.round((donation.pacAmount / donation.total) * 100);

  return (
    <div className="border-l-3 border-rojas-border hover:border-rojas-accent bg-rojas-card p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <SectorTag sector={donation.sector} />
            <span className="text-xs text-rojas-text-muted font-sans">
              {donation.cycle} cycle
            </span>
          </div>
          <h4 className="font-serif text-base text-rojas-text font-semibold">
            {donation.organization}
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-rojas-text-muted font-sans">
            <span>
              PAC: {formatCurrency(donation.pacAmount)} ({pacPct}%)
            </span>
            <span>
              Individual: {formatCurrency(donation.individualAmount)} (
              {100 - pacPct}%)
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-serif text-xl text-rojas-accent font-bold">
            {formatCurrency(donation.total)}
          </div>
        </div>
      </div>
    </div>
  );
}
