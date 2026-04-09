import { ImageResponse } from "next/og";
import {
  getAllMembers,
  getMemberBySlug,
  getDonationSummaryForMember,
  getVoteCountsForMember,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllMembers().map((m) => ({ slug: m.id }));
}

export const alt = "Member Profile | The Rojas Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function formatCurrency(amount: number) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  return `$${Math.round(amount / 1000)}K`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0B1215",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "48px",
          }}
        >
          Member Not Found
        </div>
      ),
      { ...size }
    );
  }

  const voteCounts = getVoteCountsForMember(member.id);
  const donationSummary = getDonationSummaryForMember(member.id, "2024");
  const partyColor = member.party === "R" ? "#DC2626" : "#2563EB";
  const partyLabel = member.party === "R" ? "Republican" : "Democrat";
  const subtitle = member.role
    ? `${partyLabel} · ${member.state}-${member.district} · ${member.role}`
    : `${partyLabel} · ${member.state}-${member.district} · Since ${member.termStart}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0B1215",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "5px",
            background: partyColor,
            position: "absolute",
            top: "0",
            left: "0",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 80px 0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "4px 12px",
              border: "1px solid #D4742C",
              color: "#D4742C",
              fontSize: "14px",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.15em",
              marginBottom: "28px",
              alignSelf: "flex-start",
            }}
          >
            WAYS & MEANS
          </div>

          <div
            style={{
              fontSize: "72px",
              color: "#FFFFFF",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            {member.firstName}
          </div>
          <div
            style={{
              fontSize: "72px",
              color: "#D4742C",
              lineHeight: 1.1,
              display: "flex",
              marginBottom: "20px",
            }}
          >
            {member.lastName}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "20px",
              fontFamily: "system-ui, sans-serif",
              color: "#94A3B8",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "6px",
                background: partyColor,
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>{subtitle}</div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "42px", color: "#16A34A", display: "flex" }}>
                {String(voteCounts.yea)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  display: "flex",
                }}
              >
                YEA VOTES
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "42px", color: "#DC2626", display: "flex" }}>
                {String(voteCounts.nay)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  display: "flex",
                }}
              >
                NAY VOTES
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "42px", color: "#D4742C", display: "flex" }}>
                {formatCurrency(donationSummary.total)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748B",
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.1em",
                  display: "flex",
                }}
              >
                HEALTHCARE $
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontSize: "22px", color: "#FFFFFF", display: "flex" }}>
              The Rojas Report
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#D4742C",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.2em",
                marginTop: "4px",
                display: "flex",
              }}
            >
              HEALTHCARE INTELLIGENCE
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
