import { WORKOUT_TAGS } from "@/constants/Workouts/workout";
import { useWorkoutEditor } from "@/customHooks/useWorkoutEditor";
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
import StepList from "./componentsForm/StepList";
import FormHeader from "./componentsForm/FormHeader";
import FormFooter from "./componentsForm/FormFooter";
export default function WorkoutForm({
  initialDate,
  onSubmit,
  onCancel,
  initialData,
}) {
  
  const {
    workout,
    setWorkout, // On en a besoin pour les inputs de titre/tag
    addStep,
    removeStep,
    updateStep,
    moveStep,
  } = useWorkoutEditor(initialData, initialDate);
  const [isTemplateRequested, setIsTemplateRequested] = useState(false);

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
      <FormHeader workout={workout} setWorkout={setWorkout} />

      {/* --- LES STEPS (BLOCS) --- */}
      {workout.tag !== "Compétition" && (
        <StepList
          steps={workout.steps}
          updateStep={updateStep}
          moveStep={moveStep}
          removeStep={removeStep}
          addStep={addStep}
        />
      )}

      {/* 3. LE PIED DE PAGE (Actions & Checkbox) */}
      <FormFooter
        onSave={() => handleSaveEverything(workout, isTemplateRequested)}
        onCancel={onCancel}
        isTemplateRequested={isTemplateRequested}
        setIsTemplateRequested={setIsTemplateRequested}
        isUpdate={!!initialData}
      />

      
    </div>
  );
}
