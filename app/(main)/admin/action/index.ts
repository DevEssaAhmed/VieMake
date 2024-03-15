"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getUserRoles(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();
}

export async function getUsers() {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("members").select().eq("is_active", true);
}

export async function getCompanyInfo() {
  const supabase = await createSupabaseServerClient();
  return await supabase
  .from("company_info")
  .select()
  .eq("status", "active");

}
