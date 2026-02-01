import React from 'react'
import {
  FiSave,
} from "react-icons/fi";
// FormFooter.jsx
export default function FormFooter({
  isUpdate, // Utilise la prop passée
  isTemplateRequested,
  setIsTemplateRequested,
  onSave, // Renommé pour correspondre à l'appel
  onCancel,
  showTemplateCheckbox // La nouvelle prop de contrôle
}) {
  return (
    <div className="space-y-4"> {/* Réduit l'espace si la checkbox disparait */}
      
      {/* AFFICHAGE CONDITIONNEL DE LA CHECKBOX */}
      {showTemplateCheckbox && (
        <label className="flex items-center gap-3 p-3 bg-primary/5 rounded-2xl border border-primary/10 cursor-pointer hover:bg-primary/10 transition-all mb-4">
          <input
            type="checkbox"
            className="size-5 accent-primary"
            checked={isTemplateRequested}
            onChange={(e) => setIsTemplateRequested(e.target.checked)}
          />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              Bibliothèque
            </p>
            <p className="text-[11px] font-bold text-muted-foreground">
              Enregistrer cette séance comme modèle
            </p>
          </div>
        </label>
      )}

      <button
        onClick={onSave}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-shadow cursor-pointer hover:bg-primary/80 transition-all"
      >
        <FiSave className="png-shadow" />
        {isUpdate ? "METTRE À JOUR" : "SAUVEGARDER"}
      </button>

      <button
        onClick={onCancel}
        type="button"
        className="w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 bg-secondary text-foreground cursor-pointer hover:bg-secondary/80 transition-all"
      >
        ANNULER
      </button>
    </div>
  );
}
