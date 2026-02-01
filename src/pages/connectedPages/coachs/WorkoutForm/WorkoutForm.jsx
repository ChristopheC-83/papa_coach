import { WORKOUT_TAGS } from "@/constants/Workouts/workout";
import { templateService } from "@/services/workoutsTemplates";
import React, { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiStar,
  FiSave,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { toast } from "sonner";
export default function WorkoutForm({
  initialDate,
  onSubmit,
  onCancel,
  initialData,
}) {
  const [workout, setWorkout] = useState({
    title: initialData?.title || "",
    tag: initialData?.tag || "Endurance",
    duration: initialData?.duration || "",
    date: initialData?.date || initialDate,
    steps: initialData?.steps || [
      { title: "Échauffement", detail: "", highlight: false },
    ],
  });
  const [isTemplateRequested, setIsTemplateRequested] = useState(false);

  // Ajouter un nouveau bloc vide
  const addStep = () => {
    setWorkout({
      ...workout,
      steps: [...workout.steps, { title: "", detail: "", highlight: false }],
    });
  };

  // Modifier un bloc spécifique
  const updateStep = (index, field, value) => {
    const newSteps = [...workout.steps];
    newSteps[index][field] = value;
    setWorkout({ ...workout, steps: newSteps });
  };

  // Déplacer un bloc vers le haut ou le bas
  const moveStep = (index, direction) => {
    const newSteps = [...workout.steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1; // Sécurité : on ne sort pas du tableau

    if (targetIndex < 0 || targetIndex >= newSteps.length) return; // Swap (Échange de places)

    [newSteps[index], newSteps[targetIndex]] = [
      newSteps[targetIndex],
      newSteps[index],
    ];
    setWorkout({ ...workout, steps: newSteps });
  };

  // Supprimer un bloc
  const removeStep = (index) => {
    const newSteps = workout.steps.filter((_, i) => i !== index);
    setWorkout({ ...workout, steps: newSteps });
  };

  // Dans ton WorkoutForm.jsx

  async function handleSaveEverything() {
    try {
      // 1. Sauvegarde pour l'athlète (ton flux habituel)
      await onSubmit(workout, initialData?.id);

      // 2. Si la case "Sauvegarder comme modèle" est cochée
      if (isTemplateRequested) {
        // On prépare l'objet pour le template service
        const templateToSave = {
          title: workout.title,
          tag: workout.tag,
          duration: workout.duration,
          steps: workout.steps,
          // Note : on ne passe PAS de date ni de athlete_id ici !
        };

        await templateService.save(templateToSave);
        toast.success("Modèle enregistré !");
        console.log("Modèle enregistré !");
      }
    } catch (error) {
      console.error("Erreur lors de la double sauvegarde", error);
    }
  }

 

  return (
    <div className="space-y-6 p-4 bg-card rounded-3xl border border-muted">
      {/* --- INFOS GÉNÉRALES --- */}
      <div className="grid grid-cols-2 gap-4">
        <select
          className="bg-secondary/20 p-4 rounded-2xl text-sm text-primary"
          value={workout.tag}
          onChange={(e) => setWorkout({ ...workout, tag: e.target.value })}
        >
          {WORKOUT_TAGS.map((tag) => (
            <option
              key={tag}
              value={tag}
              className={`bg-background ${tag === "Compétition" ? "text-destructive" : ""}`}
            >
              {tag}
            </option>
          ))}
        </select>
        {workout.tag !== "Compétition" && (
          <input
            placeholder="Durée (ex: 1h15)"
            className="bg-secondary/20 p-4 rounded-2xl text-sm"
            value={workout.duration}
            onChange={(e) =>
              setWorkout({ ...workout, duration: e.target.value })
            }
          />
        )}
        <input
          placeholder={
            workout.tag === "Compétition"
              ? "Nom / Lieu de la course"
              : "Nom de la séance..."
          }
          className="col-span-2 bg-secondary/20 p-4 rounded-2xl font-bold"
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
        />
      </div>

      {/* --- LES STEPS (BLOCS) --- */}
      {workout.tag !== "Compétition" && (
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">
            Construction de la séance
          </h4>

          {workout.steps.map((step, index) => (
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
                    onClick={() =>
                      updateStep(index, "highlight", !step.highlight)
                    }
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
                      disabled={index === workout.steps.length - 1}
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
      )}

      <button
        onClick={handleSaveEverything}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-shadow cursor-pointer hover:bg-primary/80 transition-all"
      >
        <FiSave className="png-shadow" />
        {initialData ? "METTRE À JOUR" : "SAUVEGARDER"}
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="w-full py-4  rounded-2xl font-black  shadow-primary/30 flex items-center justify-center gap-2 bg-secondary text-foreground cursor-pointer hover:bg-secondary/80 transition-all"
      >
        ANNULER
      </button>
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
    </div>
  );
}
