import { useState } from "react";
import { ACCENT, BORDER, MUTED, WHATSAPP_NUMBER } from "../lib/constants";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const text = encodeURIComponent(`Bonjour Ange, je m'appelle ${name}.\n\n${message}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${text}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#141414",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "13px 16px",
    color: "#f0f0ee",
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 24px",
        background: "#0e0e0e",
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", marginBottom: 12, textTransform: "uppercase" }}>
          Contact
        </p>
        <h2
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            color: "#f0f0ee",
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          Prêt à construire avec moi ?
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, color: MUTED, marginBottom: 48, lineHeight: 1.65 }}>
          Décrivez votre projet en quelques mots. Je réponds sous 24h.
        </p>

        <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
          {/* Name */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: MUTED, display: "block", marginBottom: 6, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Nom
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,255,0,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: MUTED, display: "block", marginBottom: 6, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Message
            </label>
            <textarea
              placeholder="Décrivez votre projet..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(202,255,0,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = BORDER)}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "#25d366",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "14px 24px",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "opacity 0.2s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {/* WhatsApp icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Envoyer sur WhatsApp →
          </button>
        </form>
      </div>
    </section>
  );
}
