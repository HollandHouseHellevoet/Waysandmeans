import { ImageResponse } from "next/og";

export const alt = "Ways & Means Committee | The Rojas Report";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0B1215",
          padding: "60px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "#D4742C",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        />

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div
            style={{
              padding: "4px 12px",
              border: "1px solid #D4742C",
              color: "#D4742C",
              fontSize: "14px",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            WAYS & MEANS
          </div>
          <div
            style={{
              color: "#D4742C",
              fontSize: "14px",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Healthcare Intelligence
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          Follow the Money.
        </div>
        <div
          style={{
            fontSize: "64px",
            color: "#D4742C",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          Follow the Votes.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#94A3B8",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          Healthcare profiles for every member of the House Ways and Means
          Committee. Voting records, campaign donations, and stock trades.
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: "24px", color: "#FFFFFF" }}>
            The Rojas Report
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#D4742C",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            HEALTHCARE INTELLIGENCE
          </div>
        </div>

        {/* Stats in bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            display: "flex",
            gap: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "36px", color: "#D4742C" }}>45</div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Members
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "36px", color: "#D4742C" }}>26R</div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Majority
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "36px", color: "#D4742C" }}>19D</div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Minority
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
