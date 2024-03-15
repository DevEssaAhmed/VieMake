import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // When user is connected, redirect to home
  if (!session) {
    redirect("/login");
  }

  return ;
}






