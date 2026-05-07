import { ACCENT, CARD, BORDER, MUTED } from "../lib/constants";

const STEPS = [
  { n: "01", phase: "Discussion", title: "Cadrage du projet", desc: "On échange sur vos besoins, vos objectifs et votre vision. Un appel ou une réunion suffit pour poser les bases." },
  { n: "02", phase: "Signature", title: "Devis & Contrat", desc: "Un devis détaillé est établi, puis un contrat clair définit les délais, livrables et conditions de collaboration." },
  { n: "03", phase: "Développement", title: "Conception & Code", desc: "Je conçois et développe votre solution par itérations. Vous suivez l'avancement à chaque étape clé." },
  { n: "04", phase: "Tests", title: "Validation & QA", desc: "Tests fonctionnels, corrections et validation avec vous pour garantir un produit fiable avant la mise en ligne." },
  { n: "05", phase: "Livraison", title: "Déploiement", desc: "Mise en production du projet, formation à l'utilisation et transfert complet des accès et sources." },
  { n: "06", phase: "Support", title: "Suivi & Maintenance", desc: "Un accompagnement post-livraison pour corriger, faire évoluer et maintenir votre solution dans le temps." },
];

export default function Process() {
  return (
    <section style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 60 }}>
        <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
          Comment je travaille
        </p>
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#f0f0ee", lineHeight: 1.05, maxWidth: 500 }}>
          Les étapes d'un projet.
        </h2>
        <p style={{ color: MUTED, fontSize: 15, fontFamily: "Inter, sans-serif", marginTop: 16, maxWidth: 480, lineHeight: 1.65 }}>
          De la première conversation à la livraison finale, voici comment je mène chaque projet de bout en bout.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }} className="grid-3-mobile">
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              padding: "28px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Big number bg */}
            <div
              style={{
                position: "absolute",
                top: -8,
                right: 12,
                fontFamily: "'Anton', sans-serif",
                fontSize: 72,
                color: "rgba(255,255,255,0.03)",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {s.n}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: ACCENT, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(202,255,0,0.08)", padding: "3px 8px", borderRadius: 4 }}>
                {s.phase}
              </span>
            </div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 16, color: "#f0f0ee", marginBottom: 10 }}>
              {s.title}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.65 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            background: ACCENT,
            color: "#0b0b0b",
            padding: "13px 32px",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Démarrer un projet →
        </a>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: MUTED, marginTop: 10 }}>
          Première consultation gratuite
        </p>
      </div>
    </section>
  );
}
