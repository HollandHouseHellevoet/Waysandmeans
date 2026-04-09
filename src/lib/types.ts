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

export type TradeType = "Purchase" | "Sale" | "Sale (Partial)" | "Sale (Full)" | "Exchange";

export type TradeAmountRange =
  | "$1,001–$15,000"
  | "$15,001–$50,000"
  | "$50,001–$100,000"
  | "$100,001–$250,000"
  | "$250,001–$500,000"
  | "$500,001–$1,000,000"
  | "$1,000,001–$5,000,000"
  | "$5,000,001–$25,000,000";

export type TradeOwner = "Self" | "Spouse" | "Child" | "Joint";

export interface Trade {
  memberId: string;
  transactionDate: string;
  filingDate: string;
  company: string;
  ticker: string;
  type: TradeType;
  amount: TradeAmountRange;
  owner: TradeOwner;
  sector: HealthcareSector | "Biotech" | "Medical Devices" | "Healthcare IT";
  capitolTradesUrl?: string;
}
