import { Client } from "@/data/types";
import { formatMontant } from "@/lib/utils";
import { WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { Link } from "wouter";

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  const initials = client.nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[12px] p-[24px] hover:border-[var(--green)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
      <div className="flex items-center gap-[16px] mb-[16px]">
        <div className="w-[48px] h-[48px] rounded-full bg-[var(--green-light)] text-[var(--green)] font-unbounded text-[18px] flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-unbounded font-semibold text-[16px] text-[var(--text-primary)] truncate">{client.nom}</span>
          {client.entreprise && (
            <span className="text-[13px] text-[var(--text-muted)] truncate">{client.entreprise}</span>
          )}
        </div>
      </div>

      <div className="h-[1px] bg-[var(--border)] my-[16px]" />

      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex flex-col">
          <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-[4px]">Documents</span>
          <span className="font-unbounded font-semibold text-[16px] text-[var(--text-primary)]">{client.nombreDocuments}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-[4px]">Total facturé</span>
          <span className="font-unbounded font-semibold text-[16px] text-[var(--green)]">
            {formatMontant(client.totalFacture, client.devise)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-[12px]">
        <a 
          href={`https://wa.me/${client.telephone.replace(/\D/g,'')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-[8px] bg-[var(--bg-surface)] rounded-full hover:bg-[#25D366]/10 transition-colors"
        >
          <WhatsappLogo weight="fill" className="text-[#25D366] text-[18px]" />
        </a>
        <a 
          href={`mailto:${client.email}`}
          className="p-[8px] bg-[var(--bg-surface)] rounded-full hover:bg-[var(--border)] transition-colors"
        >
          <EnvelopeSimple weight="fill" className="text-[var(--text-muted)] text-[18px]" />
        </a>
        
        <Link href={`/clients/${client.id}`} className="ml-auto text-[12px] font-medium text-[var(--green)] hover:underline">
          Voir détail →
        </Link>
      </div>
    </div>
  );
}