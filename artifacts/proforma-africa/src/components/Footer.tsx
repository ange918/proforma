import { TEXT, MUTED, YELLOW, BORDER } from "../lib/constants";

const NAV = [
  { label: "À propos",    href: "#apropos"     },
  { label: "Projets",     href: "#projets"     },
  { label: "Contact",     href: "#contact"     },
  { label: "GitHub",      href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer style={{
      background: TEXT, borderTop: `1px solid #222`,
      padding: "40px 28px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 20,
      }}>
        {/* Logo */}
        <span style={{
          fontFamily: "'Anton', sans-serif", fontSize: 24,
          color: YELLOW, letterSpacing: "0.02em",
        }}>Bs.dev</span>

        {/* Nav */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: "sans-serif", fontSize: 13, color: "#888",
              textDecoration: "none", transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888")}
            >{l.label}</a>
          ))}
        </div>

        {/* Copy */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555" }}>
            © BigSixteen 2026. Tous droits réservés.
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#444" }}>
            Cotonou, Bénin
          </div>
        </div>
      </div>
    </footer>
  );
}
