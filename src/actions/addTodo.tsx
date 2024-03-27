"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js"; // Import the function
import { TodoSchema } from "@/lib/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
export default async function addTodo(newTodo: unknown) {
  "use server";

  const todoResult = TodoSchema.safeParse(newTodo);
  if (!todoResult.success) {
    let errorMessage = "";

    todoResult.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }

  try {
    await supabase.from("todos").insert({
      todo: todoResult.data.todo,
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Error adding todo", e);
    return {
      error: e,
    };
  }

  revalidatePath("/");
}
