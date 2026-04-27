import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Formulaire from "@/components/Formulaire";
import Apercu from "@/components/Apercu";
import type { DonneesFacture } from "@/types";
import { genererNumero } from "@/lib/utils";

const queryClient = new QueryClient();
const STORAGE_KEY = "proforma-africa:donnees:v1";

function donneesInitiales(): DonneesFacture {
  const today = new Date().toISOString().slice(0, 10);
  const echeance = new Date();
  echeance.setDate(echeance.getDate() + 30);
  return {
    nomEntreprise: "",
    villeEntreprise: "",
    paysEntreprise: "",
    emailEntreprise: "",
    telephoneEntreprise: "",
    logoEntreprise: null,
    nomClient: "",
    entrepriseClient: "",
    villeClient: "",
    paysClient: "",
    emailClient: "",
    telephoneClient: "",
    numeroFacture: genererNumero("Facture"),
    typeDocument: "Facture",
    dateEmission: today,
    dateEcheance: echeance.toISOString().slice(0, 10),
    devise: "XOF",
    modePaiement: "Mobile Money",
    numeroMobileMoney: "",
    operateurMobileMoney: "",
    nomBanque: "",
    ribIban: "",
    codeSwift: "",
    lignes: [
      {
        id: "init-1",
        description: "",
        quantite: 1,
        prixUnitaire: 0,
        tva: 18,
      },
    ],
    noteClient: "",
  };
}

function chargerDepuisStockage(): DonneesFacture | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const defaults = donneesInitiales();
    return { ...defaults, ...parsed } as DonneesFacture;
  } catch {
    return null;
  }
}

function Page() {
  const [donnees, setDonnees] = useState<DonneesFacture>(
    () => chargerDepuisStockage() ?? donneesInitiales(),
  );
  const [sauvegarde, setSauvegarde] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donnees));
        setSauvegarde(true);
        const hide = setTimeout(() => setSauvegarde(false), 1500);
        return () => clearTimeout(hide);
      } catch {
        // ignore quota errors silently
      }
    }, 400);
    return () => clearTimeout(t);
  }, [donnees]);

  function reinitialiser() {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "Voulez-vous vraiment réinitialiser le formulaire ? Toutes vos données locales seront effacées.",
    );
    if (!ok) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setDonnees(donneesInitiales());
  }

  return (
    <>
      <div className="proforma-layout">
        <Formulaire
          donnees={donnees}
          setDonnees={setDonnees}
          sauvegarde={sauvegarde}
          onReinitialiser={reinitialiser}
        />
        <Apercu donnees={donnees} />
      </div>
      <style>{`
        .proforma-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        @media (max-width: 1024px) {
          .proforma-layout {
            grid-template-columns: minmax(0, 1fr);
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .proforma-layout > div {
            height: auto !important;
            min-height: 100vh;
          }
        }
      `}</style>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Page />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
