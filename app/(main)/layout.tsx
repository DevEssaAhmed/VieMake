
import { createServerClient } from "@supabase/ssr";
import "./../globals.css";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { cookies } from 'next/headers';

export const metadata = {
  title: "Supaboost",
  description: "Where dreams become reality - quick",
};


export default async function HomeLayout({ children }: { children: React.ReactNode }) {
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
  // Get user session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const { data: admin } = await supabase.from('user_info').select('super_admin').eq('id', session?.user.id).single()
  const superAdmin = admin?.super_admin


  return (
    <div className="h-screen">
      <div className="h-full flex-col flex">
        <div className="h-16 border-b">
          <div className="">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-4" admin={superAdmin} />
              <div className="ml-auto flex items-center space-x-4">

                {/* Pass session data to the UserNav */}
                <UserNav session={session} />
              </div>
            </div>
          </div>
          <div className="h-full p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}