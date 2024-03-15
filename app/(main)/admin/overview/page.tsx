
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createServerClient } from "@supabase/ssr";

export const metadata: Metadata = {
  title: "Supaboost - Admin",
  description: "Check the current status of your SaaS.",
};

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: company } = await supabase.from("company").select();
  const { data: company_info } = await supabase.from("company_info").select();
  const { data: users } = await supabase.from('members').select().eq('is_active', true)

  const userCounts: any = {};

  // Iterate through the users data and count users for each company
  users?.forEach((user) => {
    const companyId: any = user.company_id;
    if (!userCounts[companyId]) {
      userCounts[companyId] = 1;
    } else {
      userCounts[companyId]++;
    }
  });

  const data: any = company?.map((companyItem) => {
    const matchingCompanyInfo = company_info?.find((infoItem) => infoItem.company_id === companyItem.id);

    // Create a new object with selected fields and user count
    if (matchingCompanyInfo) {
      return {
        id: companyItem.id,
        name: companyItem.name,
        status: matchingCompanyInfo.status,
        variant_id: matchingCompanyInfo.variant_id,
        user_count: userCounts[companyItem.id] || 0, // Set user count to 0 if not found
      };
    }

    return null;
  }).filter(Boolean); // Filter out null entries

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
