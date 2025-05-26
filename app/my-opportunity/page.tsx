import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/server";
import { Github } from "lucide-react";
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

  return (
    <div className="">
      <h1 className="text-2xl pt-5 mt-3 font-semibold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">
        My Opportunity
      </h1>
      <p className="pt-1 max-w-2xl pb-2 text-base font-light text-foreground sm:text-lg">
        Organize all of your opportunities in one place
        <br />
        <a
          href="https://github.com/didin1453fatih/engineer-help-engineer/issues"
          target="_blank"
        >
          <span className="text-muted-foreground text-sm flex">
            You can leave any feedback at this GitHub link
            <Github size={19} className="ml-2" />
          </span>
        </a>
      </p>
      <DataTable data={my_opportunity || []} />
    </div>
  );
}
