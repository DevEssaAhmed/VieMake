import readUserSession from "@/lib/lib";
import createSupabaseServerClient from "@/lib/supabase/server";

export const useUserRoles = async() => {
  const supabase = await createSupabaseServerClient();
  const { data } = await readUserSession()
  const id = data.session?.user.id || ''

  const { data: userRole } = await supabase.from('user_roles').select('*').eq('user_id', id).single();


  return {
    userRole,
  };
};
