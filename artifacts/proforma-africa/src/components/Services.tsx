import { ACCENT, CARD, BORDER, MUTED } from "../lib/constants";

const SERVICES = [
  {
    icon: "🖥️",
    title: "Sites Web Modernes",
    desc: "Création de sites vitrines, portfolios et landing pages rapides, responsive et optimisés SEO.",
  },
  {
    icon: "🛒",
    title: "E-commerce & Boutiques",
    desc: "Boutiques en ligne connectées WhatsApp ou avec passerelle de paiement.",
  },
  {
    icon: "📱",
    title: "Applications Mobiles",
    desc: "Applications cross-platform avec Flutter pour iOS et Android.",
  },
  {
    icon: "📊",
    title: "Dashboards & SaaS",
    desc: "Tableaux de bord sur mesure et plateformes SaaS pour vos équipes.",
  },
  {
    icon: "💡",
    title: "Stratégie Digitale",
    desc: "Conseil et mise en place d'une présence digitale efficace.",
  },
  {
    icon: "🔗",
    title: "APIs & Intégrations",
    desc: "Connexion de vos outils via des APIs : paiement, messagerie, CRM, analytics.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      {/* Header */}
      <div style={{ marginBottom: 60 }}>
        <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
          Services
        </p>
        <h2
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 400,
            color: "#f0f0ee",
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          Ce que je réalise
        </h2>
        <p style={{ color: MUTED, fontSize: 16, fontFamily: "Inter, sans-serif", maxWidth: 420, lineHeight: 1.6 }}>
          Des solutions digitales sur mesure pour vos projets.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        {SERVICES.map((s, i) => (
          <div
            key={i}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              padding: "32px 28px",
              transition: "border-color 0.2s, background 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(202,255,0,0.3)";
              (e.currentTarget as HTMLElement).style.background = "#161616";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = BORDER;
              (e.currentTarget as HTMLElement).style.background = CARD;
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#f0f0ee",
                marginBottom: 10,
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.65 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
