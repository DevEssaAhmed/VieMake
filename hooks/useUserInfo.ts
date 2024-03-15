import readUserSession from "@/lib/lib";
import createSupabaseServerClient from "@/lib/supabase/server";

export const useUserInfo = async() => {
  const supabase = await createSupabaseServerClient();
  const { data } = await readUserSession()
  const id = data.session?.user.id || ''

  const { data: userInfo } = await supabase.from("user_info").select().eq('id', id).single();
  const { data: activeUsers } = await supabase.from("user_info").select().eq("is_active", true);
  const { data: activeUsersCompany } = await supabase.from("user_info").select().match({ company_id: userInfo?.company_id, is_active: true });



  return {
    userInfo,
    activeUsers,
    activeUsersCompany
  };
};
