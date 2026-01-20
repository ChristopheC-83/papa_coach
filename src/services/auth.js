import { supabase } from "@/lib/supabase";

export const signUpUser = async ({ email, password, name, role }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: name, // Ces infos seront lues par le Trigger SQL !
        role: role,
      },
    },
  });

  if (error) throw error;
  return data;
};
