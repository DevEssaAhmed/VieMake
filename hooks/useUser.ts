import readUserSession from "@/lib/lib";
import createSupabaseServerClient from "@/lib/supabase/server";

export const useUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await readUserSession()
  const id = data.session?.user.id || ''

  const { data: user } = await supabase.from("user").select("*").eq('id', id).single();

  return {
    user,
  };
};
