import { useEffect, useState } from "react";

function Toggle() {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        height: "18px",
        width: "32px",
        borderRadius: "9px",
        background: "#7c5cbf",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "white",
        }}
      />
    </div>
  );
}

function PhoneMockup({ small = false }: { small?: boolean }) {
  const w = small ? 140 : 195;
  const h = small ? 280 : 390;
  return (
    <div
      style={{
        width: `${w}px`,
        height: `${h}px`,
        background: "#c4b5fd",
        borderRadius: small ? 22 : 32,
        border: "3px solid #111",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: small ? 52 : 72,
          height: small ? 14 : 20,
          background: "#111",
          borderRadius: "0 0 10px 10px",
          zIndex: 10,
        }}
      />
      <div
        style={{
          paddingTop: small ? 18 : 26,
          paddingLeft: small ? 7 : 10,
          paddingRight: small ? 7 : 10,
          paddingBottom: small ? 7 : 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: small ? 3 : 5 }}>
          <div style={{ fontSize: small ? 4.5 : 6, color: "#5b21b6", letterSpacing: "0.15em", fontWeight: 600 }}>LY</div>
          <div style={{ fontSize: small ? 6 : 8.5, fontWeight: 800, color: "#111", letterSpacing: "0.02em" }}>
            ONE-CLICK CHECKOUT
          </div>
        </div>
        <div
          style={{
            background: "#a855f7",
            borderRadius: 5,
            padding: small ? "3px 5px" : "4px 6px",
            textAlign: "center",
            marginBottom: small ? 5 : 7,
            fontSize: small ? 5.5 : 7.5,
            color: "white",
            fontWeight: 600,
          }}
        >
          Spin to win a discount!
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(167,139,250,0.45)",
            borderRadius: 8,
            marginBottom: small ? 4 : 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <svg width={small ? 50 : 70} height={small ? 86 : 120} viewBox="0 0 70 120" fill="none">
            <ellipse cx="35" cy="22" rx="16" ry="18" fill="rgba(80,40,120,0.55)" />
            <ellipse cx="35" cy="68" rx="24" ry="32" fill="rgba(80,40,120,0.45)" />
            <ellipse cx="10" cy="62" rx="9" ry="22" fill="rgba(80,40,120,0.35)" transform="rotate(-10 10 62)" />
            <ellipse cx="60" cy="62" rx="9" ry="22" fill="rgba(80,40,120,0.35)" transform="rotate(10 60 62)" />
            <ellipse cx="26" cy="108" rx="10" ry="14" fill="rgba(80,40,120,0.4)" />
            <ellipse cx="44" cy="108" rx="10" ry="14" fill="rgba(80,40,120,0.4)" />
          </svg>
        </div>
        <div style={{ marginBottom: small ? 3 : 5 }}>
          <div style={{ fontSize: small ? 5.5 : 7.5, color: "#4b5563" }}>3-piece gymwear</div>
          <div style={{ fontSize: small ? 8 : 11, fontWeight: 800, color: "#111" }}>£84.99</div>
        </div>
        <div
          style={{
            background: "#fef08a",
            borderRadius: 6,
            padding: small ? "3px 6px" : "5px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: small ? 5.5 : 8, fontWeight: 800, color: "#111" }}>Flash sale!</div>
            <div style={{ fontSize: small ? 4.5 : 6.5, color: "#6b7280" }}>Counting down</div>
          </div>
          <div
            style={{
              width: small ? 16 : 22,
              height: small ? 16 : 22,
              background: "#a78bfa",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: `${small ? 3 : 4}px solid transparent`,
                borderBottom: `${small ? 3 : 4}px solid transparent`,
                borderLeft: `${small ? 5 : 7}px solid white`,
                marginLeft: "2px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const BIG_TEXT: React.CSSProperties = {
  fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
  fontWeight: 400,
  color: "#0d0d0d",
  lineHeight: 0.88,
  letterSpacing: "-0.01em",
  textAlign: "center",
  pointerEvents: "none",
  display: "block",
};

export default function Hero() {
  const [secs, setSecs] = useState(22 * 60 + 41);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const timer = `${pad(h)}:${pad(m)}:${pad(s)}`;

  if (isMobile) {
    return (
      <section
        style={{
          background: "#f0ece4",
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          fontFamily: "sans-serif",
          userSelect: "none",
        }}
      >
        {/* ONLINE */}
        <div style={{ ...BIG_TEXT, fontSize: "clamp(64px, 22vw, 120px)", paddingTop: 8 }}>
          ONLINE
        </div>

        {/* Phone + top row cards */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "12px 16px",
          }}
        >
          {/* Left: Selling Fast */}
          <div
            style={{
              background: "#f9f277",
              padding: "10px 12px",
              flexShrink: 0,
              maxWidth: 120,
            }}
          >
            <div
              style={{
                fontFamily: "'Anton', 'Arial Black', sans-serif",
                fontSize: 13,
                fontWeight: 900,
                color: "#111",
                marginBottom: 3,
              }}
            >
              SELLING FAST
            </div>
            <div style={{ fontSize: 11, color: "#111" }}>≡ Only 5 left!</div>
          </div>

          {/* Center: Phone */}
          <PhoneMockup small />

          {/* Right: Popular */}
          <div
            style={{
              background: "white",
              padding: "10px 10px",
              borderRadius: 8,
              boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
              maxWidth: 120,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 44,
                height: 52,
                background: "linear-gradient(160deg,#d4cfe8,#9b8ec4)",
                borderRadius: 4,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="38" viewBox="0 0 30 52" fill="none">
                <ellipse cx="15" cy="10" rx="8" ry="9" fill="rgba(60,30,90,0.5)" />
                <ellipse cx="15" cy="34" rx="12" ry="18" fill="rgba(60,30,90,0.4)" />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "'Anton', 'Arial Black', sans-serif",
                fontSize: 11,
                fontWeight: 900,
                color: "#111",
                marginBottom: 3,
              }}
            >
              ★ POPULAR
            </div>
            <div style={{ fontSize: 10, color: "#374151", lineHeight: 1.3 }}>
              65 people bought in 24hrs!
            </div>
          </div>
        </div>

        {/* Cookie consent */}
        <div style={{ padding: "0 16px 12px" }}>
          <div
            style={{
              background: "white",
              padding: "14px 16px",
              borderRadius: 10,
              boxShadow: "0 2px 14px rgba(0,0,0,0.09)",
            }}
          >
            {["Essential cookies", "Advertising cookies", "Analytical cookies", "Other cookies"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                    fontSize: 13,
                    color: "#111",
                  }}
                >
                  <span>+ {label}</span>
                  <Toggle />
                </div>
              )
            )}
            <button
              style={{
                width: "100%",
                background: "#9b79e0",
                color: "white",
                fontWeight: 800,
                fontSize: 13,
                padding: "9px 0",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.07em",
                marginBottom: 8,
              }}
            >
              ACCEPT ALL
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", letterSpacing: "0.04em" }}>
              CUSTOMISE COOKIES
            </div>
          </div>
        </div>

        {/* Timer + Free shipping row */}
        <div style={{ display: "flex", gap: 12, padding: "0 16px 12px" }}>
          <div
            style={{
              background: "#f9f277",
              padding: "12px 14px",
              flex: 1,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 3 }}>⏳</div>
            <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 3 }}>
              Super discount ending...
            </div>
            <div
              style={{
                fontFamily: "'Anton', 'Arial Black', monospace, sans-serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#111",
              }}
            >
              {timer}
            </div>
          </div>
          <div
            style={{
              background: "#9b79e0",
              padding: "12px 14px",
              borderRadius: 9,
              flex: 1,
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
              🚚 Free shipping!!!*
            </div>
            <div style={{ fontSize: 11, opacity: 0.88 }}>* When you shop through our app</div>
          </div>
        </div>

        {/* Review */}
        <div style={{ padding: "0 16px 12px" }}>
          <div
            style={{
              background: "white",
              padding: "10px 16px 10px 10px",
              borderRadius: 50,
              display: "flex",
              gap: 10,
              alignItems: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#b794f4,#7c3aed)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
                  <ellipse cx="14" cy="10" rx="7" ry="7" fill="rgba(255,255,255,0.7)" />
                  <ellipse cx="14" cy="28" rx="13" ry="14" fill="rgba(255,255,255,0.6)" />
                </svg>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -3,
                  width: 16,
                  height: 16,
                  background: "#22c55e",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  color: "white",
                  fontWeight: 700,
                  border: "1.5px solid white",
                }}
              >
                ✓
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#111", lineHeight: 1.4 }}>
              "So worth the money! I got another one."
            </div>
          </div>
        </div>

        {/* SHOPPING */}
        <div style={{ ...BIG_TEXT, fontSize: "clamp(64px, 22vw, 120px)", paddingBottom: 8 }}>
          SHOPPING
        </div>
      </section>
    );
  }

  /* ── DESKTOP layout (unchanged) ── */
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#f0ece4",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ONLINE */}
      <div style={{ ...BIG_TEXT, position: "absolute", top: 0, left: 0, right: 0, zIndex: 0, fontSize: "clamp(100px, 20vw, 290px)" }}>
        ONLINE
      </div>

      {/* SHOPPING */}
      <div style={{ ...BIG_TEXT, position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 0, fontSize: "clamp(100px, 20vw, 290px)" }}>
        SHOPPING
      </div>

      {/* Phone */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <PhoneMockup />
      </div>

      {/* Card 1 · Selling Fast */}
      <div
        style={{
          position: "absolute",
          left: "17%",
          top: "27%",
          background: "#f9f277",
          padding: "13px 18px",
          zIndex: 20,
          minWidth: 155,
        }}
      >
        <div style={{ fontFamily: "'Anton','Arial Black',sans-serif", fontWeight: 900, fontSize: 17, color: "#111", marginBottom: 4 }}>
          SELLING FAST
        </div>
        <div style={{ fontSize: 13, color: "#111" }}>≡ Only 5 left!</div>
      </div>

      {/* Card 2 · Popular */}
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "27%",
          background: "white",
          padding: "12px 14px",
          borderRadius: 8,
          zIndex: 20,
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          maxWidth: 230,
          boxShadow: "0 2px 14px rgba(0,0,0,0.09)",
        }}
      >
        <div
          style={{
            width: 58,
            height: 68,
            background: "linear-gradient(160deg,#d4cfe8,#9b8ec4)",
            borderRadius: 4,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="30" height="52" viewBox="0 0 30 52" fill="none">
            <ellipse cx="15" cy="10" rx="8" ry="9" fill="rgba(60,30,90,0.5)" />
            <ellipse cx="15" cy="34" rx="12" ry="18" fill="rgba(60,30,90,0.4)" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Anton','Arial Black',sans-serif", fontWeight: 900, fontSize: 14, color: "#111", marginBottom: 5 }}>
            ★ POPULAR
          </div>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.4 }}>
            65 people bought this item in 24hrs!
          </div>
        </div>
      </div>

      {/* Card 3 · Cookie consent */}
      <div
        style={{
          position: "absolute",
          left: "22%",
          top: "47%",
          background: "white",
          padding: "14px 16px",
          borderRadius: 10,
          zIndex: 20,
          minWidth: 235,
          boxShadow: "0 2px 18px rgba(0,0,0,0.10)",
        }}
      >
        {["Essential cookies", "Advertising cookies", "Analytical cookies", "Other cookies"].map((label) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 12, color: "#111" }}>
            <span>+ {label}</span>
            <Toggle />
          </div>
        ))}
        <button
          style={{
            width: "100%",
            background: "#9b79e0",
            color: "white",
            fontWeight: 800,
            fontSize: 13,
            padding: "9px 0",
            borderRadius: 7,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.07em",
            marginBottom: 8,
          }}
        >
          ACCEPT ALL
        </button>
        <div style={{ textAlign: "center", fontSize: 10.5, color: "#9ca3af", letterSpacing: "0.04em" }}>
          CUSTOMISE COOKIES
        </div>
      </div>

      {/* Card 4 · Timer */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          background: "#f9f277",
          padding: "15px 20px",
          zIndex: 20,
          minWidth: 185,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 18, marginBottom: 4 }}>⏳</div>
        <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 4 }}>Super discount ending...</div>
        <div style={{ fontFamily: "'Anton','Arial Black',monospace,sans-serif", fontWeight: 900, fontSize: 26, color: "#111", letterSpacing: "0.02em" }}>
          {timer}
        </div>
      </div>

      {/* Card 5 · Free shipping */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "69%",
          background: "#9b79e0",
          padding: "12px 16px",
          borderRadius: 9,
          zIndex: 20,
          minWidth: 205,
          color: "white",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>🚚 Free shipping!!!*</div>
        <div style={{ fontSize: 11, opacity: 0.88 }}>* When you shop through our app</div>
      </div>

      {/* Card 6 · Review */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "69%",
          background: "white",
          padding: "10px 16px 10px 10px",
          borderRadius: 50,
          zIndex: 20,
          display: "flex",
          gap: 10,
          alignItems: "center",
          maxWidth: 245,
          boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#b794f4,#7c3aed)",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
              <ellipse cx="14" cy="10" rx="7" ry="7" fill="rgba(255,255,255,0.7)" />
              <ellipse cx="14" cy="28" rx="13" ry="14" fill="rgba(255,255,255,0.6)" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -1,
              right: -3,
              width: 16,
              height: 16,
              background: "#22c55e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: "white",
              fontWeight: 700,
              border: "1.5px solid white",
            }}
          >
            ✓
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#111", lineHeight: 1.4 }}>
          "So worth the money! I got another one."
        </div>
      </div>
    </section>
  );
}
