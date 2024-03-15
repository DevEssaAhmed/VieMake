// functional logic hook

import { createClient } from "@/lib/supabase/client";

export const useSupabase = () => {
  const supabase = createClient();
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { access_token, refresh_token }: any = session;

    await setSession(access_token, refresh_token);

    return session;
  };

  const refreshSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.refreshSession();
    return session;
  };

  const setSession = async (access_token: string, refresh_token: string) => {
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return true;
  };

  return {
    getSession,
    refreshSession,
    setSession,
  };
};
