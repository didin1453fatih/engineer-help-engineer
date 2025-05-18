"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { List2 } from "./list2";
import React, { useEffect, useState } from "react";
import { DetailOpportunity } from "./detail-opportunity";

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
  loved: boolean;
}

export function DemoPage() {
   


  return (
    <>
      <div className="row flex">
        <aside className="border-r w-64 bg-background z-10 p-4 overflow-y-auto relative h-auto">
          {/* <aside className="fixed border-r top-16 h-[calc(100vh-8rem)] w-64  bg-background z-10 p-4 overflow-y-auto"> */}
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

        {/* <main className="ml-64 pt-1 w-full"> */}
        <main className={`pt-1 w-full }`}>
          <div className="">
            <List2 />
          </div>
        </main>
      </div>
      
      {/* <DetailOpportunity
      action="new"
      isDrawerOpen={true}
      opportunity={null}
      setIsDrawerOpen={setIsDrawerOpen}      
      /> */}
    </>
  );
}
