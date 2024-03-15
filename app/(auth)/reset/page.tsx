
import { createBrowserClient } from "@supabase/ssr";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Supaboost - Authentication",
  description: "Log in or sign up to Supaboost and enjoy a lifetime Template",
};

export default async function Unauthenticated() {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // When user is connected, redirect to home
  if (session) {
    redirect("/");
  }

  return ;
}






