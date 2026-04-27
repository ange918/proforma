import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import LigneItem from "./LigneItem";
import PDFPreview from "./PDFPreview";
import { Devise, LigneDocument, ModePaiement } from "@/data/types";
import { mockClients } from "@/data/mock";
import { calculerTotaux, formatMontant, genererNumero } from "@/lib/utils";

interface DocumentFormProps {
  type: "devis" | "facture";
}

export default function DocumentForm({ type }: DocumentFormProps) {
  const [clientId, setClientId] = useState("");
  const [documentType, setDocumentType] = useState<string>(type);
  const [dateEmission, setDateEmission] = useState("");
  const [dateEcheance, setDateEcheance] = useState("");
  const [devise, setDevise] = useState<Devise>("XOF");
  const [modePaiement, setModePaiement] = useState<ModePaiement>("virement");
  
  const [lignes, setLignes] = useState<LigneDocument[]>([
    { id: '1', description: '', quantite: 1, prixUnitaire: 0, tva: 18 }
  ]);
  
  const [noteClient, setNoteClient] = useState("");
  const [noteInterne, setNoteInterne] = useState("");

  const [numero] = useState(genererNumero(documentType));

  const client = mockClients.find(c => c.id === clientId);
  const clientNom = client ? client.nom : (clientId === 'nouveau' ? 'Nouveau Client' : '');
  const clientAdresse = client ? `${client.adresse}\n${client.ville}, ${client.pays}` : '';

  const { total } = calculerTotaux(lignes);

  const handleAddLigne = () => {
    setLignes([...lignes, { id: Math.random().toString(), description: '', quantite: 1, prixUnitaire: 0, tva: 18 }]);
  };

  const handleUpdateLigne = (updatedLigne: LigneDocument) => {
    setLignes(lignes.map(l => l.id === updatedLigne.id ? updatedLigne : l));
  };

  const handleDeleteLigne = (id: string) => {
    setLignes(lignes.filter(l => l.id !== id));
  };

  const handleSave = () => {
    window.alert(`Brouillon ${documentType} enregistré !`);
  };

  const handleSend = () => {
    window.alert(`${documentType} envoyé au client !`);
  };

  return (
    <div className="px-[40px] py-[32px] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[32px] max-w-[1400px] mx-auto">
      
      {/* Form */}
      <div className="flex flex-col gap-[32px]">
        <div>
          <h1 className="font-unbounded font-bold text-[28px] text-[var(--text-primary)] mb-[8px] capitalize">
            Nouveau {type}
          </h1>
          <p className="text-[14px] text-[var(--text-muted)]">
            Remplissez les informations ci-dessous. L'aperçu se mettra à jour en temps réel.
          </p>
        </div>

        {/* Section 1 - Informations */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[32px]">
          <h2 className="font-unbounded font-semibold text-[16px] mb-[24px]">Informations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Client</label>
              <select 
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none"
              >
                <option value="" disabled>Sélectionner un client</option>
                <option value="nouveau">+ Nouveau client</option>
                {mockClients.map(c => (
                  <option key={c.id} value={c.id}>{c.nom} {c.entreprise ? `(${c.entreprise})` : ''}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Type de document</label>
              <select 
                value={documentType}
                onChange={e => setDocumentType(e.target.value)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none capitalize"
              >
                <option value="devis">Devis</option>
                <option value="proforma">Proforma</option>
                <option value="facture">Facture</option>
              </select>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Date d'émission</label>
              <input 
                type="date"
                value={dateEmission}
                onChange={e => setDateEmission(e.target.value)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Date d'échéance</label>
              <input 
                type="date"
                value={dateEcheance}
                onChange={e => setDateEcheance(e.target.value)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Devise</label>
              <select 
                value={devise}
                onChange={e => setDevise(e.target.value as Devise)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none"
              >
                <option value="XOF">FCFA (XOF)</option>
                <option value="XAF">FCFA (XAF)</option>
                <option value="GNF">Franc Guinéen (GNF)</option>
                <option value="MAD">Dirham Marocain (MAD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar (USD)</option>
              </select>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Mode de paiement</label>
              <select 
                value={modePaiement}
                onChange={e => setModePaiement(e.target.value as ModePaiement)}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none"
              >
                <option value="virement">Virement bancaire</option>
                <option value="mobile_money">Mobile Money</option>
                <option value="especes">Espèces</option>
                <option value="cheque">Chèque</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 - Lignes de services */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[32px]">
          <h2 className="font-unbounded font-semibold text-[16px] mb-[24px]">Services / Produits</h2>
          
          <div className="hidden sm:flex items-center gap-[12px] mb-[8px] px-[16px]">
            <div className="flex-1 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Description</div>
            <div className="w-[80px] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider text-center">Qté</div>
            <div className="w-[120px] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Prix U.</div>
            <div className="w-[80px] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">TVA</div>
            <div className="w-[120px] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider text-right">Total</div>
            <div className="w-[36px]"></div>
          </div>

          <div className="flex flex-col gap-[12px]">
            {lignes.map((ligne) => (
              <LigneItem 
                key={ligne.id} 
                ligne={ligne} 
                devise={devise} 
                onChange={handleUpdateLigne} 
                onDelete={() => handleDeleteLigne(ligne.id)} 
              />
            ))}
          </div>

          <button 
            onClick={handleAddLigne}
            className="mt-[16px] flex items-center gap-[8px] text-[13px] font-medium text-[var(--green)] hover:text-[var(--green-dark)] py-[8px]"
          >
            <Plus weight="bold" /> Ajouter une ligne
          </button>
        </div>

        {/* Section 3 - Notes & Actions */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[32px] flex flex-col gap-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Note pour le client (visible sur le PDF)</label>
              <textarea 
                value={noteClient}
                onChange={e => setNoteClient(e.target.value)}
                rows={3}
                placeholder="Merci de votre confiance..."
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white resize-none"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Note interne (non visible)</label>
              <textarea 
                value={noteInterne}
                onChange={e => setNoteInterne(e.target.value)}
                rows={3}
                placeholder="Rappel interne..."
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white resize-none"
              />
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-[24px] flex flex-col md:flex-row justify-between items-center gap-[24px]">
            <div className="flex items-center gap-[16px] w-full md:w-auto">
              <button onClick={handleSave} className="flex-1 md:flex-none py-[12px] px-[24px] border border-[var(--border)] rounded-[8px] bg-white text-[var(--text-primary)] font-medium text-[14px] hover:bg-[var(--bg-surface)] transition-colors">
                Enregistrer brouillon
              </button>
              <button onClick={handleSend} className="flex-1 md:flex-none py-[12px] px-[32px] bg-[var(--green)] rounded-[8px] text-white font-unbounded text-[14px] hover:bg-[var(--green-dark)] transition-colors">
                Envoyer →
              </button>
            </div>
            
            <div className="flex flex-col items-end w-full md:w-auto bg-[var(--bg-surface)] p-[16px] rounded-[8px]">
              <span className="text-[12px] text-[var(--text-secondary)] mb-[4px]">Total TTC</span>
              <span className="font-unbounded font-bold text-[24px] text-[var(--green)]">
                {formatMontant(total, devise)}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Preview */}
      <div className="hidden lg:block relative">
        <PDFPreview 
          type={documentType}
          numero={numero}
          clientNom={clientNom}
          clientAdresse={clientAdresse}
          dateEmission={dateEmission}
          dateEcheance={dateEcheance}
          lignes={lignes}
          devise={devise}
          noteClient={noteClient}
        />
      </div>

    </div>
  );
}