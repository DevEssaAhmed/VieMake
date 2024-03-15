import { createBrowserClient } from "@supabase/ssr";

export async function resetPassword(data: {
  password: string;
  confirm: string;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const result = await supabase.auth.updateUser({
    password: data.password,
  });

  return JSON.stringify(result);
}
