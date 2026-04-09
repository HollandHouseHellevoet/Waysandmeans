"use client";

import { useState } from "react";
import type { Member } from "@/lib/types";
import MemberCard from "./MemberCard";
import PartyFilter from "./PartyFilter";

type SortOption = "name" | "donations" | "seniority";

interface MemberGridProps {
  members: Member[];
  voteCounts: Record<string, { total: number; yea: number; nay: number; notVoting: number }>;
  donationTotals?: Record<string, number>;
}

export default function MemberGrid({ members, voteCounts, donationTotals }: MemberGridProps) {
  const [partyFilter, setPartyFilter] = useState<"all" | "R" | "D">("all");
  const [sort, setSort] = useState<SortOption>("donations");

  const filtered =
    partyFilter === "all"
      ? members
      : members.filter((m) => m.party === partyFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "donations") {
      return (donationTotals?.[b.id] ?? 0) - (donationTotals?.[a.id] ?? 0);
    }
    if (sort === "seniority") {
      return a.termStart - b.termStart;
    }
    return a.lastName.localeCompare(b.lastName);
  });

  const counts = {
    all: members.length,
    R: members.filter((m) => m.party === "R").length,
    D: members.filter((m) => m.party === "D").length,
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "donations", label: "Top Healthcare $" },
    { value: "seniority", label: "Seniority" },
    { value: "name", label: "Name" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <PartyFilter
          selected={partyFilter}
          onChange={setPartyFilter}
          counts={counts}
        />
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-rojas-text-muted font-sans uppercase tracking-wider">Sort</span>
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`px-3 py-1.5 text-xs tracking-[0.05em] font-sans font-medium transition-colors ${
                sort === opt.value
                  ? "bg-rojas-card text-rojas-accent border border-rojas-accent"
                  : "text-rojas-text-muted hover:text-rojas-text-secondary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            voteCounts={voteCounts[member.id]}
            donationTotal={donationTotals?.[member.id]}
          />
        ))}
      </div>
    </div>
  );
}
