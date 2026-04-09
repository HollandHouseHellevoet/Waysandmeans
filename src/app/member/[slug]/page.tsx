import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllMembers,
  getMemberBySlug,
  getVotesForMember,
  getVoteCountsForMember,
} from "@/lib/data";
import ProfileHeader from "@/components/ProfileHeader";
import VotingHistory from "@/components/VotingHistory";
import SectionHeader from "@/components/SectionHeader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const members = getAllMembers();
  return members.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return { title: "Member Not Found" };

  const party = member.party === "R" ? "Republican" : "Democrat";
  return {
    title: `${member.firstName} ${member.lastName} (${party}-${member.state})`,
    description: `Healthcare profile for Rep. ${member.firstName} ${member.lastName}. Voting record on healthcare bills, campaign donations from the healthcare industry, and stock trades.`,
    openGraph: {
      title: `${member.firstName} ${member.lastName} | Ways & Means Healthcare Profile`,
      description: member.bio,
    },
  };
}

export default async function MemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const votes = getVotesForMember(member.id);
  const voteCounts = getVoteCountsForMember(member.id);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs tracking-[0.1em] uppercase text-rojas-accent font-sans font-medium hover:text-rojas-accent-hover transition-colors"
        >
          &larr; All Members
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProfileHeader member={member} voteCounts={voteCounts} />

        <div className="mt-12">
          <VotingHistory votes={votes} />
        </div>

        {/* Coming Soon sections */}
        <div className="mt-12">
          <SectionHeader
            number="02"
            label="Campaign Finance"
            title="Healthcare Donations"
            description="Campaign contributions from healthcare and healthcare-adjacent companies. Coming soon."
          />
          <div className="border-l-3 border-rojas-border bg-rojas-card p-8 text-center">
            <p className="font-serif text-xl text-rojas-text-muted">
              Coming Soon
            </p>
            <p className="mt-2 text-sm text-rojas-text-muted">
              Donation data from healthcare PACs, hospital systems, insurers,
              and pharmaceutical companies.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeader
            number="03"
            label="Financial Disclosures"
            title="Stock Trades"
            description="Healthcare-related stock transactions reported by this member. Coming soon."
          />
          <div className="border-l-3 border-rojas-border bg-rojas-card p-8 text-center">
            <p className="font-serif text-xl text-rojas-text-muted">
              Coming Soon
            </p>
            <p className="mt-2 text-sm text-rojas-text-muted">
              Stock trades in healthcare companies sourced from Capitol Trades
              financial disclosure data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
