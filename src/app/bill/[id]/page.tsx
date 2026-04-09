import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllBills, getBillById, getVotesForBill } from "@/lib/data";
import type { Member, Vote } from "@/lib/types";
import SectionHeader from "@/components/SectionHeader";
import MemberPhoto from "@/components/MemberPhoto";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllBills().map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const bill = getBillById(id);
  if (!bill) return { title: "Bill Not Found" };

  return {
    title: `${bill.shortTitle} — Vote Breakdown`,
    description: `How all 45 Ways and Means Committee members voted on ${bill.shortTitle} (${bill.number}).`,
    alternates: {
      canonical: `https://waysandmeans.rojasreport.com/bill/${id}`,
    },
  };
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

function MemberVoteRow({
  member,
  vote,
}: {
  member: Member;
  vote: Vote["vote"];
}) {
  const partyColor =
    member.party === "R" ? "border-party-republican" : "border-party-democrat";
  const partyBg =
    member.party === "R" ? "bg-party-republican" : "bg-party-democrat";
  const partyLabel = member.party === "R" ? "R" : "D";

  return (
    <Link href={`/member/${member.id}`}>
      <div
        className={`border-l-3 ${partyColor} bg-rojas-card hover:bg-rojas-card-hover transition-colors p-4 flex items-center gap-4`}
      >
        <MemberPhoto
          bioguideId={member.bioguideId}
          firstName={member.firstName}
          lastName={member.lastName}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="font-serif text-base text-rojas-text font-semibold">
            {member.firstName} {member.lastName}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`inline-block w-2 h-2 rounded-full ${partyBg}`} />
            <span className="text-xs text-rojas-text-muted font-sans">
              {partyLabel}-{member.state}-{member.district}
              {member.role ? ` · ${member.role}` : ""}
            </span>
          </div>
        </div>
        <VoteBadge vote={vote} />
      </div>
    </Link>
  );
}

export default async function BillPage({ params }: PageProps) {
  const { id } = await params;
  const bill = getBillById(id);
  if (!bill) notFound();

  const billVotes = getVotesForBill(bill.id);
  const yea = billVotes.filter((v) => v.vote === "Yea");
  const nay = billVotes.filter((v) => v.vote === "Nay");
  const notVoting = billVotes.filter(
    (v) => v.vote === "Not Voting" || v.vote === "Present"
  );

  const repYea = yea.filter((v) => v.member.party === "R").length;
  const demYea = yea.filter((v) => v.member.party === "D").length;
  const repNay = nay.filter((v) => v.member.party === "R").length;
  const demNay = nay.filter((v) => v.member.party === "D").length;

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
        {/* Bill header */}
        <div className="border-l-4 border-rojas-accent bg-rojas-card p-6 sm:p-8 mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-sans font-medium tracking-[0.1em] uppercase text-rojas-accent border border-rojas-accent/40">
              {bill.category}
            </span>
            <span className="text-xs text-rojas-text-muted font-sans">
              {bill.number} &middot;{" "}
              {new Date(bill.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-rojas-text font-bold">
            {bill.title}
          </h1>

          <p className="mt-4 text-rojas-text-secondary leading-relaxed max-w-3xl">
            {bill.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span
              className={`text-sm font-sans font-semibold ${
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
              className="text-xs tracking-[0.1em] uppercase text-rojas-accent hover:text-rojas-accent-hover transition-colors font-sans font-medium"
            >
              Congress.gov &rarr;
            </a>
          </div>
        </div>

        {/* Vote tally */}
        {billVotes.length > 0 && (
          <>
            <SectionHeader
              number="01"
              label="Vote Breakdown"
              title="How They Voted"
              description={`${billVotes.length} Ways and Means Committee members recorded.`}
            />

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="border-l-3 border-vote-yea bg-rojas-card p-5">
                <div className="font-serif text-3xl sm:text-4xl text-vote-yea font-bold">
                  {yea.length}
                </div>
                <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Yea
                </div>
                <div className="mt-2 text-xs text-rojas-text-muted font-sans">
                  {repYea}R / {demYea}D
                </div>
              </div>
              <div className="border-l-3 border-vote-nay bg-rojas-card p-5">
                <div className="font-serif text-3xl sm:text-4xl text-vote-nay font-bold">
                  {nay.length}
                </div>
                <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Nay
                </div>
                <div className="mt-2 text-xs text-rojas-text-muted font-sans">
                  {repNay}R / {demNay}D
                </div>
              </div>
              <div className="border-l-3 border-vote-absent bg-rojas-card p-5">
                <div className="font-serif text-3xl sm:text-4xl text-vote-absent font-bold">
                  {notVoting.length}
                </div>
                <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
                  Not Voting
                </div>
              </div>
            </div>

            {/* Yea votes */}
            {yea.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.15em] uppercase text-vote-yea font-sans font-medium mb-3">
                  Yea ({yea.length})
                </h3>
                <div className="space-y-2">
                  {yea
                    .sort((a, b) => a.member.party.localeCompare(b.member.party) || a.member.lastName.localeCompare(b.member.lastName))
                    .map((v) => (
                      <MemberVoteRow
                        key={v.memberId}
                        member={v.member}
                        vote={v.vote}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Nay votes */}
            {nay.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.15em] uppercase text-vote-nay font-sans font-medium mb-3">
                  Nay ({nay.length})
                </h3>
                <div className="space-y-2">
                  {nay
                    .sort((a, b) => a.member.party.localeCompare(b.member.party) || a.member.lastName.localeCompare(b.member.lastName))
                    .map((v) => (
                      <MemberVoteRow
                        key={v.memberId}
                        member={v.member}
                        vote={v.vote}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Not Voting */}
            {notVoting.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs tracking-[0.15em] uppercase text-vote-absent font-sans font-medium mb-3">
                  Not Voting ({notVoting.length})
                </h3>
                <div className="space-y-2">
                  {notVoting
                    .sort((a, b) => a.member.lastName.localeCompare(b.member.lastName))
                    .map((v) => (
                      <MemberVoteRow
                        key={v.memberId}
                        member={v.member}
                        vote={v.vote}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
