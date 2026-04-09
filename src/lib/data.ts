import membersData from "../../data/members.json";
import billsData from "../../data/bills.json";
import votesData from "../../data/votes.json";
import type { Member, Bill, Vote } from "./types";

const members: Member[] = membersData as Member[];
const bills: Bill[] = billsData as Bill[];
const votes: Vote[] = votesData as Vote[];

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
