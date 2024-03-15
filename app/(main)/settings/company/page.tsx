import { redirect } from "next/navigation";
import CompanyForm from "./company-form";
import readUserSession from "@/lib/lib";
import { useCompany } from "@/hooks/useCompany";

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  const { company } = await useCompany()

  return (
    <>
      <h3 className="text-xl font-bold tracking-tight mb-2">Company</h3>
      <CompanyForm company={company} />
    </>
  );
}
