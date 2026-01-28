import React from "react";
import { FiX, FiCheck } from "react-icons/fi";

import RelativeDate from "./TrainingDaycomponents/RelativeDate";
import SessionDetail from "./TrainingDaycomponents/SessionDetail";
import SessionFree from "./TrainingDaycomponents/SessionFree";
import RaceDetail from "./TrainingDaycomponents/RaceDetail";
import RecoDetail from "./TrainingDaycomponents/RecoDetail";
import GotoDebrief from "./TrainingDaycomponents/GotoDebrief";
import ValidationZone from "./TrainingDaycomponents/ValidationZone";

export default function TrainingDay({
  selectedDate,
  selectedSession,
  selectedReco,
  selectedRace,
  onRefresh,
}) {
  const activeActivity = selectedSession || selectedReco || selectedRace;
  const feedback = activeActivity?.athlete_feedback || {};

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
    <div className="w-md max-w-full max-md:mx-2 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700 md:mt-4">
      <RelativeDate selectedDate={selectedDate} />

      {selectedSession && <SessionDetail selectedSession={selectedSession} />}
      {selectedReco && <RecoDetail selectedReco={selectedReco} />}
      {selectedRace && <RaceDetail selectedRace={selectedRace} />}
      {!activeActivity && <SessionFree />}

      {activeActivity && (
        <div className="mt-6">
          {/* --- CAS 1 : FORMULAIRE À REMPLIR --- */}
          {activeActivity.is_completed === null ? (
            <ValidationZone
              workoutId={activeActivity.id}
              onRefresh={onRefresh}
            />
          ) : (
            /* --- CAS 2 : RÉCAPITULATIF "FIGÉ" --- */
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
                        ? "Séance Validée"
                        : "Séance non faite"}
                    </p>
                  </div>
                </div>
              </div>

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
          )}
        </div>
      )}
    </div>
  );
}
