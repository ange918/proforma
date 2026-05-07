import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const PROJECTS = [
  { n:"01", cat:"Éducation",   title:"Models Academy Management",       desc:"Plateforme académique de suivi des étudiants et des modèles. Gestion complète avec inscription, planification et suivi des progrès.", tags:[],                                          accent: YELLOW  },
  { n:"02", cat:"Communauté",  title:"Code-Capital",                    desc:"Hub de ressources fintech-dev connectant les codeurs avec des outils, du contenu et des ressources.",                                    tags:[],                                          accent: WHITE   },
  { n:"03", cat:"Innovation",  title:"SusuniLab",                       desc:"Lab d'innovation collaboratif pour les projets tech africains. Les bâtisseurs africains y idéent, prototypent et livrent.",             tags:[],                                          accent: PURPLE  },
  { n:"04", cat:"Formation",   title:"God's Plan",                      desc:"Plateforme complète pour la gestion des inscriptions, des formations et des filières d'un centre privé.",                               tags:[],                                          accent: WHITE   },
  { n:"05", cat:"Musique",     title:"Vano Baby",                       desc:"Expérience immersive célébrant les 10 ans de carrière de l'artiste béninois Vano Baby.",                                                tags:["Next.js","Framer Motion","Spotify API"],    accent: YELLOW  },
  { n:"06", cat:"E-commerce",  title:"CosmeticsShop",                   desc:"Template e-commerce cosmétiques intégré à WhatsApp pour recevoir les commandes sans passerelle de paiement.",                           tags:["React","Tailwind CSS","WhatsApp API"],      accent: WHITE   },
  { n:"07", cat:"Portfolio",   title:"Portfolio Agnès ADANMENNOUKON",   desc:"Vitrine élégante pour la Créatrice de mode et Fondatrice de ISM laMAF Bénin.",                                                           tags:["Next.js","Tailwind CSS","Framer Motion"],  accent: PURPLE  },
  { n:"08", cat:"Santé",       title:"MediSens",                        desc:"Plateforme médicale de vulgarisation santé dédiée aux pathologies cardiovasculaires et rénales.",                                       tags:["Next.js","Tailwind CSS","Framer Motion"],  accent: WHITE   },
];

export default function Projects() {
  return (
    <section id="projets" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 56,
        }}>
          <div>TRAVAUX</div>
          <div>SÉLECTIONNÉS.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {PROJECTS.map((p, i) => (
            <a key={i} href="#" style={{
              background: p.accent,
              borderRadius: p.accent === YELLOW ? 0 : p.accent === PURPLE ? 10 : 10,
              padding: "22px 24px",
              display: "flex", alignItems: "center", gap: 20,
              textDecoration: "none",
              boxShadow: p.accent === WHITE ? "0 2px 12px rgba(0,0,0,0.07)" : "none",
              transition: "transform 0.15s",
              flexWrap: "wrap",
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateX(4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}
            >
              {/* Number */}
              <span style={{
                fontFamily: "'Anton', sans-serif", fontSize: 13,
                color: p.accent === PURPLE ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)",
                letterSpacing: "0.06em", flexShrink: 0, minWidth: 28,
              }}>{p.n}</span>

              {/* Main */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: p.accent === PURPLE ? "rgba(255,255,255,0.6)" : MUTED,
                  }}>{p.cat}</span>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background: p.accent === PURPLE ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.07)",
                      borderRadius: 4, padding: "1px 7px",
                      fontSize: 10, fontFamily: "sans-serif",
                      color: p.accent === PURPLE ? "rgba(255,255,255,0.7)" : MUTED,
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{
                  fontFamily: "'Anton', sans-serif", fontWeight: 400,
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  color: p.accent === PURPLE ? "#fff" : TEXT, marginBottom: 4,
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: "sans-serif", fontSize: 13, lineHeight: 1.55,
                  color: p.accent === PURPLE ? "rgba(255,255,255,0.72)" : MUTED,
                  maxWidth: 560,
                }}>{p.desc}</p>
              </div>

              {/* Arrow */}
              <span style={{
                fontFamily: "sans-serif", fontSize: 20, flexShrink: 0,
                color: p.accent === PURPLE ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)",
              }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
