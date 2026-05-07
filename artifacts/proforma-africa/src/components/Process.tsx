import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const STEPS = [
  { n:"01", phase:"Discussion",    title:"Cadrage du projet",  desc:"On échange sur vos besoins, vos objectifs et votre vision. Un appel suffit pour poser les bases.", bg: YELLOW, r: 0  },
  { n:"02", phase:"Signature",     title:"Devis & Contrat",    desc:"Un devis détaillé et un contrat clair définissent les délais, livrables et conditions.",             bg: WHITE,  r: 10 },
  { n:"03", phase:"Développement", title:"Conception & Code",  desc:"Je conçois et développe par itérations. Vous suivez l'avancement à chaque étape clé.",              bg: PURPLE, r: 10 },
  { n:"04", phase:"Tests",         title:"Validation & QA",    desc:"Tests fonctionnels et corrections pour garantir un produit fiable avant la mise en ligne.",            bg: WHITE,  r: 10 },
  { n:"05", phase:"Livraison",     title:"Déploiement",        desc:"Mise en production, formation à l'utilisation et transfert complet des accès et sources.",             bg: YELLOW, r: 0  },
  { n:"06", phase:"Support",       title:"Suivi & Maintenance", desc:"Accompagnement post-livraison pour corriger, faire évoluer et maintenir votre solution.",             bg: WHITE,  r: 10 },
];

export default function Process() {
  return (
    <section style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 16,
        }}>
          <div>LES ÉTAPES</div>
          <div>D'UN PROJET.</div>
        </div>

        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: MUTED, marginBottom: 52, maxWidth: 440, lineHeight: 1.65 }}>
          De la première conversation à la livraison finale.
        </p>

        <div className="grid-3">
          {STEPS.map((s, i) => (
            <div key={i} style={{
              background: s.bg, borderRadius: s.r, padding: "28px 24px",
              boxShadow: s.bg === WHITE ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
              position: "relative", overflow: "hidden",
            }}>
              {/* Ghost number */}
              <div style={{
                position: "absolute", top: -10, right: 10,
                fontFamily: "'Anton', sans-serif", fontSize: 80,
                color: s.bg === PURPLE ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                lineHeight: 1, pointerEvents: "none", userSelect: "none",
              }}>{s.n}</div>

              <div style={{
                display: "inline-block",
                background: s.bg === PURPLE ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.08)",
                borderRadius: 4, padding: "3px 9px", marginBottom: 14,
                fontFamily: "sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: s.bg === PURPLE ? "#fff" : TEXT,
              }}>{s.phase}</div>

              <h3 style={{
                fontFamily: "'Anton', sans-serif", fontSize: 20, fontWeight: 400,
                color: s.bg === PURPLE ? "#fff" : TEXT, marginBottom: 10,
              }}>{s.title}</h3>
              <p style={{
                fontFamily: "sans-serif", fontSize: 13, lineHeight: 1.65,
                color: s.bg === PURPLE ? "rgba(255,255,255,0.78)" : MUTED,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <a href="#contact" style={{
            display: "inline-block",
            background: TEXT, color: "#f0ece4",
            padding: "14px 34px", borderRadius: 8,
            fontFamily: "'Anton', sans-serif", fontSize: 18, fontWeight: 400,
            textDecoration: "none", letterSpacing: "0.02em",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity="0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity="1")}
          >DÉMARRER UN PROJET →</a>
          <p style={{ fontFamily: "sans-serif", fontSize: 12, color: MUTED, marginTop: 10 }}>
            Première consultation gratuite
          </p>
        </div>
      </div>
    </section>
  );
}
