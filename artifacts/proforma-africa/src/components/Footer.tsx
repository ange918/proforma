import { ACCENT, BORDER, MUTED } from "../lib/constants";

const NAV = [
  { label: "À propos", href: "#apropos" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${BORDER}`,
        padding: "32px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Logo */}
      <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 20, color: ACCENT, letterSpacing: "0.02em" }}>
        Bs.dev
      </span>

      {/* Nav */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {NAV.map((l) => (
          <a key={l.href} href={l.href} style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f0f0ee")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
          >
            {l.label}
          </a>
        ))}
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f0f0ee")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTED)}
        >
          GitHub
        </a>
      </div>

      {/* Copy */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#444" }}>
          © BigSixteen 2026. Tous droits réservés.
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#333" }}>
          Cotonou, Bénin
        </span>
      </div>
    </footer>
  );
}
