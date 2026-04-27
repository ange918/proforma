import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import type { DonneesFacture } from "@/types";
import { calculerTotaux, formatMontant, formatDateFr } from "@/lib/utils";
import { buildMobileMoneyPayload } from "./Apercu";

const GREEN = "#1A6B3C";
const GOLD = "#C8972A";
const GRIS = "#6B6B6B";
const TEXTE = "#0D0D0D";
const ROUGE = "#D94F3D";
const BG = "#F7F5F0";
const BORDER = "#E2DDD6";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: TEXTE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerLeft: { flexDirection: "column", maxWidth: "60%" },
  headerRight: { flexDirection: "column", alignItems: "flex-end" },
  logo: { width: 60, height: 60, objectFit: "contain" },
  logoInitiales: {
    width: 60,
    height: 60,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  logoInitialesText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
  },
  nomEntreprise: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: TEXTE,
    marginTop: 8,
  },
  texteGris: { fontSize: 10, color: GRIS, marginTop: 2 },
  typeDocument: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textAlign: "right",
  },
  numero: {
    fontSize: 11,
    color: GRIS,
    textAlign: "right",
    marginTop: 4,
  },
  separateurVert: {
    height: 2,
    backgroundColor: GREEN,
    opacity: 0.2,
    marginVertical: 20,
  },
  labelSection: {
    fontSize: 9,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  nomClient: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: TEXTE,
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingBottom: 8,
    marginTop: 24,
  },
  tableHeaderText: {
    fontSize: 9,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE6",
    alignItems: "flex-start",
  },
  cellDescription: { flex: 3, fontSize: 11, color: TEXTE, paddingRight: 8 },
  cellDescNote: { fontSize: 9, color: ROUGE, marginTop: 2 },
  cellRight: { flex: 1, fontSize: 10, color: GRIS, textAlign: "right" },
  cellTotal: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: TEXTE,
    textAlign: "right",
  },
  totauxContainer: { alignItems: "flex-end", marginTop: 20 },
  totalLine: { flexDirection: "row", marginBottom: 5 },
  totalLabel: {
    fontSize: 10,
    color: GRIS,
    width: 130,
    textAlign: "right",
    marginRight: 12,
  },
  totalValue: {
    fontSize: 10,
    color: TEXTE,
    width: 110,
    textAlign: "right",
  },
  totalValueRouge: {
    fontSize: 10,
    color: ROUGE,
    width: 110,
    textAlign: "right",
  },
  totalDivider: {
    width: 252,
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 8,
  },
  totalTTCLabel: {
    fontSize: 12,
    color: TEXTE,
    width: 130,
    textAlign: "right",
    marginRight: 12,
    fontFamily: "Helvetica-Bold",
  },
  totalTTC: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    width: 110,
    textAlign: "right",
  },
  soldeLabelOr: {
    fontSize: 12,
    color: TEXTE,
    width: 130,
    textAlign: "right",
    marginRight: 12,
    fontFamily: "Helvetica-Bold",
  },
  soldeOr: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: GOLD,
    width: 110,
    textAlign: "right",
  },
  paiementBox: {
    marginTop: 24,
    padding: 14,
    backgroundColor: BG,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDER,
    borderStyle: "solid",
    flexDirection: "row",
    gap: 14,
  },
  qrImage: {
    width: 88,
    height: 88,
    backgroundColor: "#FFFFFF",
    padding: 2,
  },
  paiementLabel: {
    fontSize: 8,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Helvetica-Bold",
  },
  paiementTitre: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: TEXTE,
    marginTop: 4,
  },
  paiementSubText: { fontSize: 9, color: GRIS, marginTop: 2 },
  paiementHelp: {
    fontSize: 8,
    color: GRIS,
    marginTop: 6,
    fontStyle: "italic",
  },
  ribValue: {
    fontSize: 9,
    color: TEXTE,
    fontFamily: "Courier",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  conditionsBox: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: BG,
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
    borderLeftStyle: "solid",
  },
  conditionsLabel: {
    fontSize: 7,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  conditionsText: {
    fontSize: 9,
    color: TEXTE,
    fontStyle: "italic",
    lineHeight: 1.5,
  },
  pied: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 24,
    paddingTop: 14,
    borderTopWidth: 2,
    borderTopColor: GREEN,
    borderTopStyle: "solid",
  },
  piedTexte: { fontSize: 10, color: GRIS },
  piedLabel: {
    fontSize: 8,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  note: {
    fontSize: 10,
    color: GRIS,
    fontStyle: "italic",
    maxWidth: 200,
    textAlign: "right",
  },
  signatureContainer: {
    alignItems: "flex-end",
  },
  signatureImage: {
    height: 52,
    width: 140,
    objectFit: "contain",
  },
  signatureLabel: {
    fontSize: 7,
    color: GRIS,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 3,
    textAlign: "right",
  },
  barreBas: {
    height: 6,
    backgroundColor: GREEN,
    marginTop: 20,
    borderRadius: 2,
  },
});

function getInitiales(nom: string): string {
  if (!nom) return "??";
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface FacturePDFProps {
  donneesFacture: DonneesFacture;
  qrDataUrl?: string | null;
}

export function FacturePDFDocument({
  donneesFacture: d,
  qrDataUrl,
}: FacturePDFProps) {
  const {
    sousTotal,
    sousTotalNetLignes,
    remiseMontant,
    sousTotalFinal,
    totalTva,
    total,
    aDesRemises,
  } = calculerTotaux(d.lignes, d.remiseGlobale || 0);

  const aDesRemisesParLigne = d.lignes.some((l) => (l.remise || 0) > 0);
  const acompte = d.acompte || 0;
  const soldeRestant = Math.max(0, total - acompte);

  const showQr =
    d.modePaiement === "Mobile Money" &&
    d.numeroMobileMoney.trim().length > 0 &&
    !!qrDataUrl;
  const showBank =
    d.modePaiement === "Virement bancaire" &&
    (d.nomBanque.trim() || d.ribIban.trim() || d.codeSwift.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {d.logoEntreprise ? (
              <Image style={styles.logo} src={d.logoEntreprise} />
            ) : (
              <View style={styles.logoInitiales}>
                <Text style={styles.logoInitialesText}>
                  {getInitiales(d.nomEntreprise || "Entreprise")}
                </Text>
              </View>
            )}
            <Text style={styles.nomEntreprise}>
              {d.nomEntreprise || "Votre entreprise"}
            </Text>
            {(d.villeEntreprise || d.paysEntreprise) && (
              <Text style={styles.texteGris}>
                {[d.villeEntreprise, d.paysEntreprise].filter(Boolean).join(", ")}
              </Text>
            )}
            {d.emailEntreprise ? (
              <Text style={styles.texteGris}>{d.emailEntreprise}</Text>
            ) : null}
            {d.telephoneEntreprise ? (
              <Text style={styles.texteGris}>{d.telephoneEntreprise}</Text>
            ) : null}
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.typeDocument}>
              {d.typeDocument.toUpperCase()}
            </Text>
            <Text style={styles.numero}>N° {d.numeroFacture}</Text>
            {d.dateEmission ? (
              <Text style={styles.numero}>
                Émis le {formatDateFr(d.dateEmission)}
              </Text>
            ) : null}
            {d.dateEcheance ? (
              <Text style={styles.numero}>
                Échéance: {formatDateFr(d.dateEcheance)}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.separateurVert} />

        {/* CLIENT */}
        <View>
          <Text style={styles.labelSection}>Facturé à</Text>
          <Text style={styles.nomClient}>
            {d.nomClient || "Nom du client"}
          </Text>
          {d.entrepriseClient ? (
            <Text style={styles.texteGris}>{d.entrepriseClient}</Text>
          ) : null}
          {(d.villeClient || d.paysClient) && (
            <Text style={styles.texteGris}>
              {[d.villeClient, d.paysClient].filter(Boolean).join(", ")}
            </Text>
          )}
          {d.emailClient ? (
            <Text style={styles.texteGris}>{d.emailClient}</Text>
          ) : null}
          {d.telephoneClient ? (
            <Text style={styles.texteGris}>{d.telephoneClient}</Text>
          ) : null}
        </View>

        {/* TABLEAU SERVICES */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>Description</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            Qté
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            P.U. HT
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 0.7, textAlign: "right" }]}>
            TVA
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            Total TTC
          </Text>
        </View>

        {d.lignes.map((l) => {
          const totalLigne =
            l.quantite *
            l.prixUnitaire *
            (1 - (l.remise || 0) / 100) *
            (1 + l.tva / 100);
          return (
            <View key={l.id} style={styles.tableRow}>
              <View style={{ flex: 3, paddingRight: 8 }}>
                <Text style={{ fontSize: 11, color: TEXTE }}>
                  {l.description || "—"}
                </Text>
                {(l.remise || 0) > 0 && (
                  <Text style={styles.cellDescNote}>
                    Remise {l.remise}%
                  </Text>
                )}
              </View>
              <Text style={styles.cellRight}>{l.quantite}</Text>
              <Text style={styles.cellRight}>
                {formatMontant(l.prixUnitaire, d.devise)}
              </Text>
              <Text style={[styles.cellRight, { flex: 0.7 }]}>{l.tva}%</Text>
              <Text style={styles.cellTotal}>
                {formatMontant(totalLigne, d.devise)}
              </Text>
            </View>
          );
        })}

        {/* TOTAUX */}
        <View style={styles.totauxContainer}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Sous-total HT</Text>
            <Text style={styles.totalValue}>
              {formatMontant(sousTotal, d.devise)}
            </Text>
          </View>

          {aDesRemisesParLigne && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>Remises lignes</Text>
              <Text style={styles.totalValueRouge}>
                − {formatMontant(sousTotal - sousTotalNetLignes, d.devise)}
              </Text>
            </View>
          )}

          {(d.remiseGlobale || 0) > 0 && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>
                Remise globale ({d.remiseGlobale}%)
              </Text>
              <Text style={styles.totalValueRouge}>
                − {formatMontant(remiseMontant, d.devise)}
              </Text>
            </View>
          )}

          {aDesRemises && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>Sous-total HT net</Text>
              <Text style={styles.totalValue}>
                {formatMontant(sousTotalFinal, d.devise)}
              </Text>
            </View>
          )}

          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text style={styles.totalValue}>
              {formatMontant(totalTva, d.devise)}
            </Text>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.totalLine}>
            <Text style={styles.totalTTCLabel}>Total TTC</Text>
            <Text style={styles.totalTTC}>
              {formatMontant(total, d.devise)}
            </Text>
          </View>

          {acompte > 0 && (
            <>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Acompte perçu</Text>
                <Text style={styles.totalValueRouge}>
                  − {formatMontant(acompte, d.devise)}
                </Text>
              </View>
              <View style={[styles.totalDivider, { marginTop: 4 }]} />
              <View style={styles.totalLine}>
                <Text style={styles.soldeLabelOr}>Solde restant à payer</Text>
                <Text style={styles.soldeOr}>
                  {formatMontant(soldeRestant, d.devise)}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* PAIEMENT (QR / BANQUE) */}
        {(showQr || showBank) && (
          <View style={styles.paiementBox}>
            {showQr && qrDataUrl && (
              <>
                <Image src={qrDataUrl} style={styles.qrImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.paiementLabel}>
                    PAIEMENT MOBILE MONEY
                  </Text>
                  <Text style={styles.paiementTitre}>
                    {d.numeroMobileMoney}
                  </Text>
                  {d.operateurMobileMoney ? (
                    <Text style={styles.paiementSubText}>
                      {d.operateurMobileMoney}
                    </Text>
                  ) : null}
                  <Text style={styles.paiementHelp}>
                    Scannez ce QR code pour obtenir les détails du paiement.
                  </Text>
                </View>
              </>
            )}
            {showBank && (
              <View style={{ flex: 1 }}>
                <Text style={styles.paiementLabel}>COORDONNÉES BANCAIRES</Text>
                {d.nomBanque ? (
                  <Text style={styles.paiementTitre}>{d.nomBanque}</Text>
                ) : null}
                {d.ribIban ? (
                  <Text style={styles.ribValue}>{d.ribIban}</Text>
                ) : null}
                {d.codeSwift ? (
                  <Text style={styles.paiementSubText}>
                    SWIFT / BIC : {d.codeSwift}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        )}

        {/* CONDITIONS DE PAIEMENT */}
        {d.conditionsPaiement ? (
          <View style={styles.conditionsBox}>
            <Text style={styles.conditionsLabel}>Conditions de paiement</Text>
            <Text style={styles.conditionsText}>{d.conditionsPaiement}</Text>
          </View>
        ) : null}

        {/* PIED */}
        <View style={styles.pied}>
          <View>
            <Text style={styles.piedLabel}>Mode de paiement</Text>
            <Text style={styles.piedTexte}>{d.modePaiement}</Text>
            {d.noteClient ? (
              <Text style={[styles.piedTexte, { fontStyle: "italic", marginTop: 4 }]}>
                {d.noteClient}
              </Text>
            ) : null}
          </View>

          {d.signatureImage ? (
            <View style={styles.signatureContainer}>
              <Image src={d.signatureImage} style={styles.signatureImage} />
              <Text style={styles.signatureLabel}>Signature & cachet</Text>
            </View>
          ) : (
            <Text> </Text>
          )}
        </View>

        <View style={styles.barreBas} />
      </Page>
    </Document>
  );
}

export async function generatePDF(donnees: DonneesFacture) {
  let qrDataUrl: string | null = null;
  if (
    donnees.modePaiement === "Mobile Money" &&
    donnees.numeroMobileMoney.trim().length > 0
  ) {
    try {
      qrDataUrl = await QRCode.toDataURL(buildMobileMoneyPayload(donnees), {
        margin: 1,
        width: 240,
        color: { dark: "#0F4526", light: "#FFFFFF" },
      });
    } catch {
      qrDataUrl = null;
    }
  }
  const blob = await pdf(
    <FacturePDFDocument donneesFacture={donnees} qrDataUrl={qrDataUrl} />,
  ).toBlob();
  const safeClient = (donnees.nomClient || "client")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9_-]/g, "");
  const nomFichier = `${donnees.numeroFacture}-${safeClient}.pdf`;
  saveAs(blob, nomFichier);
}
