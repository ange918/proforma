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
import type { DonneesFacture } from "@/types";
import { calculerTotaux, formatMontant, formatDateFr } from "@/lib/utils";

const COLORS = {
  green: "#1A6B3C",
  greenDark: "#0F4526",
  greenLight: "#E8F5EE",
  gold: "#C8972A",
  text: "#0D0D0D",
  textMuted: "#6B6B6B",
  border: "#E2DDD6",
  borderLight: "#F0EDE6",
  bg: "#F7F5F0",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    padding: 48,
    paddingTop: 44,
    fontFamily: "Helvetica",
    backgroundColor: COLORS.white,
    color: COLORS.text,
    position: "relative",
  },
  smallLabel: {
    fontSize: 7,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 2.2,
    fontFamily: "Helvetica-Bold",
  },
  smallLabelDark: {
    fontSize: 7,
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 2.2,
    fontFamily: "Helvetica-Bold",
  },

  // Top wordmark
  topRule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  topRuleLine: { flex: 1, height: 0.6, backgroundColor: COLORS.gold },
  topWordmark: {
    fontSize: 9,
    color: COLORS.gold,
    letterSpacing: 4,
    fontFamily: "Helvetica-Bold",
  },
  topWordmarkAccent: {
    color: COLORS.green,
    fontFamily: "Helvetica-Bold",
  },

  // Big title block
  titleBlock: { alignItems: "center", marginBottom: 6 },
  subTitle: {
    fontSize: 7,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 2.2,
    fontFamily: "Helvetica-Bold",
  },
  bigTitle: {
    fontSize: 48,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    letterSpacing: -2,
    marginTop: 8,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  numberRule: { width: 22, height: 0.6, backgroundColor: COLORS.gold },
  numberText: {
    fontSize: 11,
    color: COLORS.text,
    letterSpacing: 2,
    fontFamily: "Helvetica",
  },
  dates: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontStyle: "italic",
    marginTop: 12,
  },

  // De / À two-column block
  twoCol: {
    flexDirection: "row",
    marginTop: 36,
    position: "relative",
  },
  colDe: { flex: 1, paddingRight: 18 },
  colA: { flex: 1, paddingLeft: 18 },
  divider: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 0.6,
    backgroundColor: COLORS.border,
  },
  initialeBox: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.green,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  initialeBoxClient: {
    width: 32,
    height: 32,
    borderWidth: 0.8,
    borderColor: COLORS.gold,
    borderStyle: "dashed",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  initialeText: {
    color: COLORS.white,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  initialeTextClient: {
    color: COLORS.gold,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  partyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  partyName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    marginTop: 10,
  },
  partyText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 3,
    lineHeight: 1.4,
  },

  // Section
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 36,
  },
  sectionLine: { flex: 1, height: 0.6, backgroundColor: COLORS.border },

  // Table
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 8,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text,
    borderBottomStyle: "solid",
  },
  tableHeaderText: {
    fontSize: 7,
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.borderLight,
    borderBottomStyle: "solid",
    alignItems: "flex-start",
  },
  cellDescription: {
    flex: 3,
    fontSize: 11,
    color: COLORS.text,
    paddingRight: 8,
  },
  cellQte: {
    flex: 0.6,
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "right",
  },
  cellMoney: {
    flex: 1,
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "right",
  },
  cellTva: {
    flex: 0.6,
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "right",
  },
  cellTotal: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    textAlign: "right",
  },

  // Totaux
  totauxContainer: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  totalLine: {
    flexDirection: "row",
    paddingVertical: 4,
    width: 280,
    justifyContent: "space-between",
  },
  totalLabel: { fontSize: 10, color: COLORS.textMuted },
  totalValue: { fontSize: 10, color: COLORS.textMuted },
  totalTTCBox: {
    marginTop: 12,
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.gold,
    borderTopStyle: "solid",
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.gold,
    borderBottomStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 280,
  },
  totalTTCLabel: {
    fontSize: 7,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 2.2,
    fontFamily: "Helvetica-Bold",
  },
  totalTTCSub: { fontSize: 9, color: COLORS.textMuted, marginTop: 2 },
  totalTTCValue: {
    fontSize: 22,
    color: COLORS.green,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.5,
  },

  // Pied
  pied: {
    flexDirection: "row",
    marginTop: 32,
    gap: 24,
  },
  piedCol: { flex: 1 },
  paiementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  paiementCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: COLORS.gold,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  paiementCircleText: {
    color: COLORS.gold,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  paiementMode: {
    fontSize: 11,
    color: COLORS.text,
    fontFamily: "Helvetica",
  },
  paiementNumero: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  noteText: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontStyle: "italic",
    marginTop: 10,
    lineHeight: 1.5,
  },

  // Signature
  signatureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  signatureLine: { flex: 1, height: 0.6, backgroundColor: COLORS.border },
  signatureText: {
    fontSize: 11,
    color: COLORS.gold,
    fontStyle: "italic",
  },
  signatureDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 14,
  },
  dotGreen: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.green,
  },
  dotGold: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
  },
  dotGreenFaded: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.green,
    opacity: 0.4,
  },

  // Watermark
  watermark: {
    position: "absolute",
    top: 200,
    right: -80,
    fontSize: 130,
    color: COLORS.gold,
    opacity: 0.05,
    fontFamily: "Helvetica-Bold",
    transform: "rotate(-90deg)",
  },
});

function getInitiales(nom: string): string {
  if (!nom) return "??";
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function sousTitreFor(type: string) {
  if (type === "Facture") return "Facture commerciale";
  if (type === "Devis") return "Devis estimatif";
  return "Facture proforma";
}

export function FacturePDFDocument({
  donneesFacture: d,
}: {
  donneesFacture: DonneesFacture;
}) {
  const { sousTotal, totalTva, total } = calculerTotaux(d.lignes);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark} fixed>
          {d.typeDocument.toUpperCase()}
        </Text>

        {/* Top wordmark */}
        <View style={styles.topRule}>
          <View style={styles.topRuleLine} />
          <Text style={styles.topWordmark}>
            <Text style={styles.topWordmarkAccent}>PROFORMA</Text>AFRICA
          </Text>
          <View style={styles.topRuleLine} />
        </View>

        {/* Big title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.subTitle}>{sousTitreFor(d.typeDocument)}</Text>
          <Text style={styles.bigTitle}>{d.typeDocument.toUpperCase()}</Text>
          <View style={styles.numberRow}>
            <View style={styles.numberRule} />
            <Text style={styles.numberText}>{d.numeroFacture}</Text>
            <View style={styles.numberRule} />
          </View>
          {(d.dateEmission || d.dateEcheance) && (
            <Text style={styles.dates}>
              {d.dateEmission ? `Émis le ${formatDateFr(d.dateEmission)}` : ""}
              {d.dateEmission && d.dateEcheance ? "   •   " : ""}
              {d.dateEcheance
                ? `Échéance ${formatDateFr(d.dateEcheance)}`
                : ""}
            </Text>
          )}
        </View>

        {/* De / À */}
        <View style={styles.twoCol}>
          <View style={styles.divider} />
          <View style={styles.colDe}>
            <View style={styles.partyHeader}>
              {d.logoEntreprise ? (
                <Image
                  src={d.logoEntreprise}
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                    borderRadius: 3,
                  }}
                />
              ) : (
                <View style={styles.initialeBox}>
                  <Text style={styles.initialeText}>
                    {getInitiales(d.nomEntreprise || "Entreprise")}
                  </Text>
                </View>
              )}
              <Text style={styles.smallLabel}>DE</Text>
            </View>
            <Text style={styles.partyName}>
              {d.nomEntreprise || "Votre entreprise"}
            </Text>
            {(d.villeEntreprise || d.paysEntreprise) && (
              <Text style={styles.partyText}>
                {[d.villeEntreprise, d.paysEntreprise]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            )}
            {d.emailEntreprise ? (
              <Text style={styles.partyText}>{d.emailEntreprise}</Text>
            ) : null}
            {d.telephoneEntreprise ? (
              <Text style={styles.partyText}>{d.telephoneEntreprise}</Text>
            ) : null}
          </View>
          <View style={styles.colA}>
            <View style={styles.partyHeader}>
              <View style={styles.initialeBoxClient}>
                <Text style={styles.initialeTextClient}>
                  {getInitiales(d.nomClient || "Client")}
                </Text>
              </View>
              <Text style={styles.smallLabel}>À L'ATTENTION DE</Text>
            </View>
            <Text style={styles.partyName}>
              {d.nomClient || "Nom du client"}
            </Text>
            {d.entrepriseClient ? (
              <Text style={styles.partyText}>{d.entrepriseClient}</Text>
            ) : null}
            {(d.villeClient || d.paysClient) && (
              <Text style={styles.partyText}>
                {[d.villeClient, d.paysClient].filter(Boolean).join(", ")}
              </Text>
            )}
            {d.emailClient ? (
              <Text style={styles.partyText}>{d.emailClient}</Text>
            ) : null}
            {d.telephoneClient ? (
              <Text style={styles.partyText}>{d.telephoneClient}</Text>
            ) : null}
          </View>
        </View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.smallLabel}>DÉTAIL DES SERVICES</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>Description</Text>
          <Text
            style={[
              styles.tableHeaderText,
              { flex: 0.6, textAlign: "right" },
            ]}
          >
            Qté
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}
          >
            P.U.
          </Text>
          <Text
            style={[
              styles.tableHeaderText,
              { flex: 0.6, textAlign: "right" },
            ]}
          >
            TVA
          </Text>
          <Text
            style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}
          >
            Total
          </Text>
        </View>

        {d.lignes.map((l) => {
          const totalLigne = l.quantite * l.prixUnitaire * (1 + l.tva / 100);
          return (
            <View key={l.id} style={styles.tableRow}>
              <Text style={styles.cellDescription}>{l.description || "—"}</Text>
              <Text style={styles.cellQte}>{l.quantite}</Text>
              <Text style={styles.cellMoney}>
                {formatMontant(l.prixUnitaire, d.devise)}
              </Text>
              <Text style={styles.cellTva}>{l.tva}%</Text>
              <Text style={styles.cellTotal}>
                {formatMontant(totalLigne, d.devise)}
              </Text>
            </View>
          );
        })}

        {/* Totaux */}
        <View style={styles.totauxContainer}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Sous-total HT</Text>
            <Text style={styles.totalValue}>
              {formatMontant(sousTotal, d.devise)}
            </Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>TVA</Text>
            <Text style={styles.totalValue}>
              {formatMontant(totalTva, d.devise)}
            </Text>
          </View>
          <View style={styles.totalTTCBox}>
            <View>
              <Text style={styles.totalTTCLabel}>NET À PAYER</Text>
              <Text style={styles.totalTTCSub}>Toutes taxes comprises</Text>
            </View>
            <Text style={styles.totalTTCValue}>
              {formatMontant(total, d.devise)}
            </Text>
          </View>
        </View>

        {/* Pied */}
        <View style={styles.pied}>
          <View style={styles.piedCol}>
            <Text style={styles.smallLabel}>MODALITÉS DE PAIEMENT</Text>
            <View style={styles.paiementRow}>
              <View style={styles.paiementCircle}>
                <Text style={styles.paiementCircleText}>$</Text>
              </View>
              <View>
                <Text style={styles.paiementMode}>{d.modePaiement}</Text>
                {d.modePaiement === "Mobile Money" && d.numeroMobileMoney ? (
                  <Text style={styles.paiementNumero}>
                    {d.numeroMobileMoney}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          {d.noteClient ? (
            <View style={styles.piedCol}>
              <Text style={styles.smallLabel}>NOTE</Text>
              <Text style={styles.noteText}>« {d.noteClient} »</Text>
            </View>
          ) : (
            <View style={styles.piedCol} />
          )}
        </View>

        {/* Signature */}
        <View style={styles.signatureRow}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Merci pour votre confiance</Text>
          <View style={styles.signatureLine} />
        </View>
        <View style={styles.signatureDots}>
          <View style={styles.dotGreen} />
          <View style={styles.dotGold} />
          <View style={styles.dotGreenFaded} />
        </View>
      </Page>
    </Document>
  );
}

export async function generatePDF(donnees: DonneesFacture) {
  const blob = await pdf(
    <FacturePDFDocument donneesFacture={donnees} />,
  ).toBlob();
  const safeClient = (donnees.nomClient || "client")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^A-Za-z0-9_-]/g, "");
  const nomFichier = `${donnees.numeroFacture}-${safeClient}.pdf`;
  saveAs(blob, nomFichier);
}
