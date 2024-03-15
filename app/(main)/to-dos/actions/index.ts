"use server";

import readUserSession from "@/lib/lib";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function readId() {
    const {data} = await readUserSession()
    return data.session?.user.id
}

export async function readUser(userId: any) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user_info").select("id, company_id");
}

export async function readCompany(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("user_info")
    .select("company_id")
    .eq("id", userId)
    .single();
}

export async function readTodos() {
  const supabase = await createSupabaseServerClient();
  return await supabase
  .from("todos")
  .select()
  .match({ is_complete: false });
}

export async function createTodo(title: string, user_id: any, company_id: any) {
    const supabase = await createSupabaseServerClient();

    const result = supabase.from("todos").insert({title, user_id, company_id})

    return JSON.stringify(result)
}
