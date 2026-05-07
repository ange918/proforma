import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

const REASONS = [
  { n:"01", title:"Sur mesure avant tout",    desc:"Chaque projet est unique. Je ne utilise pas de templates génériques — je conçois et développe chaque site en partant de vos besoins réels.", bg: YELLOW,  r: 0  },
  { n:"02", title:"Performance & rapidité",   desc:"Des sites rapides, optimisés et bien structurés. Votre audience ne doit jamais attendre — la performance est intégrée dès le départ.",      bg: WHITE,   r: 10 },
  { n:"03", title:"Design soigné",            desc:"Un rendu visuel professionnel et moderne qui reflète votre image. Chaque détail compte pour donner confiance à vos visiteurs.",              bg: PURPLE,  r: 10 },
  { n:"04", title:"Accompagnement complet",   desc:"Je suis présent de l'idée à la mise en ligne, et au-delà. Vous n'êtes jamais seul face à votre projet digital.",                            bg: WHITE,   r: 10 },
];

export default function WhyMe() {
  return (
    <section id="apropos" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 48,
        }}>
          <div>POURQUOI</div>
          <div>MOI ?</div>
        </div>

        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: MUTED, marginBottom: 52, maxWidth: 520, lineHeight: 1.7 }}>
          Chaque projet est une opportunité de créer quelque chose d'unique. Je m'investis pleinement dans chaque mission comme si c'était la mienne.
        </p>

        <div className="grid-2">
          {REASONS.map(r => (
            <div key={r.n} style={{
              background: r.bg, borderRadius: r.r, padding: "32px 28px",
              boxShadow: r.bg === WHITE ? "0 3px 16px rgba(0,0,0,0.08)" : "none",
            }}>
              <div style={{
                fontFamily: "'Anton', sans-serif", fontSize: 52,
                color: r.bg === PURPLE ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
                lineHeight: 1, marginBottom: 16,
              }}>{r.n}</div>
              <h3 style={{
                fontFamily: "'Anton', sans-serif", fontSize: 22, fontWeight: 400,
                color: r.bg === PURPLE ? "#fff" : TEXT, marginBottom: 10,
              }}>{r.title}</h3>
              <p style={{
                fontFamily: "sans-serif", fontSize: 14, lineHeight: 1.65,
                color: r.bg === PURPLE ? "rgba(255,255,255,0.82)" : MUTED,
              }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
