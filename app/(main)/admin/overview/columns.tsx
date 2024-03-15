"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Definition = {
  id: string
  name: string
  status: string | null
  variant_id: string | null
  users: number | null
}

export const columns: ColumnDef<Definition>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "variant_id",
    header: "Variant",
  },
  {
    accessorKey: "user_count",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Active Users
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
]
