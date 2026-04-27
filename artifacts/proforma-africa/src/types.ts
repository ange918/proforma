export interface LigneService {
  id: string;
  description: string;
  quantite: number;
  prixUnitaire: number;
  tva: number;
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

  lignes: LigneService[];

  noteClient: string;
}
