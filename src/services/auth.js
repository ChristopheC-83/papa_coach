import { supabase } from "@/lib/supabase";



export const signUpUser = async ({ email, password, name, role, invitation_code }) => {
  // console.log(email, password, name, role, invitation_code);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: name, // Ces infos seront lues par le Trigger SQL !
        role: role,
        invitation_code: invitation_code || null, // <-- On l'envoie ici !
      },
    },
  });

  if (error) throw error;
  return data;
};
