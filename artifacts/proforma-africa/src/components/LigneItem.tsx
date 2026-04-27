import { X } from "@phosphor-icons/react";
import { LigneDocument } from "@/data/types";
import { formatMontant } from "@/lib/utils";

interface LigneItemProps {
  ligne: LigneDocument;
  devise: string;
  onChange: (ligne: LigneDocument) => void;
  onDelete: () => void;
}

export default function LigneItem({ ligne, devise, onChange, onDelete }: LigneItemProps) {
  const montant = ligne.quantite * ligne.prixUnitaire;

  return (
    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-[12px] p-[16px] border border-[var(--border)] rounded-[8px] bg-[var(--bg-surface)]">
      <div className="flex-1 w-full sm:w-auto">
        <label className="block text-[13px] text-[var(--text-secondary)] mb-[6px] sm:hidden">Description</label>
        <input 
          type="text" 
          value={ligne.description}
          onChange={e => onChange({ ...ligne, description: e.target.value })}
          placeholder="Description du service..."
          className="w-full border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white"
        />
      </div>
      
      <div className="flex items-center gap-[12px] w-full sm:w-auto">
        <div className="w-[80px]">
          <label className="block text-[13px] text-[var(--text-secondary)] mb-[6px] sm:hidden">Qté</label>
          <input 
            type="number" 
            min="1"
            value={ligne.quantite}
            onChange={e => onChange({ ...ligne, quantite: Number(e.target.value) })}
            className="w-full border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white text-center"
          />
        </div>
        
        <div className="w-[120px]">
          <label className="block text-[13px] text-[var(--text-secondary)] mb-[6px] sm:hidden">Prix Unitaire</label>
          <input 
            type="number" 
            min="0"
            value={ligne.prixUnitaire}
            onChange={e => onChange({ ...ligne, prixUnitaire: Number(e.target.value) })}
            className="w-full border border-[var(--border)] rounded-[8px] px-[16px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white text-right"
          />
        </div>

        <div className="w-[80px]">
          <label className="block text-[13px] text-[var(--text-secondary)] mb-[6px] sm:hidden">TVA</label>
          <select 
            value={ligne.tva}
            onChange={e => onChange({ ...ligne, tva: Number(e.target.value) })}
            className="w-full border border-[var(--border)] rounded-[8px] px-[12px] py-[10px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white appearance-none"
          >
            <option value={0}>0%</option>
            <option value={18}>18%</option>
            <option value={20}>20%</option>
          </select>
        </div>
        
        <div className="w-[120px] text-right font-unbounded font-semibold text-[14px] text-[var(--text-primary)]">
          <label className="block text-[13px] font-sans font-normal text-[var(--text-secondary)] mb-[6px] sm:hidden text-left">Total</label>
          {formatMontant(montant, devise)}
        </div>

        <button 
          onClick={onDelete}
          className="p-[10px] text-[var(--red-soft)] hover:bg-[var(--red-light)] rounded-[8px] transition-colors"
          title="Supprimer la ligne"
        >
          <X weight="bold" className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}