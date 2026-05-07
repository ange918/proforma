import { useEffect, useRef, useState } from "react";
import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const STACK = [
  "HTML5","CSS3","JavaScript","TypeScript","React",
  "Next.js","Node.js","Express","Flutter","MongoDB","Tailwind CSS","Git",
];

const STATS = [
  { value: 20, suffix: "+",   label: "Projets livrés",     bg: YELLOW,  r: 0  },
  { value: 100, suffix: "%",  label: "Clients satisfaits", bg: WHITE,   r: 10 },
  { value: 3,  suffix: "",    label: "Pays clients",       bg: PURPLE,  r: 10 },
  { value: 3,  suffix: "an+", label: "D'expérience",       bg: WHITE,   r: 10 },
];

function Counter({ target, suffix, textColor }: { target: number; suffix: string; textColor: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const steps = 40;
        const inc = target / steps;
        const iv = setInterval(() => {
          cur += inc;
          if (cur >= target) { setN(target); clearInterval(iv); }
          else setN(Math.floor(cur));
        }, 1400 / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} style={{
      fontFamily: "'Anton', sans-serif",
      fontSize: "clamp(40px, 6vw, 64px)",
      color: textColor, lineHeight: 1,
    }}>{n}{suffix}</div>
  );
}

export default function Skills() {
  return (
    <section id="competences" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 52,
        }}>
          <div>MA STACK</div>
          <div>TECHNIQUE.</div>
        </div>

        {/* Tech badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 64 }}>
          {STACK.map((tech, i) => {
            const colors = [YELLOW, WHITE, WHITE, WHITE, WHITE, WHITE];
            const bg = i % 6 === 0 ? YELLOW : i % 6 === 2 ? PURPLE : WHITE;
            const color = bg === PURPLE ? "#fff" : TEXT;
            return (
              <span key={tech} style={{
                background: bg, color,
                fontFamily: "'Anton', sans-serif", fontWeight: 400,
                fontSize: "clamp(14px, 2vw, 18px)",
                padding: "8px 18px",
                borderRadius: bg === YELLOW ? 0 : 100,
                boxShadow: bg === WHITE ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
                letterSpacing: "0.01em",
                transition: "transform 0.15s",
                cursor: "default",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >{tech}</span>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid-4">
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: s.bg, borderRadius: s.r, padding: "28px 20px",
              textAlign: "center",
              boxShadow: s.bg === WHITE ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
            }}>
              <Counter target={s.value} suffix={s.suffix}
                textColor={s.bg === PURPLE ? "#fff" : TEXT} />
              <div style={{
                fontFamily: "sans-serif", fontSize: 13, marginTop: 8,
                color: s.bg === PURPLE ? "rgba(255,255,255,0.75)" : MUTED,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
