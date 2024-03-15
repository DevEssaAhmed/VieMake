import { getServiceSupabase } from "@/utils/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    // Route to create a new user
    // Send from (main)/settings/users/create-user.tsx

    const { email, password, company_id, email_confirm, new_company, role } = await request.json();

    const supabase = getServiceSupabase();
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        email_confirm,
        password,
        user_metadata: { company_id, new_company, role }
    })
    return NextResponse.json(data);
}