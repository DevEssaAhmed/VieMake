import createSupabaseServerClient from "@/lib/supabase/server";

export const useCompany = async () => {
  const supabase = await createSupabaseServerClient();

  const { data: company } = await supabase.from("company").select().single();

  return {
    company,
  };
};
