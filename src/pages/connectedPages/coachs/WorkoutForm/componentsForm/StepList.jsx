import React from 'react'
import {
  FiPlus,
  FiTrash2,
  FiStar,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

export default function StepList({ steps, updateStep, removeStep , moveStep, addStep }) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">
        Construction de la séance
      </h4>

      {steps.map((step, index) => (
        <div
          key={index}
          className={`p-4 rounded-2xl border ${step.highlight ? "border-primary bg-primary/5" : "border-muted bg-background"} transition-all`}
        >
          <div className="flex justify-between items-center mb-2">
            <input
              placeholder="Titre du bloc..."
              className="font-bold bg-transparent outline-none w-full"
              value={step.title}
              onChange={(e) => updateStep(index, "title", e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={() => updateStep(index, "highlight", !step.highlight)}
                className={`p-2 rounded-lg ${step.highlight ? "text-primary" : "text-muted-foreground"}`}
              >
                <FiStar fill={step.highlight ? "currentColor" : "none"} />
              </button>
              <div className="flex gap-1 border-r border-muted pr-2 mr-2">
                <button
                  onClick={() => moveStep(index, "up")}
                  disabled={index === 0}
                  className="p-2 text-muted-foreground hover:text-primary disabled:opacity-20 cursor-pointer"
                >
                  <FiArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveStep(index, "down")}
                  disabled={index === steps.length - 1}
                  className="p-2 text-muted-foreground hover:text-primary disabled:opacity-20 cursor-pointer"
                >
                  <FiArrowDown size={16} />
                </button>
              </div>
              <button
                onClick={() => removeStep(index)}
                className="p-2 text-destructive"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
          <textarea
            placeholder="Détails (ex: 3x10min à 90% VMA...)"
            className="text-sm bg-transparent w-full resize-none outline-none text-muted-foreground"
            rows={4}
            value={step.detail}
            onChange={(e) => updateStep(index, "detail", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addStep}
        className="w-full py-4 border-2 border-dashed border-muted rounded-2xl text-muted-foreground flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all cursor-pointer"
      >
        <FiPlus /> Ajouter un bloc
      </button>
    </div>
  );
}
