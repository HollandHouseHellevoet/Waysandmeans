import { ImageResponse } from "next/og";
import { getAllBills, getBillById, getVotesForBill } from "@/lib/data";

export function generateStaticParams() {
  return getAllBills().map((b) => ({ id: b.id }));
}

export const alt = "Bill Vote Breakdown | The Rojas Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bill = getBillById(id);

  if (!bill) {
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
          Bill Not Found
        </div>
      ),
      { ...size }
    );
  }

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

  // Truncate long titles for the OG image
  const title =
    bill.shortTitle.length > 50
      ? bill.shortTitle.slice(0, 47) + "…"
      : bill.shortTitle;

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
        {/* Top accent line */}
        <div
          style={{
            width: "100%",
            height: "5px",
            background: "#D4742C",
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
          {/* Badge row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
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
              }}
            >
              VOTE BREAKDOWN
            </div>
            <div
              style={{
                display: "flex",
                color: "#D4742C",
                fontSize: "14px",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.15em",
              }}
            >
              {bill.category.toUpperCase()}
            </div>
          </div>

          {/* Bill number + date */}
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              fontFamily: "system-ui, sans-serif",
              color: "#94A3B8",
              marginBottom: "12px",
            }}
          >
            {`${bill.number} · ${new Date(bill.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "56px",
              color: "#FFFFFF",
              lineHeight: 1.1,
              display: "flex",
              marginBottom: "20px",
              maxWidth: "1040px",
            }}
          >
            {title}
          </div>

          {/* Result */}
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontFamily: "system-ui, sans-serif",
              color:
                bill.result === "Passed"
                  ? "#16A34A"
                  : bill.result === "Failed"
                    ? "#DC2626"
                    : "#94A3B8",
              fontWeight: "bold",
              letterSpacing: "0.1em",
            }}
          >
            {bill.result.toUpperCase()}
          </div>
        </div>

        {/* Vote tally cards at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            left: "80px",
            right: "80px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "20px 24px",
              backgroundColor: "#141E26",
              borderLeft: "4px solid #16A34A",
            }}
          >
            <div style={{ fontSize: "48px", color: "#16A34A", display: "flex" }}>
              {String(yea.length)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}
            >
              YEA
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "13px",
                color: "#94A3B8",
                fontFamily: "system-ui, sans-serif",
                marginTop: "8px",
              }}
            >
              {`${repYea}R · ${demYea}D`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "20px 24px",
              backgroundColor: "#141E26",
              borderLeft: "4px solid #DC2626",
            }}
          >
            <div style={{ fontSize: "48px", color: "#DC2626", display: "flex" }}>
              {String(nay.length)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}
            >
              NAY
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "13px",
                color: "#94A3B8",
                fontFamily: "system-ui, sans-serif",
                marginTop: "8px",
              }}
            >
              {`${repNay}R · ${demNay}D`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: "20px 24px",
              backgroundColor: "#141E26",
              borderLeft: "4px solid #64748B",
            }}
          >
            <div style={{ fontSize: "48px", color: "#64748B", display: "flex" }}>
              {String(notVoting.length)}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "12px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}
            >
              NOT VOTING
            </div>
          </div>
        </div>

        {/* Branding */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "18px", color: "#FFFFFF", display: "flex" }}>
              The Rojas Report
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#D4742C",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.2em",
                marginTop: "2px",
                display: "flex",
              }}
            >
              HEALTHCARE INTELLIGENCE
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "12px",
              color: "#64748B",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            WAYS & MEANS · 119TH CONGRESS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
