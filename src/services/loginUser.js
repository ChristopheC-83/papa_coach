import { supabase } from "@/lib/supabase";

// src/services/auth.js
export async function LoginUser({ email, password }) {
  // 1. Connexion Auth
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) throw authError;

  // 2. Récupération du profil (username, role) dans la table publique
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (profileError) throw profileError;

  // On retourne un objet complet pour le Store
  return {
    ...authData.user,
    ...profileData,
  };
}
