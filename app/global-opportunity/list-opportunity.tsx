"use client"

import {
  ArrowRight,
  Award,
  Ban,
  Banknote,
  Building2,
  DollarSign,
  Dot,
  Heart,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MapPin,
  Pin,
  Save,
  Space,
  Trophy,
  X,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailOpportunity } from "./detail-opportunity";
import { GlobalOpportunity } from "./page";

interface ListItem {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  link: string;
}

interface List2Props {
  heading?: string;
  items?: ListItem[];
}

const List2 = ({
  heading = "Our Achievements & Recognition",
  items = [
    {
      icon: <Trophy />,
      title: "Industry Recognition",
      category: "Achievement",
      description: "Outstanding Performance Award.",
      link: "#",
    },
    {
      icon: <Award />,
      title: "Excellence Award",
      category: "Recognition",
      description: "Best in Category Winner.",
      link: "#",
    },
    {
      icon: <Lightbulb />,
      title: "Innovation Prize",
      category: "Technology",
      description: "Breakthrough Solution of the Year.",
      link: "#",
    },
    {
      icon: <HeartHandshake />,
      title: "Customer Success",
      category: "Service",
      description: "Top-Rated Solution Provider.",
      link: "#",
    },
    {
      icon: <Building2 />,
      title: "Global Leadership",
      category: "Management",
      description: "Executive Team of the Year.",
      link: "#",
    },
    {
      icon: <Leaf />,
      title: "Sustainability Impact",
      category: "Environmental",
      description: "Green Initiative Excellence.",
      link: "#",
    },
  ],
}: List2Props) => {
  const [isDetailOpportunityOpen, setIsDetailOpportunityOpen] = useState(false);
  const [globalOpportunity, setGlobalOpportunity] =
    useState<GlobalOpportunity | null>(null);
  return (
    <section className="">
      <div className="container px-0 md:px-8">
        <div className="flex items-center justify-between">
          <div className="text-base font-normal py-3">
            Show 1089 match opportunity
          </div>

          <Select>
            <SelectTrigger className="w-auto h-7">
              <div className="text-foreground/80 text-sm pr-2">Sorty By : </div>
              <SelectValue className="h-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest Opportunity</SelectItem>
                <SelectItem value="most_click">Most Click</SelectItem>
                <SelectItem value="lower_click">Lower Click</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <button
            type="button"
            role="combobox"
            aria-controls="radix-:rde:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 h-7 w-[145px] text-xs [&amp;_svg]:h-4 [&amp;_svg]:w-4"
          >
            <span className="text-muted-foreground">Sort by : </span>
            <span>Default</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-down h-4 w-4 opacity-50"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button> */}
        </div>
        <div className="">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <button className="mb-3 w-full flex flex-col items-start gap-2 rounded-lg border p-3 pl-4 text-left text-sm transition-all hover:bg-accent"
                onClick={() => {
                  setIsDetailOpportunityOpen(true);
                  setGlobalOpportunity(null);
                }}
              
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-top">
                    <div className="items-center gap-2">
                      <div className="flex">
                        <div className="font-semibold">
                          Senior Ruby on Rails Developer
                        </div>
                        <Heart
                          height={17}
                          style={{ marginTop: "2px" }}
                          className="ml-1"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-medium">Google</div>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        We build high tech Technology about future
                      </div>
                    </div>
                    <div className="ml-auto flex">
                      <div></div>
                      {/* <div className="ml-auto text-xs text-muted-foreground pr-5">3 days ago</div> */}
                      {/* <Ban color="red" height={15}/> */}
                      <div className="flex flex-col justify-between">
                        <X height={15} />

                        <div
                          className="ml-auto text-xs text-muted-foreground"
                          style={{
                            marginTop: 70,
                            marginLeft: -40,
                            position: "absolute",
                          }}
                        >
                          3 days ago
                        </div>
                        {/* <Ban color="red" height={15} style={{marginTop: 70, position:'absolute'}}/> */}
                      </div>
                      {/* <div className="">
                        <Save height={17} />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
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
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
      <DetailOpportunity
        open={isDetailOpportunityOpen}
        onOpenChange={setIsDetailOpportunityOpen}
        globalOpportunity={globalOpportunity}
      />
    </section>
  );
};

export { List2 };
