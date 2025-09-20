"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import { useRouter } from 'next/navigation';

const personalDetailsFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name is too long."),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsFormSchema>;

export default function PersonalDetailsForm() {
  const router = useRouter();
  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: PersonalDetailsFormValues) {
    router.push(`/assessment?name=${encodeURIComponent(values.name)}`);
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Sepsis Sentinel</CardTitle>
          <CardDescription>Please enter your name to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Jane Doe" {...field} className="text-base"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Proceed to Assessment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
