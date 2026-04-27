import NavBar from "@/components/NavBar";
import { Link } from "wouter";
import { FileText, FilePdf, WhatsappLogo, CurrencyDollar, Bell, Buildings, CheckCircle } from "@phosphor-icons/react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="px-[clamp(24px,6vw,80px)] py-[clamp(80px,14vh,140px)] text-center max-w-[800px] mx-auto">
          <div className="inline-block bg-[var(--green-light)] text-[var(--green)] text-[12px] font-medium px-[16px] py-[6px] rounded-full mb-[24px]">
            ✦ Fait pour l'Afrique francophone
          </div>
          <h1 className="font-unbounded font-bold text-[clamp(36px,6vw,72px)] leading-[1.1] mb-[20px]">
            <span className="block text-[var(--text-primary)]">Vos devis et factures,</span>
            <span className="block text-[var(--green)]">en 3 minutes.</span>
          </h1>
          <p className="text-[18px] text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
            Créez des documents professionnels adaptés aux standards locaux, gérez vos clients et faites-vous payer plus rapidement.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] mt-[40px]">
            <Link href="/dashboard">
              <button className="w-full sm:w-auto bg-[var(--green)] text-white font-unbounded text-[14px] py-[14px] px-[32px] rounded-[8px] hover:bg-[var(--green-dark)] transition-colors">
                Créer ma première facture →
              </button>
            </Link>
            <button className="w-full sm:w-auto border border-[var(--border)] bg-white text-[var(--text-primary)] font-unbounded text-[14px] py-[14px] px-[32px] rounded-[8px] hover:bg-[var(--bg-surface)] transition-colors">
              Voir la démo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[48px] mt-[60px]">
            <div className="flex flex-col items-center">
              <span className="font-unbounded font-bold text-[36px] text-[var(--green)]">3 min</span>
              <span className="text-[13px] text-[var(--text-muted)]">Pour créer une facture</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-unbounded font-bold text-[36px] text-[var(--green)]">100%</span>
              <span className="text-[13px] text-[var(--text-muted)]">Gratuit pour commencer</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-unbounded font-bold text-[36px] text-[var(--green)]">FCFA</span>
              <span className="text-[13px] text-[var(--text-muted)]">Devise locale supportée</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-[var(--bg-card)] px-[clamp(24px,6vw,80px)] py-[80px]">
          <h2 className="font-unbounded text-[32px] text-center mb-[48px] text-[var(--text-primary)]">
            Tout ce dont vous avez besoin pour facturer
          </h2>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {[
              { icon: FileText, title: "Devis & Proformas", desc: "Créez des documents pro en quelques clics, adaptés aux standards africains." },
              { icon: FilePdf, title: "Export PDF instantané", desc: "Téléchargez ou partagez vos documents en PDF haute qualité." },
              { icon: WhatsappLogo, title: "Partage WhatsApp", desc: "Envoyez vos factures directement via WhatsApp en un clic." },
              { icon: CurrencyDollar, title: "Multi-devises", desc: "XOF, XAF, MAD, GNF, EUR, USD — choisissez la devise de votre client." },
              { icon: Bell, title: "Relances automatiques", desc: "Rappels automatiques pour les factures impayées après échéance." },
              { icon: Buildings, title: "Gestion clients", desc: "Carnet de clients centralisé avec historique complet." }
            ].map((f, i) => (
              <div key={i} className="p-[28px] border border-[var(--border)] rounded-[12px] bg-[var(--bg)] hover:border-[var(--green)] hover:shadow-[var(--shadow-md)] transition-all duration-200">
                <f.icon weight="fill" className="text-[32px] text-[var(--green)]" />
                <h3 className="font-unbounded font-semibold text-[16px] text-[var(--text-primary)] mt-[12px] mb-[8px]">{f.title}</h3>
                <p className="text-[14px] text-[var(--text-muted)] leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-[var(--bg)] px-[clamp(24px,6vw,80px)] py-[80px]">
          <h2 className="font-unbounded text-[32px] text-center mb-[48px] text-[var(--text-primary)]">
            Des tarifs simples et transparents
          </h2>
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            
            <div className="border border-[var(--border)] rounded-[12px] p-[32px] bg-white">
              <h3 className="font-unbounded font-semibold text-[18px] mb-[12px]">Free</h3>
              <div className="mb-[24px]">
                <span className="font-unbounded font-bold text-[40px] text-[var(--text-primary)]">0 FCFA</span>
                <span className="text-[var(--text-muted)]">/mois</span>
              </div>
              <ul className="flex flex-col gap-[12px] mb-[32px]">
                {["3 documents/mois", "Export PDF", "Partage WhatsApp", "1 devise"].map((item, i) => (
                  <li key={i} className="flex items-center gap-[8px] text-[14px] text-[var(--text-secondary)]">
                    <CheckCircle weight="fill" className="text-[var(--green)] text-[16px]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-[12px] border border-[var(--border)] rounded-[8px] font-unbounded text-[14px] hover:bg-[var(--bg-surface)] transition-colors">
                Commencer
              </button>
            </div>

            <div className="border border-[var(--green)] rounded-[12px] p-[32px] bg-[var(--green)] relative transform md:-translate-y-[16px]">
              <div className="absolute top-[24px] right-[24px] bg-white text-[var(--green)] font-unbounded text-[11px] px-[12px] py-[4px] rounded-full">
                Populaire
              </div>
              <h3 className="font-unbounded font-semibold text-[18px] text-white mb-[12px]">Pro</h3>
              <div className="mb-[24px]">
                <span className="font-unbounded font-bold text-[40px] text-white">2 500 FCFA</span>
                <span className="text-[rgba(255,255,255,0.7)]">/mois</span>
              </div>
              <ul className="flex flex-col gap-[12px] mb-[32px]">
                {["Documents illimités", "Export PDF haute qualité", "Partage WhatsApp + Email", "Multi-devises (6 devises)", "Personnalisation logo", "Support prioritaire"].map((item, i) => (
                  <li key={i} className="flex items-center gap-[8px] text-[14px] text-white">
                    <CheckCircle weight="fill" className="text-white text-[16px]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-[12px] bg-white text-[var(--green)] rounded-[8px] font-unbounded text-[14px] hover:bg-[var(--bg-surface)] transition-colors">
                Choisir Pro
              </button>
            </div>

            <div className="border border-[var(--border)] rounded-[12px] p-[32px] bg-white">
              <h3 className="font-unbounded font-semibold text-[18px] mb-[12px]">Business</h3>
              <div className="mb-[24px]">
                <span className="font-unbounded font-bold text-[40px] text-[var(--text-primary)]">7 500 FCFA</span>
                <span className="text-[var(--text-muted)]">/mois</span>
              </div>
              <ul className="flex flex-col gap-[12px] mb-[32px]">
                {["Tout de Pro", "Relances automatiques", "Multi-utilisateurs", "Statistiques avancées", "API & intégrations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-[8px] text-[14px] text-[var(--text-secondary)]">
                    <CheckCircle weight="fill" className="text-[var(--green)] text-[16px]" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-[12px] border border-[var(--border)] rounded-[8px] font-unbounded text-[14px] hover:bg-[var(--bg-surface)] transition-colors mt-auto">
                Contacter
              </button>
            </div>

          </div>
        </section>
      </main>

      <footer className="bg-[var(--text-primary)] text-white px-[clamp(24px,6vw,80px)] py-[48px] pb-[24px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-[40px] mb-[48px]">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-[16px]">
              <span className="font-unbounded font-bold text-[18px] text-[var(--green)]">PROFORMA</span>
              <span className="font-unbounded font-normal text-[18px] text-[var(--gold)]">AFRICA</span>
            </div>
            <p className="font-lora italic text-[16px] text-[rgba(255,255,255,0.7)]">Facturer en Afrique, simplement.</p>
          </div>
          
          <div className="flex flex-col gap-[12px]">
            <h4 className="font-unbounded font-semibold text-[14px] mb-[8px]">Produit</h4>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Tarifs</a>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Démo</a>
          </div>
          <div className="flex flex-col gap-[12px]">
            <h4 className="font-unbounded font-semibold text-[14px] mb-[8px]">Entreprise</h4>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">À propos</a>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Blog</a>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-[12px]">
            <h4 className="font-unbounded font-semibold text-[14px] mb-[8px]">Légal</h4>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">CGU</a>
            <a href="#" className="text-[14px] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto border-t border-[rgba(255,255,255,0.1)] pt-[24px]">
          <p className="text-[13px] text-[rgba(255,255,255,0.5)]">© 2024 ProformaAfrica. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}