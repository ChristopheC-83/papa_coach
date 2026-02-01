import React, { useState } from "react";
import { FiPlus, FiBookOpen, FiArrowLeft } from "react-icons/fi";
import WorkoutForm from "../WorkoutForm";
import TypicalsSessions from "../../TypicalSessions/TypicalsSessions";

export default function AtCreateWorkout({
  isCreating,
  setIsCreating,
  selectedDate,
  handleCreateWorkout,
  existingWorkout,
}) {
  const [isImporting, setIsImporting] = useState(false);
  const [importedData, setImportedData] = useState(null);

  // La fonction qui fait le pont entre la bibliothèque et l'athlète
  const handleSelectTemplate = (template) => {
    const dataForAthlete = {
      ...template,
      id: null, // Reset de l'ID pour créer une copie
      date: selectedDate,
    };
    setImportedData(dataForAthlete);
    setIsImporting(false);
    setIsCreating(true); // On ouvre le formulaire avec les données
  };

  // --- CAS 1 : MODE BIBLIOTHÈQUE ---
  if (isImporting) {
    return (
      <div className="animate-in slide-in-from-bottom duration-300">
        <button
          onClick={() => setIsImporting(false)}
          className="mb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2"
        >
          <FiArrowLeft /> Annuler l'import
        </button>
        <TypicalsSessions onSelectTemplate={handleSelectTemplate} />
      </div>
    );
  }

  // --- CAS 2 : MODE FORMULAIRE (Vide ou Importé) ---
  if (isCreating) {
    return (
      <div className="animate-in zoom-in-95 duration-200">
        <WorkoutForm
          initialDate={selectedDate}
          onSubmit={(data) => {handleCreateWorkout(data, existingWorkout?.id);
            setImportedData(null);
          }}
          onCancel={() => {
            setIsCreating(false);
            setImportedData(null);
          }}
          initialData={importedData || existingWorkout}
        />
      </div>
    );
  }

  // --- CAS 3 : VUE PAR DÉFAUT (Les 2 boutons) ---
  return (
    <div className="bg-secondary/10 border-2 border-dashed border-muted rounded-3xl p-8 text-center space-y-4">
      <p className="text-sm text-muted-foreground italic mb-2">
        Journée de repos ou séance à programmer.
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center justify-center gap-2 py-4 bg-primary/60 text-white rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all text-shadow cursor-pointer hover:bg-primary/80"
        >
          <FiPlus /> CRÉER UN ENTRAÎNEMENT
        </button>

        <button
          onClick={() => setIsImporting(true)}
          className="flex items-center justify-center gap-2 py-4 bg-primary/60 text-white rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all text-shadow cursor-pointer hover:bg-primary/80"
        >
          <FiBookOpen /> IMPORTER UN MODÈLE
        </button>
      </div>
    </div>
  );
}
