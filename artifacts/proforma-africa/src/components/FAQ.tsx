import { useState } from "react";
import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const ITEMS = [
  { q:"Quels types de projets acceptez-vous ?",                         a:"J'accepte tous les projets web et mobile : sites vitrines, e-commerce, apps Flutter, dashboards, SaaS, APIs. Si vous avez un projet digital, on peut en discuter." },
  { q:"Quels sont vos délais de livraison ?",                           a:"Un site vitrine peut être livré en 1 à 2 semaines. Une application complète prend 4 à 8 semaines. Je définis toujours un planning clair dès le début." },
  { q:"Travaillez-vous en remote avec des clients hors du Bénin ?",     a:"Oui, absolument. Je travaille avec des clients partout en Afrique et dans le monde entier. Toutes les communications et livraisons se font en ligne." },
  { q:"Comment se passe le processus de travail ?",                     a:"On commence par un appel de cadrage, puis je prépare un devis détaillé. Après validation, je développe en itérations avec des points réguliers." },
  { q:"Proposez-vous une maintenance après livraison ?",                a:"Oui, je propose un accompagnement post-livraison. Un contrat de maintenance mensuel peut être défini pour assurer les mises à jour et corrections." },
  { q:"Quelles sont vos conditions de paiement ?",                     a:"40% à la signature, 30% à mi-projet, 30% à la livraison. Des modalités flexibles peuvent être discutées selon le projet." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number|null>(null);

  return (
    <section id="faq" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 52,
        }}>
          <div>QUESTIONS</div>
          <div>FRÉQUENTES.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            const bg = i % 3 === 0 ? YELLOW : i % 3 === 1 ? WHITE : WHITE;
            return (
              <div key={i} style={{
                background: isOpen ? PURPLE : bg,
                borderRadius: bg === YELLOW ? 0 : 10,
                overflow: "hidden",
                boxShadow: bg === WHITE && !isOpen ? "0 2px 10px rgba(0,0,0,0.07)" : "none",
                transition: "background 0.22s",
              }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{
                  width: "100%", background: "none", border: "none",
                  padding: "20px 24px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", gap: 16, textAlign: "left",
                }}>
                  <span style={{
                    fontFamily: "'Anton', sans-serif", fontSize: "clamp(15px,2.2vw,18px)",
                    fontWeight: 400,
                    color: isOpen ? "#fff" : TEXT,
                  }}>{item.q}</span>
                  <span style={{
                    fontSize: 22, flexShrink: 0,
                    color: isOpen ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.3)",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                    lineHeight: 1,
                  }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 24px 22px" }}>
                    <p style={{
                      fontFamily: "sans-serif", fontSize: 14, lineHeight: 1.7,
                      color: "rgba(255,255,255,0.85)",
                    }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ fontFamily: "sans-serif", fontSize: 14, color: MUTED, marginBottom: 14 }}>
            Vous avez une autre question ?
          </p>
          <a href="#contact" style={{
            display: "inline-block",
            background: YELLOW, color: TEXT,
            padding: "11px 24px",
            fontFamily: "'Anton', sans-serif", fontSize: 16, fontWeight: 400,
            textDecoration: "none", letterSpacing: "0.02em",
          }}>POSER UNE QUESTION →</a>
        </div>
      </div>
    </section>
  );
}
