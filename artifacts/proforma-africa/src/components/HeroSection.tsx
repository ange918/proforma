import { ACCENT, MUTED } from "../lib/constants";

export default function HeroSection() {
  return (
    <section
      id="accueil"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(202,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(202,255,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(202,255,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(202,255,0,0.08)",
          border: "1px solid rgba(202,255,0,0.2)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
          fontSize: 13,
          color: ACCENT,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          letterSpacing: "0.03em",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "inline-block", boxShadow: `0 0 8px ${ACCENT}` }} />
        Full Stack Developer — Cotonou, Bénin
      </div>

      {/* Main heading */}
      <h1
        style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: "clamp(44px, 7vw, 88px)",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          color: "#f0f0ee",
          maxWidth: 900,
          marginBottom: 12,
          position: "relative",
          zIndex: 1,
        }}
      >
        Je Transforme{" "}
        <span style={{ color: ACCENT }}>vos idées</span>
      </h1>
      <h1
        style={{
          fontFamily: "'Anton', Impact, sans-serif",
          fontSize: "clamp(44px, 7vw, 88px)",
          fontWeight: 400,
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          color: "#f0f0ee",
          maxWidth: 900,
          marginBottom: 28,
          position: "relative",
          zIndex: 1,
        }}
      >
        en sites web & apps mobiles
      </h1>

      <p
        style={{
          fontSize: "clamp(15px, 2vw, 18px)",
          color: MUTED,
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          marginBottom: 44,
          maxWidth: 500,
          lineHeight: 1.65,
          position: "relative",
          zIndex: 1,
        }}
      >
        Moderne, performant et sur mesure. Je conçois des solutions digitales qui font la différence pour vos clients.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#services"
          style={{
            background: ACCENT,
            color: "#0b0b0b",
            padding: "13px 28px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Mes services
        </a>
        <a
          href="#contact"
          style={{
            background: "transparent",
            color: "#f0f0ee",
            padding: "13px 28px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            border: "1px solid #2a2a2a",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#444")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a")}
        >
          Me contacter
        </a>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: "#444",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #444)" }} />
      </div>
    </section>
  );
}
