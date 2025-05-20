import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Ban, Building, Dot, Heart, Link2, MapPin } from "lucide-react";
import { GlobalOpportunity } from "./page";

export function DetailOpportunity({
    open,
    onOpenChange,
    globalOpportunity
    }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    globalOpportunity: GlobalOpportunity | null;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent style={{ minWidth: 600 }} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle style={{ lineHeight: "normal" }} className="text-xl">
            Senior Ruby On rails developer 10 years with placement in japan
            ujung kulon
          </SheetTitle>
          <div className="flex align-bottom pt-2">
            <Building height={18} style={{ marginTop: 1 }} />
            <div className="text-normal font-normal text-foreground">
              Google
            </div>
          </div>
          <div className="flex items-center gap-1 pt-2">
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <MapPin height={13} />
              Jakarta
            </div>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              Sydney
            </div>
            <Dot className="m-0" />
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              $100 - $200 USD
            </div>
            <Dot className="m-0" />
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              VueJs
            </div>
            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              ReactJs
            </div>
          </div>
          <div className="flex items-center mt-2">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Link2 height={13} />
                  <a href="https://www.google.com" target="_blank">
                    https://physio.snaphunt.com/job/T8SSTEXNMS
                  </a>
                </div>
              </div>          
          <SheetDescription className="pt-5">
            Air Traffic Control for Warehouses We make software for warehouses
            and logistics teams to save time and money managing docks, gates,
            and yards. With dock, gate, and yard management modules, each module
            can easily be added on or used on its own. This makes Conduit the
            perfect fit for all types of operations. Best of all, if you have
            multiple facilities then Conduit can be configured differently at
            each facility, but provide you with a comprehensive view of your
            entire network. We are proud to be able to help supply chains of all
            sizes optimize their labor, increase throughput, and prepare for the
            work ahead. About the role About Conduit ...
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="mt-5">
          <div className="flex justify-between items-center w-full align-middle">
            <Button type="submit" variant={"ghost"} className="px-2">
              <Ban color="#e55e5e"/>
            </Button>
            <div className="flex align-middle">

            <Button type="submit" variant={"ghost"} className="mr-2">
              <Heart />
            </Button>
              <Button type="submit">Apply</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
