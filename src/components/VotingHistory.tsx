import type { Bill, Vote } from "@/lib/types";
import VoteRecord from "./VoteRecord";
import SectionHeader from "./SectionHeader";

interface VotingHistoryProps {
  votes: (Vote & { bill: Bill })[];
}

export default function VotingHistory({ votes }: VotingHistoryProps) {
  if (votes.length === 0) {
    return (
      <div>
        <SectionHeader
          number="01"
          label="Voting Record"
          title="Healthcare Votes"
          description="No healthcare voting records available for this member."
        />
      </div>
    );
  }

  const yeaCount = votes.filter((v) => v.vote === "Yea").length;
  const nayCount = votes.filter((v) => v.vote === "Nay").length;
  const absentCount = votes.filter(
    (v) => v.vote === "Not Voting" || v.vote === "Present"
  ).length;

  return (
    <div>
      <SectionHeader
        number="01"
        label="Voting Record"
        title="Healthcare Votes"
        description="How this member voted on key healthcare legislation tracked by The Rojas Report."
      />

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm font-sans">
          <span className="w-3 h-3 bg-vote-yea rounded-full" />
          <span className="text-rojas-text-secondary">
            {yeaCount} Yea
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm font-sans">
          <span className="w-3 h-3 bg-vote-nay rounded-full" />
          <span className="text-rojas-text-secondary">
            {nayCount} Nay
          </span>
        </div>
        {absentCount > 0 && (
          <div className="flex items-center gap-2 text-sm font-sans">
            <span className="w-3 h-3 bg-vote-absent rounded-full" />
            <span className="text-rojas-text-secondary">
              {absentCount} Not Voting
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {votes.map((vote) => (
          <VoteRecord key={`${vote.memberId}-${vote.billId}`} vote={vote} />
        ))}
      </div>
    </div>
  );
}
