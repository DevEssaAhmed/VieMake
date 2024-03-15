"use client";

import { useRouter } from "next/navigation";

export default function Todo({ todo }: { todo: Todo }) {
  const router = useRouter();

  const markAsComplete = async () => {
    await fetch(`/api/todos`, {
      method: "put",
      body: JSON.stringify({ id: todo.id, company_id: todo.company_id }),
    });
    router.refresh();
  };

  return <button onClick={markAsComplete}>{todo.title}</button>;
}