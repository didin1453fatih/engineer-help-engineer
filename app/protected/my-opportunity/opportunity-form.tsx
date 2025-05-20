"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { ChevronsUpDown, Edit, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MyOpportunity } from "./data-table";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const formSchema = z.object({
  title: z.string().min(2).max(150),
  skills: z.array(z.string()).min(1),
  company_name: z.string().min(2).max(150),
  link: z.string().min(2).max(150),
  status: z.string().min(2).max(150),
  note: z.string().min(0).max(150),
});

export function OpportunityForm({
  action,
  opportunity,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  action: "new" | "update";
  isDrawerOpen: false | true;
  opportunity: MyOpportunity | null;
  setIsDrawerOpen: (newValue: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: opportunity?.title,
      company_name: opportunity?.company_name,
      link: opportunity?.link,
      status: opportunity?.status,
      note: opportunity?.note,
      skills: opportunity?.skills,
    },
  });

  useEffect(() => {
    if (isDrawerOpen) {
      form.setValue("title", opportunity?.title || "");
      form.setValue("company_name", opportunity?.company_name || "");
      form.setValue("link", opportunity?.link || "");
      form.setValue("status", opportunity?.status || "interested");
      form.setValue("note", opportunity?.note || "");
      form.setValue("skills", opportunity?.skills || []);
    }
  }, [isDrawerOpen]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      if (action == "new") {
        let { data, error } = await supabase.from("my_opportunity").insert([
          {
            title: values.title,
            company_name: values.company_name,
            link: values.link,
            status: values.status,
            user_id: user.id,
            note: values.note,
            skills: values.skills,
          },
        ]);
        router.refresh();
      } else if (action == "update" && opportunity?.id) {
        let { data, error } = await supabase
          .from("my_opportunity")
          .update({
            title: values.title,
            company_name: values.company_name,
            link: values.link,
            status: values.status,
            note: values.note,
            skills: values.skills,
          })
          .eq("id", opportunity.id)
          .select();
        console.log(data);
        console.log(error);
        router.refresh();
      }
      console.log(values);
    } finally {
      setIsSubmitting(false);
      setIsDrawerOpen(false);
    }
  }

  const skillsList = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "ember", label: "Ember" },
  ];

  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerContent>
        <div className="mx-auto w-full  w-[500px] px-2 py-1 overflow-y-auto scroll-smooth">
          <DrawerHeader>
            <DrawerTitle>
              🚀{" "}
              <span className="ml-2">
                {action == "update" ? "Update" : "New"} Opportunity
              </span>
            </DrawerTitle>
            <DrawerDescription>
              Save new opportunity in one place
            </DrawerDescription>
          </DrawerHeader>
          <div className="pl-4 pr-4 pb-4 pb-0 w-[400px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Job Title"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={skillsList.filter((skill) =>
                            field.value.includes(skill.value)
                          )}
                          onChange={(options: Option[]) => {
                            field.onChange(
                              options.map((option) => option.value)
                            );
                          }}
                          defaultOptions={skillsList}
                          placeholder="Select skills"
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company name"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Url link to job source"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interested">
                              Interested
                            </SelectItem>
                            <SelectItem value="preparing">Preparing</SelectItem>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="waiting_result">
                              Waiting Result
                            </SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Private Tags</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={skillsList.filter((skill) =>
                            field.value.includes(skill.value)
                          )}
                          onChange={(options: Option[]) => {
                            field.onChange(
                              options.map((option) => option.value)
                            );
                          }}
                          defaultOptions={skillsList}
                          placeholder="Select skills"
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Private Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Input some note"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-[350px] space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 px-2 pt-3 pb-3">
                    <h4 className="text-sm font-semibold">
                      Additional Columns
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Locations</FormLabel>
                          <FormControl>
                            <MultipleSelector
                              value={skillsList.filter((skill) =>
                                field.value.includes(skill.value)
                              )}
                              onChange={(options: Option[]) => {
                                field.onChange(
                                  options.map((option) => option.value)
                                );
                              }}
                              defaultOptions={skillsList}
                              placeholder="Select skills"
                              creatable
                              emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                  no results found.
                                </p>
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Min</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary min"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Max</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary max"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Cycle</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary cycle"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Currency</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input currency"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Input job description"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Published At</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input published at"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex gap-4 pt-3 pb-5">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  <DrawerClose asChild>
                    <Button variant="outline" disabled={isSubmitting}>
                      Close
                    </Button>
                  </DrawerClose>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
