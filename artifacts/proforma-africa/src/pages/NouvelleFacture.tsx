import AppLayout from "@/components/AppLayout";
import DocumentForm from "@/components/DocumentForm";

export default function NouvelleFacture() {
  return (
    <AppLayout>
      <DocumentForm type="facture" />
    </AppLayout>
  );
}