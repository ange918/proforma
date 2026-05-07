import { ACCENT, CARD, BORDER, MUTED } from "../lib/constants";

const REASONS = [
  {
    n: "01",
    title: "Sur mesure avant tout",
    desc: "Chaque projet est unique. Je ne utilise pas de templates génériques — je conçois et développe chaque site en partant de vos besoins réels.",
  },
  {
    n: "02",
    title: "Performance & rapidité",
    desc: "Des sites rapides, optimisés et bien structurés. Votre audience ne doit jamais attendre — la performance est intégrée dès le départ.",
  },
  {
    n: "03",
    title: "Design soigné",
    desc: "Un rendu visuel professionnel et moderne qui reflète votre image. Chaque détail compte pour donner confiance à vos visiteurs.",
  },
  {
    n: "04",
    title: "Accompagnement complet",
    desc: "Je suis présent de l'idée à la mise en ligne, et au-delà. Vous n'êtes jamais seul face à votre projet digital.",
  },
];

export default function WhyMe() {
  return (
    <section
      id="apropos"
      style={{
        padding: "100px 24px",
        background: "#0e0e0e",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
            Pourquoi moi
          </p>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              color: "#f0f0ee",
              lineHeight: 1.05,
              maxWidth: 600,
            }}
          >
            Pourquoi me faire appel pour votre projet ?
          </h2>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-mobile">
          {/* Left: intro text */}
          <div style={{ gridColumn: "1 / -1", marginBottom: 8 }}>
            <p style={{ color: MUTED, fontSize: 16, fontFamily: "Inter, sans-serif", lineHeight: 1.7, maxWidth: 560 }}>
              Chaque projet est une opportunité pour moi de créer quelque chose d'unique, sur mesure et performant pour mes clients. Je m'investis pleinement dans chaque mission comme si c'était la mienne.
            </p>
          </div>

          {REASONS.map((r) => (
            <div
              key={r.n}
              style={{
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 40,
                  color: "rgba(202,255,0,0.12)",
                  lineHeight: 1,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                {r.n}
              </div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#f0f0ee",
                  marginBottom: 10,
                }}
              >
                {r.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.65 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
