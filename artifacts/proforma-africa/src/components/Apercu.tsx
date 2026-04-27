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

const SMALL_LABEL = {
  fontSize: 9,
  textTransform: "uppercase" as const,
  letterSpacing: "0.22em",
  color: "var(--text-muted)",
  fontWeight: 600,
};

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
          width: "100%",
          maxWidth: 600,
          color: "var(--text)",
          position: "relative",
          padding: "56px 56px 40px",
        }}
      >
        {/* WATERMARK type */}
        <div
          aria-hidden
          className="font-unbounded"
          style={{
            position: "absolute",
            top: 100,
            right: -10,
            fontSize: 130,
            fontWeight: 700,
            color: "var(--gold)",
            opacity: 0.04,
            letterSpacing: "-0.04em",
            transform: "rotate(-90deg)",
            transformOrigin: "right top",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          {donnees.typeDocument.toUpperCase()}
        </div>

        {/* TOP RULE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ height: 1, flex: 1, background: "var(--gold)" }} />
          <div
            className="font-unbounded"
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              color: "var(--gold)",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "var(--green)" }}>PROFORMA</span>AFRICA
          </div>
          <div style={{ height: 1, flex: 1, background: "var(--gold)" }} />
        </div>

        {/* HEADER — DOCUMENT TYPE GRAND */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={SMALL_LABEL}>
            {donnees.typeDocument === "Facture"
              ? "Facture commerciale"
              : donnees.typeDocument === "Devis"
                ? "Devis estimatif"
                : "Facture proforma"}
          </div>
          <div
            className="font-unbounded"
            style={{
              fontWeight: 700,
              fontSize: 56,
              color: "var(--text)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginTop: 10,
            }}
          >
            {donnees.typeDocument.toUpperCase()}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 14,
            }}
          >
            <span style={{ height: 1, width: 24, background: "var(--gold)" }} />
            <span
              style={{
                fontSize: 13,
                color: "var(--text)",
                letterSpacing: "0.18em",
                fontWeight: 500,
              }}
            >
              {donnees.numeroFacture}
            </span>
            <span style={{ height: 1, width: 24, background: "var(--gold)" }} />
          </div>
          {(donnees.dateEmission || donnees.dateEcheance) && (
            <div
              className="font-lora-italic"
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                marginTop: 12,
              }}
            >
              {donnees.dateEmission &&
                `Émis le ${formatDateFr(donnees.dateEmission)}`}
              {donnees.dateEmission && donnees.dateEcheance && "  •  "}
              {donnees.dateEcheance &&
                `Échéance ${formatDateFr(donnees.dateEcheance)}`}
            </div>
          )}
        </div>

        {/* DE / À — TWO COLUMNS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginTop: 40,
            position: "relative",
          }}
        >
          {/* divider */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--border)",
            }}
          />
          {/* DE */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {donnees.logoEntreprise ? (
                <img
                  src={donnees.logoEntreprise}
                  alt="logo"
                  style={{
                    height: 36,
                    width: 36,
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
              ) : (
                <div
                  className="font-unbounded"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--green)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 4,
                  }}
                >
                  {getInitiales(donnees.nomEntreprise || "")}
                </div>
              )}
              <div style={SMALL_LABEL}>De</div>
            </div>
            <div
              className="font-unbounded"
              style={{
                fontWeight: 700,
                fontSize: 15,
                marginTop: 12,
                color: "var(--text)",
                wordBreak: "break-word",
              }}
            >
              {donnees.nomEntreprise || "Votre entreprise"}
            </div>
            <div style={{ marginTop: 6, lineHeight: 1.6 }}>
              {(donnees.villeEntreprise || donnees.paysEntreprise) && (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
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
          {/* À */}
          <div style={{ paddingLeft: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "1px dashed var(--gold)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  fontSize: 13,
                  fontFamily: "Unbounded, sans-serif",
                  fontWeight: 600,
                }}
              >
                {getInitiales(donnees.nomClient || "")}
              </div>
              <div style={SMALL_LABEL}>À l'attention de</div>
            </div>
            <div
              className="font-unbounded"
              style={{
                fontWeight: 700,
                fontSize: 15,
                marginTop: 12,
                color: "var(--text)",
              }}
            >
              {donnees.nomClient || "Nom du client"}
            </div>
            <div style={{ marginTop: 6, lineHeight: 1.6 }}>
              {donnees.entrepriseClient && (
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
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
        </div>

        {/* SECTION SERVICES TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 44,
          }}
        >
          <div style={SMALL_LABEL}>Détail des services</div>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* TABLEAU SERVICES */}
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 0.6fr 1fr 0.6fr 1fr",
              gap: 8,
              padding: "0 0 10px",
              borderBottom: "1px solid var(--text)",
            }}
          >
            {["Description", "Qté", "P.U.", "TVA", "Total"].map((h, i) => (
              <div
                key={h}
                className="font-jakarta"
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--text)",
                  fontWeight: 600,
                  textAlign: i === 0 ? "left" : "right",
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {aDesLignes ? (
            donnees.lignes.map((l) => {
              const totalLigne =
                l.quantite * l.prixUnitaire * (1 + l.tva / 100);
              return (
                <div
                  key={l.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 0.6fr 1fr 0.6fr 1fr",
                    gap: 8,
                    padding: "14px 0",
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
            marginTop: 28,
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
                padding: "5px 0",
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
                padding: "5px 0",
              }}
            >
              <span>TVA</span>
              <span>{formatMontant(totalTva, donnees.devise)}</span>
            </div>
            <div
              style={{
                marginTop: 12,
                paddingTop: 14,
                borderTop: "2px solid var(--gold)",
                borderBottom: "2px solid var(--gold)",
                paddingBottom: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div>
                <div style={SMALL_LABEL}>Net à payer</div>
                <div
                  className="font-jakarta"
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  Toutes taxes comprises
                </div>
              </div>
              <span
                className="font-unbounded"
                style={{
                  fontWeight: 700,
                  fontSize: 28,
                  color: "var(--green)",
                  letterSpacing: "-0.02em",
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
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: donnees.noteClient ? "1fr 1fr" : "1fr",
            gap: 32,
          }}
        >
          <div>
            <div style={SMALL_LABEL}>Modalités de paiement</div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: "1px solid var(--gold)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  flexShrink: 0,
                }}
              >
                <PaiementIcon mode={donnees.modePaiement} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text)",
                    fontWeight: 500,
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
          </div>
          {donnees.noteClient && (
            <div>
              <div style={SMALL_LABEL}>Note</div>
              <div
                className="font-lora-italic"
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginTop: 10,
                  lineHeight: 1.55,
                }}
              >
                « {donnees.noteClient} »
              </div>
            </div>
          )}
        </div>

        {/* SIGNATURE LINE */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <div
            className="font-lora-italic"
            style={{ fontSize: 13, color: "var(--gold)" }}
          >
            Merci pour votre confiance
          </div>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* MICRO COLOR DOTS — bottom signature */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
            }}
          />
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gold)",
            }}
          />
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
