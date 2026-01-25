import React from "react";

import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import StepDetail from "./StepDetail";
export default function SessionDetail({ selectedSession }) {
  return (
    <div className="bg-card border-2 border-primary/5 rounded-[2.5rem] p-6 shadow-xl space-y-6">
      {/*  Entete */}
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

      {/*  Details entrainement */}
      <div className="space-y-3">
        {selectedSession.steps.map((step, index) => (
          <StepDetail key={index} step={step} />
        ))}
      </div>

      {/* --- BOUTON DEBRIEF --- */}
      <button
        onClick={() => console.log("Ouvrir le formulaire de débrief")}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-lg shadow-primary/20 text-shadow"
      >
        <FiCheckCircle className="text-lg group-hover:rotate-12 transition-transform png-shadow" />
        Remplir mon débrief
      </button>
    </div>
  );
}
