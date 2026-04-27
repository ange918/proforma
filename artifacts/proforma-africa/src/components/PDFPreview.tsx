import { LigneDocument, Devise } from "@/data/types";
import { formatMontant, formatDate, calculerTotaux } from "@/lib/utils";
import { mockEntreprise } from "@/data/mock";

interface PDFPreviewProps {
  type: string;
  numero: string;
  clientNom: string;
  clientAdresse: string;
  dateEmission: string;
  dateEcheance: string;
  lignes: LigneDocument[];
  devise: Devise;
  noteClient: string;
}

export default function PDFPreview({
  type, numero, clientNom, clientAdresse, dateEmission, dateEcheance, lignes, devise, noteClient
}: PDFPreviewProps) {
  const { sousTotal, totalTva, total } = calculerTotaux(lignes);

  return (
    <div className="sticky top-[32px] bg-white p-[40px] border border-[var(--border)] rounded-[8px] shadow-[var(--shadow-md)] min-h-[600px] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[48px]">
        <div>
          <div className="w-[48px] h-[48px] bg-[var(--green)] text-white font-unbounded flex items-center justify-center text-[18px] mb-[12px]">
            {mockEntreprise.logoInitiales}
          </div>
          <h2 className="font-unbounded font-semibold text-[16px] text-[var(--text-primary)] mb-[4px]">
            {mockEntreprise.nom}
          </h2>
          <p className="text-[11px] text-[var(--text-secondary)] leading-[1.6]">
            {mockEntreprise.adresse}<br />
            {mockEntreprise.ville}, {mockEntreprise.pays}<br />
            {mockEntreprise.telephone}<br />
            {mockEntreprise.email}
          </p>
        </div>
        <div className="text-right">
          <h1 className="font-unbounded font-bold text-[20px] text-[var(--text-primary)] uppercase mb-[8px]">
            {type} N° {numero}
          </h1>
          <div className="text-[12px] text-[var(--text-secondary)]">
            <span className="font-medium">Date:</span> {formatDate(dateEmission) || 'À définir'}
          </div>
          <div className="text-[12px] text-[var(--text-secondary)]">
            <span className="font-medium">Échéance:</span> {formatDate(dateEcheance) || 'À définir'}
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-[40px]">
        <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-[4px]">Adressé à :</p>
        <h3 className="font-unbounded font-semibold text-[14px] text-[var(--text-primary)] mb-[4px]">
          {clientNom || 'Nom du client'}
        </h3>
        <p className="text-[12px] text-[var(--text-secondary)] whitespace-pre-wrap">
          {clientAdresse || 'Adresse du client'}
        </p>
      </div>

      {/* Table */}
      <div className="mb-[40px] flex-1">
        <div className="grid grid-cols-12 gap-[8px] border-b-2 border-[var(--border)] pb-[8px] mb-[12px] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          <div className="col-span-6">Description</div>
          <div className="col-span-1 text-center">Qté</div>
          <div className="col-span-2 text-right">Prix U.</div>
          <div className="col-span-1 text-right">TVA</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        
        {lignes.length === 0 ? (
          <div className="text-[12px] text-[var(--text-muted)] py-[12px] text-center italic">
            Aucune ligne de service ajoutée.
          </div>
        ) : (
          lignes.map((l, i) => (
            <div key={i} className="grid grid-cols-12 gap-[8px] py-[8px] border-b border-[var(--border)] text-[12px] text-[var(--text-secondary)]">
              <div className="col-span-6 font-medium text-[var(--text-primary)]">{l.description || '...'}</div>
              <div className="col-span-1 text-center">{l.quantite}</div>
              <div className="col-span-2 text-right">{formatMontant(l.prixUnitaire, devise)}</div>
              <div className="col-span-1 text-right">{l.tva}%</div>
              <div className="col-span-2 text-right font-medium">{formatMontant(l.quantite * l.prixUnitaire, devise)}</div>
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-[40px]">
        <div className="w-[250px]">
          <div className="flex justify-between py-[8px] text-[12px] text-[var(--text-secondary)]">
            <span>Sous-total</span>
            <span>{formatMontant(sousTotal, devise)}</span>
          </div>
          <div className="flex justify-between py-[8px] text-[12px] text-[var(--text-secondary)] border-b border-[var(--border)]">
            <span>TVA</span>
            <span>{formatMontant(totalTva, devise)}</span>
          </div>
          <div className="flex justify-between py-[12px] font-unbounded font-bold text-[16px] text-[var(--text-primary)]">
            <span>Total TTC</span>
            <span>{formatMontant(total, devise)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {noteClient && (
        <div className="mt-auto pt-[24px] border-t border-[var(--border)]">
          <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-[4px]">Notes :</p>
          <p className="text-[11px] text-[var(--text-secondary)] whitespace-pre-wrap leading-[1.6]">
            {noteClient}
          </p>
        </div>
      )}

      {/* Green Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[8px] bg-[var(--green)]"></div>
    </div>
  );
}