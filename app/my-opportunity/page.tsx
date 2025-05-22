import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DemoPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { data: my_opportunity, error } = await supabase
    .from("my_opportunity")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    // do error message
  }

  return (
    <div className="">
      <h1 className="text-2xl pt-5 mt-3 font-semibold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">
        My Opportunity
      </h1>
      <p className="pt-1 max-w-2xl pb-2 text-base font-light text-foreground sm:text-lg">
        Organize all of you opportunity at one place
      </p>
      <DataTable data={my_opportunity || []} />
    </div>
  );
}
