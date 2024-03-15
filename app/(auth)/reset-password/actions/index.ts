"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function resetPassword(data: {
  email: string;
}) {

  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: 'https://demo-v1.supaboost.dev/reset',  
  });

  return JSON.stringify(result);
}
