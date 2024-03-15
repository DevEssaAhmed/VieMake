"use client"

// This is the column definition for the invoice table
// In invoice-table, this component is imported

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type Invoice = {
    id: any,
    amount_incl: any,
    amount_excl: any,
    invoice_date: any,
    generate_pdf: any,
}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "invoice_date",
        header: "Invoice Date",
    },
    {
        accessorKey: "amount_excl",
        header: "Price",
    },
    {
        accessorKey: "tax",
        header: "VAT",
    },
    {
        accessorKey: "amount_incl",
        header: "Total",
    },
    {
        accessorKey: "generate_pdf",
        header: "",
        id: "actions",
        cell: ({ row }) => {
            const pdf = row.original

            return <Link href={pdf.generate_pdf} className="hover:underline" target="_blank">Generate PDF</Link>
        }
    },
]