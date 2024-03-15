import createSupabaseServerClient from "@/lib/supabase/server";

export const useMembers = async() => {
  const supabase = await createSupabaseServerClient();

  const { data: activeMembers } = await supabase
    .from("members")
    .select()
    .eq("is_active", true);

  return {
    activeMembers,
  };
};
