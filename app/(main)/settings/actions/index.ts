"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getUserRole(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from('user_roles').select('role').eq('user_id', userId).single()
}