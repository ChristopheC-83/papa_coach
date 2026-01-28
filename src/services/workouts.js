import { supabase } from "@/lib/supabase";

/**
 * Formate une date JS en string YYYY-MM-DD pour Supabase
 * Évite les décalages de fuseaux horaires du .toISOString()
 */
const formatDateForDB = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return [d.getFullYear(), month, day].join("-");
};

export const workoutService = {
  // 1. Créer une nouvelle séance
  async createWorkout(workoutData) {
    const { data, error } = await supabase
      .from("workouts")
      .insert([
        {
          ...workoutData,
          date: formatDateForDB(workoutData.date),
          steps: workoutData.steps || [], // Tes objets factices vont ici
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 2. Récupérer le programme d'un athlète sur un mois donné
  async getAthleteProgram(athleteId, startDate, endDate) {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("athlete_id", athleteId)
      .gte("date", formatDateForDB(startDate))
      .lte("date", formatDateForDB(endDate))
      .order("date", { ascending: true });

    if (error) throw error;
    return data;
  },

  // 3. Mettre à jour une séance (Modifier le titre, ajouter un step, etc.)
  async updateWorkout(workoutId, updates) {
    const { data, error } = await supabase
      .from("workouts")
      .update({
        ...updates,
        date: updates.date ? formatDateForDB(updates.date) : undefined,
      })
      .eq("id", workoutId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Supprimer une séance
  async deleteWorkout(workoutId) {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workoutId);

    if (error) throw error;
    return true;
  },
};

/**
 * Enregistre le débriefing d'un athlète
 * @param {string} workoutId - L'ID de la séance
 * @param {object} feedbackData - Objet contenant rpe et athlete_feedback
 */
// services/workouts.js

export const submitWorkoutFeedback = async (workoutId, payload) => {
  console.log("🚀 Payload envoyé à Supabase pour l'ID", workoutId, ":", payload);

  const { data, error } = await supabase
    .from("workouts")
    .update({
      rpe: payload.rpe,
      athlete_feedback: payload.athlete_feedback,
      is_completed: payload.is_completed, 
      completed_at: payload.completed_at,
    })
    .eq("id", workoutId)
    .select()
    .single();

  if (error) {
    console.error("❌ Erreur Supabase Feedback:", error.message);
    throw error;
  }
  return data;
};