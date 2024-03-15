import { getServiceSupabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    // Route to delete a new user
    // Send from (main)/settings/users/delete-user.tsx
    const { user_id } = await request.json();

    // Does not use cookies, but uses ./utils/supabase, to overwrite all RLS
    const supabase = getServiceSupabase();
    const { data, error } = await supabase.auth.admin.deleteUser(
        user_id,
    )
    return NextResponse.json(data);
}