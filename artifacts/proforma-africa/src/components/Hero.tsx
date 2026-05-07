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

function PhoneMockup() {
  return (
    <div
      style={{
        width: "195px",
        height: "390px",
        background: "#c4b5fd",
        borderRadius: "32px",
        border: "3px solid #111",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "72px",
          height: "20px",
          background: "#111",
          borderRadius: "0 0 12px 12px",
          zIndex: 10,
        }}
      />

      {/* App content */}
      <div
        style={{
          paddingTop: "26px",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingBottom: "10px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* App header */}
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
          <div
            style={{
              fontSize: "6px",
              color: "#5b21b6",
              letterSpacing: "0.15em",
              fontWeight: 600,
            }}
          >
            LY
          </div>
          <div
            style={{
              fontSize: "8.5px",
              fontWeight: 800,
              color: "#111",
              letterSpacing: "0.02em",
            }}
          >
            ONE-CLICK CHECKOUT
          </div>
        </div>

        {/* Spin banner */}
        <div
          style={{
            background: "#a855f7",
            borderRadius: "5px",
            padding: "4px 6px",
            textAlign: "center",
            marginBottom: "7px",
            fontSize: "7.5px",
            color: "white",
            fontWeight: 600,
          }}
        >
          Spin to win a discount!
        </div>

        {/* Product image */}
        <div
          style={{
            flex: 1,
            background: "rgba(167,139,250,0.45)",
            borderRadius: "8px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Stylised person silhouette */}
          <svg width="70" height="120" viewBox="0 0 70 120" fill="none">
            {/* head */}
            <ellipse cx="35" cy="22" rx="16" ry="18" fill="rgba(80,40,120,0.55)" />
            {/* torso */}
            <ellipse cx="35" cy="68" rx="24" ry="32" fill="rgba(80,40,120,0.45)" />
            {/* arms */}
            <ellipse cx="10" cy="62" rx="9" ry="22" fill="rgba(80,40,120,0.35)" transform="rotate(-10 10 62)" />
            <ellipse cx="60" cy="62" rx="9" ry="22" fill="rgba(80,40,120,0.35)" transform="rotate(10 60 62)" />
            {/* legs */}
            <ellipse cx="26" cy="108" rx="10" ry="14" fill="rgba(80,40,120,0.4)" />
            <ellipse cx="44" cy="108" rx="10" ry="14" fill="rgba(80,40,120,0.4)" />
          </svg>
        </div>

        {/* Product info */}
        <div style={{ marginBottom: "5px" }}>
          <div style={{ fontSize: "7.5px", color: "#4b5563" }}>3-piece gymwear</div>
          <div style={{ fontSize: "11px", fontWeight: 800, color: "#111" }}>£84.99</div>
        </div>

        {/* Flash sale bar */}
        <div
          style={{
            background: "#fef08a",
            borderRadius: "6px",
            padding: "5px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "8px", fontWeight: 800, color: "#111" }}>Flash sale!</div>
            <div style={{ fontSize: "6.5px", color: "#6b7280" }}>Counting down</div>
          </div>
          {/* Play button */}
          <div
            style={{
              width: "22px",
              height: "22px",
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
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                borderLeft: "7px solid white",
                marginLeft: "2px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [secs, setSecs] = useState(22 * 60 + 41);

  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

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
      {/* ── BIG TYPOGRAPHY ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(100px, 20vw, 290px)",
          fontWeight: 400,
          color: "#0d0d0d",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        ONLINE
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "'Anton', 'Arial Black', Impact, sans-serif",
          fontSize: "clamp(100px, 20vw, 290px)",
          fontWeight: 400,
          color: "#0d0d0d",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        SHOPPING
      </div>

      {/* ── PHONE – centred ── */}
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

      {/* ── CARD 1 · SELLING FAST (top-left, yellow) ── */}
      <div
        style={{
          position: "absolute",
          left: "17%",
          top: "27%",
          background: "#f9f277",
          padding: "13px 18px 13px 18px",
          zIndex: 20,
          minWidth: "155px",
        }}
      >
        <div
          style={{
            fontFamily: "'Anton', 'Arial Black', sans-serif",
            fontWeight: 900,
            fontSize: "17px",
            color: "#111",
            letterSpacing: "0.01em",
            marginBottom: "4px",
          }}
        >
          SELLING FAST
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#111" }}>
          ≡ Only 5 left!
        </div>
      </div>

      {/* ── CARD 2 · POPULAR (top-right, white) ── */}
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "27%",
          background: "white",
          padding: "12px 14px",
          borderRadius: "8px",
          zIndex: 20,
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
          maxWidth: "230px",
          boxShadow: "0 2px 14px rgba(0,0,0,0.09)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            width: "58px",
            height: "68px",
            background: "linear-gradient(160deg,#d4cfe8,#9b8ec4)",
            borderRadius: "4px",
            flexShrink: 0,
            overflow: "hidden",
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
          <div
            style={{
              fontFamily: "'Anton', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "14px",
              color: "#111",
              marginBottom: "5px",
            }}
          >
            ★ POPULAR
          </div>
          <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.4 }}>
            65 people bought this item in 24hrs!
          </div>
        </div>
      </div>

      {/* ── CARD 3 · COOKIE CONSENT (middle-left, white) ── */}
      <div
        style={{
          position: "absolute",
          left: "22%",
          top: "47%",
          background: "white",
          padding: "14px 16px",
          borderRadius: "10px",
          zIndex: 20,
          minWidth: "235px",
          boxShadow: "0 2px 18px rgba(0,0,0,0.10)",
          fontFamily: "sans-serif",
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
                marginBottom: "10px",
                fontSize: "12px",
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
            fontSize: "13px",
            padding: "9px 0",
            borderRadius: "7px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.07em",
            marginBottom: "8px",
            fontFamily: "sans-serif",
          }}
        >
          ACCEPT ALL
        </button>
        <div style={{ textAlign: "center", fontSize: "10.5px", color: "#9ca3af", letterSpacing: "0.04em" }}>
          CUSTOMISE COOKIES
        </div>
      </div>

      {/* ── CARD 4 · TIMER (right, yellow) ── */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          background: "#f9f277",
          padding: "15px 20px",
          zIndex: 20,
          minWidth: "185px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Hourglass icon */}
        <div style={{ fontSize: "18px", marginBottom: "4px" }}>⏳</div>
        <div style={{ fontSize: "12px", color: "#4b5563", marginBottom: "4px" }}>
          Super discount ending...
        </div>
        <div
          style={{
            fontFamily: "'Anton', 'Arial Black', monospace, sans-serif",
            fontWeight: 900,
            fontSize: "26px",
            color: "#111",
            letterSpacing: "0.02em",
          }}
        >
          {pad(h)}:{pad(m)}:{pad(s)}
        </div>
      </div>

      {/* ── CARD 5 · FREE SHIPPING (bottom-right, purple) ── */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "69%",
          background: "#9b79e0",
          padding: "12px 16px",
          borderRadius: "9px",
          zIndex: 20,
          minWidth: "205px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}>
          🚚 Free shipping!!!*
        </div>
        <div style={{ fontSize: "11px", opacity: 0.88 }}>* When you shop through our app</div>
      </div>

      {/* ── CARD 6 · REVIEW (bottom-left, white pill) ── */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "69%",
          background: "white",
          padding: "10px 16px 10px 10px",
          borderRadius: "50px",
          zIndex: 20,
          display: "flex",
          gap: "10px",
          alignItems: "center",
          maxWidth: "245px",
          boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: "38px",
              height: "38px",
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
          {/* Verified checkmark */}
          <div
            style={{
              position: "absolute",
              bottom: "-1px",
              right: "-3px",
              width: "16px",
              height: "16px",
              background: "#22c55e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "9px",
              color: "white",
              fontWeight: 700,
              border: "1.5px solid white",
            }}
          >
            ✓
          </div>
        </div>
        <div style={{ fontSize: "12px", color: "#111", lineHeight: 1.4 }}>
          "So worth the money! I got another one."
        </div>
      </div>
    </section>
  );
}
