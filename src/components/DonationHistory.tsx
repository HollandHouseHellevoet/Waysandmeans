"use client";

import { useState } from "react";
import type { Donation, HealthcareSector } from "@/lib/types";
import DonorRecord from "./DonorRecord";
import SectionHeader from "./SectionHeader";

interface DonationSummary {
  total: number;
  totalPac: number;
  totalIndividual: number;
  bySector: Record<HealthcareSector, number>;
  donorCount: number;
}

interface DonationHistoryProps {
  donations2024: Donation[];
  donations2022: Donation[];
  summary2024: DonationSummary;
  summary2022: DonationSummary;
}

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
}

const sectorOrder: HealthcareSector[] = [
  "Pharmaceuticals",
  "Hospitals & Nursing Homes",
  "Health Professionals",
  "Health Services/HMOs",
  "Insurance",
];

function SectorBar({
  sector,
  amount,
  maxAmount,
}: {
  sector: string;
  amount: number;
  maxAmount: number;
}) {
  const pct = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="w-40 sm:w-48 text-xs font-sans text-rojas-text-secondary truncate shrink-0">
        {sector}
      </div>
      <div className="flex-1 h-5 bg-rojas-bg rounded-sm overflow-hidden">
        <div
          className="h-full bg-rojas-accent/70 rounded-sm transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="w-20 text-right text-xs font-sans font-semibold text-rojas-text shrink-0">
        {formatCurrency(amount)}
      </div>
    </div>
  );
}

export default function DonationHistory({
  donations2024,
  donations2022,
  summary2024,
  summary2022,
}: DonationHistoryProps) {
  const [cycle, setCycle] = useState<"2024" | "2022">("2024");

  const activeDonations = cycle === "2024" ? donations2024 : donations2022;
  const activeSummary = cycle === "2024" ? summary2024 : summary2022;
  const maxSector = Math.max(...Object.values(activeSummary.bySector));

  return (
    <div>
      <SectionHeader
        number="02"
        label="Campaign Finance"
        title="Healthcare Donations"
        description="Campaign contributions from healthcare and healthcare-adjacent companies, PACs, and individuals."
      />

      {/* Cycle toggle */}
      <div className="flex gap-2 mb-6">
        {(["2024", "2022"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCycle(c)}
            className={`px-4 py-1.5 text-xs font-sans font-medium tracking-[0.1em] uppercase transition-colors ${
              cycle === c
                ? "bg-rojas-accent text-white"
                : "border border-rojas-border text-rojas-text-secondary hover:border-rojas-accent hover:text-rojas-accent"
            }`}
          >
            {c} Cycle
          </button>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="border-l-3 border-rojas-accent bg-rojas-card p-4">
          <div className="font-serif text-2xl sm:text-3xl text-rojas-accent font-bold">
            {formatCurrency(activeSummary.total)}
          </div>
          <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
            Total Healthcare
          </div>
        </div>
        <div className="border-l-3 border-rojas-border bg-rojas-card p-4">
          <div className="font-serif text-2xl sm:text-3xl text-rojas-text font-bold">
            {formatCurrency(activeSummary.totalPac)}
          </div>
          <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
            PAC Money
          </div>
        </div>
        <div className="border-l-3 border-rojas-border bg-rojas-card p-4">
          <div className="font-serif text-2xl sm:text-3xl text-rojas-text font-bold">
            {formatCurrency(activeSummary.totalIndividual)}
          </div>
          <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
            Individual
          </div>
        </div>
        <div className="border-l-3 border-rojas-border bg-rojas-card p-4">
          <div className="font-serif text-2xl sm:text-3xl text-rojas-text font-bold">
            {activeSummary.donorCount}
          </div>
          <div className="mt-1 text-xs text-rojas-text-muted font-sans uppercase tracking-wider">
            Donors
          </div>
        </div>
      </div>

      {/* Sector breakdown */}
      <div className="bg-rojas-card border-l-3 border-rojas-border p-5 mb-8">
        <h3 className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium mb-4">
          By Sector
        </h3>
        <div className="space-y-3">
          {sectorOrder.map((sector) => (
            <SectorBar
              key={sector}
              sector={sector}
              amount={activeSummary.bySector[sector]}
              maxAmount={maxSector}
            />
          ))}
        </div>
      </div>

      {/* Individual donor list */}
      <h3 className="text-xs tracking-[0.15em] uppercase text-rojas-accent font-sans font-medium mb-4">
        Top Donors
      </h3>
      <div className="space-y-3">
        {activeDonations.map((d) => (
          <DonorRecord
            key={`${d.memberId}-${d.organization}-${d.cycle}`}
            donation={d}
          />
        ))}
      </div>
    </div>
  );
}
