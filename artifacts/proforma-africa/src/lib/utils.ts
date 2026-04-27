import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMontant(montant: number, devise: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: devise === 'XOF' || devise === 'XAF' || devise === 'GNF' ? 'XOF' : devise,
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(montant)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function genererNumero(type: string): string {
  const prefixes: Record<string,string> = { devis:'DEV', facture:'FAC', proforma:'PRO' }
  const prefix = prefixes[type] || 'DOC'
  const annee = new Date().getFullYear()
  const num = Math.floor(Math.random() * 900) + 100
  return `${prefix}-${annee}-${num}`
}

export function calculerTotaux(lignes: { quantite:number; prixUnitaire:number; tva:number }[]) {
  const sousTotal = lignes.reduce((s, l) => s + l.quantite*l.prixUnitaire, 0)
  const totalTva = lignes.reduce((s, l) => s + l.quantite*l.prixUnitaire*l.tva/100, 0)
  return { sousTotal, totalTva, total: sousTotal + totalTva }
}
