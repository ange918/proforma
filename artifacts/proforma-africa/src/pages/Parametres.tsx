import AppLayout from "@/components/AppLayout";
import { mockEntreprise } from "@/data/mock";
import { useState } from "react";

export default function Parametres() {
  const [entreprise, setEntreprise] = useState(mockEntreprise);
  const [mobileMoney, setMobileMoney] = useState({ operateur: 'MTN', numero: '+229 97 00 00 00' });

  const handleSave = () => {
    alert("Profil mis à jour !");
  };

  return (
    <AppLayout>
      <div className="px-[40px] pt-[32px] pb-[40px] max-w-[800px]">
        <h1 className="font-unbounded font-bold text-[28px] text-[var(--text-primary)] mb-[32px]">Paramètres</h1>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[32px] mb-[24px]">
          <h2 className="font-unbounded font-semibold text-[18px] mb-[24px]">Profil de l'entreprise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Nom de l'entreprise</label>
              <input 
                type="text" 
                value={entreprise.nom}
                onChange={e => setEntreprise({...entreprise, nom: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Email</label>
              <input 
                type="email" 
                value={entreprise.email}
                onChange={e => setEntreprise({...entreprise, email: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Téléphone</label>
              <input 
                type="text" 
                value={entreprise.telephone}
                onChange={e => setEntreprise({...entreprise, telephone: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Adresse</label>
              <input 
                type="text" 
                value={entreprise.adresse}
                onChange={e => setEntreprise({...entreprise, adresse: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Ville</label>
              <input 
                type="text" 
                value={entreprise.ville}
                onChange={e => setEntreprise({...entreprise, ville: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Pays</label>
              <input 
                type="text" 
                value={entreprise.pays}
                onChange={e => setEntreprise({...entreprise, pays: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">RCCM / SIRET (Optionnel)</label>
              <input 
                type="text" 
                value={entreprise.rccm || ''}
                onChange={e => setEntreprise({...entreprise, rccm: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[32px] mb-[32px]">
          <h2 className="font-unbounded font-semibold text-[18px] mb-[24px]">Paiement Mobile Money</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Opérateur</label>
              <select 
                value={mobileMoney.operateur}
                onChange={e => setMobileMoney({...mobileMoney, operateur: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none"
              >
                <option value="MTN">MTN</option>
                <option value="Moov">Moov</option>
                <option value="Wave">Wave</option>
                <option value="Orange Money">Orange Money</option>
              </select>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] text-[var(--text-secondary)]">Numéro</label>
              <input 
                type="text" 
                value={mobileMoney.numero}
                onChange={e => setMobileMoney({...mobileMoney, numero: e.target.value})}
                className="border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white" 
              />
            </div>
          </div>
          <p className="text-[13px] text-[var(--text-muted)]">
            Ce numéro apparaîtra sur vos documents pour faciliter le paiement.
          </p>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-[var(--green)] text-white font-unbounded text-[14px] py-[12px] px-[32px] rounded-[8px] hover:bg-[var(--green-dark)] transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </AppLayout>
  );
}