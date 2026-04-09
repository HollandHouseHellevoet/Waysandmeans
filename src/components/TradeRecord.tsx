import type { Trade } from "@/lib/types";

function SectorTag({ sector }: { sector: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-rojas-accent border border-rojas-accent/40">
      {sector}
    </span>
  );
}

function TypeBadge({ type }: { type: Trade["type"] }) {
  const isPurchase = type === "Purchase";
  const style = isPurchase
    ? "bg-vote-yea/20 text-vote-yea border-vote-yea"
    : "bg-vote-nay/20 text-vote-nay border-vote-nay";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-sans font-semibold tracking-wider uppercase border ${style}`}
    >
      {type}
    </span>
  );
}

export default function TradeRecord({ trade }: { trade: Trade }) {
  return (
    <div className="border-l-3 border-rojas-border hover:border-rojas-accent bg-rojas-card p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <SectorTag sector={trade.sector} />
            <span className="text-xs text-rojas-text-muted font-sans">
              {new Date(trade.transactionDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h4 className="font-serif text-base text-rojas-text font-semibold">
            {trade.company}
            <span className="ml-2 text-sm text-rojas-accent font-sans font-medium">
              {trade.ticker}
            </span>
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-rojas-text-muted font-sans">
            <span>{trade.amount}</span>
            <span>Owner: {trade.owner}</span>
            <span>
              Filed{" "}
              {new Date(trade.filingDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {trade.capitolTradesUrl && (
              <a
                href={trade.capitolTradesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rojas-accent hover:text-rojas-accent-hover transition-colors tracking-[0.05em] uppercase"
              >
                Capitol Trades &rarr;
              </a>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <TypeBadge type={trade.type} />
        </div>
      </div>
    </div>
  );
}
