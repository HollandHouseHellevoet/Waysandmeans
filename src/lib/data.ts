import membersData from "../../data/members.json";
import billsData from "../../data/bills.json";
import votesData from "../../data/votes.json";
import donationsData from "../../data/donations.json";
import tradesData from "../../data/trades.json";
import type { Member, Bill, Vote, Donation, Trade, HealthcareSector } from "./types";

const members: Member[] = membersData as Member[];
const bills: Bill[] = billsData as Bill[];
const votes: Vote[] = votesData as Vote[];
const donations: Donation[] = donationsData as Donation[];
const trades: Trade[] = tradesData as Trade[];

export function getAllMembers(): Member[] {
  return members;
}

export function getMemberBySlug(slug: string): Member | undefined {
  return members.find((m) => m.id === slug);
}

export function getMembersByParty(party: "R" | "D"): Member[] {
  return members.filter((m) => m.party === party);
}

export function getAllBills(): Bill[] {
  return bills;
}

export function getBillById(id: string): Bill | undefined {
  return bills.find((b) => b.id === id);
}

export function getVotesForMember(memberId: string): (Vote & { bill: Bill })[] {
  return votes
    .filter((v) => v.memberId === memberId)
    .map((v) => ({
      ...v,
      bill: bills.find((b) => b.id === v.billId)!,
    }))
    .filter((v) => v.bill)
    .sort((a, b) => new Date(b.bill.date).getTime() - new Date(a.bill.date).getTime());
}

export function getVoteCountsForMember(memberId: string) {
  const memberVotes = votes.filter((v) => v.memberId === memberId);
  return {
    total: memberVotes.length,
    yea: memberVotes.filter((v) => v.vote === "Yea").length,
    nay: memberVotes.filter((v) => v.vote === "Nay").length,
    notVoting: memberVotes.filter((v) => v.vote === "Not Voting").length,
  };
}

export function getDonationsForMember(
  memberId: string,
  cycle?: "2024" | "2022"
): Donation[] {
  return donations
    .filter(
      (d) => d.memberId === memberId && (cycle ? d.cycle === cycle : true)
    )
    .sort((a, b) => b.total - a.total);
}

export function getDonationSummaryForMember(
  memberId: string,
  cycle: "2024" | "2022" = "2024"
) {
  const memberDonations = donations.filter(
    (d) => d.memberId === memberId && d.cycle === cycle
  );
  const total = memberDonations.reduce((sum, d) => sum + d.total, 0);
  const totalPac = memberDonations.reduce((sum, d) => sum + d.pacAmount, 0);
  const totalIndividual = memberDonations.reduce(
    (sum, d) => sum + d.individualAmount,
    0
  );

  const bySector: Record<HealthcareSector, number> = {
    Pharmaceuticals: 0,
    "Hospitals & Nursing Homes": 0,
    "Health Services/HMOs": 0,
    "Health Professionals": 0,
    Insurance: 0,
  };
  for (const d of memberDonations) {
    bySector[d.sector] += d.total;
  }

  return { total, totalPac, totalIndividual, bySector, donorCount: memberDonations.length };
}

export function getTradesForMember(memberId: string): Trade[] {
  return trades
    .filter((t) => t.memberId === memberId)
    .sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime()
    );
}

export function getTradeSummaryForMember(memberId: string) {
  const memberTrades = trades.filter((t) => t.memberId === memberId);
  return {
    total: memberTrades.length,
    purchases: memberTrades.filter((t) => t.type === "Purchase").length,
    sales: memberTrades.filter(
      (t) => t.type === "Sale" || t.type === "Sale (Partial)" || t.type === "Sale (Full)"
    ).length,
  };
}

export function getAllTradeCounts() {
  const counts: Record<string, number> = {};
  for (const t of trades) {
    counts[t.memberId] = (counts[t.memberId] || 0) + 1;
  }
  return counts;
}

export function getVotesForBill(billId: string): (Vote & { member: Member })[] {
  return votes
    .filter((v) => v.billId === billId)
    .map((v) => ({
      ...v,
      member: members.find((m) => m.id === v.memberId)!,
    }))
    .filter((v) => v.member);
}

export function getAllDonationTotals(cycle: "2024" | "2022" = "2024") {
  const totals: Record<string, number> = {};
  for (const d of donations) {
    if (d.cycle === cycle) {
      totals[d.memberId] = (totals[d.memberId] || 0) + d.total;
    }
  }
  return totals;
}
