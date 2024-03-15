export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company: {
        Row: {
          coc: string | null
          country: string | null
          id: string
          logo: string | null
          name: string
          updated_at: string
          vat: string | null
        }
        Insert: {
          coc?: string | null
          country?: string | null
          id: string
          logo?: string | null
          name?: string
          updated_at?: string
          vat?: string | null
        }
        Update: {
          coc?: string | null
          country?: string | null
          id?: string
          logo?: string | null
          name?: string
          updated_at?: string
          vat?: string | null
        }
        Relationships: []
      }
      company_info: {
        Row: {
          company_id: string | null
          customer_id: string
          ends_at: string | null
          id: string
          product_id: number | null
          renews_at: string | null
          status: string | null
          subscription_id: string | null
          update_payment_method: string | null
          variant_id: number | null
        }
        Insert: {
          company_id?: string | null
          customer_id?: string
          ends_at?: string | null
          id?: string
          product_id?: number | null
          renews_at?: string | null
          status?: string | null
          subscription_id?: string | null
          update_payment_method?: string | null
          variant_id?: number | null
        }
        Update: {
          company_id?: string | null
          customer_id?: string
          ends_at?: string | null
          id?: string
          product_id?: number | null
          renews_at?: string | null
          status?: string | null
          subscription_id?: string | null
          update_payment_method?: string | null
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_info_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "company"
            referencedColumns: ["id"]
          }
        ]
      }
      members: {
        Row: {
          company_id: string | null
          id: number
          is_active: boolean
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          id?: number
          is_active?: boolean
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          id?: number
          is_active?: boolean
          user_id?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          is_complete: boolean
          title: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          is_complete?: boolean
          title?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          is_complete?: boolean
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          id: string
          last_name: string | null
          name: string | null
          updated_at: string
        }
        Insert: {
          id: string
          last_name?: string | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          last_name?: string | null
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_info: {
        Row: {
          company_id: string
          email: string
          id: string
          is_active: boolean
          new_company: boolean | null
          super_admin: boolean
        }
        Insert: {
          company_id: string
          email: string
          id: string
          is_active?: boolean
          new_company?: boolean | null
          super_admin?: boolean
        }
        Update: {
          company_id?: string
          email?: string
          id?: string
          is_active?: boolean
          new_company?: boolean | null
          super_admin?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          company_id: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
