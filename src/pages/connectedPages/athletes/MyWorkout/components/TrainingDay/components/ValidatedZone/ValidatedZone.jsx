import React from "react";

import { FiX, FiCheck } from "react-icons/fi";

export default function ValidatedZone({ activeActivity, feedback = {} }) {
  console.log(activeActivity);
  const FEEDBACK_CONFIG = [
    { key: "pre_feeling", label: "Avant", color: "text-muted-foreground" },
    {
      key: "session_feeling",
      label: "Pendant",
      color: "text-muted-foreground",
    },
    {
      key: "pros",
      label: "Points Forts",
      color: "text-green-600",
      bg: "bg-green-500/5",
    },
    {
      key: "cons",
      label: "Difficultés",
      color: "text-destructive",
      bg: "bg-destructive/5",
    },
    {
      key: "comment",
      label: "Optimisation",
      color: "text-primary",
      bg: "bg-primary/5",
    },
  ];
  return (
    <div className="bg-card border-2 border-primary/10 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Header du Statut */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`size-12 rounded-2xl flex items-center justify-center shadow-sm ${
              activeActivity.is_completed
                ? "bg-green-500/10 text-green-500"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {activeActivity.is_completed ? (
              <FiCheck className="text-2xl" />
            ) : (
              <FiX className="text-2xl" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">
              Rapport d'activité
            </p>
            <p className="text-lg font-black uppercase italic leading-none">
              {activeActivity.is_completed
                ? "Séance Validée !"
                : "Séance non faite..."}
            </p>
          </div>
        </div>
      </div>

      {/* Grille de Data (uniquement non faite) */}

      {!activeActivity.is_completed && (
        <div className="overflow-hidden border border-primary/10 rounded-2xl bg-secondary/5 mt-4">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-primary/5 border-b border-primary/10">
                <th className="p-3 font-black uppercase tracking-tighter w-1/3">
                  Raison
                </th>
                <th className="p-3 font-black uppercase tracking-tighter">
                  {activeActivity.athlete_feedback.reason}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      )}
      {/* Grille de Data (uniquement si fait) */}
      {activeActivity.is_completed && (
        <div className="overflow-hidden border border-primary/10 rounded-2xl bg-secondary/5 mt-4">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-primary/5 border-b border-primary/10">
                <th className="p-3 font-black uppercase tracking-tighter w-1/3">
                  Analyse
                </th>
                <th className="p-3 font-black uppercase tracking-tighter">
                  Détails
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {FEEDBACK_CONFIG.map((item) => {
                const value = feedback[item.key];
                if (!value) return null; // On n'affiche pas la ligne si le champ est vide

                return (
                  <tr key={item.key} className={`${item.bg || ""}`}>
                    <td
                      className={`p-3 font-bold italic uppercase ${item.color}`}
                    >
                      {item.label}
                    </td>
                    <td className="p-3 text-foreground font-medium leading-relaxed">
                      {item.key === "comment" ? `"${value}"` : value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-center text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">
        Données archivées — Coach notifié
      </p>
    </div>
  );
}
