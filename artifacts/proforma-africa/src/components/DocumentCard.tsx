import { Document, Client } from "@/data/types";
import { formatMontant, formatDate } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import { FileText, Receipt, WhatsappLogo, ArrowsLeftRight, Money, FilePdf } from "@phosphor-icons/react";

interface DocumentCardProps {
  document: Document;
  client?: Client;
  showClient?: boolean;
}

export default function DocumentCard({ document, client, showClient = false }: DocumentCardProps) {
  const Icon = document.type === 'devis' ? FileText : Receipt;
  
  const getPaiementIcon = () => {
    switch (document.modePaiement) {
      case 'mobile_money': return <WhatsappLogo weight="fill" className="text-[#25D366] text-[16px]" />;
      case 'virement': return <ArrowsLeftRight weight="bold" className="text-[var(--text-muted)] text-[16px]" />;
      case 'especes': return <Money weight="fill" className="text-[var(--gold)] text-[16px]" />;
      case 'cheque': return <FileText weight="fill" className="text-[var(--text-muted)] text-[16px]" />;
    }
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[8px] p-[16px] px-[20px] flex items-center gap-[16px] hover:bg-[var(--bg-surface)] transition-colors duration-150 cursor-pointer">
      <div className="shrink-0">
        <Icon weight="fill" className="text-[20px] text-[var(--text-muted)]" />
      </div>
      
      <div className="flex flex-col flex-1 min-w-[120px]">
        <span className="font-unbounded text-[14px] text-[var(--text-primary)]">{document.numero}</span>
        {showClient && client && (
          <span className="text-[13px] text-[var(--text-muted)] truncate">{client.nom} {client.entreprise ? `(${client.entreprise})` : ''}</span>
        )}
      </div>

      <div className="hidden sm:flex flex-col items-end min-w-[100px]">
        <span className="text-[13px] text-[var(--text-muted)]">{formatDate(document.dateCreation)}</span>
        <span className="text-[12px] text-[var(--text-muted)] flex items-center gap-[4px]">
          Éch: {formatDate(document.dateEcheance)}
        </span>
      </div>

      <div className="hidden md:flex shrink-0 w-[30px] justify-center">
        {getPaiementIcon()}
      </div>

      <div className="flex flex-col items-end min-w-[100px]">
        <span className="font-unbounded font-semibold text-[16px] text-[var(--text-primary)]">
          {formatMontant(document.total, document.devise)}
        </span>
        {document.relanceEnvoyee && (
          <span className="text-[10px] bg-[var(--gold-light)] text-[var(--gold)] px-[6px] py-[2px] rounded-[4px] font-medium mt-[4px]">
            Relance envoyée
          </span>
        )}
      </div>

      <div className="shrink-0 min-w-[90px] flex justify-end">
        <StatusBadge statut={document.statut} />
      </div>
    </div>
  );
}