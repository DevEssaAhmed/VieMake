import type { Database as DB } from "@/types/supabase";

declare global {
  type Database = DB;
  type Todo = DB["public"]["Tables"]["todos"]["Row"];
  type CompanyInfo = DB['public']['Tables']['company_info']['Row']
  type Company = DB['public']['Tables']['company']['Row']
  type User = DB['public']['Tables']['user']['Row']
  type UserInfo = DB['public']['Tables']['user_info']['Row']
  type UserRoles = DB['public']['Tables']['user_roles']['Row']
  type Content = DB['public']['Tables']['content']['Row']
  type Keyword = DB['public']['Tables']['keyword']['Row']
  type Members = DB['public']['Tables']['members']['Row']
}