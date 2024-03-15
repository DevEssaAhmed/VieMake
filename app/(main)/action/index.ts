"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function readCompanyId(userId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user_info").select("*").eq("id", userId).single();
}

export async function getAdminRole(userId: any) {
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("user_info")
    .select("super_admin")
    .eq("id", userId)
    .single();
}

export async function readCompanyInfo(companyId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("company_info")
    .select()
    .eq("company_id", companyId)
    .single();
}

export async function readUsers() {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("user_info").select().eq("is_active", true);
}

export async function readContent(companyInfo: string) {
  let today = new Date();
  const year = today.getFullYear();
  const monthNow = today.getMonth();

  function getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[today.getMonth()];
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("content")
    .select()
    .eq("company_id", companyInfo)
    .gte("created_at", `${year}-${monthNow + 1}-01T00:00:00.000Z`) // Start of the current month
    .lte(
      "created_at",
      `${year}-${monthNow + 1}-${getLastDayOfMonth(
        year,
        monthNow
      )}T23:59:59.999Z`
    );
}
