import React from "react";
import {
  FiPlus,
  FiTrash2,
  FiStar,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

import { LiaBrainSolid } from "react-icons/lia";


export default function StepList({
  steps,
  updateStep,
  removeStep,
  moveStep,
  addStep,
}) {
  // Fonction utilitaire pour gérer l'exclusivité des états
  const togglePsycho = (index, currentPsycho) => {
    updateStep(index, "psycho", !currentPsycho);
    if (!currentPsycho) {
      updateStep(index, "highlight", false); // On retire l'étoile si on met le cerveau
    }
  };

  const toggleHighlight = (index, currentHighlight) => {
    updateStep(index, "highlight", !currentHighlight);
    if (!currentHighlight) {
      updateStep(index, "psycho", false); // On retire le cerveau si on met l'étoile
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">
        Construction de la séance
      </h4>

      {steps.map((step, index) => {
        // Logique de style dynamique
        const isPsycho =
          step.psycho || step.title?.toLowerCase().includes("psy");
        const borderClass = isPsycho
          ? "border-orange-500 bg-orange-500/5 shadow-[0_0_15px_rgba(249,115,22,0.1)]"
          : step.highlight
            ? "border-primary bg-primary/5"
            : "border-muted bg-background";

        return (
          <div
            key={index}
            className={`p-4 rounded-2xl border ${borderClass} transition-all duration-300 h-auto `}
          >
            <div className="flex justify-between items-center mb-2">
              <input
                placeholder="Titre du bloc..."
                className={`font-bold bg-transparent outline-none w-full h-auto ${isPsycho ? "text-orange-500" : ""}`}
                value={step.title}
                onChange={(e) => updateStep(index, "title", e.target.value)}
              />

              <div className="flex gap-2 md:gap-4 items-center">
                {/* BOUTON PSYCHO (Cerveau/Activity) */}
                <button
                  type="button"
                  onClick={() => togglePsycho(index, step.psycho)}
                  className="rounded-lg transition-all  cursor-pointer"
                >
                  <LiaBrainSolid
                    size={22}
                    className={`transition-colors duration-300 ${
                      step.psycho ? "text-orange-500" : "text-zinc-600"
                    }`}
                  />
                </button>

                {/* BOUTON STAR */}
                <button
                  onClick={() => toggleHighlight(index, step.highlight)}
                  className={` rounded-lg transition-colors ${step.highlight ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-zinc-800"} cursor-pointer`}
                  title="Highlight"
                >
                  <FiStar
                    size={18}
                    fill={step.highlight ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={() => moveStep(index, "up")}
                  disabled={index === 0}
                  className="text-muted-foreground hover:text-primary disabled:opacity-20 cursor-pointer"
                >
                  <FiArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveStep(index, "down")}
                  disabled={index === steps.length - 1}
                  className="text-muted-foreground hover:text-primary disabled:opacity-20 cursor-pointer"
                >
                  <FiArrowDown size={16} />
                </button>

                <button
                  onClick={() => removeStep(index)}
                  className=" text-destructive hover:bg-destructive/10 rounded-lg transition-colors  cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            <textarea
              placeholder="Détails (ex: Visualisation, focus respiration...)"
              className={`text-sm  h-auto bg-transparent w-full resize-none outline-none whitespace-pre-line ${isPsycho ? "text-orange-200/70" : "text-muted-foreground"}`}
              rows={6}
              value={step.detail}
              onChange={(e) => updateStep(index, "detail", e.target.value)}
            />
          </div>
        );
      })}

      <button
        onClick={addStep}
        className="w-full py-4 border-2 border-dashed border-muted rounded-2xl text-muted-foreground flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all cursor-pointer group"
      >
        <FiPlus className="group-hover:rotate-90 transition-transform" />{" "}
        Ajouter un bloc
      </button>
    </div>
  );
}
