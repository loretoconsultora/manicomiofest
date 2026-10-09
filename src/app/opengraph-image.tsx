import { ImageResponse } from "next/og";

export const alt = "Manicomio Madness Night — 28 de octubre, Black Lounge, Querétaro";
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
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 60%, #3a0509 0%, #060606 70%)",
          color: "#efe8dc",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 12, color: "#9a9086" }}>M PRODUCCIONES PRESENTA</div>
        <div style={{ fontSize: 120, fontWeight: 900, marginTop: 20 }}>MANICOMIO</div>
        <div style={{ fontSize: 84, fontWeight: 900, color: "#e3242b" }}>MADNESS NIGHT</div>
        <div style={{ fontSize: 32, marginTop: 30, letterSpacing: 4 }}>
          28 OCT · 8 PM – 2 AM · BLACK LOUNGE · QRO · +18
        </div>
      </div>
    ),
    size,
  );
}
