import {
  X as XIcon,
  ClockCounterClockwise,
  Copy,
  FolderOpen,
  Trash,
  Download,
  WarningCircle,
} from "@phosphor-icons/react";
import type { EntreeHistorique } from "@/types";
import { calculerTotaux, formatMontant, exporterHistoriqueCSV } from "@/lib/utils";

interface Props {
  historique: EntreeHistorique[];
  onClose: () => void;
  onCharger: (e: EntreeHistorique) => void;
  onDupliquer: (e: EntreeHistorique) => void;
  onSupprimer: (id: string) => void;
}

function formatDateCourte(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Historique({
  historique,
  onClose,
  onCharger,
  onDupliquer,
  onSupprimer,
}: Props) {
  function confirmerSuppression(id: string) {
    if (window.confirm("Supprimer cette entrée de l'historique ?")) {
      onSupprimer(id);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(13,13,13,0.5)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <div
        className="pa-fade-in"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          background: "var(--bg)",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            position: "sticky",
            top: 0,
            background: "var(--bg)",
            zIndex: 1,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <ClockCounterClockwise
              size={20}
              color="var(--green)"
              weight="duotone"
            />
            <div>
              <div
                className="font-unbounded"
                style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}
              >
                Historique
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                {historique.length} document
                {historique.length !== 1 ? "s" : ""} sauvegardé
                {historique.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {historique.length > 0 && (
              <button
                type="button"
                onClick={() => exporterHistoriqueCSV(historique)}
                title="Exporter l'historique en CSV"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "7px 12px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                <Download size={14} />
                Export CSV
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "7px 10px",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <XIcon size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "16px 28px 32px" }}>
          {historique.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 0",
                color: "var(--text-muted)",
                gap: 12,
                textAlign: "center",
              }}
            >
              <WarningCircle size={40} weight="thin" />
              <div style={{ fontSize: 14 }}>
                Aucun document dans l'historique.
              </div>
              <div style={{ fontSize: 12 }}>
                Les factures sont sauvegardées automatiquement lors du
                téléchargement PDF.
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: 4,
              }}
            >
              {historique.map((entree) => {
                const { total } = calculerTotaux(
                  entree.donnees.lignes,
                  entree.donnees.remiseGlobale || 0,
                );
                return (
                  <div
                    key={entree.id}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#fff",
                              background: "var(--green)",
                              borderRadius: 4,
                              padding: "2px 7px",
                            }}
                          >
                            {entree.donnees.typeDocument}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--text-muted)",
                              fontFamily: "ui-monospace, monospace",
                            }}
                          >
                            {entree.donnees.numeroFacture}
                          </span>
                        </div>
                        <div
                          className="font-unbounded"
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--text)",
                            marginTop: 6,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {entree.donnees.nomClient || "—"}
                        </div>
                        {entree.donnees.entrepriseClient && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--text-muted)",
                              marginTop: 2,
                            }}
                          >
                            {entree.donnees.entrepriseClient}
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginTop: 6,
                          }}
                        >
                          <span
                            className="font-unbounded"
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "var(--green)",
                            }}
                          >
                            {formatMontant(total, entree.donnees.devise)}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                            }}
                          >
                            {formatDateCourte(entree.dateCreation)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => confirmerSuppression(entree.id)}
                        title="Supprimer"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--red)",
                          padding: 4,
                          flexShrink: 0,
                          opacity: 0.6,
                        }}
                      >
                        <Trash size={15} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onCharger(entree)}
                        style={{
                          flex: 1,
                          background: "var(--green-light)",
                          border: "1px solid var(--green)",
                          borderRadius: 6,
                          padding: "7px 12px",
                          color: "var(--green)",
                          cursor: "pointer",
                          fontSize: 12,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        <FolderOpen size={14} />
                        Charger
                      </button>
                      <button
                        type="button"
                        onClick={() => onDupliquer(entree)}
                        style={{
                          flex: 1,
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          padding: "7px 12px",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          fontSize: 12,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        <Copy size={14} />
                        Dupliquer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
