import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  pdf,
  Svg,
  Circle,
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
  bg: "#F7F5F0",
  cardBg: "#FAF9F5",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  topBar: {
    height: 8,
    flexDirection: "row",
  },
  topBarGreen: {
    flex: 6,
    backgroundColor: COLORS.green,
  },
  topBarGold: {
    flex: 4,
    backgroundColor: COLORS.gold,
  },
  body: {
    padding: 36,
    paddingTop: 30,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flexDirection: "column", maxWidth: "55%" },
  headerRight: { flexDirection: "column", alignItems: "flex-end" },
  logo: { width: 56, height: 56, objectFit: "contain" },
  logoInitiales: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  logoInitialesText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  nomEntreprise: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    marginTop: 12,
  },
  texteGris: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
    lineHeight: 1.4,
  },
  typeDocument: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: COLORS.green,
  },
  numeroPill: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: COLORS.greenLight,
    borderRadius: 999,
  },
  numeroPillText: {
    color: COLORS.green,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  metaText: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  ornament: {
    position: "absolute",
    top: 24,
    right: 36,
  },
  clientCard: {
    marginTop: 24,
    backgroundColor: COLORS.bg,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.green,
    borderLeftStyle: "solid",
    padding: 14,
    paddingLeft: 18,
    borderRadius: 4,
  },
  labelSection: {
    fontSize: 8,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontFamily: "Helvetica-Bold",
  },
  nomClient: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: COLORS.text,
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.green,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginTop: 24,
    borderRadius: 4,
  },
  tableHeaderText: {
    fontSize: 8,
    color: COLORS.white,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EDE6",
    borderBottomStyle: "solid",
    alignItems: "flex-start",
  },
  tableRowAlt: {
    backgroundColor: COLORS.cardBg,
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
  totauxContainer: {
    alignItems: "flex-end",
    marginTop: 22,
  },
  totalLine: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    width: 110,
    textAlign: "right",
    marginRight: 12,
  },
  totalValue: {
    fontSize: 10,
    color: COLORS.textMuted,
    width: 120,
    textAlign: "right",
  },
  totalTTCBox: {
    marginTop: 8,
    backgroundColor: COLORS.green,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 256,
  },
  totalTTCLabel: {
    fontSize: 10,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  totalTTCValue: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  pied: {
    flexDirection: "row",
    marginTop: 32,
    gap: 12,
  },
  piedCard: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 4,
  },
  piedCardNote: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    borderLeftStyle: "solid",
  },
  piedLabel: {
    fontSize: 8,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontFamily: "Helvetica-Bold",
  },
  piedTexte: {
    fontSize: 10,
    color: COLORS.text,
    marginTop: 4,
  },
  piedNumero: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  noteText: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontStyle: "italic",
    marginTop: 4,
    lineHeight: 1.5,
  },
  merci: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  bottomBar: {
    height: 6,
    flexDirection: "row",
    marginTop: "auto",
  },
  bottomBarGold: {
    flex: 1,
    backgroundColor: COLORS.gold,
  },
  bottomBarGreen: {
    flex: 4,
    backgroundColor: COLORS.green,
  },
});

function getInitiales(nom: string): string {
  if (!nom) return "??";
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function CornerDots() {
  const dots = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      dots.push(
        <Circle
          key={`${r}-${c}`}
          cx={c * 6 + 3}
          cy={r * 6 + 3}
          r={1.5}
          fill={COLORS.gold}
          opacity={0.25}
        />,
      );
    }
  }
  return (
    <Svg width={24} height={24} style={styles.ornament}>
      {dots}
    </Svg>
  );
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
        <View style={styles.topBar}>
          <View style={styles.topBarGreen} />
          <View style={styles.topBarGold} />
        </View>

        <CornerDots />

        <View style={styles.body}>
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
                  {[d.villeEntreprise, d.paysEntreprise]
                    .filter(Boolean)
                    .join(", ")}
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
              <View style={styles.numeroPill}>
                <Text style={styles.numeroPillText}>
                  N° {d.numeroFacture}
                </Text>
              </View>
              {d.dateEmission ? (
                <Text style={styles.metaText}>
                  Émis le {formatDateFr(d.dateEmission)}
                </Text>
              ) : null}
              {d.dateEcheance ? (
                <Text style={styles.metaText}>
                  Échéance: {formatDateFr(d.dateEcheance)}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.clientCard}>
            <Text style={styles.labelSection}>FACTURÉ À</Text>
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

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>
              Description
            </Text>
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

          {d.lignes.map((l, idx) => {
            const totalLigne = l.quantite * l.prixUnitaire * (1 + l.tva / 100);
            return (
              <View
                key={l.id}
                style={
                  idx % 2 === 1
                    ? [styles.tableRow, styles.tableRowAlt]
                    : styles.tableRow
                }
              >
                <Text style={styles.cellDescription}>
                  {l.description || "—"}
                </Text>
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
              <Text style={styles.totalTTCLabel}>Total TTC</Text>
              <Text style={styles.totalTTCValue}>
                {formatMontant(total, d.devise)}
              </Text>
            </View>
          </View>

          <View style={styles.pied}>
            <View style={styles.piedCard}>
              <Text style={styles.piedLabel}>PAIEMENT</Text>
              <Text style={styles.piedTexte}>{d.modePaiement}</Text>
              {d.modePaiement === "Mobile Money" && d.numeroMobileMoney ? (
                <Text style={styles.piedNumero}>{d.numeroMobileMoney}</Text>
              ) : null}
            </View>
            {d.noteClient ? (
              <View style={styles.piedCardNote}>
                <Text style={styles.piedLabel}>NOTE</Text>
                <Text style={styles.noteText}>{d.noteClient}</Text>
              </View>
            ) : (
              <View style={{ flex: 1 }} />
            )}
          </View>

          <Text style={styles.merci}>
            ·  MERCI POUR VOTRE CONFIANCE  ·
          </Text>
        </View>

        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGold} />
          <View style={styles.bottomBarGreen} />
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
