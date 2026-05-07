import { useEffect, useState } from "react";
import { ACCENT, BORDER } from "../lib/constants";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseLink: React.CSSProperties = {
    color: "#aaa",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.02em",
    transition: "color 0.2s",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        background: scrolled ? "rgba(11,11,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <a
        href="#accueil"
        style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 22,
          color: ACCENT,
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        Bs.dev
      </a>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          gap: 28,
          alignItems: "center",
        }}
        className="hidden-mobile"
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={baseLink}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f0f0ee")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#aaa")}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            background: ACCENT,
            color: "#0b0b0b",
            padding: "7px 16px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Me contacter
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "none",
          flexDirection: "column",
          gap: 5,
          padding: 4,
        }}
        className="show-mobile"
        aria-label="Menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#f0f0ee",
              borderRadius: 1,
              transition: "all 0.2s",
              transformOrigin: "center",
              transform:
                open && i === 0 ? "rotate(45deg) translate(5px,5px)" :
                open && i === 1 ? "scaleX(0)" :
                open && i === 2 ? "rotate(-45deg) translate(5px,-5px)" :
                "none",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            background: "#111",
            borderBottom: `1px solid ${BORDER}`,
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 99,
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                ...baseLink,
                color: "#ccc",
                padding: "10px 0",
                borderBottom: `1px solid ${BORDER}`,
                fontSize: 15,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              background: ACCENT,
              color: "#0b0b0b",
              padding: "11px 16px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Me contacter
          </a>
        </div>
      )}
    </nav>
  );
}
