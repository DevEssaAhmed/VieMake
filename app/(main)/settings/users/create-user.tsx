"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// More information on form and form validation: https://ui.shadcn.com/docs/components/form

// The schema for the Form
const newUserFormSchema = z.object({
    email: z
        .string()
        .min(2, {
            message: "Email must be at least 2 characters.",
        })
        .max(50, {
            message: "Email must not be longer than 50 characters.",
        })
        .email(),
    password: z
        .string()
        .min(2, {
            message: "First name must be at least 2 characters.",
        })
        .max(30, {
            message: "First name must not be longer than 30 characters.",
        }),
    role: z
        .string()
        .min(2, {
            message: "Last name must be at least 2 characters.",
        })
        .max(30, {
            message: "Last name must not be longer than 30 characters.",
        })
        .optional(),

})

// Create a type based on the schema provided above
type UserFormValues = z.infer<typeof newUserFormSchema>

export default function CreateUser({ company_id }: { company_id: any }) {
    const router = useRouter();

    // Create form function, and when to validate the form
    const form = useForm<UserFormValues>({
        resolver: zodResolver(newUserFormSchema),
        mode: "onSubmit",
    })

    // Call API route createUser to add new user to the database
    const createUser = async (data: UserFormValues) => {
        await fetch(`/api/create-user`, {
            method: "put",
            body: JSON.stringify({company_id, email: data.email, password: data.password, role: data.role, email_confirm: true, new_company: false, }),
        });
        router.refresh();

        toast({
            title: `New account for user ${data.email} has been created.`
        })

        form.reset();
    };

    //  Set the default values for the form
    //  Not used in this example
    const defaultValues: Partial<UserFormValues> = {
        role: "member",
    }

    return (
        <>
            <h3 className="text-xl font-bold tracking-tight mb-2">Create user</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(createUser)} className="space-y-4">
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="user@email.com" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="w-1/2 ml-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="block">
                        <Button type="submit">Add user</Button>
                    </div>
                </form>
            </Form >
        </>

    )
}