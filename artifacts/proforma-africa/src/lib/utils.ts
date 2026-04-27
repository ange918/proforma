import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  lignes: { quantite: number; prixUnitaire: number; tva: number }[],
) {
  const sousTotal = lignes.reduce(
    (s, l) => s + l.quantite * l.prixUnitaire,
    0,
  );
  const totalTva = lignes.reduce(
    (s, l) => s + (l.quantite * l.prixUnitaire * l.tva) / 100,
    0,
  );
  return { sousTotal, totalTva, total: sousTotal + totalTva };
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
