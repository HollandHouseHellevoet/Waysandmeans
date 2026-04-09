export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  party: "R" | "D";
  state: string;
  district: string;
  role?: string;
  bioguideId: string;
  bio: string;
  healthcareSubcommittee: boolean;
  termStart: number;
}

export interface Bill {
  id: string;
  congress: number;
  number: string;
  title: string;
  shortTitle: string;
  category: BillCategory;
  description: string;
  date: string;
  result: "Passed" | "Failed" | "Pending";
  url: string;
}

export type BillCategory =
  | "ACA"
  | "Medicare"
  | "Medicaid"
  | "Drug Pricing"
  | "Mental Health"
  | "Insurance"
  | "Hospital Policy"
  | "Public Health"
  | "Veterans Health"
  | "Other";

export interface Vote {
  memberId: string;
  billId: string;
  vote: "Yea" | "Nay" | "Not Voting" | "Present";
}

export type HealthcareSector =
  | "Pharmaceuticals"
  | "Hospitals & Nursing Homes"
  | "Health Services/HMOs"
  | "Health Professionals"
  | "Insurance";

export interface Donation {
  memberId: string;
  cycle: "2024" | "2022";
  organization: string;
  sector: HealthcareSector;
  total: number;
  pacAmount: number;
  individualAmount: number;
}
