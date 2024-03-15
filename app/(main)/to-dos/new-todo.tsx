"use client"

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';


export default function NewTodo({
  session,
  company,
}: {
  session: any;
  company: any;
}) {
  const [input, setInput] = React.useState('')
  const router = useRouter()


  const addTodo = async () => {
    await fetch(`/api/new-todo`, {
      method: "put",
      body: JSON.stringify({ title: input, user_id: session.user.id, company_id: company }),
    });
    setInput('')
    router.refresh()
  };

  return (
      <form action={addTodo} className="flex gap-x-4 pt-2">
         <Input
        name="title"
        placeholder="Add a todo..."
        className="max-w-sm w-1/2 md:w-full"
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        required
      />
        <Button className="w-24" type="submit">
          Upload
        </Button>
      </form>
  );
}
