import { TEXT, MUTED, PURPLE, YELLOW } from "../lib/constants";

export default function HeroSection() {
  return (
    <section id="accueil" style={{
      background: "#f0ece4",
      padding: "100px 28px 80px",
      borderTop: "1px solid #ddd9d0",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Big heading */}
        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(72px, 13vw, 180px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 32,
        }}>
          <div>FULL STACK</div>
          <div>DEVELOPER.</div>
        </div>

        {/* Row: desc + CTAs */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between" }}>

          {/* Left: tag + description */}
          <div>
            {/* Location badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: YELLOW, padding: "6px 14px", marginBottom: 18,
              fontFamily: "sans-serif", fontWeight: 700, fontSize: 13,
              letterSpacing: "0.04em", color: TEXT,
            }}>
              📍 Cotonou, Bénin
            </div>
            <p style={{
              fontFamily: "sans-serif", fontSize: "clamp(15px,2vw,17px)",
              color: MUTED, lineHeight: 1.65, maxWidth: 480,
            }}>
              Je transforme vos idées en sites web et applications mobiles<br />
              <strong style={{ color: TEXT }}>modernes, performants et sur mesure.</strong>
            </p>
          </div>

          {/* Right: CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="#services" style={{
              background: TEXT, color: "#f0ece4",
              padding: "13px 26px", fontFamily: "sans-serif",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              borderRadius: 8, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity="0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity="1")}
            >Mes services</a>
            <a href="#contact" style={{
              background: PURPLE, color: "#fff",
              padding: "13px 26px", fontFamily: "sans-serif",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              borderRadius: 8, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity="0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity="1")}
            >Me contacter</a>
          </div>
        </div>
      </div>
    </section>
  );
}
