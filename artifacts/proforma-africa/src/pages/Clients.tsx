import AppLayout from "@/components/AppLayout";
import ClientCard from "@/components/ClientCard";
import { mockClients } from "@/data/mock";

export default function Clients() {
  return (
    <AppLayout>
      <div className="px-[40px] pt-[32px] flex justify-between items-center">
        <h1 className="font-unbounded font-bold text-[28px] text-[var(--text-primary)]">Clients</h1>
        <button className="bg-[var(--green)] text-white font-unbounded text-[14px] py-[10px] px-[20px] rounded-[8px] hover:bg-[var(--green-dark)] transition-colors">
          Ajouter un client +
        </button>
      </div>

      <div className="px-[40px] py-[32px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
        {mockClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </AppLayout>
  );
}