import { supabase } from "@/lib/supabase";

/**
 * Récupère les infos publiques du coach (pour l'athlète)
 */
export const getCoachById = async (coachId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", coachId)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Envoie une demande de liaison au coach (Statut: pending)
 */
export const linkCoachByCode = async (athleteId, inviteCode) => {
  // 1. Trouver le coach par son code
  const { data: coach, error: findError } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("invitation_code", inviteCode.toUpperCase().trim())
    .eq("role", "coach")
    .single();

  if (findError || !coach)
    throw new Error("Code invalide ou coach introuvable.");

  // 2. Mettre à jour l'athlète : on lie l'ID et on passe en attente
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      coach_id: coach.id,
      link_status: "pending", // L'athlète attend la validation
    })
    .eq("id", athleteId);

  if (updateError) throw updateError;
  return coach;
};

/**
 * Rompt le lien définitivement (Coach ou Athlète)
 */
export const unlinkCoach = async (athleteId) => {
  const { error } = await supabase
    .from("profiles")
    .update({
      coach_id: null,
      link_status: null, // On nettoie tout pour permettre une nouvelle liaison plus tard
    })
    .eq("id", athleteId);

  if (error) throw error;
};

//  MAJ du status

export const getUserLinkStatus = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("coach_id, link_status")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};
