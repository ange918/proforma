import { ACCENT, CARD, BORDER, MUTED } from "../lib/constants";

const PROJECTS = [
  {
    n: "01",
    cat: "Éducation",
    title: "Models Academy Management",
    desc: "Plateforme académique de suivi des étudiants et des modèles. Système de gestion complet avec inscription, planification et suivi des progrès.",
    tags: [],
    link: "#",
  },
  {
    n: "02",
    cat: "Communauté",
    title: "Code-Capital",
    desc: "Communauté de développeurs et hub de ressources. Une plateforme fintech-dev connectant les codeurs avec des outils, du contenu et des ressources.",
    tags: [],
    link: "#",
  },
  {
    n: "03",
    cat: "Innovation",
    title: "SusuniLab",
    desc: "Lab d'innovation collaboratif pour les projets tech africains. Un espace où les bâtisseurs africains se retrouvent pour idéer, prototyper et livrer.",
    tags: [],
    link: "#",
  },
  {
    n: "04",
    cat: "Formation",
    title: "God's Plan",
    desc: "Centre privé de formation professionnelle. Plateforme web complète pour la gestion des inscriptions, des formations et des filières.",
    tags: [],
    link: "#",
  },
  {
    n: "05",
    cat: "Musique",
    title: "Vano Baby",
    desc: "Site web créé dans le cadre du challenge des 10 ans de carrière de l'artiste béninois Vano Baby. Une expérience immersive célébrant une décennie de musique.",
    tags: ["Next.js", "Framer Motion", "Spotify API"],
    link: "#",
  },
  {
    n: "06",
    cat: "E-commerce",
    title: "CosmeticsShop",
    desc: "Template e-commerce pour boutique de produits cosmétiques, intégré à WhatsApp pour recevoir les commandes directement sans passerelle de paiement.",
    tags: ["React", "Tailwind CSS", "WhatsApp API"],
    link: "#",
  },
  {
    n: "07",
    cat: "Portfolio",
    title: "Portfolio Agnès ADANMENNOUKON",
    desc: "Portfolio élégant pour Agnès ADANMENNOUKON, Créatrice de mode et Fondatrice de ISM laMAF Bénin. Vitrine de son univers créatif et de ses collections.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
  {
    n: "08",
    cat: "Santé",
    title: "MediSens",
    desc: "Plateforme médicale interactive de vulgarisation santé. Des modules dédiés à la compréhension des pathologies cardiovasculaires et rénales pour le grand public.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projets"
      style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div style={{ marginBottom: 60 }}>
        <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
          Projets
        </p>
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#f0f0ee", lineHeight: 1.05 }}>
          Travaux sélectionnés.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {PROJECTS.map((p, i) => (
          <a
            key={i}
            href={p.link}
            style={{
              background: CARD,
              border: `1px solid ${BORDER}`,
              padding: "28px 28px",
              display: "grid",
              gridTemplateColumns: "56px 1fr auto",
              gap: "0 20px",
              alignItems: "center",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#161616";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(202,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = CARD;
              (e.currentTarget as HTMLElement).style.borderColor = BORDER;
            }}
          >
            {/* Number */}
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 13, color: "#333", letterSpacing: "0.05em" }}>
              {p.n}
            </span>

            {/* Main */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: ACCENT, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {p.cat}
                </span>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      color: "#666",
                      background: "#1c1c1c",
                      border: `1px solid ${BORDER}`,
                      borderRadius: 4,
                      padding: "2px 7px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 17, color: "#f0f0ee", marginBottom: 6 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.6, maxWidth: 600 }}>
                {p.desc}
              </p>
            </div>

            {/* Arrow */}
            <span style={{ color: "#333", fontSize: 18, flexShrink: 0, transition: "color 0.2s, transform 0.2s" }}>
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
