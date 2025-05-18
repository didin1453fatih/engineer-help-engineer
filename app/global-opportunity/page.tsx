import { createClient } from "@/utils/supabase/server";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { List2 } from "./list-opportunity";
export interface GlobalOpportunity {
    id: number;
    title: string;
    description: string;
    company_name: string;
    source: string;
    locations: string[];
    salary_min: number;
    salary_max: number;
    currency: string;
    salary_cycle: string;
    skills: string[];
  }
export default async function DemosPage() {
  const supabase = await createClient();
  let { data: my_opportunity, error } = await supabase
    .from("my_opportunity")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    // do error message
  }


  return (
    <>
      <div className="row flex">
        <aside className="border-r w-64 bg-background z-10 p-4 overflow-y-auto relative h-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Job title..." />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Job Type</h3>
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Remote"].map(
                  (type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type}>{type}</Label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Experience</h3>
              <div className="space-y-2">
                {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <Checkbox id={level} />
                    <Label htmlFor={level}>{level}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </aside>
        <main className={`pt-1 w-full }`}>
          <div className="">
            <List2 />
          </div>
        </main>
      </div>
    </>
  );
}