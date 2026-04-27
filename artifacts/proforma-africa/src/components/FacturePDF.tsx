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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#0D0D0D",
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
    backgroundColor: "#1A6B3C",
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
    color: "#0D0D0D",
    marginTop: 8,
  },
  texteGris: { fontSize: 10, color: "#6B6B6B", marginTop: 2 },
  typeDocument: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#1A6B3C",
    textAlign: "right",
  },
  numero: {
    fontSize: 11,
    color: "#6B6B6B",
    textAlign: "right",
    marginTop: 4,
  },
  separateurVert: {
    height: 2,
    backgroundColor: "#1A6B3C",
    opacity: 0.2,
    marginVertical: 20,
  },
  labelSection: {
    fontSize: 9,
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  nomClient: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#0D0D0D",
    marginTop: 6,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2DDD6",
    paddingBottom: 8,
    marginTop: 24,
  },
  tableHeaderText: {
    fontSize: 9,
    color: "#6B6B6B",
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
  cellDescription: { flex: 3, fontSize: 12, color: "#0D0D0D", paddingRight: 8 },
  cellRight: { flex: 1, fontSize: 11, color: "#6B6B6B", textAlign: "right" },
  cellTotal: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0D0D0D",
    textAlign: "right",
  },
  totauxContainer: { alignItems: "flex-end", marginTop: 24 },
  totalLine: { flexDirection: "row", marginBottom: 6 },
  totalLabel: {
    fontSize: 11,
    color: "#6B6B6B",
    width: 100,
    textAlign: "right",
    marginRight: 12,
  },
  totalValue: {
    fontSize: 11,
    color: "#0D0D0D",
    width: 110,
    textAlign: "right",
  },
  totalDivider: {
    width: 222,
    height: 1,
    backgroundColor: "#E2DDD6",
    marginVertical: 8,
  },
  totalTTCLabel: {
    fontSize: 12,
    color: "#0D0D0D",
    width: 100,
    textAlign: "right",
    marginRight: 12,
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
  },
  totalTTC: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#1A6B3C",
    width: 110,
    textAlign: "right",
  },
  pied: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#1A6B3C",
    borderTopStyle: "solid",
  },
  piedTexte: { fontSize: 10, color: "#6B6B6B" },
  piedLabel: {
    fontSize: 9,
    color: "#6B6B6B",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  note: {
    fontSize: 11,
    color: "#6B6B6B",
    fontStyle: "italic",
    maxWidth: 220,
    textAlign: "right",
  },
  barreBas: {
    height: 6,
    backgroundColor: "#1A6B3C",
    marginTop: 24,
    borderRadius: 2,
  },
});

function getInitiales(nom: string): string {
  if (!nom) return "??";
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 3 }]}>Description</Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            Qté
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            P.U.
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            TVA
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1, textAlign: "right" }]}>
            Total
          </Text>
        </View>

        {d.lignes.map((l) => {
          const totalLigne = l.quantite * l.prixUnitaire * (1 + l.tva / 100);
          return (
            <View key={l.id} style={styles.tableRow}>
              <Text style={styles.cellDescription}>
                {l.description || "—"}
              </Text>
              <Text style={styles.cellRight}>{l.quantite}</Text>
              <Text style={styles.cellRight}>
                {formatMontant(l.prixUnitaire, d.devise)}
              </Text>
              <Text style={styles.cellRight}>{l.tva}%</Text>
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
          <View style={styles.totalDivider} />
          <View style={styles.totalLine}>
            <Text style={styles.totalTTCLabel}>Total TTC</Text>
            <Text style={styles.totalTTC}>
              {formatMontant(total, d.devise)}
            </Text>
          </View>
        </View>

        <View style={styles.pied}>
          <View>
            <Text style={styles.piedLabel}>Mode de paiement</Text>
            <Text style={styles.piedTexte}>{d.modePaiement}</Text>
            {d.modePaiement === "Mobile Money" && d.numeroMobileMoney ? (
              <Text style={styles.piedTexte}>{d.numeroMobileMoney}</Text>
            ) : null}
          </View>
          {d.noteClient ? (
            <Text style={styles.note}>{d.noteClient}</Text>
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
