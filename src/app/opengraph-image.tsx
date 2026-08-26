import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 26, height: 26, background: "#6637ed", borderRadius: 6, display: "flex" }} />
          <div style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: 2, display: "flex" }}>
            DNABS
          </div>
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.08,
            maxWidth: 940,
            display: "flex",
          }}
        >
          Tvoj web, hotový&nbsp;<span style={{ color: "#ff5a01" }}>zadarmo.</span>
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,.7)", marginTop: 36, display: "flex" }}>
          Bezplatný náhľad do 48 hodín — dnabs.online
        </div>
      </div>
    ),
    { ...size }
  );
}
