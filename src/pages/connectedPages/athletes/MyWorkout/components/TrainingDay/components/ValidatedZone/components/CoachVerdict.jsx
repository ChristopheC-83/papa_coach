import { workoutService } from "@/services/workouts";
import React, { useEffect, useState } from "react";
import { FiZap, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";

export default function CoachVerdict({ workout, onUpdate }) {
  // On initialise avec les valeurs existantes ou des valeurs par défaut
  console.log("workout",workout.load_score);
  const [duration, setDuration] = useState(
    workout.duration_actual || workout.duration_planned || 0,
  );
  const [comment, setComment] = useState(workout.coach_comment || "");
  const [isSaving, setIsSaving] = useState(false);

  const loadScore = duration * (workout.rpe || 0);
  const isAlreadyValidated = !!workout.load_score;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Appel API pour sauvegarder
      await workoutService.validateWorkout(workout.id, {
        duration_actual: duration,
        coach_comment: comment,
        load_score: loadScore,
      });

      // 2. C'est ici qu'on appelle la fonction passée par le parent !
      if (onUpdate) {
        await onUpdate();
      }

      toast.success("Verdict signé !");
    } catch (error) {
      toast.error("Erreur de sauvegarde");
      console.error("Details:", error.message);
    } finally {
      setIsSaving(false);
    }
    };
    
    useEffect(() => {
      // On force la mise à jour des champs dès que l'objet workout change
      if (workout) {
        setDuration(workout.duration_actual || workout.duration_planned || 0);
        setComment(workout.coach_comment || "");
      }
    }, [workout]);

  return (
    <div className="bg-zinc-900/40 backdrop-blur-xl border-2 border-primary/20 rounded-[40px] p-8 shadow-2xl space-y-6 mt-4 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Style "Expert" */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-black shadow-[0_0_20px_rgba(var(--primary),0.4)]">
            <FiZap className="text-xl" />
          </div>
          <h3 className="text-lg font-black uppercase italic tracking-tighter">
            Coach Space
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">
            Charge Calculée
          </p>
          <p className="text-2xl font-black italic text-white">{loadScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Input Durée */}
        <div className="group">
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-4 mb-1 block group-focus-within:text-primary transition-colors">
            Temps effectif d'effort (minutes)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xl font-black italic focus:border-primary/50 focus:outline-none transition-all"
          />
        </div>

        {/* Input Commentaire */}
        <div className="group">
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-4 mb-1 block group-focus-within:text-primary transition-colors">
            Analyse technique & Feedback
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Analyse la séance ici..."
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm min-h-30 focus:border-primary/50 focus:outline-none transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group relative w-full py-5 bg-white text-black rounded-[24px] font-black uppercase italic tracking-widest hover:bg-primary hover:text-white transition-all overflow-hidden active:scale-95 disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSaving
              ? "Synchronisation..."
              : isAlreadyValidated
                ? "Mettre à jour le Verdict"
                : "Signer le Verdict"}
            <FiCheckCircle className="text-xl" />
          </span>
        </button>
      </div>
    </div>
  );
}
