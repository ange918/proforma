import type { DonneesFacture } from "@/types";
import { calculerTotaux, formatDateFr, formatMontant } from "@/lib/utils";
import {
  DeviceMobile,
  Bank,
  Money,
  Note as NoteIcon,
} from "@phosphor-icons/react";

function getInitiales(nom: string): string {
  if (!nom) return "??";
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function PaiementIcon({ mode }: { mode: string }) {
  const props = { size: 14, weight: "regular" as const };
  if (mode === "Mobile Money") return <DeviceMobile {...props} />;
  if (mode === "Virement bancaire") return <Bank {...props} />;
  if (mode === "Espèces") return <Money {...props} />;
  return <NoteIcon {...props} />;
}

export default function Apercu({ donnees }: { donnees: DonneesFacture }) {
  const { sousTotal, totalTva, total } = calculerTotaux(donnees.lignes);
  const aDesLignes = donnees.lignes.some(
    (l) => l.description.trim() || l.prixUnitaire > 0,
  );

  return (
    <div
      style={{
        background: "#E8E4DC",
        padding: 24,
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="font-jakarta"
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 16,
          alignSelf: "flex-start",
        }}
      >
        Aperçu en temps réel
      </div>

      <div
        style={{
          background: "#FFFFFF",
          boxShadow: "var(--shadow)",
          borderRadius: 6,
          width: "100%",
          maxWidth: 580,
          color: "var(--text)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* TOP GRADIENT BAR */}
        <div
          style={{
            height: 8,
            background:
              "linear-gradient(90deg, var(--green) 0%, var(--green) 60%, var(--gold) 100%)",
          }}
        />

        {/* CORNER ORNAMENT — gold dots */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            display: "grid",
            gridTemplateColumns: "repeat(4, 4px)",
            gap: 4,
            opacity: 0.2,
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--gold)",
              }}
            />
          ))}
        </div>

        <div style={{ padding: "36px 40px 40px" }}>
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {donnees.logoEntreprise ? (
                <img
                  src={donnees.logoEntreprise}
                  alt="logo"
                  style={{ height: 56, objectFit: "contain" }}
                />
              ) : (
                <div
                  className="font-unbounded"
                  style={{
                    width: 56,
                    height: 56,
                    background: "var(--green)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 6,
                    boxShadow: "0 4px 12px rgba(26, 107, 60, 0.25)",
                  }}
                >
                  {getInitiales(donnees.nomEntreprise || "")}
                </div>
              )}
              <div
                className="font-unbounded"
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  marginTop: 12,
                  color: "var(--text)",
                  wordBreak: "break-word",
                  letterSpacing: "-0.01em",
                }}
              >
                {donnees.nomEntreprise || "Votre entreprise"}
              </div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>
                {(donnees.villeEntreprise || donnees.paysEntreprise) && (
                  <div
                    style={{ fontSize: 12, color: "var(--text-muted)" }}
                  >
                    {[donnees.villeEntreprise, donnees.paysEntreprise]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}
                {donnees.emailEntreprise && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {donnees.emailEntreprise}
                  </div>
                )}
                {donnees.telephoneEntreprise && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {donnees.telephoneEntreprise}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — TYPE & METADATA */}
            <div
              style={{
                textAlign: "right",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                className="font-unbounded"
                style={{
                  fontWeight: 700,
                  fontSize: 32,
                  color: "var(--green)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {donnees.typeDocument.toUpperCase()}
              </div>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "5px 12px",
                  background: "var(--green-light)",
                  color: "var(--green)",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 999,
                  letterSpacing: "0.02em",
                }}
              >
                N° {donnees.numeroFacture}
              </div>
              <div style={{ marginTop: 10, lineHeight: 1.6 }}>
                {donnees.dateEmission && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Émis le {formatDateFr(donnees.dateEmission)}
                  </div>
                )}
                {donnees.dateEcheance && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Échéance: {formatDateFr(donnees.dateEcheance)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CLIENT CARD */}
          <div
            style={{
              marginTop: 28,
              background: "var(--bg)",
              borderLeft: "3px solid var(--green)",
              padding: "16px 20px",
              borderRadius: "0 6px 6px 0",
            }}
          >
            <div
              className="font-jakarta"
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Facturé à
            </div>
            <div
              className="font-unbounded"
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginTop: 6,
                color: "var(--text)",
              }}
            >
              {donnees.nomClient || "Nom du client"}
            </div>
            <div style={{ marginTop: 4, lineHeight: 1.6 }}>
              {donnees.entrepriseClient && (
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {donnees.entrepriseClient}
                </div>
              )}
              {(donnees.villeClient || donnees.paysClient) && (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {[donnees.villeClient, donnees.paysClient]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
              {donnees.emailClient && (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {donnees.emailClient}
                </div>
              )}
              {donnees.telephoneClient && (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {donnees.telephoneClient}
                </div>
              )}
            </div>
          </div>

          {/* TABLEAU SERVICES */}
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 0.6fr 1fr 0.6fr 1fr",
                gap: 8,
                background: "var(--green)",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 6,
              }}
            >
              {["Description", "Qté", "P.U.", "TVA", "Total"].map((h, i) => (
                <div
                  key={h}
                  className="font-jakarta"
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    textAlign: i === 0 ? "left" : "right",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {aDesLignes ? (
              donnees.lignes.map((l, idx) => {
                const totalLigne =
                  l.quantite * l.prixUnitaire * (1 + l.tva / 100);
                return (
                  <div
                    key={l.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 0.6fr 1fr 0.6fr 1fr",
                      gap: 8,
                      padding: "12px 14px",
                      background: idx % 2 === 1 ? "#FAF9F5" : "transparent",
                      borderBottom: "1px solid #F0EDE6",
                      alignItems: "start",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        color: "var(--text)",
                        wordBreak: "break-word",
                      }}
                    >
                      {l.description || (
                        <span
                          style={{
                            color: "var(--text-muted)",
                            fontStyle: "italic",
                          }}
                        >
                          Description du service
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        textAlign: "right",
                      }}
                    >
                      {l.quantite}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        textAlign: "right",
                      }}
                    >
                      {formatMontant(l.prixUnitaire, donnees.devise)}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text-muted)",
                        textAlign: "right",
                      }}
                    >
                      {l.tva}%
                    </div>
                    <div
                      className="font-unbounded"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text)",
                        textAlign: "right",
                      }}
                    >
                      {formatMontant(totalLigne, donnees.devise)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  padding: "24px 0",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  fontSize: 13,
                }}
              >
                Vos services apparaîtront ici...
              </div>
            )}
          </div>

          {/* TOTAUX */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ minWidth: 280 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  padding: "6px 16px",
                }}
              >
                <span>Sous-total HT</span>
                <span>{formatMontant(sousTotal, donnees.devise)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  padding: "6px 16px",
                }}
              >
                <span>TVA</span>
                <span>{formatMontant(totalTva, donnees.devise)}</span>
              </div>
              <div
                style={{
                  marginTop: 8,
                  background:
                    "linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)",
                  color: "#fff",
                  padding: "14px 16px",
                  borderRadius: 6,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 4px 14px rgba(26, 107, 60, 0.25)",
                }}
              >
                <span
                  className="font-jakarta"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    opacity: 0.9,
                  }}
                >
                  Total TTC
                </span>
                <span
                  className="font-unbounded"
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {formatMontant(total, donnees.devise)}
                </span>
              </div>
            </div>
          </div>

          {/* PIED */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              gap: 16,
            }}
          >
            <div
              style={{
                flex: 1,
                background: "var(--bg)",
                padding: "12px 16px",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--green-light)",
                  color: "var(--green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <PaiementIcon mode={donnees.modePaiement} />
              </div>
              <div>
                <div
                  className="font-jakarta"
                  style={{
                    fontSize: 9,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                  }}
                >
                  Paiement
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text)",
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  {donnees.modePaiement}
                </div>
                {donnees.modePaiement === "Mobile Money" &&
                  donnees.numeroMobileMoney && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {donnees.numeroMobileMoney}
                    </div>
                  )}
              </div>
            </div>
            {donnees.noteClient && (
              <div
                style={{
                  flex: 1,
                  background: "var(--bg)",
                  padding: "12px 16px",
                  borderRadius: 6,
                  borderLeft: "2px solid var(--gold)",
                }}
              >
                <div
                  className="font-jakarta"
                  style={{
                    fontSize: 9,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                  }}
                >
                  Note
                </div>
                <div
                  className="font-lora-italic"
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {donnees.noteClient}
                </div>
              </div>
            )}
          </div>

          {/* MERCI */}
          <div
            style={{
              marginTop: 28,
              textAlign: "center",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            ·  Merci pour votre confiance  ·
          </div>
        </div>

        {/* BOTTOM GRADIENT BAR */}
        <div
          style={{
            height: 6,
            background:
              "linear-gradient(90deg, var(--gold) 0%, var(--green) 40%, var(--green) 100%)",
          }}
        />
      </div>
    </div>
  );
}
