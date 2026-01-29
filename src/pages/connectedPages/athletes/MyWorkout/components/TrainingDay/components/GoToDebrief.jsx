import React from 'react'

import {  FiCheckCircle } from "react-icons/fi";

export default function GotoDebrief() {
  return (
    <button
      onClick={() => console.log("Ouvrir le formulaire de débrief")}
      className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase italic tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group shadow-lg shadow-primary/20 text-shadow"
    >
      <FiCheckCircle className="text-lg group-hover:rotate-12 transition-transform png-shadow" />
      Remplir mon débrief
    </button>
  );
}
