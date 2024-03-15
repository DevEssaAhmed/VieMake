"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { countries } from "./../../../../data/countries"

// More information on form and form validation: https://ui.shadcn.com/docs/components/form

// The schema for the Form
const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Company name must be at least 2 characters.",
        })
        .max(30, {
            message: "Company name must not be longer than 30 characters.",
        })
        .optional(),
    country: z
        .string()
        .optional(),
    coc: z
        .string()
        .optional(),
    vat: z
        .string()
        .min(2, {
            message: "Company name must be at least 2 characters.",
        })
        .max(30, {
            message: "Company name must not be longer than 30 characters.",
        })
        .optional(),
})

// Create a type based on the schema provided above
type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function CompanyForm({ company }: { company: any }) {
    const router = useRouter()

    // Create form function, and when to validate the form
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    })

    // Function that sends the information to Supabase, once submitted by the user
    const CreateCompany = async (data: ProfileFormValues) => {
        await fetch(`/api/update-company`, {
            method: "put",
            body: JSON.stringify({ id: company.id, ...data }),
        });

        toast({
            title: "You updated the company details.",
        })

        router.refresh()
    };

    // Set the default values for the form
    const defaultValues: Partial<ProfileFormValues> = {
        name: company.name || '',
        country:  company.country || '',
        coc:  company.coc || '',
        vat:  company.vat || '',
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(CreateCompany)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="My company" {...field} value={field.value || defaultValues.name} />
                            </FormControl>
                            <FormDescription>
                                This is the (display) name of your company. 
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || defaultValues.country}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue  />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="h-[200px]">
                                    {countries.map(country => (
                                        <SelectItem key={country} value={country}>{country}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The country where your company is located.
                            </FormDescription>
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="coc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chamber of Commerce</FormLabel>
                            <FormControl>
                                <Input placeholder="7465234" {...field} value={field.value || defaultValues.coc} />
                            </FormControl>
                            <FormDescription>
                                This is the Chamber of Commerce number of your company.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VAT Identifier</FormLabel>
                            <FormControl>
                                <Input placeholder="111234567B01" {...field} value={field.value || defaultValues.vat} />
                            </FormControl>
                            <FormDescription>
                            This is the VAT/TAX number of your company.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update</Button>
            </form>
        </Form>
    )
}