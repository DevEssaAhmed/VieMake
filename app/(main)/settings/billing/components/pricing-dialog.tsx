"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";

// This page generates the dialog function for a new subscription
// Dialog: https://ui.shadcn.com/docs/components/dialog

// It receives four parameters. more info on this page: https://www.supaboost.dev/guides/supabase-nextjs-lemon-squeezy/rendering-lemon-squeezy-products

export default function PricingDialog({ productVariants, company_id, user, store_id }: { productVariants: any, company_id: any, user: any, store_id: any }) {

    function createCheckoutLink({
        variantId,
    }: {
        variantId: string
    }): string {

        // The checkout link
        const baseUrl = new URL(`https://${store_id}.lemonsqueezy.com/checkout/buy/${variantId}`)

        const url = new URL(baseUrl)
        url.searchParams.append('checkout[custom][company_id]', company_id) // add custom data for company_id behind the url, to make sure your supabase is updated with the subscription data for the correct company
        const email = user.user.email
        if (email) url.searchParams.append('checkout[email]', email) // add email of the user, so they don't have to type it themselves

        return url.toString()
    }


    return (
        <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-800 h-10 px-4 py-2 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50">Add subscription</DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="mb-4">Please select the number of users</DialogTitle>
                    <DialogDescription>
                        <div className='flex gap-x-2 w-full'>
                            {/* Mapping each variant, without filter */}
                            {productVariants.data.map((variant: any) => (
                                <div key={variant.id} className='border rounded-lg p-4 w-full'>
                                    <p>Number of users: {variant.attributes.name}</p>
                                    <Link className='w-full flex justify-center' href={createCheckoutLink({ variantId: variant.attributes.slug })}>
                                        <Button className='mt-2'>Buy Now</Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

