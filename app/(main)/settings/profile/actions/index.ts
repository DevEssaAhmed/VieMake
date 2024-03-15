"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getUser(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user").select("*").eq("id", userId).single();
}

export async function getUserInfo(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_info")
    .select("*")
    .eq("id", userId)
    .single();
}
