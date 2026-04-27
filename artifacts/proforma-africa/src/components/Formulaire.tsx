import { useRef, useState } from "react";
import {
  UploadSimple,
  Trash,
  Plus,
  FilePdf,
  X as XIcon,
  Buildings,
  FileText,
  User as UserIcon,
  ListChecks,
  NoteBlank,
  CircleNotch,
} from "@phosphor-icons/react";
import type { DonneesFacture, LigneService, TypeDocument } from "@/types";
import { calculerTotaux, formatMontant, genererNumero } from "@/lib/utils";
import { generatePDF } from "./FacturePDF";

interface Props {
  donnees: DonneesFacture;
  setDonnees: React.Dispatch<React.SetStateAction<DonneesFacture>>;
}

const PAYS_OPTIONS = [
  "Bénin",
  "Côte d'Ivoire",
  "Sénégal",
  "Mali",
  "Togo",
  "Cameroun",
  "Autre",
];
const DEVISES = ["XOF", "XAF", "MAD", "EUR", "USD"] as const;
const MODES_PAIEMENT = [
  "Mobile Money",
  "Virement bancaire",
  "Espèces",
  "Chèque",
] as const;
const TYPES_DOC: TypeDocument[] = ["Facture", "Devis", "Proforma"];
const TVA_OPTIONS = [0, 10, 18, 20];

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

export default function Formulaire({ donnees, setDonnees }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generating, setGenerating] = useState(false);

  function update<K extends keyof DonneesFacture>(
    key: K,
    value: DonneesFacture[K],
  ) {
    setDonnees((prev) => ({ ...prev, [key]: value }));
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update("logoEntreprise", reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    update("logoEntreprise", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function updateLigne(id: string, patch: Partial<LigneService>) {
    setDonnees((prev) => ({
      ...prev,
      lignes: prev.lignes.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));
  }

  function ajouterLigne() {
    setDonnees((prev) => ({
      ...prev,
      lignes: [
        ...prev.lignes,
        {
          id: uid(),
          description: "",
          quantite: 1,
          prixUnitaire: 0,
          tva: 18,
        },
      ],
    }));
  }

  function supprimerLigne(id: string) {
    setDonnees((prev) => ({
      ...prev,
      lignes: prev.lignes.filter((l) => l.id !== id),
    }));
  }

  function changerType(t: TypeDocument) {
    setDonnees((prev) => ({
      ...prev,
      typeDocument: t,
      numeroFacture: genererNumero(t),
    }));
  }

  const { sousTotal, totalTva, total } = calculerTotaux(donnees.lignes);
  const canGenerate =
    donnees.nomEntreprise.trim().length > 0 &&
    donnees.nomClient.trim().length > 0 &&
    !generating;

  async function handleGenerate() {
    if (!canGenerate) return;
    try {
      setGenerating(true);
      await generatePDF(donnees);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--bg)",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "32px 32px 24px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 32 }}>
          <div
            className="font-unbounded"
            style={{ fontSize: 22, lineHeight: 1, letterSpacing: "-0.01em" }}
          >
            <span style={{ fontWeight: 700, color: "var(--green)" }}>
              PROFORMA
            </span>
            <span style={{ fontWeight: 400, color: "var(--gold)" }}>
              AFRICA
            </span>
          </div>
          <div
            className="font-jakarta"
            style={{
              fontSize: 14,
              color: "var(--text-muted)",
              marginTop: 6,
            }}
          >
            Générez votre facture en 2 minutes.
          </div>
        </div>

        {/* SECTION 1 — VOTRE ENTREPRISE */}
        <Section icon={<Buildings size={18} />} title="Votre entreprise">
          {/* Logo upload */}
          <div style={{ marginBottom: 20 }}>
            <label className="pa-label">Logo de l'entreprise</label>
            {donnees.logoEntreprise ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 12,
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  background: "var(--card)",
                }}
              >
                <img
                  src={donnees.logoEntreprise}
                  alt="logo"
                  style={{
                    height: 60,
                    width: 60,
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  style={{
                    marginLeft: "auto",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "6px 10px",
                    color: "var(--red)",
                    cursor: "pointer",
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <XIcon size={14} /> Supprimer
                </button>
              </div>
            ) : (
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed var(--border)",
                  borderRadius: 8,
                  padding: 24,
                  cursor: "pointer",
                  background: "var(--card)",
                  transition: "border-color 0.15s, background 0.15s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.borderColor = "var(--green)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                <UploadSimple size={24} color="var(--text-muted)" />
                <span
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  Cliquer pour ajouter votre logo
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>

          <Grid2>
            <Field label="Nom de l'entreprise *">
              <input
                className="pa-input"
                value={donnees.nomEntreprise}
                onChange={(e) => update("nomEntreprise", e.target.value)}
                placeholder="Ex: Digital Innovation"
              />
            </Field>
            <Field label="Email professionnel">
              <input
                className="pa-input"
                type="email"
                value={donnees.emailEntreprise}
                onChange={(e) => update("emailEntreprise", e.target.value)}
                placeholder="contact@entreprise.com"
              />
            </Field>
            <Field label="Téléphone">
              <input
                className="pa-input"
                value={donnees.telephoneEntreprise}
                onChange={(e) => update("telephoneEntreprise", e.target.value)}
                placeholder="+229 97 00 00 00"
              />
            </Field>
            <Field label="Ville">
              <input
                className="pa-input"
                value={donnees.villeEntreprise}
                onChange={(e) => update("villeEntreprise", e.target.value)}
                placeholder="Cotonou"
              />
            </Field>
            <Field label="Pays" full>
              <select
                className="pa-select"
                value={donnees.paysEntreprise}
                onChange={(e) => update("paysEntreprise", e.target.value)}
              >
                <option value="">Sélectionner un pays</option>
                {PAYS_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </Grid2>
        </Section>

        {/* SECTION 2 — DOCUMENT */}
        <Section icon={<FileText size={18} />} title="Document">
          <Grid2>
            <Field label="Type de document">
              <select
                className="pa-select"
                value={donnees.typeDocument}
                onChange={(e) => changerType(e.target.value as TypeDocument)}
              >
                {TYPES_DOC.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Numéro">
              <input
                className="pa-input"
                value={donnees.numeroFacture}
                onChange={(e) => update("numeroFacture", e.target.value)}
              />
            </Field>
            <Field label="Date d'émission">
              <input
                className="pa-input"
                type="date"
                value={donnees.dateEmission}
                onChange={(e) => update("dateEmission", e.target.value)}
              />
            </Field>
            <Field label="Date d'échéance">
              <input
                className="pa-input"
                type="date"
                value={donnees.dateEcheance}
                onChange={(e) => update("dateEcheance", e.target.value)}
              />
            </Field>
            <Field label="Devise">
              <select
                className="pa-select"
                value={donnees.devise}
                onChange={(e) =>
                  update("devise", e.target.value as DonneesFacture["devise"])
                }
              >
                {DEVISES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mode de paiement">
              <select
                className="pa-select"
                value={donnees.modePaiement}
                onChange={(e) =>
                  update(
                    "modePaiement",
                    e.target.value as DonneesFacture["modePaiement"],
                  )
                }
              >
                {MODES_PAIEMENT.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
          </Grid2>

          {donnees.modePaiement === "Mobile Money" && (
            <div className="pa-fade-in" style={{ marginTop: 8 }}>
              <Field label="Numéro Mobile Money">
                <input
                  className="pa-input"
                  value={donnees.numeroMobileMoney}
                  onChange={(e) => update("numeroMobileMoney", e.target.value)}
                  placeholder="+229 97 00 00 00"
                />
              </Field>
            </div>
          )}
        </Section>

        {/* SECTION 3 — CLIENT */}
        <Section icon={<UserIcon size={18} />} title="Client">
          <Grid2>
            <Field label="Nom du client *">
              <input
                className="pa-input"
                value={donnees.nomClient}
                onChange={(e) => update("nomClient", e.target.value)}
                placeholder="Ex: Adjoua Koné"
              />
            </Field>
            <Field label="Entreprise du client">
              <input
                className="pa-input"
                value={donnees.entrepriseClient}
                onChange={(e) => update("entrepriseClient", e.target.value)}
                placeholder="Optionnel"
              />
            </Field>
            <Field label="Email du client">
              <input
                className="pa-input"
                type="email"
                value={donnees.emailClient}
                onChange={(e) => update("emailClient", e.target.value)}
              />
            </Field>
            <Field label="Téléphone du client">
              <input
                className="pa-input"
                value={donnees.telephoneClient}
                onChange={(e) => update("telephoneClient", e.target.value)}
              />
            </Field>
            <Field label="Ville">
              <input
                className="pa-input"
                value={donnees.villeClient}
                onChange={(e) => update("villeClient", e.target.value)}
              />
            </Field>
            <Field label="Pays">
              <select
                className="pa-select"
                value={donnees.paysClient}
                onChange={(e) => update("paysClient", e.target.value)}
              >
                <option value="">Sélectionner un pays</option>
                {PAYS_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </Grid2>
        </Section>

        {/* SECTION 4 — SERVICES */}
        <Section icon={<ListChecks size={18} />} title="Services">
          <div>
            {donnees.lignes.map((l) => {
              const totalLigne =
                l.quantite * l.prixUnitaire * (1 + l.tva / 100);
              return (
                <div
                  key={l.id}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 12,
                    position: "relative",
                  }}
                >
                  {donnees.lignes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => supprimerLigne(l.id)}
                      title="Supprimer cette ligne"
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--red)",
                        padding: 4,
                        borderRadius: 4,
                        display: "inline-flex",
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  )}

                  <div style={{ marginBottom: 12, paddingRight: 32 }}>
                    <input
                      className="pa-input"
                      value={l.description}
                      onChange={(e) =>
                        updateLigne(l.id, { description: e.target.value })
                      }
                      placeholder="Ex: Création site web, Prestation graphique..."
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 90px 1fr",
                      gap: 10,
                      alignItems: "end",
                    }}
                  >
                    <div>
                      <label className="pa-label">Qté</label>
                      <input
                        className="pa-input"
                        type="number"
                        min={1}
                        value={l.quantite}
                        onChange={(e) =>
                          updateLigne(l.id, {
                            quantite: Math.max(1, Number(e.target.value) || 0),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="pa-label">Prix unitaire</label>
                      <input
                        className="pa-input"
                        type="number"
                        min={0}
                        step="any"
                        value={l.prixUnitaire}
                        onChange={(e) =>
                          updateLigne(l.id, {
                            prixUnitaire: Math.max(
                              0,
                              Number(e.target.value) || 0,
                            ),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="pa-label">TVA %</label>
                      <select
                        className="pa-select"
                        value={l.tva}
                        onChange={(e) =>
                          updateLigne(l.id, { tva: Number(e.target.value) })
                        }
                      >
                        {TVA_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}%
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="pa-label">Montant TTC</label>
                      <div
                        className="font-unbounded"
                        style={{
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: "var(--green-light)",
                          color: "var(--green)",
                          fontWeight: 600,
                          fontSize: 14,
                          textAlign: "right",
                          minHeight: 40,
                        }}
                      >
                        {formatMontant(totalLigne, donnees.devise)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={ajouterLigne}
              style={{
                width: "100%",
                border: "1px dashed var(--green)",
                background: "var(--green-light)",
                color: "var(--green)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 8,
                padding: 12,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#DAEFE1")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--green-light)")
              }
            >
              <Plus size={16} weight="bold" /> Ajouter un service
            </button>
          </div>

          {/* RECAP TOTAUX */}
          <div
            style={{
              marginTop: 20,
              background: "var(--green-light)",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Recap label="Sous-total HT">
              {formatMontant(sousTotal, donnees.devise)}
            </Recap>
            <Recap label="TVA">
              {formatMontant(totalTva, donnees.devise)}
            </Recap>
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "10px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                className="font-jakarta"
                style={{
                  fontSize: 14,
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                Total TTC
              </span>
              <span
                className="font-unbounded"
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "var(--green)",
                }}
              >
                {formatMontant(total, donnees.devise)}
              </span>
            </div>
          </div>
        </Section>

        {/* SECTION 5 — NOTE */}
        <Section icon={<NoteBlank size={18} />} title="Note (optionnel)">
          <textarea
            className="pa-textarea"
            rows={3}
            value={donnees.noteClient}
            onChange={(e) => update("noteClient", e.target.value)}
            placeholder="Conditions de paiement, remerciements, informations complémentaires..."
          />
        </Section>

        <div style={{ height: 80 }} />
      </div>

      {/* STICKY GENERATE BUTTON */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -4px 16px rgba(0,0,0,0.1)",
          background: "var(--bg)",
        }}
      >
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          style={{
            width: "100%",
            background: "var(--green)",
            color: "#fff",
            fontFamily: "Unbounded, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            padding: 18,
            border: "none",
            cursor: canGenerate ? "pointer" : "not-allowed",
            opacity: canGenerate ? 1 : 0.5,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "background 0.15s",
          }}
          onMouseOver={(e) => {
            if (canGenerate)
              e.currentTarget.style.background = "var(--green-dark)";
          }}
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "var(--green)")
          }
        >
          {generating ? (
            <>
              <CircleNotch size={20} className="spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <FilePdf size={20} weight="fill" /> Télécharger la facture PDF
            </>
          )}
        </button>
      </div>

      <style>{`
        .spin { animation: paSpin 0.9s linear infinite; }
        @keyframes paSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--text)",
        }}
      >
        <span style={{ color: "var(--green)" }}>{icon}</span>
        <h2 className="pa-section-title">{title}</h2>
      </div>
      <div className="pa-section-rule" style={{ marginTop: 8 }} />
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label className="pa-label">{label}</label>
      {children}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

function Recap({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        color: "var(--text-muted)",
        padding: "4px 0",
      }}
    >
      <span>{label}</span>
      <span style={{ color: "var(--text)" }}>{children}</span>
    </div>
  );
}
