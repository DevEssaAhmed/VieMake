"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getCompanyId(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_info")
    .select("company_id")
    .eq("id", userId)
    .single();
}

export async function getCompany(companyId: any) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("company").select().eq("id", companyId).single();
}

export async function getUsers(companyId: any) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_info")
    .select()
    .match({ company_id: companyId, is_active: true });
}

export async function getUserRole(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .single();
}

export async function getUsersRoles(userArray: any) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_roles")
    .select("*")
    .in("user_id", [userArray]);
}
