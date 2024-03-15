"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ManageSubscription from './manage-subscription';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

// Function to format the date from both company.renews_at & company.ends_at to make sure it is a Human Readable date
function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


export default function Billing({ company }: { company: any }) {

    // If a user logs in the first time, they will not have the correct rights in their JWT token
    // To tackle this, I have included this section to prevent an error
    if (!company) {
        return (
            <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">You don't have rights to view this page.</p>
                <p className="text-sm text-muted-foreground">If this is your first time logging in, please relog</p>

            </div>
        )
    }

    // Here we first announce the two variables, then add the formatted date for both values to these variables
    let renewal: any;
    let ends: any;
    if (company.renews_at) { renewal = formatDate(new Date(company.renews_at)); }
    if (company.ends_at) { ends = formatDate(new Date(company.ends_at)); }

    // Required function to be able to use the Realtime information
    const supabase = createClient()
    
    // Required to make sure we update the page if there is a database change
    const router = useRouter();

    // This function is Supabase Realtime call.
    // This call listens to changes 
    useEffect(() => {
        const channel = supabase
            .channel("realtime company") // name of the Realtime connection
            .on(
                "postgres_changes", // When changes happen to postgres (your Supabase database)
                {
                    event: "*", // Listen to all changes, you can update this to UPDATE/INSERT/etc.
                    schema: "public", 
                    table: "company_info", // The table: public.company_info !! makes sure you enable realtime in the Table setup
                },
                () => {
                    router.refresh() // If a change happens, refresh the page to load it without user having to interact with it
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]); // here we make sure that this function is only called when supabase and router variables are available

    // Switch statement to check the variant. If you have multiple variants, you can add those here. I have these four
    // Make sure to update the variant and the user variable based on your set up
    let users: number;
    switch (company.variant_id) {
        case 95435:
            users = 1
            break;
        case 95436:
            users = 2
            break;
        case 95437:
            users = 3
            break;
        case 95438:
            users = 4
            break;
        default: users = 0
    }

    return (
        <>
            {/* I am rendering card by shadcn --- https://ui.shadcn.com/docs/components/card */}
            <Card className='w-full relative mb-2'>
                <CardHeader className='-mb-4'>
                    <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <CardDescription>Status: {company.status === 'active' ? <span className="text-green-500 font-semibold">{company.status}</span> : <span className="text-red-500 font-semibold">{company.status}</span>}</CardDescription>
                    {company.status === 'active' ?
                        <CardDescription className="">Renewal date: {renewal}</CardDescription>

                        :
                        company.status === 'cancelled' ?
                            <CardDescription className="">End date: {ends}</CardDescription>
                            :
                            null
                    }
                    <CardDescription className='mb-6'>Users: {users}</CardDescription>
                    <ManageSubscription company={company} />
                </CardContent>
            </Card>
        </>
    );
}