"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getUsersRoles(userArray: any) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_roles")
    .select("*")
    .in("user_id", [userArray]);
}
