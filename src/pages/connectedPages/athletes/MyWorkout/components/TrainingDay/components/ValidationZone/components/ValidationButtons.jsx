import React from 'react'

import { FiCheck, FiX } from "react-icons/fi";
export default function ValidationButtons({setView}) {
  return (
    <div className="flex gap-3 animate-in fade-in zoom-in-95 duration-300">
            {/* BOUTON NON RÉALISÉ */}
            <button
              onClick={() => setView("skipped")}
              className="flex-1 flex flex-col items-center justify-center py-4 bg-secondary/50 text-muted-foreground rounded-3xl hover:bg-destructive/10 hover:text-destructive transition-all group"
            >
              <FiX className="text-xl mb-1 group-active:scale-75 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Non réalisé
              </span>
            </button>
    
            {/* BOUTON RÉALISÉ */}
            <button
              onClick={() => setView("done")}
              className="flex-2 flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-3xl font-black uppercase italic tracking-widest text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <FiCheck className="text-lg" />
              Séance faite
            </button>
          </div>
  )
}
