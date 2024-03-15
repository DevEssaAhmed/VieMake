import { redirect } from "next/navigation";
import { Metadata } from "next"
import readUserSession from "@/lib/lib";

export const metadata: Metadata = {
  title: "Supaboost - Settings",
  description: "Advanced starter template for a headstart in Supabase development.",
}

export default async function Home() {
  const { data } = await readUserSession()

  if (!data.session) {
    redirect("/login");
  }

  return <></>
}