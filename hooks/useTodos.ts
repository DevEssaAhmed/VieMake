import createSupabaseServerClient from "@/lib/supabase/server";

export const useTodos = async() => {
  const supabase = await createSupabaseServerClient();

  const { data: todos } = await supabase.from("todos").select().match({ is_complete: false });
  const { data: inactiveTodos } = await supabase.from("todos").select();

  return {
    todos,
    inactiveTodos,
  };
};
