import type { Bill, Vote } from "@/lib/types";

interface VoteRecordProps {
  vote: Vote & { bill: Bill };
}

function VoteBadge({ vote }: { vote: Vote["vote"] }) {
  const styles = {
    Yea: "bg-vote-yea/20 text-vote-yea border-vote-yea",
    Nay: "bg-vote-nay/20 text-vote-nay border-vote-nay",
    "Not Voting": "bg-vote-absent/20 text-vote-absent border-vote-absent",
    Present: "bg-vote-absent/20 text-vote-absent border-vote-absent",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-sans font-semibold tracking-wider uppercase border ${styles[vote]}`}
    >
      {vote}
    </span>
  );
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-rojas-accent border border-rojas-accent/40">
      {category}
    </span>
  );
}

export default function VoteRecord({ vote }: VoteRecordProps) {
  const { bill } = vote;

  return (
    <div className="border-l-3 border-rojas-border hover:border-rojas-accent bg-rojas-card p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <CategoryTag category={bill.category} />
            <span className="text-xs text-rojas-text-muted font-sans">
              {bill.number} &middot;{" "}
              {new Date(bill.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h4 className="font-serif text-base text-rojas-text font-semibold">
            {bill.shortTitle}
          </h4>
          <p className="mt-1 text-xs text-rojas-text-muted leading-relaxed">
            {bill.description}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`text-xs font-sans font-medium ${
                bill.result === "Passed"
                  ? "text-vote-yea"
                  : bill.result === "Failed"
                    ? "text-vote-nay"
                    : "text-rojas-text-muted"
              }`}
            >
              {bill.result}
            </span>
            <a
              href={bill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-rojas-accent hover:text-rojas-accent-hover transition-colors font-sans tracking-[0.05em] uppercase"
            >
              Congress.gov &rarr;
            </a>
          </div>
        </div>
        <div className="shrink-0">
          <VoteBadge vote={vote.vote} />
        </div>
      </div>
    </div>
  );
}
