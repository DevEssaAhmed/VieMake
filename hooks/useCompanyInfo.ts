import createSupabaseServerClient from "@/lib/supabase/server";

export const useCompanyInfo = async () => {
  const supabase = await createSupabaseServerClient();

  const { data: companyInfo } = await supabase
    .from("company_info")
    .select("*")
    .single();


  const { data: activeSubscriptions } = await supabase
    .from("company_info")
    .select()
    .eq("status", "active");

  return {
    companyInfo,
    activeSubscriptions,
  };
};
