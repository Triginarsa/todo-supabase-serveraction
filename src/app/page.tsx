import Header from "@/components/Header";
import Title from "@/components/Title";
import TodosComponents from "@/components/TodosComponents";
import supabase from "@/lib/supabase";

export default async function Home() {
  const { data } = await supabase.from("todos").select("*");

  return (
    <main className="flex items-center justify-center bg-white dark:bg-black ">
      <div className="container flex flex-col min-h-screen w-full">
        <Header />
        <div className="px-6 mt-24">
          <Title />
        </div>
        <TodosComponents todos={data ?? []} />
      </div>
    </main>
  );
}
