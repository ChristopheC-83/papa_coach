import React from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { fr } from "date-fns/locale";

import { FiCalendar, FiCheckCircle } from "react-icons/fi";


export default function TrainingDay({ selectedDate, selectedSession }) {

    const getRelativeBadge = (date) => {
      const today = new Date();
      const diff = differenceInCalendarDays(date, today);

      if (diff === 0)
        return <span className="text-primary animate-pulse">Aujourd'hui</span>;
      if (diff === -1) return "Hier";
      if (diff === 1) return "Demain";
      if (diff > 1) return `Dans ${diff} jours`;
      if (diff < -1) return `Il y a ${Math.abs(diff)} jours`;

      return null;
    };

  return (
    <div className="w-md space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          {format(selectedDate, "EEEE d MMMM ", { locale: fr })}
        </h3>

        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-secondary text-muted-foreground">
          {getRelativeBadge(selectedDate)}
        </span>
      </div>

      {selectedSession ? (
        <div className="bg-card border-2 border-primary/5 rounded-[2.5rem] p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedSession.tag}
              </span>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none pt-2">
                {selectedSession.title}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary italic leading-none">
                {selectedSession.duration}
              </p>
              <p className="text-[9px] text-muted-foreground uppercase font-bold mt-1">
                Durée
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedSession.steps.map((step, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${
                  step.highlight
                    ? "bg-primary/70 text-white shadow-md"
                    : "bg-secondary/40 border border-muted"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${step.highlight ? "bg-white animate-pulse" : "bg-primary"}`}
                />
                <div>
                  <h4
                    className={`text-[10px] font-black uppercase  text-shadow ${step.highlight ? "text-white/80 " : "text-primary"}`}
                  >
                    {step.title}
                  </h4>
                  <p
                    className={`text-sm font-bold leading-tight text-shadow ${step.highlight ? "text-white " : "text-foreground"}`}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --- BOUTON DEBRIEF --- */}
          <button
            onClick={() => console.log("Ouvrir le formulaire de débrief")}
            className="w-full py-4 bg-primary/90 text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-lg shadow-primary/20 text-shadow"
          >
            <FiCheckCircle className="text-lg group-hover:rotate-12 transition-transform png-shadow" />
            Remplir mon débrief
          </button>
        </div>
      ) : (
        <div className="bg-secondary/10 border-2 border-dashed border-muted rounded-[2.5rem] py-16 text-center">
          <p className="text-muted-foreground font-bold italic text-sm">
            Repos ou séance libre
          </p>
        </div>
      )}
    </div>
  );
}
