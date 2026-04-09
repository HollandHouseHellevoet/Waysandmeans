import Link from "next/link";
import type { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
  voteCounts?: { total: number; yea: number; nay: number; notVoting: number };
}

export default function MemberCard({ member, voteCounts }: MemberCardProps) {
  const partyColor =
    member.party === "R" ? "border-party-republican" : "border-party-democrat";
  const partyBg =
    member.party === "R" ? "bg-party-republican" : "bg-party-democrat";
  const partyLabel = member.party === "R" ? "Republican" : "Democrat";

  return (
    <Link href={`/member/${member.id}`}>
      <div
        className={`border-l-3 ${partyColor} bg-rojas-card hover:bg-rojas-card-hover transition-colors p-5 h-full flex flex-col`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-serif text-lg text-rojas-text font-semibold leading-tight">
              {member.firstName} {member.lastName}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${partyBg}`}
              />
              <span className="text-xs text-rojas-text-muted font-sans">
                {partyLabel} &middot; {member.state}-{member.district}
              </span>
            </div>
          </div>
          {member.role && (
            <span className="text-[10px] tracking-[0.1em] uppercase text-rojas-accent font-sans font-medium border border-rojas-accent px-2 py-0.5 shrink-0">
              {member.role === "Health Subcommittee Chair"
                ? "Health Chair"
                : member.role === "Health Subcommittee Ranking Member"
                  ? "Health RM"
                  : member.role}
            </span>
          )}
        </div>

        <p className="text-xs text-rojas-text-muted leading-relaxed line-clamp-2 flex-1">
          {member.bio}
        </p>

        {voteCounts && voteCounts.total > 0 && (
          <div className="mt-3 pt-3 border-t border-rojas-border flex items-center gap-4 text-xs font-sans">
            <span className="text-vote-yea">
              {voteCounts.yea} Yea
            </span>
            <span className="text-vote-nay">
              {voteCounts.nay} Nay
            </span>
            {voteCounts.notVoting > 0 && (
              <span className="text-rojas-text-muted">
                {voteCounts.notVoting} Absent
              </span>
            )}
          </div>
        )}

        <div className="mt-3 text-xs tracking-[0.1em] uppercase text-rojas-accent font-sans font-medium">
          View Profile &rarr;
        </div>
      </div>
    </Link>
  );
}
