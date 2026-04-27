import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import DocumentCard from "@/components/DocumentCard";
import { CurrencyDollar, Clock, Warning, Users, Plus } from "@phosphor-icons/react";
import { formatDate } from "@/lib/utils";
import { mockDocuments, mockClients, mockEntreprise } from "@/data/mock";
import { Link } from "wouter";

export default function Dashboard() {
  const totalFacture = mockDocuments
    .filter(d => d.statut === 'paye')
    .reduce((sum, d) => sum + d.total, 0);

  const enAttente = mockDocuments
    .filter(d => d.statut === 'envoye')
    .reduce((sum, d) => sum + d.total, 0);

  const enRetard = mockDocuments
    .filter(d => d.statut === 'en_retard')
    .reduce((sum, d) => sum + d.total, 0);

  const recentDocs = [...mockDocuments]
    .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="px-[40px] pt-[32px] flex justify-between items-end">
        <div>
          <span className="text-[16px] text-[var(--text-muted)]">Bonjour,</span>
          <h1 className="font-unbounded font-bold text-[28px] text-[var(--text-primary)]">
            {mockEntreprise.nom} 👋
          </h1>
        </div>
        <div className="text-[14px] text-[var(--text-muted)]">
          {formatDate(new Date().toISOString())}
        </div>
      </div>

      <div className="px-[40px] py-[24px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        <StatCard
          title="TOTAL FACTURÉ"
          value={new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(totalFacture)}
          trend="+12% ce mois"
          icon={CurrencyDollar}
          iconColor="var(--green)"
        />
        <StatCard
          title="EN ATTENTE"
          value={new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(enAttente)}
          icon={Clock}
          iconColor="var(--gold)"
        />
        <StatCard
          title="EN RETARD"
          value={new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(enRetard)}
          icon={Warning}
          iconColor="var(--red-soft)"
        />
        <StatCard
          title="CLIENTS ACTIFS"
          value={mockClients.length}
          icon={Users}
          iconColor="var(--green)"
        />
      </div>

      <div className="px-[40px] py-[24px]">
        <div className="flex justify-between items-center mb-[16px]">
          <h2 className="font-unbounded font-semibold text-[18px]">Documents récents</h2>
          <Link href="/factures" className="text-[14px] text-[var(--green)] hover:underline font-medium">
            Voir tout →
          </Link>
        </div>
        <div className="flex flex-col gap-[12px]">
          {recentDocs.map(doc => (
            <DocumentCard 
              key={doc.id} 
              document={doc} 
              client={mockClients.find(c => c.id === doc.clientId)} 
              showClient 
            />
          ))}
        </div>
      </div>

      <div className="px-[40px] pb-[40px] pt-[24px]">
        <div className="flex flex-wrap gap-[16px]">
          <Link href="/devis/nouveau">
            <button className="flex items-center gap-[8px] bg-[var(--green)] text-white font-unbounded text-[14px] py-[12px] px-[20px] rounded-[8px] hover:bg-[var(--green-dark)] transition-colors">
              <Plus weight="bold" /> Nouveau devis
            </button>
          </Link>
          <Link href="/factures/nouvelle">
            <button className="flex items-center gap-[8px] border border-[var(--green)] bg-white text-[var(--green)] font-unbounded text-[14px] py-[12px] px-[20px] rounded-[8px] hover:bg-[var(--green-light)] transition-colors">
              <Plus weight="bold" /> Nouvelle facture
            </button>
          </Link>
          <Link href="/clients">
            <button className="flex items-center gap-[8px] border border-[var(--border)] bg-white text-[var(--text-primary)] font-unbounded text-[14px] py-[12px] px-[20px] rounded-[8px] hover:bg-[var(--bg-surface)] transition-colors">
              <Plus weight="bold" /> Ajouter un client
            </button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}