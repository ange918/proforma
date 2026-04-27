import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { DonneesFacture } from "@/types";
import { calculerTotaux, formatDateFr, formatMontant } from "@/lib/utils";
import {
  DeviceMobile,
  Bank,
  Money,
  Note as NoteIcon,
  QrCode,
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

export function buildMobileMoneyPayload(d: DonneesFacture): string {
  const { total } = calculerTotaux(d.lignes, d.remiseGlobale || 0);
  const numero = d.numeroMobileMoney.trim();
  const ref = d.numeroFacture;
  const montant = Math.round(total);
  return [
    `Paiement ${d.typeDocument}`,
    `Bénéficiaire: ${d.nomEntreprise || "—"}`,
    `Mobile Money: ${numero}`,
    d.operateurMobileMoney ? `Opérateur: ${d.operateurMobileMoney}` : "",
    `Montant: ${montant} ${d.devise}`,
    `Réf: ${ref}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Apercu({ donnees }: { donnees: DonneesFacture }) {
  const {
    sousTotal,
    sousTotalNetLignes,
    remiseMontant,
    sousTotalFinal,
    totalTva,
    total,
    aDesRemises,
  } = calculerTotaux(donnees.lignes, donnees.remiseGlobale || 0);

  const aDesRemisesParLigne = donnees.lignes.some((l) => (l.remise || 0) > 0);
  const acompte = donnees.acompte || 0;
  const soldeRestant = Math.max(0, total - acompte);

  const aDesLignes = donnees.lignes.some(
    (l) => l.description.trim() || l.prixUnitaire > 0,
  );

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const showQr =
    donnees.modePaiement === "Mobile Money" &&
    donnees.numeroMobileMoney.trim().length > 0;

  useEffect(() => {
    if (!showQr) {
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(buildMobileMoneyPayload(donnees), {
      margin: 1,
      width: 240,
      color: { dark: "#0F4526", light: "#FFFFFF" },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [
    showQr,
    donnees.numeroMobileMoney,
    donnees.operateurMobileMoney,
    donnees.numeroFacture,
    donnees.typeDocument,
    donnees.nomEntreprise,
    donnees.devise,
    total,
    donnees,
  ]);

  const showBank =
    donnees.modePaiement === "Virement bancaire" &&
    (donnees.nomBanque.trim() ||
      donnees.ribIban.trim() ||
      donnees.codeSwift.trim());

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
          borderRadius: 4,
          width: "100%",
          maxWidth: 560,
          padding: 40,
          color: "var(--text)",
        }}
      >
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
                style={{ height: 48, objectFit: "contain" }}
              />
            ) : (
              <div
                className="font-unbounded"
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--green)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  borderRadius: 4,
                }}
              >
                {getInitiales(donnees.nomEntreprise || "")}
              </div>
            )}
            <div
              className="font-unbounded"
              style={{
                fontWeight: 700,
                fontSize: 16,
                marginTop: 8,
                color: "var(--text)",
                wordBreak: "break-word",
              }}
            >
              {donnees.nomEntreprise || "Votre entreprise"}
            </div>
            {(donnees.villeEntreprise || donnees.paysEntreprise) && (
              <div
                style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
              >
                {[donnees.villeEntreprise, donnees.paysEntreprise]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            )}
            {donnees.emailEntreprise && (
              <div
                style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
              >
                {donnees.emailEntreprise}
              </div>
            )}
            {donnees.telephoneEntreprise && (
              <div
                style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
              >
                {donnees.telephoneEntreprise}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              className="font-unbounded"
              style={{
                fontWeight: 700,
                fontSize: 28,
                color: "var(--green)",
                lineHeight: 1,
              }}
            >
              {donnees.typeDocument.toUpperCase()}
            </div>
            <div
              style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}
            >
              N° {donnees.numeroFacture}
            </div>
            {donnees.dateEmission && (
              <div
                style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
              >
                Émis le {formatDateFr(donnees.dateEmission)}
              </div>
            )}
            {donnees.dateEcheance && (
              <div
                style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
              >
                Échéance: {formatDateFr(donnees.dateEcheance)}
              </div>
            )}
          </div>
        </div>

        {/* SEPARATEUR VERT */}
        <div
          style={{
            height: 2,
            background: "var(--green)",
            opacity: 0.2,
            margin: "24px 0",
          }}
        />

        {/* CLIENT */}
        <div>
          <div
            className="font-jakarta"
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
            }}
          >
            Facturé à
          </div>
          <div
            className="font-unbounded"
            style={{
              fontWeight: 600,
              fontSize: 15,
              marginTop: 6,
              color: "var(--text)",
            }}
          >
            {donnees.nomClient || "Nom du client"}
          </div>
          {donnees.entrepriseClient && (
            <div
              style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}
            >
              {donnees.entrepriseClient}
            </div>
          )}
          {(donnees.villeClient || donnees.paysClient) && (
            <div
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
            >
              {[donnees.villeClient, donnees.paysClient]
                .filter(Boolean)
                .join(", ")}
            </div>
          )}
          {donnees.emailClient && (
            <div
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
            >
              {donnees.emailClient}
            </div>
          )}
          {donnees.telephoneClient && (
            <div
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}
            >
              {donnees.telephoneClient}
            </div>
          )}
        </div>

        {/* TABLEAU SERVICES */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 0.5fr 1fr 0.5fr 1fr",
              gap: 6,
              borderBottom: "1px solid var(--border)",
              paddingBottom: 8,
            }}
          >
            {["Description", "Qté", "P.U.", "TVA", "Total TTC"].map((h, i) => (
              <div
                key={h}
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
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
                l.quantite *
                l.prixUnitaire *
                (1 - (l.remise || 0) / 100) *
                (1 + l.tva / 100);
              return (
                <div
                  key={l.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3fr 0.5fr 1fr 0.5fr 1fr",
                    gap: 6,
                    padding: "10px 0",
                    borderBottom: "1px solid #F0EDE6",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text)",
                      wordBreak: "break-word",
                    }}
                  >
                    {l.description || (
                      <span
                        style={{ color: "var(--text-muted)", fontStyle: "italic" }}
                      >
                        Description du service
                      </span>
                    )}
                    {(l.remise || 0) > 0 && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--red)",
                          marginTop: 2,
                        }}
                      >
                        Remise {l.remise}%
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      textAlign: "right",
                    }}
                  >
                    {l.quantite}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      textAlign: "right",
                    }}
                  >
                    {formatMontant(l.prixUnitaire, donnees.devise)}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      textAlign: "right",
                    }}
                  >
                    {l.tva}%
                  </div>
                  <div
                    className="font-unbounded"
                    style={{
                      fontSize: 13,
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
          style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ minWidth: 260 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "var(--text-muted)",
                padding: "3px 0",
              }}
            >
              <span>Sous-total HT</span>
              <span>{formatMontant(sousTotal, donnees.devise)}</span>
            </div>

            {aDesRemisesParLigne && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--red)",
                  padding: "3px 0",
                }}
              >
                <span>Remises lignes</span>
                <span>− {formatMontant(sousTotal - sousTotalNetLignes, donnees.devise)}</span>
              </div>
            )}

            {(donnees.remiseGlobale || 0) > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--red)",
                  padding: "3px 0",
                }}
              >
                <span>Remise globale ({donnees.remiseGlobale}%)</span>
                <span>− {formatMontant(remiseMontant, donnees.devise)}</span>
              </div>
            )}

            {aDesRemises && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  padding: "3px 0",
                }}
              >
                <span>Sous-total HT net</span>
                <span>{formatMontant(sousTotalFinal, donnees.devise)}</span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "var(--text-muted)",
                padding: "3px 0",
              }}
            >
              <span>TVA</span>
              <span>{formatMontant(totalTva, donnees.devise)}</span>
            </div>

            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "8px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                className="font-jakarta"
                style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}
              >
                Total TTC
              </span>
              <span
                className="font-unbounded"
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--green)",
                }}
              >
                {formatMontant(total, donnees.devise)}
              </span>
            </div>

            {acompte > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    padding: "3px 0",
                    marginTop: 6,
                  }}
                >
                  <span>Acompte perçu</span>
                  <span>− {formatMontant(acompte, donnees.devise)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginTop: 4,
                    paddingTop: 8,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="font-jakarta"
                    style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}
                  >
                    Solde restant
                  </span>
                  <span
                    className="font-unbounded"
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--gold)",
                    }}
                  >
                    {formatMontant(soldeRestant, donnees.devise)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SECTION PAIEMENT (QR ou banque) */}
        {(showQr || showBank) && (
          <div
            style={{
              marginTop: 24,
              padding: 14,
              background: "var(--bg)",
              borderRadius: 8,
              border: "1px solid var(--border)",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
            }}
          >
            {showQr && (
              <>
                <div
                  style={{
                    width: 88,
                    height: 88,
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR de paiement"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ) : (
                    <QrCode size={28} color="var(--text-muted)" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className="font-jakarta"
                    style={{
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    Paiement Mobile Money
                  </div>
                  <div
                    className="font-unbounded"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginTop: 4,
                    }}
                  >
                    {donnees.numeroMobileMoney}
                  </div>
                  {donnees.operateurMobileMoney && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      {donnees.operateurMobileMoney}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 5,
                      lineHeight: 1.4,
                    }}
                  >
                    Scannez ce QR code pour obtenir les détails du paiement.
                  </div>
                </div>
              </>
            )}
            {showBank && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  className="font-jakarta"
                  style={{
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  Coordonnées bancaires
                </div>
                {donnees.nomBanque && (
                  <div
                    className="font-unbounded"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginTop: 6,
                    }}
                  >
                    {donnees.nomBanque}
                  </div>
                )}
                {donnees.ribIban && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text)",
                      marginTop: 4,
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      letterSpacing: "0.05em",
                      wordBreak: "break-all",
                    }}
                  >
                    {donnees.ribIban}
                  </div>
                )}
                {donnees.codeSwift && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-muted)",
                      marginTop: 4,
                    }}
                  >
                    SWIFT / BIC :{" "}
                    <span
                      style={{
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, monospace",
                        color: "var(--text)",
                      }}
                    >
                      {donnees.codeSwift}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* CONDITIONS DE PAIEMENT */}
        {donnees.conditionsPaiement && (
          <div
            style={{
              marginTop: 20,
              padding: "10px 14px",
              background: "var(--bg)",
              borderRadius: 6,
              borderLeft: "3px solid var(--gold)",
            }}
          >
            <div
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Conditions de paiement
            </div>
            <div
              className="font-lora-italic"
              style={{ fontSize: 12, color: "var(--text)", lineHeight: 1.5 }}
            >
              {donnees.conditionsPaiement}
            </div>
          </div>
        )}

        {/* PIED */}
        <div
          style={{
            height: 2,
            background: "var(--green)",
            opacity: 0.15,
            marginTop: 24,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 16,
            marginTop: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <PaiementIcon mode={donnees.modePaiement} />
            <div>{donnees.modePaiement}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            {donnees.signatureImage && (
              <div>
                <img
                  src={donnees.signatureImage}
                  alt="signature"
                  style={{
                    height: 52,
                    maxWidth: 140,
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{
                    fontSize: 9,
                    color: "var(--text-muted)",
                    textAlign: "right",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 2,
                  }}
                >
                  Signature & cachet
                </div>
              </div>
            )}
            {donnees.noteClient && (
              <div
                className="font-lora-italic"
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  maxWidth: 180,
                  textAlign: "right",
                }}
              >
                {donnees.noteClient}
              </div>
            )}
          </div>
        </div>

        {/* BARRE DECORATIVE */}
        <div
          style={{
            height: 4,
            background:
              "linear-gradient(90deg, var(--green), var(--gold))",
            borderRadius: "0 0 4px 4px",
            marginTop: 20,
            marginLeft: -40,
            marginRight: -40,
            marginBottom: -40,
          }}
        />
      </div>
    </div>
  );
}
