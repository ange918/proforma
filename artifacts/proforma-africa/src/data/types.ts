export type Devise = 'XOF' | 'XAF' | 'GNF' | 'MAD' | 'EUR' | 'USD';
export type StatutDocument = 'brouillon' | 'envoye' | 'accepte' | 'paye' | 'annule' | 'en_retard';
export type TypeDocument = 'devis' | 'facture' | 'proforma';
export type ModePaiement = 'mobile_money' | 'virement' | 'especes' | 'cheque';

export interface Client {
  id: string;
  nom: string;
  entreprise?: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;
  devise: Devise;
  totalFacture: number;
  nombreDocuments: number;
}

export interface LigneDocument {
  id: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  tva: number;
}

export interface Document {
  id: string;
  numero: string;
  type: TypeDocument;
  statut: StatutDocument;
  clientId: string;
  dateCreation: string;
  dateEcheance: string;
  lignes: LigneDocument[];
  devise: Devise;
  modePaiement: ModePaiement;
  noteClient?: string;
  noteInterne?: string;
  sousTotal: number;
  totalTva: number;
  total: number;
  relanceEnvoyee: boolean;
}

export interface Entreprise {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;
  siret?: string;
  rccm?: string;
  logoInitiales: string;
}