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
        {/* The login component */}
        {/* <Login /> */}
        <div className="flex justify-center items-center md:h-screen">
          <div className="md:w-96 md:mt-20">
            <AuthForm />
            <p className="mt-8 px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and {" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
