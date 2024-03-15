"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getCompanyName(companyId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("company")
    .select()
    .match({ id: companyId })
    .single();
}

export async function getCompany(companyId: string) {
  const supabase = await createSupabaseServerClient();
  return await await supabase
  .from("company")
  .select()
  .eq("id", companyId)
  .single();
}