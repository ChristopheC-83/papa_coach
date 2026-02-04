import React from "react";
import { FiX, FiCheck, FiActivity } from "react-icons/fi";
import CoachVerdict from "./components/CoachVerdict";
import { useUserStore } from "@/store/user/useUserStore";
import CoachFeedbackDisplay from "./components/CoachFeedbackDisplay";

export default function ValidatedZone({
  activeActivity,
  feedback = {},
  onUpdate,
}) {
  const user = useUserStore((state) => state.user);
  const isCoach = user?.role === "coach";
  const isCompleted = activeActivity.is_completed;
  // Configuration des lignes du tableau pour un rendu dynamique et propre
  const FEEDBACK_CONFIG = [
    { key: "pre_feeling", label: "État initial", color: "text-zinc-400" },
    {
      key: "session_feeling",
      label: "Pendant l'effort",
      color: "text-zinc-400",
    },
    {
      key: "pros",
      label: "Points Forts",
      color: "text-green-500",
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
    <div className="bg-card border-2 border-primary/10 rounded-[32px] p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-500">
      {/* --- HEADER : STATUT & RPE --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`size-14 rounded-2xl flex items-center justify-center shadow-inner ${
              isCompleted
                ? "bg-green-500/10 text-green-500"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {isCompleted ? (
              <FiCheck className="text-3xl" />
            ) : (
              <FiX className="text-3xl" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">
              Rapport d'activité
            </p>
            <p className="text-xl font-black uppercase italic tracking-tighter leading-none">
              {isCompleted ? "Séance Terminée" : "Séance Ignorée"}
            </p>
          </div>
        </div>

        {/* Badge RPE : Le coeur de la donnée athlète */}
        {isCompleted && (
          <div className="flex flex-col items-center justify-center size-14 bg-zinc-900 border border-white/5 rounded-2xl shadow-xl">
            <p className="text-[8px] font-black uppercase tracking-widest text-primary">
              RPE
            </p>
            <p className="text-xl font-black italic">
              {activeActivity.rpe || feedback.rpe || "-"}
            </p>
          </div>
        )}
      </div>

      {/* --- CORPS : DÉTAILS DU FEEDBACK --- */}
      <div className="overflow-hidden border border-white/5 rounded-2xl bg-black/20">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="p-4 font-black uppercase tracking-widest text-zinc-500 w-1/3">
                Analyse
              </th>
              <th className="p-4 font-black uppercase tracking-widest text-zinc-500">
                Détails de l'athlète
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {/* Cas 1 : Séance NON FAITE */}
            {!isCompleted && (
              <tr>
                <td className="p-4 font-bold italic uppercase text-destructive">
                  Motif
                </td>
                <td className="p-4 text-foreground font-medium italic">
                  {feedback.reason || "Aucune raison renseignée."}
                </td>
              </tr>
            )}

            {/* Cas 2 : Séance FAITE - On boucle sur la config */}
            {isCompleted &&
              FEEDBACK_CONFIG.map((item) => {
                const value = feedback[item.key];
                if (!value) return null;

                return (
                  <tr
                    key={item.key}
                    className={`${item.bg || ""} transition-colors hover:bg-white/2`}
                  >
                    <td
                      className={`p-4 font-bold italic uppercase whitespace-nowrap ${item.color}`}
                    >
                      {item.label}
                    </td>
                    <td className="p-4 text-zinc-200 font-medium leading-relaxed whitespace-pre-line">
                      {value}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* --- ZONE COACH : STRICTEMENT RÉSERVÉE --- */}
      {/* ... (Header et Tableau de feedback athlète existant) ... */}

      {/* --- LE PONT DE DÉCISION --- */}
      {isCoach ? (
        // Le coach voit son formulaire d'édition
        <CoachVerdict workout={activeActivity} onUpdate={onUpdate} />
      ) : (
        // L'athlète voit le beau rendu visuel
        <CoachFeedbackDisplay workout={activeActivity} />
      )}

      {/* --- FOOTER : INFO SYSTÈME --- */}
      <div className="flex items-center justify-center gap-2 opacity-30">
        <FiActivity className="text-[10px]" />
        <p className="text-[8px] font-black uppercase tracking-[0.3em]">
          Data Integrity Verified — A.R.C. Protocol
        </p>
      </div>
    </div>
  );
}
