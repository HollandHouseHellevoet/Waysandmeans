import type { Trade } from "@/lib/types";
import TradeRecord from "./TradeRecord";
import SectionHeader from "./SectionHeader";

interface TradeHistoryProps {
  trades: Trade[];
  bioguideId: string;
}

export default function TradeHistory({ trades, bioguideId }: TradeHistoryProps) {
  if (trades.length === 0) {
    return (
      <div>
        <SectionHeader
          number="03"
          label="Financial Disclosures"
          title="Stock Trades"
          description="Healthcare-related stock transactions reported by this member."
        />
        <div className="border-l-3 border-rojas-border bg-rojas-card p-6">
          <p className="text-sm text-rojas-text-muted">
            No healthcare-related stock trades on file for this member.
          </p>
          <a
            href={`https://www.capitoltrades.com/politicians/${bioguideId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs tracking-[0.1em] uppercase text-rojas-accent hover:text-rojas-accent-hover transition-colors font-sans font-medium"
          >
            View all trades on Capitol Trades &rarr;
          </a>
        </div>
      </div>
    );
  }

  const purchases = trades.filter((t) => t.type === "Purchase").length;
  const sales = trades.length - purchases;

  return (
    <div>
      <SectionHeader
        number="03"
        label="Financial Disclosures"
        title="Stock Trades"
        description="Healthcare-related stock transactions reported in financial disclosures."
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm font-sans">
          <span className="w-3 h-3 bg-vote-yea rounded-full" />
          <span className="text-rojas-text-secondary">
            {purchases} Purchase{purchases !== 1 && "s"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm font-sans">
          <span className="w-3 h-3 bg-vote-nay rounded-full" />
          <span className="text-rojas-text-secondary">
            {sales} Sale{sales !== 1 && "s"}
          </span>
        </div>
        <a
          href={`https://www.capitoltrades.com/politicians/${bioguideId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs tracking-[0.1em] uppercase text-rojas-accent hover:text-rojas-accent-hover transition-colors font-sans font-medium"
        >
          All trades on Capitol Trades &rarr;
        </a>
      </div>

      <div className="space-y-3">
        {trades.map((trade, i) => (
          <TradeRecord key={`${trade.memberId}-${trade.ticker}-${trade.transactionDate}-${i}`} trade={trade} />
        ))}
      </div>
    </div>
  );
}
