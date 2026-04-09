"use client";

import { useState } from "react";
import type { Member } from "@/lib/types";
import MemberCard from "./MemberCard";
import PartyFilter from "./PartyFilter";

interface MemberGridProps {
  members: Member[];
  voteCounts: Record<string, { total: number; yea: number; nay: number; notVoting: number }>;
}

export default function MemberGrid({ members, voteCounts }: MemberGridProps) {
  const [partyFilter, setPartyFilter] = useState<"all" | "R" | "D">("all");

  const filtered =
    partyFilter === "all"
      ? members
      : members.filter((m) => m.party === partyFilter);

  const counts = {
    all: members.length,
    R: members.filter((m) => m.party === "R").length,
    D: members.filter((m) => m.party === "D").length,
  };

  return (
    <div>
      <div className="mb-6">
        <PartyFilter
          selected={partyFilter}
          onChange={setPartyFilter}
          counts={counts}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            voteCounts={voteCounts[member.id]}
          />
        ))}
      </div>
    </div>
  );
}
