import { useState } from "react";
import { ACCENT, CARD, BORDER, MUTED } from "../lib/constants";

const ITEMS = [
  {
    q: "Quels types de projets acceptez-vous ?",
    a: "J'accepte tous les projets web et mobile : sites vitrines, e-commerce, applications mobiles Flutter, dashboards, SaaS, APIs. Si vous avez un projet digital, on peut en discuter.",
  },
  {
    q: "Quels sont vos délais de livraison ?",
    a: "Les délais varient selon la complexité du projet. Un site vitrine peut être livré en 1 à 2 semaines, tandis qu'une application complète peut prendre 4 à 8 semaines. Je définis toujours un planning clair dès le début.",
  },
  {
    q: "Travaillez-vous en remote avec des clients hors du Bénin ?",
    a: "Oui, absolument. Je travaille avec des clients partout en Afrique et dans le monde entier. Toutes les communications et livraisons se font en ligne, sans contrainte géographique.",
  },
  {
    q: "Comment se passe le processus de travail ?",
    a: "On commence par un appel pour cadrer votre projet, puis je prépare un devis détaillé. Après validation, je développe en itérations avec des points réguliers. Vous êtes impliqué à chaque étape clé.",
  },
  {
    q: "Proposez-vous une maintenance après livraison ?",
    a: "Oui, je propose un accompagnement post-livraison. On peut définir un contrat de maintenance mensuel pour assurer les mises à jour, corrections et évolutions de votre projet.",
  },
  {
    q: "Quelles sont vos conditions de paiement ?",
    a: "En général, 40% à la signature du contrat, 30% à mi-projet et 30% à la livraison finale. Des modalités flexibles peuvent être discutées selon le projet.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "100px 24px",
        background: "#0e0e0e",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
            FAQ
          </p>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#f0f0ee", lineHeight: 1.05 }}>
            Questions fréquentes.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                background: CARD,
                border: `1px solid ${open === i ? "rgba(202,255,0,0.2)" : BORDER}`,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: 16,
                  textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "#f0f0ee" }}>
                  {item.q}
                </span>
                <span
                  style={{
                    color: open === i ? ACCENT : "#555",
                    fontSize: 20,
                    flexShrink: 0,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s, color 0.2s",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: MUTED, marginBottom: 16 }}>
            Vous avez une autre question ?
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
            Écrivez-moi directement, je réponds en général sous 24h. →
          </a>
        </div>
      </div>
    </section>
  );
}
