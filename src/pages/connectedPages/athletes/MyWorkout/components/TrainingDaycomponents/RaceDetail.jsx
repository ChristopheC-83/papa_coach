import React from "react";

import {  FiCheckCircle } from "react-icons/fi";
export default function RaceDetail({ selectedRace }) {
  return (
    <div className="bg-card border-2 border-primary/5 rounded-[2.5rem] p-6 shadow-xl space-y-6">
      <div className="space-y-1">
        <span className="bg-destructive/60 text-white text-shadow text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Jour de Course !
        </span>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none pt-5">
          {selectedRace.location}
        </h2>
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
