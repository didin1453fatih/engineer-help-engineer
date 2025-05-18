import { createClient } from "@/utils/supabase/server";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { List2 } from "./list2";
import { useEffect, useState } from "react";
import {DemoPage} from "./main";

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
     <DemoPage/>
    </>
  );
}

// export default function Layout() {
//   return (
//     <div className="min-h-screen">
//       {/* Static Sidebar */}
//       <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background z-10 p-4 overflow-y-auto">
//         <div className="space-y-8">
//           {/* Search Filter */}
//           <div className="space-y-2">
//             <Label htmlFor="search">Search</Label>
//             <Input id="search" placeholder="Job title..." />
//           </div>

//           {/* Job Type Filter */}
//           <div className="space-y-2">
//             <h3 className="font-medium">Job Type</h3>
//             <div className="space-y-2">
//               {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
//                 <div key={type} className="flex items-center gap-2">
//                   <Checkbox id={type} />
//                   <Label htmlFor={type}>{type}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Experience Level Filter */}
//           <div className="space-y-2">
//             <h3 className="font-medium">Experience</h3>
//             <div className="space-y-2">
//               {['Entry', 'Mid', 'Senior', 'Lead'].map((level) => (
//                 <div key={level} className="flex items-center gap-2">
//                   <Checkbox id={level} />
//                   <Label htmlFor={level}>{level}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Button className="w-full">Apply Filters</Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 pt-16 p-8">
//         <div className="container">
//           {/* Your job listings content */}
//           <h2>Job Listings</h2>
//           {/* Job cards go here */}
//         </div>
//       </main>
//     </div>
//   )
// }
