"use client";

import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";

// More information on form and form validation: https://ui.shadcn.com/docs/components/form

// The schema for the Form
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    })
    .optional(),
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, {
      message: "Email must not be longer than 30 characters.",
    })
    .email()
    .optional(),
});

// Create a type based on the schema provided above
type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function UserForm({
  user,
  user_info,
}: {
  user: any;
  user_info: any;
}) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()

  // Create form function, and when to validate the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const UpdateProfile = async (data: ProfileFormValues) => {
    await fetch(`/api/update-profile`, {
      method: "put",
      body: JSON.stringify({
        id: user.id,
        name: data.name,
        last_name: data.last_name,
      }),
    });

    const { data: emailer, error } = await supabase.auth.updateUser({
      email: data.email,
    });

    toast({
      title: "You updated your profile details.",
    });

    router.refresh()
  };


  // Set the default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    name: user.name || "",
    last_name: user.last_name || "",
    email: user_info.email || "",
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(UpdateProfile)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  value={field.value || defaultValues.name}
                />
              </FormControl>
              <FormDescription>This is your first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  {...field}
                  value={field.value || defaultValues.last_name}
                />
              </FormControl>
              <FormDescription>This is your last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="7465234"
                  {...field}
                  value={field.value || defaultValues.email}
                />
              </FormControl>
              <FormDescription>This is your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
