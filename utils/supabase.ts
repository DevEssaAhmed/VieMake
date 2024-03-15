import { createClient } from '@supabase/supabase-js';

// Default client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { persistSession: false }
);

// Service key client !!! Overwrites all RLS, do not use this in the client
export const getServiceSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { persistSession: false }
  );
