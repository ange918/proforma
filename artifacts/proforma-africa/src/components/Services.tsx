import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const SERVICES = [
  { icon: "🖥️", title: "Sites Web Modernes",     desc: "Sites vitrines, portfolios et landing pages rapides, responsive et optimisés SEO.", color: WHITE,  radius: 10 },
  { icon: "🛒", title: "E-commerce & Boutiques", desc: "Boutiques en ligne connectées WhatsApp ou avec passerelle de paiement.",             color: YELLOW, radius: 0  },
  { icon: "📱", title: "Applications Mobiles",   desc: "Applications cross-platform avec Flutter pour iOS et Android.",                      color: PURPLE, radius: 10 },
  { icon: "📊", title: "Dashboards & SaaS",      desc: "Tableaux de bord sur mesure et plateformes SaaS pour vos équipes.",                  color: WHITE,  radius: 10 },
  { icon: "💡", title: "Stratégie Digitale",     desc: "Conseil et mise en place d'une présence digitale efficace.",                         color: YELLOW, radius: 0  },
  { icon: "🔗", title: "APIs & Intégrations",    desc: "Connexion via des APIs : paiement, messagerie, CRM, analytics.",                    color: WHITE,  radius: 10 },
];

export default function Services() {
  return (
    <section id="services" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Big heading */}
        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 48,
        }}>
          <div>CE QUE</div>
          <div>JE RÉALISE.</div>
        </div>

        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: MUTED, marginBottom: 48, maxWidth: 440, lineHeight: 1.65 }}>
          Des solutions digitales sur mesure pour vos projets.
        </p>

        {/* Cards grid */}
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <div key={i} style={{
              background: s.color,
              borderRadius: s.radius,
              padding: "28px 24px",
              boxShadow: s.color === WHITE ? "0 3px 16px rgba(0,0,0,0.08)" : "none",
              transition: "transform 0.18s",
              cursor: "default",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: 26, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{
                fontFamily: "'Anton', sans-serif", fontSize: 20,
                fontWeight: 400, color: s.color === PURPLE ? "#fff" : TEXT,
                marginBottom: 10, lineHeight: 1.1,
              }}>{s.title}</h3>
              <p style={{
                fontFamily: "sans-serif", fontSize: 13, lineHeight: 1.65,
                color: s.color === PURPLE ? "rgba(255,255,255,0.82)" : MUTED,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
