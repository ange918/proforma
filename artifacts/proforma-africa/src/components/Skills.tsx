import { useEffect, useRef, useState } from "react";
import { ACCENT, BORDER, MUTED } from "../lib/constants";

const STACK = [
  "HTML5","CSS3","JavaScript","TypeScript","React","Next.js",
  "Node.js","Express","Flutter","MongoDB","Tailwind CSS","Git",
];

const STATS = [
  { value: 20, suffix: "+", label: "Projets livrés" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 3, suffix: "", label: "Pays clients" },
  { value: 3, suffix: "an+", label: "D'expérience" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const steps = 40;
          const step = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(42px, 6vw, 68px)", color: "#f0f0ee", lineHeight: 1 }}>
      {count}{suffix}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="competences"
      style={{
        padding: "100px 24px",
        background: "#0e0e0e",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
            Compétences
          </p>
          <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, color: "#f0f0ee", lineHeight: 1.05 }}>
            Ma stack technique.
          </h2>
        </div>

        {/* Tech badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 80 }}>
          {STACK.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#c8c8c4",
                background: "#141414",
                border: `1px solid ${BORDER}`,
                borderRadius: 6,
                padding: "8px 16px",
                transition: "border-color 0.2s, color 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(202,255,0,0.4)";
                (e.currentTarget as HTMLElement).style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = BORDER;
                (e.currentTarget as HTMLElement).style.color = "#c8c8c4";
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }} className="grid-4-mobile">
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                background: "#141414",
                border: `1px solid ${BORDER}`,
                padding: "32px 24px",
                textAlign: "center",
              }}
            >
              <Counter target={s.value} suffix={s.suffix} />
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: MUTED, marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
