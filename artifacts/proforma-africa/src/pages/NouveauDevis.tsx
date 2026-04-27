import AppLayout from "@/components/AppLayout";
import DocumentForm from "@/components/DocumentForm";

export default function NouveauDevis() {
  return (
    <AppLayout>
      <DocumentForm type="devis" />
    </AppLayout>
  );
}