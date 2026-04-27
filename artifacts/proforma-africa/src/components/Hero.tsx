import { useEffect, useState } from "react";
import {
  FilePdf,
  DeviceMobile,
  Eye,
  Lightning,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";

interface Props {
  onCommencer: () => void;
}

const FONCTIONNALITES = [
  {
    icon: <Eye size={22} weight="duotone" />,
    titre: "Aperçu en temps réel",
    desc: "Visualisez votre facture pendant que vous la remplissez.",
  },
  {
    icon: <FilePdf size={22} weight="duotone" />,
    titre: "PDF professionnel",
    desc: "Téléchargez un PDF prêt à envoyer en un seul clic.",
  },
  {
    icon: <DeviceMobile size={22} weight="duotone" />,
    titre: "QR Code Mobile Money",
    desc: "Générez un QR code de paiement pour vos clients.",
  },
  {
    icon: <Lightning size={22} weight="duotone" />,
    titre: "Sauvegarde automatique",
    desc: "Vos données restent dans votre navigateur, toujours disponibles.",
  },
];

const POINTS = [
  "100% gratuit",
  "Aucune inscription",
  "Fonctionne sur mobile",
];

export default function Hero({ onCommencer }: Props) {
  const [visible, setVisible] = useState(true);
  const [sortie, setSortie] = useState(false);

  function handleCommencer() {
    setSortie(true);
    setTimeout(() => {
      setVisible(false);
      onCommencer();
    }, 420);
  }

  if (!visible) return null;

  return (
    <div
      className="pa-hero"
      style={{
        opacity: sortie ? 0 : 1,
        transform: sortie ? "translateY(-12px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Barre décorative supérieure */}
      <div className="pa-hero-topbar" />

      <div className="pa-hero-inner">
        {/* Logo */}
        <div className="pa-hero-brand">
          <span className="pa-hero-brand-proforma">PROFORMA</span>
          <span className="pa-hero-brand-africa">AFRICA</span>
        </div>

        {/* Titre principal */}
        <h1 className="pa-hero-titre">
          Factures & devis<br />
          <span className="pa-hero-titre-accent">en 2 minutes.</span>
        </h1>

        {/* Sous-titre */}
        <p className="pa-hero-sous-titre">
          Créez, personnalisez et téléchargez des factures, devis et proformas
          professionnels — sans inscription, sans abonnement.
        </p>

        {/* CTA */}
        <button
          type="button"
          className="pa-hero-cta"
          onClick={handleCommencer}
        >
          Commencer gratuitement
          <ArrowRight size={20} weight="bold" />
        </button>

        {/* Points de réassurance */}
        <div className="pa-hero-points">
          {POINTS.map((p) => (
            <div key={p} className="pa-hero-point">
              <CheckCircle size={15} weight="fill" color="var(--green)" />
              {p}
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div className="pa-hero-sep" />

        {/* Grille de fonctionnalités */}
        <div className="pa-hero-grid">
          {FONCTIONNALITES.map((f) => (
            <div key={f.titre} className="pa-hero-card">
              <div className="pa-hero-card-icon">{f.icon}</div>
              <div className="pa-hero-card-titre">{f.titre}</div>
              <div className="pa-hero-card-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Pied */}
        <p className="pa-hero-footer">
          ProformaAfrica — Outil gratuit pour freelances & PME
        </p>
      </div>
    </div>
  );
}
