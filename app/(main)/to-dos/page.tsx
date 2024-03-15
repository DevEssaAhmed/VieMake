import { useTodos } from "@/hooks/useTodos";
import readUserSession from "@/lib/lib";
import { redirect } from "next/navigation";
import { Separator } from "../separator";
import NewTodo from "./new-todo";
import ToDoTable from "./to-do-table";
import { useCompany } from "@/hooks/useCompany";

export const metadata = {
  title: "Supaboost - Home",
  description: `Supaboost - Where ideas become reality -- "quick"`,
};

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  const { todos } = await useTodos();
  const { company } = await useCompany();

  return (
    <>
      <div className="space-y-2 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">To-do</h2>
          <p className="text-muted-foreground">
            Check what is on the list of to-dos.
          </p>
        </div>
        <Separator />
        <NewTodo session={data.session} company={company?.id} />
        <div className="">
          <ToDoTable data={todos} />
        </div>
      </div>
    </>
  );
}
