import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
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

  // When user is connected, redirect to home
  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profile").select("*").single();
  const { data: todos } = await supabase.from("todos").select("*");

  return (
    <div>
      <h1>Welcome back, {profile.name}</h1>
      <p>You have {todos?.length}</p>
      <ol className="list-disc text-muted-foreground">
        {todos?.map((item: any, key: any) => (
          <li key={key}>todo.map</li>
        ))}
      </ol>
    </div>
  );
}