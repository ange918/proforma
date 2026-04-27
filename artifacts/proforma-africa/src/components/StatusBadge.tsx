import { StatutDocument } from "@/data/types";
import { CheckCircle } from "@phosphor-icons/react";

interface StatusBadgeProps {
  statut: StatutDocument;
}

export default function StatusBadge({ statut }: StatusBadgeProps) {
  const config = {
    brouillon: { bg: '#F5F5F5', color: 'var(--text-muted)', label: 'Brouillon', icon: null },
    envoye: { bg: 'var(--gold-light)', color: 'var(--gold)', label: 'Envoyé', icon: null },
    accepte: { bg: 'var(--green-light)', color: 'var(--green)', label: 'Accepté', icon: null },
    paye: { bg: 'var(--green-light)', color: 'var(--green-dark)', label: 'Payé', icon: CheckCircle },
    annule: { bg: 'var(--red-light)', color: 'var(--red-soft)', label: 'Annulé', icon: null },
    en_retard: { bg: 'var(--red-light)', color: 'var(--red-soft)', label: 'En retard', icon: null }
  };

  const { bg, color, label, icon: Icon } = config[statut];

  return (
    <span 
      className="inline-flex items-center gap-[4px] text-[11px] font-semibold px-[10px] py-[3px] rounded-full"
      style={{ backgroundColor: bg, color: color }}
    >
      {label}
      {Icon && <Icon weight="fill" className="text-[12px]" />}
    </span>
  );
}