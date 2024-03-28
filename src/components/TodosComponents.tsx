"use client";
import { useEffect, useOptimistic, useRef } from "react";
import addTodo from "@/actions/addTodo";
import Button from "./Button";
import { TodoSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Todo = {
  id: number;
  todo: string;
};

type TodosComponentProps = {
  todos: Todo[];
};

export default function TodosComponents({ todos }: TodosComponentProps) {
  const ref = useRef<HTMLFormElement>(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  const [optimisticTodo, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newData: Todo) => {
      return [...state, newData];
    }
  );

  const clientAction = async (formData: FormData) => {
    ref.current?.reset();

    const newTodo = {
      todo: formData.get("todo") as string,
      id: Math.random(),
    };

    const todoResult = TodoSchema.safeParse(newTodo);
    if (!todoResult.success) {
      let errorMessage = "";

      todoResult.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      alert(errorMessage);

      return;
    }

    addOptimisticTodo({
      id: Math.random(),
      todo: todoResult.data.todo,
    });
    const response = await addTodo(todoResult.data);

    if (response?.error) {
      alert("Error adding todo");
    }
  };

  return (
    <>
      <div className="my-4 mx-6 overflow-y-auto max-h-full mt-48 mb-48">
        <ul>
          {optimisticTodo.map((todo) => (
            <li className="w-full grid items-center max-w-md" key={todo.id}>
              <span className="my-1 w-full py-2 px-3 text-start bg-zinc-100 rounded-lg border border-zinc-200 text-zinc-700 text-base font-light">
                {todo.todo}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white dark:bg-black w-full h-full">
        <div className="fixed bottom-0 flex flex-col items-center justify-center w-full h-40 max-w-md p-6 bg-zinc-50 border-t md:border border-zinc-200 rounded-none md:rounded-xl my-0 md:my-4 mx-0 md:mx-6">
          <form ref={ref} action={clientAction} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="todo"
                className="block text-sm font-medium text-zinc-700"
              ></label>
              <div className="mt-1">
                <input
                  id="todo"
                  name="todo"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 text-black"
                  placeholder="What needs to be done?"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
