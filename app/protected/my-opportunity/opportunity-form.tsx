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
import { Edit, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MyOpportunity } from "./data-table";

const formSchema = z.object({
  title: z.string().min(2).max(150),
  company_name: z.string().min(2).max(150),
  link: z.string().min(2).max(150),
  status: z.string().min(2).max(150),
  note: z.string().min(0).max(150),
});

export function OpportunityForm({
  action,
  data,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  action: "new" | "update";
  isDrawerOpen: false | true;
  data: MyOpportunity | null;
  setIsDrawerOpen: (newValue: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title,
      company_name: data?.company_name,
      link: data?.link,
      status: data?.status,
      note: data?.note,
    },
  });

  useEffect(() => {
    if (isDrawerOpen) {
      form.setValue("title", data?.title || "");
      form.setValue("company_name", data?.company_name || "");
      form.setValue("link", data?.link || "");
      form.setValue("status", data?.status || "interested");
      form.setValue("note", data?.note || "");
    }
  }, [isDrawerOpen]);
  const router = useRouter();

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
          },
        ]);
        console.log("Submited new");
        router.refresh();
      } else {
      }
      console.log(values);
    } finally {
      setIsSubmitting(false);
      setIsDrawerOpen(false);
    }
  }

  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerContent>
        <div className="mx-auto w-full  w-[500px] px-2 py-1">
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
          <div className="p-4 pb-0 w-[400px]">
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
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
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

                <div className="flex gap-4">
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
