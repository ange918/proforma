import AppLayout from "@/components/AppLayout";
import DocumentCard from "@/components/DocumentCard";
import { mockDocuments, mockClients } from "@/data/mock";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "wouter";
import { StatutDocument } from "@/data/types";

export default function Devis() {
  const [filter, setFilter] = useState<StatutDocument | 'tous'>('tous');
  const [search, setSearch] = useState("");

  const devis = mockDocuments.filter(d => d.type === 'devis');
  
  const filteredDevis = devis.filter(d => {
    const matchStatus = filter === 'tous' || d.statut === filter;
    const client = mockClients.find(c => c.id === d.clientId);
    const matchSearch = search === "" || 
      d.numero.toLowerCase().includes(search.toLowerCase()) || 
      (client && client.nom.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const filters: { label: string, value: StatutDocument | 'tous' }[] = [
    { label: 'Tous', value: 'tous' },
    { label: 'Brouillon', value: 'brouillon' },
    { label: 'Envoyé', value: 'envoye' },
    { label: 'Accepté', value: 'accepte' },
    { label: 'Payé', value: 'paye' },
  ];

  return (
    <AppLayout>
      <div className="px-[40px] pt-[32px] flex justify-between items-center">
        <h1 className="font-unbounded font-bold text-[28px] text-[var(--text-primary)]">Devis</h1>
        <Link href="/devis/nouveau">
          <button className="bg-[var(--green)] text-white font-unbounded text-[14px] py-[10px] px-[20px] rounded-[8px] hover:bg-[var(--green-dark)] transition-colors">
            Nouveau devis +
          </button>
        </Link>
      </div>

      <div className="px-[40px] py-[24px] flex flex-col md:flex-row gap-[16px] items-start md:items-center">
        <div className="relative w-full md:w-[300px]">
          <MagnifyingGlass className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[18px]" />
          <input 
            type="text" 
            placeholder="Rechercher par n° ou client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[var(--border)] rounded-[8px] py-[10px] pl-[40px] pr-[16px] text-[14px] focus:outline-none focus:border-[var(--green)] bg-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-[8px]">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-[14px] py-[6px] rounded-full text-[13px] font-medium transition-colors ${
                filter === f.value 
                  ? "bg-[var(--green)] text-white" 
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-[40px] pb-[40px] flex flex-col gap-[12px]">
        {filteredDevis.map(doc => (
          <DocumentCard 
            key={doc.id} 
            document={doc} 
            client={mockClients.find(c => c.id === doc.clientId)} 
            showClient 
          />
        ))}
        {filteredDevis.length === 0 && (
          <div className="text-center py-[40px] text-[var(--text-muted)] border border-[var(--border)] border-dashed rounded-[12px]">
            Aucun devis ne correspond à vos critères.
          </div>
        )}
      </div>
    </AppLayout>
  );
}