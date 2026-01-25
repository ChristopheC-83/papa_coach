import { supabase } from "@/lib/supabase";



/**
 * Met à jour les données du profil dans Supabase, fonction de MAJ universelle
 * @param {string} userId - L'ID de l'utilisateur
 * @param {Object} updates - Un objet contenant les champs (ex: { username: "...", favorite_sports: [] })
 */
export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates) 
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}