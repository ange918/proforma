import { TEXT, MUTED, YELLOW, PURPLE, WHITE, BORDER } from "../lib/constants";

export default function Testimonials() {
  return (
    <section id="avis" style={{ background: "#f0ece4", padding: "90px 28px", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(60px, 11vw, 150px)",
          fontWeight: 400, lineHeight: 0.9,
          letterSpacing: "-0.01em", color: TEXT,
          marginBottom: 52,
        }}>
          <div>CE QUE DISENT</div>
          <div>LES CLIENTS.</div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "stretch" }}>

          {/* Main testimonial — purple card */}
          <div style={{
            background: PURPLE, borderRadius: 12,
            padding: "36px 32px", flex: "1 1 380px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            {/* Stars */}
            <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: YELLOW, fontSize: 20 }}>★</span>
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontFamily: "sans-serif", fontSize: "clamp(15px, 2vw, 17px)",
              color: "#fff", lineHeight: 1.75, marginBottom: 32, fontStyle: "italic",
              flex: 1,
            }}>
              "Ange a transformé ma vision en une plateforme élégante et moderne. Son sens du détail et sa capacité à comprendre ce dont nous avions besoin m'ont impressionné. Un travail vraiment remarquable du début à la fin."
            </p>

            {/* Author */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.12)", borderRadius: 100,
              padding: "10px 16px 10px 10px", alignSelf: "flex-start",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: YELLOW,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Anton', sans-serif", fontSize: 16, color: TEXT, flexShrink: 0,
              }}>M</div>
              <div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, fontWeight: 400, color: "#fff" }}>
                  Morille
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>
                  Artiste & Directeur Créatif
                </div>
              </div>
            </div>
          </div>

          {/* CTA card — yellow */}
          <div style={{
            background: YELLOW, flex: "1 1 280px",
            display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "36px 32px", gap: 20,
          }}>
            <div style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 400, lineHeight: 0.9, color: TEXT,
            }}>VOTRE<br/>AVIS ICI.</div>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
              Vous avez travaillé avec moi ? Partagez votre expérience.
            </p>
            <a href="#contact" style={{
              display: "inline-block",
              background: TEXT, color: "#f0ece4",
              padding: "11px 22px",
              fontFamily: "'Anton', sans-serif", fontSize: 16, fontWeight: 400,
              textDecoration: "none", letterSpacing: "0.02em", alignSelf: "flex-start",
            }}>ME CONTACTER →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
