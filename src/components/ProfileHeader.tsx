import type { Member } from "@/lib/types";

interface ProfileHeaderProps {
  member: Member;
  voteCounts: { total: number; yea: number; nay: number; notVoting: number };
  donationTotal?: number;
}

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
}

export default function ProfileHeader({
  member,
  voteCounts,
  donationTotal,
}: ProfileHeaderProps) {
  const partyColor =
    member.party === "R" ? "bg-party-republican" : "bg-party-democrat";
  const partyLabel = member.party === "R" ? "Republican" : "Democrat";
  const partyBorder =
    member.party === "R" ? "border-party-republican" : "border-party-democrat";

  return (
    <div className={`border-l-4 ${partyBorder} bg-rojas-card p-6 sm:p-8`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm bg-rojas-border flex items-center justify-center shrink-0">
          <span className="font-serif text-2xl sm:text-3xl text-rojas-text-muted">
            {member.firstName[0]}
            {member.lastName[0]}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            {member.role && (
              <span className="text-[10px] tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium border border-rojas-accent px-2 py-0.5">
                {member.role}
              </span>
            )}
            {member.healthcareSubcommittee && (
              <span className="text-[10px] tracking-[0.15em] uppercase text-rojas-text-muted font-sans font-medium border border-rojas-border px-2 py-0.5">
                Health Subcommittee
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-rojas-text font-bold">
            {member.firstName}{" "}
            <span className="text-rojas-accent">{member.lastName}</span>
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-sans text-rojas-text-secondary">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${partyColor}`} />
              <span>{partyLabel}</span>
            </div>
            <span>
              {member.state}-{member.district}
            </span>
            <span>Serving since {member.termStart}</span>
          </div>

          <p className="mt-4 text-sm text-rojas-text-secondary leading-relaxed max-w-2xl">
            {member.bio}
          </p>

          {voteCounts.total > 0 && (
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <div className="font-serif text-2xl text-rojas-accent font-bold">
                  {voteCounts.total}
                </div>
                <div className="text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Votes Tracked
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl text-vote-yea font-bold">
                  {voteCounts.yea}
                </div>
                <div className="text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Yea
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl text-vote-nay font-bold">
                  {voteCounts.nay}
                </div>
                <div className="text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Nay
                </div>
              </div>
              {donationTotal != null && donationTotal > 0 && (
                <div className="ml-auto sm:ml-6 pl-6 border-l border-rojas-border">
                  <div className="font-serif text-2xl text-rojas-accent font-bold">
                    {formatCurrency(donationTotal)}
                  </div>
                  <div className="text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                    Healthcare $
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
