import { ImageResponse } from "next/og";

export const alt = "Copper Hearth | The water you drink matters more than the supplements you take.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#06261F", // Elegant deep forest green
          backgroundImage: "radial-gradient(circle at center, #0B352C 0%, #06261F 100%)",
          padding: "60px 80px",
          border: "16px solid #D9A05B", // Copper border
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Subtle decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid rgba(217, 160, 91, 0.2)",
            display: "flex",
            pointerEvents: "none",
          }}
        />

        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#D9A05B",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#D9A05B",
            }}
          >
            Copper Hearth
          </span>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#D9A05B",
            }}
          />
        </div>

        {/* Main Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "#E9DED1", // Creamy white
              fontStyle: "italic",
            }}
          >
            "The water you drink matters more
          </span>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "#E9DED1", // Creamy white
              fontStyle: "italic",
            }}
          >
            than the supplements you take."
          </span>
        </div>

        {/* Footer Subtext */}
        <span
          style={{
            fontSize: "14px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(183, 198, 191, 0.6)",
            marginTop: "50px",
          }}
        >
          Premium Copper Sippers
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
