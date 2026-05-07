import { useEffect, useState } from "react";
import { BG, TEXT, PURPLE, BORDER } from "../lib/constants";

const LINKS = [
  { label: "Accueil",      href: "#accueil" },
  { label: "À propos",     href: "#apropos" },
  { label: "Compétences",  href: "#competences" },
  { label: "Projets",      href: "#projets" },
  { label: "Avis",         href: "#avis" },
  { label: "FAQ",          href: "#faq" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(240,236,228,0.94)" : "transparent",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s",
      padding: "0 28px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <a href="#accueil" style={{
        fontFamily: "'Anton', sans-serif", fontSize: 22,
        color: TEXT, textDecoration: "none", letterSpacing: "0.02em",
      }}>Bs.dev</a>

      {/* Desktop links */}
      <div className="hidden-mobile" style={{ gap: 28, alignItems: "center" }}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} style={{
            color: "#555", textDecoration: "none", fontSize: 13,
            fontWeight: 500, letterSpacing: "0.02em", transition: "color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
            onMouseLeave={e => (e.currentTarget.style.color = "#555")}
          >{l.label}</a>
        ))}
        <a href="#contact" style={{
          background: PURPLE, color: "#fff",
          padding: "7px 18px", fontSize: 13, fontWeight: 700,
          textDecoration: "none", borderRadius: 7,
        }}>Me contacter</a>
      </div>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} className="show-mobile"
        style={{ background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: 5, padding: 4 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: "block", width: 22, height: 2,
            background: TEXT, borderRadius: 1, transition: "all 0.2s",
            transform:
              open && i===0 ? "rotate(45deg) translate(5px,5px)" :
              open && i===1 ? "scaleX(0)" :
              open && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
          }} />
        ))}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0,
          background: BG, borderBottom: `1px solid ${BORDER}`,
          padding: "16px 24px 24px",
          display: "flex", flexDirection: "column", gap: 4, zIndex: 99,
        }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: "#333", textDecoration: "none", padding: "11px 0",
              borderBottom: `1px solid ${BORDER}`, fontSize: 15, fontWeight: 500,
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} style={{
            background: PURPLE, color: "#fff",
            padding: "12px 16px", borderRadius: 8,
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            textAlign: "center", marginTop: 8,
          }}>Me contacter</a>
        </div>
      )}
    </nav>
  );
}
