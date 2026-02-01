import React from "react";
import StepDetail from "./components/StepDetail";
import { SPORTS_CONFIG } from "@/constants/Workouts/sports";
export default function SessionDetail({ selectedSession }) {
  const sport = SPORTS_CONFIG[selectedSession.sport] || SPORTS_CONFIG.RUN;

  return (
    <div className="bg-card border-2 border-primary/5 rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden">

      {/* Entete */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* L'ICÔNE DE SPORT */}
          <div
            className={`text-3xl p-1 rounded-2xl ${sport.color} bg-opacity-20 flex items-center justify-center shadow-inner`}
          >
            {sport.icon}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`bg-primary/10 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                  selectedSession.tag === "Compétition"
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {selectedSession.tag}
              </span>
              {/* Petit rappel textuel du sport si nécessaire */}
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">
                {sport.label}
              </span>
            </div>

            <h2
              className={`text-2xl font-black uppercase italic tracking-tighter leading-none pt-1 ${
                selectedSession.tag === "Compétition"
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              {selectedSession.title}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-black text-primary italic leading-none">
            {selectedSession.duration}
          </p>
          {selectedSession.tag !== "Compétition" && (
            <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1">
              Durée
            </p>
          )}
        </div>
      </div>

      {/* Détails entraînement */}
      {selectedSession.tag !== "Compétition" && (
        <div className="space-y-3">
          {selectedSession.steps.map((step, index) => (
            <StepDetail key={index} step={step} />
          ))}
        </div>
      )}
    </div>
  );
}