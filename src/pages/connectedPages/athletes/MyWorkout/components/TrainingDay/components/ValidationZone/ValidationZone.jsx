import React, { useState } from "react";
import { submitWorkoutFeedback } from "@/services/workouts";
import { toast } from "sonner";
import FeedbackWizard from "./components/FeedbackWizard/FeedbackWizard";
import ValidationButtons from "./components/ValidationButtons";
import FeedBackSkipped from "./components/FeedBackSkipped";

export default function ValidationZone({ workoutId, onRefresh }) {
  const [view, setView] = useState("choice"); // 'choice', 'done', 'skipped'
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("workoutId", workoutId);

  async function handleDoneSubmit(formData, status) {
    // On enlève le = "done"
    if (!workoutId) return;

    try {
      setIsSubmitting(true);

      // LOG DE CONTRÔLE : Ouvre ta console F12 pour vérifier ça
      console.log("Statut reçu par la fonction :", status);

      const isCompleted = status === "done";

      const payload = {
        // ICI : Si status est "skipped", is_completed SERA false.
        is_completed: isCompleted,

        // On s'assure que le RPE est null si on skip
        rpe: isCompleted ? formData.rpe || null : null,

        athlete_feedback: {
          status: status, // "done" ou "skipped"
          ...formData,
        },
        completed_at: new Date().toISOString(),
      };

      console.log("Payload envoyé à Supabase :", payload);

      await submitWorkoutFeedback(workoutId, payload);

      if (typeof onRefresh === "function") onRefresh();

      setView("choice");
      toast.success(
        isCompleted ? "Séance validée !" : "Séance enregistrée comme non faite",
      );
    } catch (err) {
      console.error("Erreur envoi:", err);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return (
      <div className="p-10 text-center bg-card rounded-3xl border-2 border-primary/20">
        <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-3xl mx-auto mb-4"></div>
        <p className="text-xs font-black uppercase italic tracking-widest animate-pulse">
          Transmission au coach...
        </p>
      </div>
    );
  }

  // Les deux boutons
  if (view === "choice") {
    return (
      <ValidationButtons setView={setView} />
    );
  }

  // 2. VUE FORMULAIRE (Wizard ou Skipped)
  return (
    <div className="bg-card border-2 border-primary/10 rounded-3xl p-6 shadow-xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black italic uppercase text-xs tracking-widest text-primary">
          {view === "done" ? "Débriefing Séance" : "Séance non réalisée"}
        </h3>
        <button
          onClick={() => setView("choice")}
          className="text-[10px] font-bold uppercase text-muted-foreground hover:underline"
        >
          Retour
        </button>
      </div>

      {view === "done" ? (
        // FORMULAIRE  POUR "DONE"
        <FeedbackWizard
          onSubmit={(data) => handleDoneSubmit(data, "done")}
          onCancel={() => setView("choice")}
        />
      ) : (
        // FORMULAIRE POUR "SKIPPED"
        <FeedBackSkipped handleDoneSubmit={handleDoneSubmit} />
      )}
    </div>
  );
}
