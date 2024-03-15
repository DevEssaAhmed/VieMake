import React from "react";
import { AuthForm } from "./components/AuthForm";
import readUserSession from "@/lib/lib";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Supaboost - Authentication",
  description: "Log in or sign up to Supaboost and enjoy a lifetime Template",
};

export default async function Page() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <section className="flex m-auto">
      <div className="md:h-screen flex">
        <div className="m-auto">
          <div className="flex justify-center items-center md:h-screen">
            <div className="md:w-96 w-72">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
