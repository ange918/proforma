import { useEffect, useState } from "react";

const BG     = "#f0ece4";
const TEXT   = "#0d0d0d";
const YELLOW = "#f9f277";
const PURPLE = "#9b79e0";
const LPURP  = "#c4b5fd";

/* ── Centre card : profil ── */
function ProfileCard({ small = false }: { small?: boolean }) {
  const w = small ? 140 : 190;
  const h = small ? 240 : 320;
  return (
    <div style={{
      width: w, height: h, background: LPURP,
      borderRadius: small ? 22 : 28,
      border: "3px solid #111",
      boxShadow: "0 28px 70px rgba(0,0,0,0.22)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: small ? 8 : 12, padding: 20, flexShrink: 0,
      fontFamily: "sans-serif",
    }}>
      {/* Avatar */}
      <div style={{
        width: small ? 52 : 68, height: small ? 52 : 68,
        borderRadius: "50%", background: PURPLE,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Anton', sans-serif", fontSize: small ? 22 : 28,
        color: "#fff", letterSpacing: "0.02em",
      }}>A</div>

      {/* Name */}
      <div style={{
        fontFamily: "'Anton', sans-serif",
        fontSize: small ? 15 : 19, color: TEXT,
        textAlign: "center", lineHeight: 1.1,
      }}>Ange Akonde</div>

      {/* Role */}
      <div style={{
        fontSize: small ? 9 : 11, fontWeight: 700, color: "#5b21b6",
        letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center",
      }}>Full Stack Developer</div>

      {/* Available badge */}
      <div style={{
        background: "#22c55e", borderRadius: 100,
        padding: small ? "3px 10px" : "5px 14px",
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "block" }} />
        <span style={{ fontSize: small ? 10 : 12, color: "#fff", fontWeight: 600 }}>Disponible</span>
      </div>
    </div>
  );
}

const BIG: React.CSSProperties = {
  fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
  fontWeight: 400, color: TEXT, lineHeight: 0.88,
  letterSpacing: "-0.01em", textAlign: "center",
  pointerEvents: "none", display: "block",
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section style={{ background: BG, minHeight: "100vh", overflowY: "auto", overflowX: "hidden", userSelect: "none" }}>
        {/* FULL STACK */}
        <div style={{ ...BIG, fontSize: "clamp(56px, 20vw, 100px)", paddingTop: 72 }}>
          FULL STACK
        </div>

        {/* Centre row: location | profile card | tech pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 16px" }}>
          {/* Location yellow card */}
          <div style={{ background: YELLOW, padding: "10px 12px", flexShrink: 0, maxWidth: 110 }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 12, color: TEXT, marginBottom: 3 }}>
              📍 COTONOU
            </div>
            <div style={{ fontSize: 10, color: "#555" }}>Bénin · Remote OK</div>
          </div>

          <ProfileCard small />

          {/* Projects badge */}
          <div style={{ background: "#fff", borderRadius: 10, padding: "10px 10px", boxShadow: "0 2px 12px rgba(0,0,0,0.09)", flexShrink: 0, maxWidth: 110, textAlign: "center" }}>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: TEXT }}>20+</div>
            <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>Projets<br/>livrés</div>
          </div>
        </div>

        {/* Description card */}
        <div style={{ margin: "0 16px 12px", background: "#fff", borderRadius: 10, padding: "16px 16px", boxShadow: "0 2px 14px rgba(0,0,0,0.09)" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#444", lineHeight: 1.65 }}>
            Je transforme vos idées en sites web et applications mobiles <strong style={{ color: TEXT }}>modernes, performants et sur mesure.</strong>
          </p>
        </div>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 10, margin: "0 16px 12px" }}>
          <a href="#services" style={{
            flex: 1, background: TEXT, color: BG,
            padding: "12px 0", textAlign: "center",
            fontFamily: "'Anton', sans-serif", fontSize: 15,
            textDecoration: "none", fontWeight: 400,
          }}>MES SERVICES</a>
          <a href="#contact" style={{
            flex: 1, background: PURPLE, color: "#fff",
            padding: "12px 0", textAlign: "center",
            fontFamily: "'Anton', sans-serif", fontSize: 15,
            textDecoration: "none", borderRadius: 8, fontWeight: 400,
          }}>ME CONTACTER</a>
        </div>

        {/* DEVELOPER. */}
        <div style={{ ...BIG, fontSize: "clamp(52px, 18vw, 90px)", paddingBottom: 12 }}>
          DEVELOPER.
        </div>
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section style={{
      position: "relative", width: "100vw", height: "100vh",
      background: BG, overflow: "hidden", userSelect: "none",
    }}>
      {/* FULL STACK top */}
      <div style={{
        ...BIG, position: "absolute", top: 0, left: 0, right: 0, zIndex: 0,
        fontSize: "clamp(100px, 20vw, 280px)",
      }}>FULL STACK</div>

      {/* DEVELOPER. bottom */}
      <div style={{
        ...BIG, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 0,
        fontSize: "clamp(100px, 20vw, 280px)",
      }}>DEVELOPER.</div>

      {/* Centre profile card */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)", zIndex: 10,
      }}>
        <ProfileCard />
      </div>

      {/* Card 1 · Location (top-left, yellow) */}
      <div style={{
        position: "absolute", left: "16%", top: "26%",
        background: YELLOW, padding: "14px 20px", zIndex: 20, minWidth: 160,
      }}>
        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, color: TEXT, marginBottom: 4 }}>
          📍 COTONOU, BÉNIN
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#555" }}>Remote OK · Monde entier</div>
      </div>

      {/* Card 2 · Description (top-right, white) */}
      <div style={{
        position: "absolute", right: "6%", top: "26%",
        background: "#fff", padding: "14px 18px", borderRadius: 10,
        zIndex: 20, maxWidth: 240,
        boxShadow: "0 4px 18px rgba(0,0,0,0.09)",
        fontFamily: "sans-serif",
      }}>
        <div style={{ fontSize: 11, color: "#888", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
          Ce que je fais
        </div>
        <p style={{ fontSize: 13, color: "#333", lineHeight: 1.65 }}>
          Je transforme vos idées en sites web et applications mobiles <strong style={{ color: TEXT }}>modernes et performants.</strong>
        </p>
      </div>

      {/* Card 3 · Mes services CTA (left, purple) */}
      <div style={{
        position: "absolute", left: "20%", top: "48%",
        background: PURPLE, padding: "16px 22px", borderRadius: 10,
        zIndex: 20, minWidth: 200,
      }}>
        <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
          Envie de collaborer ?
        </div>
        <a href="#services" style={{
          display: "block", background: "#fff", color: TEXT,
          fontFamily: "'Anton', sans-serif", fontSize: 16, fontWeight: 400,
          textDecoration: "none", textAlign: "center",
          padding: "9px 18px",
          letterSpacing: "0.02em",
        }}>MES SERVICES →</a>
      </div>

      {/* Card 4 · Stats (right, yellow) */}
      <div style={{
        position: "absolute", right: "6%", top: "50%",
        background: YELLOW, padding: "16px 22px", zIndex: 20,
        minWidth: 180, textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 42, color: TEXT, lineHeight: 1 }}>20+</div>
        <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555", marginTop: 4 }}>Projets livrés</div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", marginTop: 10, paddingTop: 10, fontFamily: "'Anton', sans-serif", fontSize: 28, color: TEXT, lineHeight: 1 }}>3+</div>
        <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555", marginTop: 2 }}>Ans d'expérience</div>
      </div>

      {/* Card 5 · Me contacter (bottom-right, purple) */}
      <div style={{
        position: "absolute", right: "6%", top: "69%",
        background: PURPLE, padding: "13px 18px",
        borderRadius: 9, zIndex: 20, minWidth: 210, color: "#fff",
      }}>
        <a href="#contact" style={{
          display: "block", color: "#fff", textDecoration: "none",
          fontFamily: "'Anton', sans-serif", fontSize: 18, fontWeight: 400,
          letterSpacing: "0.02em", marginBottom: 3,
        }}>ME CONTACTER →</a>
        <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
          Réponse sous 24h · Consultation gratuite
        </div>
      </div>

      {/* Card 6 · Disponible pill (bottom-left) */}
      <div style={{
        position: "absolute", left: "5%", top: "69%",
        background: "#fff", padding: "10px 18px 10px 12px",
        borderRadius: 50, zIndex: 20,
        display: "flex", gap: 10, alignItems: "center",
        boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
        fontFamily: "sans-serif",
      }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, #c4b5fd, #9b79e0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Anton', sans-serif", fontSize: 18, color: "#fff",
          }}>A</div>
          <div style={{
            position: "absolute", bottom: -1, right: -3,
            width: 14, height: 14, background: "#22c55e",
            borderRadius: "50%", border: "2px solid #fff",
          }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: TEXT }}>Ange Akonde</div>
          <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>● Disponible maintenant</div>
        </div>
      </div>
    </section>
  );
}
