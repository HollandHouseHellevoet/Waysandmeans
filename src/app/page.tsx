import { getAllMembers, getVoteCountsForMember, getAllDonationTotals } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import StatBadge from "@/components/StatBadge";
import MemberGrid from "@/components/MemberGrid";

export default function Home() {
  const members = getAllMembers();
  const republicans = members.filter((m) => m.party === "R");
  const democrats = members.filter((m) => m.party === "D");

  const voteCounts: Record<
    string,
    { total: number; yea: number; nay: number; notVoting: number }
  > = {};
  for (const member of members) {
    voteCounts[member.id] = getVoteCountsForMember(member.id);
  }
  const donationTotals = getAllDonationTotals("2024");
  const totalHealthcareMoney = Object.values(donationTotals).reduce(
    (sum, v) => sum + v,
    0
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-rojas-bg-alt border-b border-rojas-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center px-2 py-0.5 border border-rojas-accent text-rojas-accent text-xs font-sans font-medium tracking-wider">
              WAYS &amp; MEANS
            </span>
            <span className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium">
              Committee Profiles
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-rojas-text font-bold leading-tight">
            Follow the Money.{" "}
            <span className="text-rojas-accent">Follow the Votes.</span>
          </h1>
          <p className="mt-6 text-rojas-text-secondary leading-relaxed max-w-3xl text-lg">
            Healthcare intelligence profiles for every member of the House Ways
            and Means Committee. How they vote on healthcare bills, who funds
            their campaigns, and what they trade.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-rojas-accent" />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-rojas-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBadge
              value={String(members.length)}
              label="Committee Members"
              sublabel="119th Congress (2025-2026)"
            />
            <StatBadge
              value={String(republicans.length)}
              label="Republicans"
              sublabel="Majority party"
            />
            <StatBadge
              value={String(democrats.length)}
              label="Democrats"
              sublabel="Minority party"
            />
            <StatBadge
              value={`$${(totalHealthcareMoney / 1000000).toFixed(1)}M`}
              label="Healthcare Money"
              sublabel="2024 cycle contributions"
            />
          </div>
        </div>
      </section>

      {/* Member Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeader
            number="01"
            label="Member Profiles"
            title="The Committee"
            description="Every member of the House Ways and Means Committee. Select a profile to see their healthcare voting record and campaign donations."
          />
          <MemberGrid members={members} voteCounts={voteCounts} donationTotals={donationTotals} />
        </div>
      </section>
    </div>
  );
}
