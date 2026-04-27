export interface LigneService {
  id: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  tva: number;
  remise: number;
}

export type TypeDocument = "Facture" | "Devis" | "Proforma";
export type Devise = "XOF" | "XAF" | "MAD" | "EUR" | "USD";
export type ModePaiement =
  | "Mobile Money"
  | "Virement bancaire"
  | "Espèces"
  | "Chèque";

export interface DonneesFacture {
  nomEntreprise: string;
  villeEntreprise: string;
  paysEntreprise: string;
  emailEntreprise: string;
  telephoneEntreprise: string;
  logoEntreprise: string | null;

  nomClient: string;
  entrepriseClient: string;
  villeClient: string;
  paysClient: string;
  emailClient: string;
  telephoneClient: string;

  numeroFacture: string;
  typeDocument: TypeDocument;
  dateEmission: string;
  dateEcheance: string;
  devise: Devise;
  modePaiement: ModePaiement;
  numeroMobileMoney: string;
  operateurMobileMoney: string;

  nomBanque: string;
  ribIban: string;
  codeSwift: string;

  lignes: LigneService[];

  remiseGlobale: number;
  acompte: number;
  conditionsPaiement: string;
  signatureImage: string | null;

  noteClient: string;
}

export interface TemplateService {
  id: string;
  nom: string;
  description: string;
  prixUnitaire: number;
  tva: number;
}

export interface EntreeHistorique {
  id: string;
  dateCreation: string;
  donnees: DonneesFacture;
}
