import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ToDoTable({ data }: { data: any }) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
