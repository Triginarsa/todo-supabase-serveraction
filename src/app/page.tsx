import TodosComponents from "@/components/TodosComponents";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase.from("todos").select("*");

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 my-4">
        🚀 Server Actions Demo 🚀
      </h2>
      <TodosComponents todos={data ?? []} />
    </main>
  );
}
