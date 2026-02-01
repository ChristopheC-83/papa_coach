// services/workoutTemplates.js
import { supabase } from "@/lib/supabase";

export const templateService = {
  // Récupérer les modèles du coach connecté
  async getMyTemplates() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("workout_templates")
      .select("*")
      .eq("coach_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur templates:", error);
      return [];
    }
    return data;
  },

  // Sauvegarder (Créer ou Modifier)
  async save(templateData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const payload = {
      ...templateData,
      coach_id: user.id,
    };

    const { data, error } = await supabase
      .from("workout_templates")
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  //  Supprimer
  async delete(templateId) {
    // 1. On récupère l'ID du coach qui fait la demande
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Non autorisé");

    // 2. On supprime l'élément UNIQUEMENT s'il correspond à l'ID et au Coach
    const { error } = await supabase
      .from("workout_templates")
      .delete()
      .eq("id", templateId)
      .eq("coach_id", user.id); // <--- La sécurité supplémentaire

    if (error) throw error;
    return true;
  },
};
