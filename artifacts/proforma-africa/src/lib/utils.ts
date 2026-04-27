import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EntreeHistorique } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMontant(montant: number, devise: string): string {
  const locales: Record<string, string> = {
    XOF: "fr-FR",
    XAF: "fr-FR",
    MAD: "fr-MA",
    EUR: "fr-FR",
    USD: "en-US",
  };
  const deviseISO = devise === "XOF" || devise === "XAF" ? "XOF" : devise;
  return new Intl.NumberFormat(locales[devise] || "fr-FR", {
    style: "currency",
    currency: deviseISO,
    minimumFractionDigits: 0,
  }).format(montant);
}

export function calculerTotaux(
  lignes: { quantite: number; prixUnitaire: number; tva: number; remise?: number }[],
  remiseGlobale: number = 0,
) {
  const sousTotal = lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);

  const sousTotalNetLignes = lignes.reduce((s, l) => {
    return s + l.quantite * l.prixUnitaire * (1 - (l.remise || 0) / 100);
  }, 0);

  const remiseMontant = sousTotalNetLignes * (remiseGlobale / 100);
  const sousTotalFinal = sousTotalNetLignes - remiseMontant;

  const totalTva = lignes.reduce((s, l) => {
    const htNet =
      l.quantite *
      l.prixUnitaire *
      (1 - (l.remise || 0) / 100) *
      (1 - remiseGlobale / 100);
    return s + (htNet * l.tva) / 100;
  }, 0);

  const total = sousTotalFinal + totalTva;
  const aDesRemises =
    remiseGlobale > 0 || lignes.some((l) => (l.remise || 0) > 0);

  return {
    sousTotal,
    sousTotalNetLignes,
    remiseMontant,
    sousTotalFinal,
    totalTva,
    total,
    aDesRemises,
  };
}

export function genererNumero(type: string): string {
  const p: Record<string, string> = {
    Facture: "FAC",
    Devis: "DEV",
    Proforma: "PRO",
  };
  const prefix = p[type] || "DOC";
  const annee = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 900) + 100;
  return `${prefix}-${annee}-${rand}`;
}

export function formatDateFr(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function exporterHistoriqueCSV(historique: EntreeHistorique[]): void {
  if (historique.length === 0) return;
  const entete = [
    "Date création",
    "Type",
    "Numéro",
    "Client",
    "Entreprise client",
    "Total TTC",
    "Devise",
    "Mode paiement",
  ];
  const lignes = historique.map((e) => {
    const { total } = calculerTotaux(e.donnees.lignes, e.donnees.remiseGlobale || 0);
    return [
      e.dateCreation.slice(0, 10),
      e.donnees.typeDocument,
      e.donnees.numeroFacture,
      e.donnees.nomClient,
      e.donnees.entrepriseClient,
      Math.round(total).toString(),
      e.donnees.devise,
      e.donnees.modePaiement,
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
  });
  const csv = [entete.join(","), ...lignes].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `historique-factures-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
