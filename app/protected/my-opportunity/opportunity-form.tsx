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
import { format, set } from "date-fns";
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
import React, { useEffect, useState } from "react";
import {
  CalendarIcon,
  ChevronsUpDown,
  Edit,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MyOpportunity } from "./data-table";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  title: z.string().min(2).max(150),
  skills: z.array(z.string()).min(1),
  company_name: z.string().min(2).max(150),
  source: z.string().url(),
  status: z.string().min(2).max(150),
  note: z.string().min(0).max(150).optional(),
  salary_min: z.number().min(0).max(1000000).optional(),
  salary_max: z.number().min(0).max(1000000).optional(),
  salary_cycle: z.string().min(0).max(150).optional(),
  salary_currency: z.string().min(0).max(150).optional(),
  locations: z.array(z.string()).optional(),
  published_at: z.date().optional(),
  submitted_at: z.date().optional(),
  job_description: z.string().min(0).max(150).optional(),
  tags: z.array(z.string()).optional(),
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
      source: opportunity?.source,
      status: opportunity?.status,
      note: opportunity?.note,
      skills: opportunity?.skills,
    },
  });

  useEffect(() => {
    if (isDrawerOpen) {
      form.setValue("title", opportunity?.title || "");
      form.setValue("company_name", opportunity?.company_name || "");
      form.setValue("source", opportunity?.source || "");
      form.setValue("status", opportunity?.status || "interested");
      form.setValue("note", opportunity?.note || "");
      form.setValue("skills", opportunity?.skills || []);
    }
  }, [isDrawerOpen]);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenAI, setIsGenAI] = useState(false);
  const { toast } = useToast();

  const extractDataFromUrl = async (url: string) => {
    setIsGenAI(true);
    fetch(`/api/job-page-summarize?url=${url}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        const data = response.data;
        form.setValue("title", data.title || undefined);
        form.setValue("company_name", data.company_name || undefined);
        form.setValue("skills", data.skills);
        form.setValue("locations", data.locations);
        form.setValue("salary_min", data.salary_min || undefined);
        form.setValue("salary_max", data.salary_max || undefined);
        form.setValue("salary_cycle", data.salary_cycle || undefined);
        form.setValue("salary_currency", data.salary_currency || undefined);
        form.setValue("job_description", data.job_description || undefined);
        form.setValue("published_at", data.published_at);
        form.setValue("submitted_at", data.submitted_at);
        form.setValue("note", data.note || undefined);
        form.setValue("tags", data.tags);
      })
      .catch((error) => {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[420px]"),
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      })
      .finally(() => {
        setIsGenAI(false);
      });
  };

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
            source: values.source,
            status: values.status,
            user_id: user.id,
            note: values.note,
            skills: values.skills,
            salary_min: values.salary_min,
            salary_max: values.salary_max,
            salary_cycle: values.salary_cycle,
            salary_currency: values.salary_currency,
            locations: values.locations || [],
            published_at: values.published_at,
            submitted_at: values.submitted_at,
            job_description: values.job_description,
            tags: values.tags || [],
          },
        ]);
        console.log(data);
        console.log(error);
        // router.refresh();
        if (error) {
          console.log(error);
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[420px]"),
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
          return;
        }
        setIsDrawerOpen(false);
        router.refresh();
      } else if (action == "update" && opportunity?.id) {
        let { data, error } = await supabase
          .from("my_opportunity")
          .update({
            title: values.title,
            company_name: values.company_name,
            source: values.source,
            status: values.status,
            user_id: user.id,
            note: values.note,
            skills: values.skills,
            salary_min: values.salary_min,
            salary_max: values.salary_max,
            salary_cycle: values.salary_cycle,
            salary_currency: values.salary_currency,
            locations: values.locations || [],
            published_at: values.published_at,
            submitted_at: values.submitted_at,
            job_description: values.job_description,
            tags: values.tags || [],
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
      <DrawerContent className="w-full sm:w-[415px] h-screen overflow-y-auto overflow-x-hidden">
        <div className="sm:px-2 py-1">
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
          <div className="pl-4 pr-4 pb-4 pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input
                            onPaste={(e) => {
                              extractDataFromUrl(
                                e.clipboardData.getData("text")
                              );
                              form.setValue(
                                "source",
                                e.clipboardData.getData("text")
                              );
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            placeholder="Source"
                            {...field}
                            disabled={isSubmitting || isGenAI}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="default"
                          className="ml-2"
                          onClick={(evt) => {
                            extractDataFromUrl(field.value);
                            evt.preventDefault();
                            evt.stopPropagation();
                          }}
                        >
                          {isGenAI ? (
                            <>
                              <span className="text-sm">Extracting</span>
                              <Spinner size={"small"} className="ml-2" />
                            </>
                          ) : (
                            <>
                              <span className="text-sm">Extract</span>
                              <Sparkles className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          disabled={isSubmitting || isGenAI}
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
                          disabled={isSubmitting || isGenAI}
                          value={field.value.map((val) => {
                            const existingSkill = skillsList.find(
                              (skill) => skill.value === val
                            );
                            return existingSkill || { value: val, label: val };
                          })}
                          onChange={(options: Option[]) => {
                            field.onChange(
                              options.map((option) => option.value)
                            );
                            console.log(options);
                          }}
                          defaultOptions={skillsList}
                          placeholder="Select / Add skills"
                          creatable={true}
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
                          disabled={isSubmitting || isGenAI}
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
                          disabled={isSubmitting || isGenAI}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interested">
                              Interested <span className="ml-2">🌱</span>
                            </SelectItem>
                            <SelectItem value="preparing">
                              Preparing <span className="ml-2">📚</span>
                            </SelectItem>
                            <SelectItem value="applied">
                              Applied <span className="ml-2">📨</span>
                            </SelectItem>
                            <SelectItem value="interview">
                              Interview <span className="ml-2">💼</span>
                            </SelectItem>
                            <SelectItem value="waiting_result">
                              Waiting Result <span className="ml-2">⏳</span>
                            </SelectItem>
                            <SelectItem value="rejected">
                              Rejected <span className="ml-2">❌</span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Private Tags</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          disabled={isSubmitting || isGenAI}
                          value={field?.value?.map((val) => {
                            const existingSkill = skillsList.find(
                              (skill) => skill.value === val
                            );
                            return existingSkill || { value: val, label: val };
                          })}
                          onChange={(options: Option[]) => {
                            field.onChange(
                              options.map((option) => option.value)
                            );
                          }}
                          defaultOptions={[]}
                          placeholder="Add tags"
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
                          disabled={isSubmitting || isGenAI}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full space-y-2"
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
                              disabled={isSubmitting || isGenAI}
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
                      name="salary_min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Min</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary min"
                              {...field}
                              disabled={isSubmitting || isGenAI}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary_max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Max</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary max"
                              {...field}
                              disabled={isSubmitting || isGenAI}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary_cycle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Cycle</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input salary cycle"
                              {...field}
                              disabled={isSubmitting || isGenAI}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="salary_currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Currency</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Input currency"
                              {...field}
                              disabled={isSubmitting || isGenAI}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Input job description"
                              {...field}
                              disabled={isSubmitting || isGenAI}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="published_at"
                      render={({ field }) => (
                        <FormItem className="flex flex-col pt-1">
                          <FormLabel>Published Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isSubmitting || isGenAI}
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Published date of the job posting
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="submitted_at"
                      render={({ field }) => (
                        <FormItem className="flex flex-col pt-1">
                          <FormLabel>Submitted Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isSubmitting || isGenAI}
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "dd/MM/yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Submitted cv or application date
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex gap-4 pt-3 pb-10">
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
