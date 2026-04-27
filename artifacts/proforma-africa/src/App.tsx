import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  PencilSimple,
  Eye,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import Formulaire from "@/components/Formulaire";
import Apercu from "@/components/Apercu";
import Historique from "@/components/Historique";
import Hero from "@/components/Hero";
import type { DonneesFacture, EntreeHistorique, TemplateService } from "@/types";
import { genererNumero } from "@/lib/utils";

type Onglet = "formulaire" | "apercu" | "historique";

const STORAGE_KEY_COMMENCER = "proforma-africa:commencer:v1";

function dejaCommence(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_COMMENCER) === "1";
  } catch {
    return false;
  }
}

function marquerCommence() {
  try {
    localStorage.setItem(STORAGE_KEY_COMMENCER, "1");
  } catch {
    // ignore
  }
}

const queryClient = new QueryClient();

const STORAGE_KEY = "proforma-africa:donnees:v1";
const STORAGE_KEY_HISTORIQUE = "proforma-africa:historique:v1";
const STORAGE_KEY_TEMPLATES = "proforma-africa:templates:v1";
const MAX_HISTORIQUE = 50;

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

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
        remise: 0,
      },
    ],
    remiseGlobale: 0,
    acompte: 0,
    conditionsPaiement: "",
    signatureImage: null,
    noteClient: "",
  };
}

function normaliserLignes(lignes: DonneesFacture["lignes"]): DonneesFacture["lignes"] {
  return lignes.map((l) => ({ ...l, remise: l.remise ?? 0 }));
}

function chargerDepuisStockage(): DonneesFacture | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const defaults = donneesInitiales();
    const result = { ...defaults, ...parsed } as DonneesFacture;
    result.lignes = normaliserLignes(result.lignes || defaults.lignes);
    return result;
  } catch {
    return null;
  }
}

function chargerHistorique(): EntreeHistorique[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_HISTORIQUE);
    if (!raw) return [];
    return JSON.parse(raw) as EntreeHistorique[];
  } catch {
    return [];
  }
}

function chargerTemplates(): TemplateService[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_TEMPLATES);
    if (!raw) return [];
    return JSON.parse(raw) as TemplateService[];
  } catch {
    return [];
  }
}

function Page() {
  const [donnees, setDonnees] = useState<DonneesFacture>(
    () => chargerDepuisStockage() ?? donneesInitiales(),
  );
  const [sauvegarde, setSauvegarde] = useState(false);
  const [historique, setHistorique] = useState<EntreeHistorique[]>(
    () => chargerHistorique(),
  );
  const [templates, setTemplates] = useState<TemplateService[]>(
    () => chargerTemplates(),
  );
  const [showHistorique, setShowHistorique] = useState(false);
  const [onglet, setOnglet] = useState<Onglet>("formulaire");
  const [vue, setVue] = useState<"hero" | "app">(() =>
    dejaCommence() ? "app" : "hero"
  );

  function handleCommencer() {
    marquerCommence();
    setVue("app");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donnees));
        setSauvegarde(true);
        setTimeout(() => setSauvegarde(false), 1500);
      } catch {
        // ignore quota errors silently
      }
    }, 400);
    return () => clearTimeout(t);
  }, [donnees]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY_HISTORIQUE, JSON.stringify(historique));
    } catch {
      // ignore
    }
  }, [historique]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(templates));
    } catch {
      // ignore
    }
  }, [templates]);

  function reinitialiser() {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "Voulez-vous vraiment réinitialiser le formulaire ? Toutes vos données locales seront effacées.",
    );
    if (!ok) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setDonnees(donneesInitiales());
  }

  function sauvegarderHistorique(d: DonneesFacture) {
    const entree: EntreeHistorique = {
      id: uid(),
      dateCreation: new Date().toISOString(),
      donnees: structuredClone(d),
    };
    setHistorique((prev) => [entree, ...prev].slice(0, MAX_HISTORIQUE));
  }

  function chargerEntree(entree: EntreeHistorique) {
    setDonnees({ ...entree.donnees });
    setShowHistorique(false);
  }

  function dupliquerEntree(entree: EntreeHistorique) {
    const copie: DonneesFacture = {
      ...entree.donnees,
      numeroFacture: genererNumero(entree.donnees.typeDocument),
      dateEmission: new Date().toISOString().slice(0, 10),
    };
    setDonnees(copie);
    setShowHistorique(false);
  }

  function supprimerEntree(id: string) {
    setHistorique((prev) => prev.filter((e) => e.id !== id));
  }

  function ajouterTemplate(t: Omit<TemplateService, "id">) {
    const nouveau: TemplateService = { id: uid(), ...t };
    setTemplates((prev) => [nouveau, ...prev]);
  }

  function supprimerTemplate(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }

  function handleShowHistorique() {
    setOnglet("historique");
    setShowHistorique(true);
  }

  return (
    <>
      {vue === "hero" && <Hero onCommencer={handleCommencer} />}

      <div className="proforma-layout">
        <div
          className="proforma-panel"
          data-panel="formulaire"
          data-active={onglet === "formulaire" ? "true" : "false"}
        >
          <Formulaire
            donnees={donnees}
            setDonnees={setDonnees}
            sauvegarde={sauvegarde}
            onReinitialiser={reinitialiser}
            templates={templates}
            onAjouterTemplate={ajouterTemplate}
            onSupprimerTemplate={supprimerTemplate}
            onShowHistorique={handleShowHistorique}
            onSauvegarderHistorique={sauvegarderHistorique}
          />
        </div>
        <div
          className="proforma-panel"
          data-panel="apercu"
          data-active={onglet === "apercu" ? "true" : "false"}
        >
          <Apercu donnees={donnees} />
        </div>
      </div>

      {showHistorique && (
        <Historique
          historique={historique}
          onClose={() => { setShowHistorique(false); setOnglet("formulaire"); }}
          onCharger={chargerEntree}
          onDupliquer={dupliquerEntree}
          onSupprimer={supprimerEntree}
        />
      )}

      {/* Mobile bottom tab bar */}
      <nav className="pa-mobile-tabs" aria-label="Navigation">
        <button
          className={`pa-tab-btn${onglet === "formulaire" ? " pa-tab-btn--active" : ""}`}
          onClick={() => { setOnglet("formulaire"); setShowHistorique(false); }}
          type="button"
        >
          <PencilSimple size={22} weight={onglet === "formulaire" ? "fill" : "regular"} />
          <span>Formulaire</span>
        </button>
        <button
          className={`pa-tab-btn${onglet === "apercu" ? " pa-tab-btn--active" : ""}`}
          onClick={() => { setOnglet("apercu"); setShowHistorique(false); }}
          type="button"
        >
          <Eye size={22} weight={onglet === "apercu" ? "fill" : "regular"} />
          <span>Aperçu</span>
        </button>
        <button
          className={`pa-tab-btn${onglet === "historique" ? " pa-tab-btn--active" : ""}`}
          onClick={handleShowHistorique}
          type="button"
        >
          <ClockCounterClockwise size={22} weight={onglet === "historique" ? "fill" : "regular"} />
          <span>Historique</span>
        </button>
      </nav>

      <style>{`
        .proforma-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        .proforma-panel {
          min-width: 0;
          overflow: hidden;
        }
        .pa-mobile-tabs {
          display: none;
        }
        @media (max-width: 767px) {
          .proforma-layout {
            grid-template-columns: minmax(0, 1fr);
            height: calc(100dvh - 64px);
            overflow: hidden;
          }
          .proforma-panel {
            height: calc(100dvh - 64px);
            overflow: hidden;
          }
          .proforma-panel[data-active="false"] {
            display: none;
          }
          .proforma-panel[data-active="true"] {
            display: block;
          }
          .pa-mobile-tabs {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 64px;
            background: var(--card);
            border-top: 1px solid var(--border);
            z-index: 200;
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }
          .pa-tab-btn {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--text-muted);
            font-size: 11px;
            font-family: "Plus Jakarta Sans", sans-serif;
            font-weight: 500;
            padding: 8px 4px;
            transition: color 0.15s;
          }
          .pa-tab-btn--active {
            color: var(--green);
          }
          .pa-tab-btn:active {
            opacity: 0.7;
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
