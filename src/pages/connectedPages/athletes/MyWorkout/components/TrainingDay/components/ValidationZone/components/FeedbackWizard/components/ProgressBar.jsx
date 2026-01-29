import React from "react";

export default function ProgressBar({ step, totalSteps }) {
  // Rendu de la barre de progression
  const progress = (step / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
          Étape {step} sur {totalSteps}
        </span>
        <span className="text-[10px] font-bold text-muted-foreground italic">
          {Math.round(progress)}% complété
        </span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-3xl overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
