import Header from "@/components/Header";
import TodosComponents from "@/components/TodosComponents";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase.from("todos").select("*");

  return (
    <main className="flex items-center justify-center">
      <div className="container flex flex-col min-h-screen w-full">
        <Header />
        <TodosComponents todos={data ?? []} />
      </div>
    </main>
  );
}
