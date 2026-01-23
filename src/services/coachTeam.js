
import { supabase } from "@/lib/supabase";

// 1. Récupérer toute la meute (Pending + Active)
export const getMyAthletes = async (coachId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, bio, email, link_status")
    .eq("coach_id", coachId)
    .order("username", { ascending: true });

  if (error) throw error;
  return data;
};

// 2. Voir un athlète spécifique
export const getAthleteById = async (athleteId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, bio, email, link_status")
    .eq("id", athleteId)
    .single();

  if (error) throw error;
  return data;
};

// 3. Accepter l'athlète (Passe en mode collaboration active)
export const acceptAthlete = async (athleteId) => {
  const { error } = await supabase
    .from("profiles")
    .update({ link_status: "active" })
    .eq("id", athleteId);
  if (error) throw error;
};

// 4. Refuser ou Retirer un athlète (Même combat : on reset)
// Pourquoi ? Pour que l'athlète puisse retenter sa chance ailleurs ou avec le bon code.
export const removeAthleteFromTeam = async (athleteId) => {
    console.log("remove?");
    console.log(athleteId);
  const { error } = await supabase
    .from("profiles")
    .update({
      coach_id: null,
      link_status: null,
    })
    .eq("id", athleteId);

  if (error) throw error;
};
