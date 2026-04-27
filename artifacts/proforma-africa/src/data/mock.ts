import { Entreprise, Client, Document } from './types';

export const mockEntreprise: Entreprise = {
  nom: 'Digital Innovation',
  email: 'contact@digitalinnovation.bj',
  telephone: '+229 97 00 00 00',
  adresse: 'Rue des Cocotiers, Cotonou',
  ville: 'Cotonou',
  pays: 'Bénin',
  rccm: 'RB/COT/24/B/00001',
  logoInitiales: 'DI'
};

export const mockClients: Client[] = [
  {
    id: 'client-1',
    nom: 'Adjoua Koné',
    entreprise: 'Koné & Associés',
    email: 'adjoua@kone.ci',
    telephone: '+225 07 00 00 01',
    adresse: 'Plateau',
    ville: 'Abidjan',
    pays: "Côte d'Ivoire",
    devise: 'XOF',
    totalFacture: 850000,
    nombreDocuments: 4
  },
  {
    id: 'client-2',
    nom: 'Mamadou Diallo',
    entreprise: 'Diallo Consulting',
    email: 'm.diallo@diallo.sn',
    telephone: '+221 77 000 00 02',
    adresse: 'Plateau',
    ville: 'Dakar',
    pays: 'Sénégal',
    devise: 'XOF',
    totalFacture: 520000,
    nombreDocuments: 3
  },
  {
    id: 'client-3',
    nom: 'Cécile Mensah',
    entreprise: 'Mensah Design',
    email: 'cecile@mensahdesign.bj',
    telephone: '+229 96 00 00 03',
    adresse: 'Cadjehoun',
    ville: 'Cotonou',
    pays: 'Bénin',
    devise: 'XOF',
    totalFacture: 340000,
    nombreDocuments: 2
  },
  {
    id: 'client-4',
    nom: 'Ibrahim Touré',
    entreprise: 'ToureTech',
    email: 'ibrahim@touretech.ml',
    telephone: '+223 70 00 00 04',
    adresse: 'ACI 2000',
    ville: 'Bamako',
    pays: 'Mali',
    devise: 'XOF',
    totalFacture: 175000,
    nombreDocuments: 1
  },
  {
    id: 'client-5',
    nom: 'Fatou Ndiaye',
    email: 'fatou.ndiaye@gmail.com',
    telephone: '+221 76 000 00 05',
    adresse: 'Médina',
    ville: 'Dakar',
    pays: 'Sénégal',
    devise: 'XOF',
    totalFacture: 95000,
    nombreDocuments: 2
  },
  {
    id: 'client-6',
    nom: 'Koffi Asante',
    entreprise: 'Asante Créatif',
    email: 'koffi@asante.gh',
    telephone: '+233 24 000 006',
    adresse: 'Osu',
    ville: 'Accra',
    pays: 'Ghana',
    devise: 'USD',
    totalFacture: 1200,
    nombreDocuments: 3
  }
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    numero: 'PRO-2024-001',
    type: 'proforma',
    statut: 'paye',
    clientId: 'client-1',
    dateCreation: '2024-01-15',
    dateEcheance: '2024-02-15',
    devise: 'XOF',
    modePaiement: 'mobile_money',
    sousTotal: 300000,
    totalTva: 54000,
    total: 354000,
    relanceEnvoyee: false,
    lignes: [{ id: 'l1', description: 'Création site web vitrine', quantite: 1, prixUnitaire: 300000, tva: 18 }]
  },
  {
    id: 'doc-2',
    numero: 'DEV-2024-002',
    type: 'devis',
    statut: 'envoye',
    clientId: 'client-2',
    dateCreation: '2024-02-01',
    dateEcheance: '2024-03-01',
    devise: 'XOF',
    modePaiement: 'virement',
    relanceEnvoyee: true,
    sousTotal: 200000,
    totalTva: 36000,
    total: 236000,
    lignes: [
      { id: 'l2', description: 'Stratégie digitale Q1', quantite: 1, prixUnitaire: 150000, tva: 18 },
      { id: 'l3', description: 'Formation équipe (2 jours)', quantite: 2, prixUnitaire: 25000, tva: 18 }
    ]
  },
  {
    id: 'doc-3',
    numero: 'FAC-2024-003',
    type: 'facture',
    statut: 'en_retard',
    clientId: 'client-3',
    dateCreation: '2024-01-20',
    dateEcheance: '2024-02-05',
    devise: 'XOF',
    modePaiement: 'mobile_money',
    relanceEnvoyee: true,
    sousTotal: 180000,
    totalTva: 32400,
    total: 212400,
    lignes: [{ id: 'l4', description: 'Identité visuelle complète', quantite: 1, prixUnitaire: 180000, tva: 18 }]
  },
  {
    id: 'doc-4',
    numero: 'DEV-2024-004',
    type: 'devis',
    statut: 'brouillon',
    clientId: 'client-4',
    dateCreation: '2024-02-10',
    dateEcheance: '2024-03-10',
    devise: 'XOF',
    modePaiement: 'especes',
    sousTotal: 175000,
    totalTva: 31500,
    total: 206500,
    relanceEnvoyee: false,
    lignes: [{ id: 'l5', description: 'Application mobile MVP', quantite: 1, prixUnitaire: 175000, tva: 18 }]
  },
  {
    id: 'doc-5',
    numero: 'PRO-2024-005',
    type: 'proforma',
    statut: 'accepte',
    clientId: 'client-1',
    dateCreation: '2024-02-15',
    dateEcheance: '2024-03-15',
    devise: 'XOF',
    modePaiement: 'virement',
    sousTotal: 250000,
    totalTva: 45000,
    total: 295000,
    relanceEnvoyee: false,
    lignes: [{ id: 'l6', description: 'Refonte plateforme e-commerce', quantite: 1, prixUnitaire: 250000, tva: 18 }]
  },
  {
    id: 'doc-6',
    numero: 'FAC-2024-006',
    type: 'facture',
    statut: 'paye',
    clientId: 'client-5',
    dateCreation: '2024-01-05',
    dateEcheance: '2024-01-20',
    devise: 'XOF',
    modePaiement: 'mobile_money',
    sousTotal: 95000,
    totalTva: 17100,
    total: 112100,
    relanceEnvoyee: false,
    lignes: [{ id: 'l7', description: 'Pack réseaux sociaux (1 mois)', quantite: 1, prixUnitaire: 95000, tva: 18 }]
  }
];