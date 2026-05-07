import { ACCENT, BORDER, MUTED } from "../lib/constants";

export default function Testimonials() {
  return (
    <section id="avis" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 60 }}>
        <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
          Témoignages
        </p>
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#f0f0ee", lineHeight: 1.05 }}>
          Ce que disent les clients.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
        {/* Testimonial card */}
        <div
          style={{
            background: "#141414",
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            padding: "36px 32px",
            position: "relative",
          }}
        >
          {/* Quote mark */}
          <div
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 72,
              color: "rgba(202,255,0,0.08)",
              lineHeight: 0.7,
              marginBottom: 20,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            "
          </div>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: "#d8d8d4", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>
            "Ange a transformé ma vision en une plateforme élégante et moderne. Son sens du détail et sa capacité à comprendre ce dont nous avions besoin m'ont impressionné. Un travail vraiment remarquable du début à la fin."
          </p>

          {/* Stars */}
          <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
            {[1,2,3,4,5].map((s) => (
              <span key={s} style={{ color: ACCENT, fontSize: 16 }}>★</span>
            ))}
          </div>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #caff00, #5a9900)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Anton', sans-serif",
                fontSize: 16,
                color: "#0b0b0b",
                flexShrink: 0,
              }}
            >
              M
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14, color: "#f0f0ee" }}>
                Morille
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: MUTED }}>
                Artiste & Directeur Créatif
              </div>
            </div>
          </div>
        </div>

        {/* CTA card */}
        <div
          style={{
            background: "rgba(202,255,0,0.04)",
            border: `1px dashed rgba(202,255,0,0.2)`,
            borderRadius: 12,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.65 }}>
            Vous avez travaillé avec moi ? Partagez votre expérience.
          </p>
          <a
            href="#contact"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: ACCENT,
              textDecoration: "none",
              borderBottom: `1px solid rgba(202,255,0,0.3)`,
              paddingBottom: 2,
            }}
          >
            Me contacter →
          </a>
        </div>
      </div>
    </section>
  );
}
