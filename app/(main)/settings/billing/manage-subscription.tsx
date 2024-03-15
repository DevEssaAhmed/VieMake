"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cancelSubscription } from "./cancel-subscription";
import { renewSubscription } from "./renew-subscription";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { getProductVariants } from "./variants";
import { useEffect, useState } from "react";
import { changeSubscription } from "./change-subscription";
import { toast } from "@/components/ui/use-toast"

// Manage subscription is a dialog component, which takes the company_info information and transforms it based on the given status
// Is imported in Billing.tsx component, to render the dialog page with Variants for a product

const ManageSubscription = ({ company }: { company: any }) => {
    const [dialog, setDialog] = useState('')
    const [productVariants, setProductVariants] = useState([]);

    useEffect(() => {
        async function fetchProductVariants() {
            try {
                const productVariantsData = await getProductVariants(company.product_id);
                setProductVariants(productVariantsData.data);
            } catch (error) {
                console.error('Error fetching product variants:', error);
            }
        }

        fetchProductVariants();
    }, [dialog]);

    return (
        <Dialog>
            {/* Dropdown menu on the Billing page, for the subscription options */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"default"}>Manage subscription</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72">
                    <>
                        <DropdownMenuItem className="rounded-lg"
                            onClick={() => {
                                setDialog('change')
                            }}
                        >
                            <DialogTrigger>
                                <div className="py-1 px-2 rounded ">
                                    <h2 className="mb-1 font-semibold text-left">Change subscription</h2>
                                    <p className="text-gray-700 dark:text-gray-300 ">Update the number of users</p>
                                </div>
                            </DialogTrigger>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg">
                            <Link href={company.update_payment_method} target="">
                                <div className="py-1 px-2 rounded">
                                    <h2 className="mb-1 font-semibold">Update payment method</h2>
                                    <p className="text-gray-700 dark:text-gray-300">Change your current payment method</p>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {company.status === 'cancelled' ?
                            <DropdownMenuItem className="rounded-lg focus:bg-green-200 dark:focus:bg-green-700"
                                onClick={() => {
                                    renewSubscription(company)
                                    toast({
                                        title: 'Your subscription has been resumed.',
                                    })
                                }}
                            >
                                <div className="py-1 px-2 rounded ">
                                    <>
                                        <h2 className="mb-1 font-semibold">Resume subscription</h2>
                                        <p className="opacity-70">Resume your cancelled subscription</p>
                                    </>
                                </div>
                            </DropdownMenuItem>
                            :
                            <>
                                <DropdownMenuItem className="rounded-lg focus:bg-red-300 dark:focus:bg-red-700"
                                    onClick={() => {
                                        setDialog('cancel')
                                    }}>
                                    <div className="py-1 px-2 rounded ">
                                        <>
                                            <DialogTrigger>
                                                <h2 className="mb-1 font-semibold text-left">Cancel subscription</h2>
                                                <p className="opacity-70">Cancel your current subscription</p>
                                            </DialogTrigger>
                                        </>
                                    </div>
                                </DropdownMenuItem>
                            </>
                        }
                    </>
                </DropdownMenuContent>
            </DropdownMenu>
            {dialog === 'cancel' ?
                // If the user decided to cancel the subscription 
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="">
                            At the end of your subscription, you will no longer be able to use any of the functionality. You can resume your subscription any time you want until the subscription ends. After that you will have to create a new subscription.
                        </DialogDescription>
                        <div className="pb-6"></div>
                        <div className="flex justify-end">
                            <DialogClose className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-800 bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90 h-10 px-4 py-2"
                                onClick={() => {
                                    cancelSubscription(company.subscription_id)
                                    toast({
                                        title: 'Your subscription has been cancelled.',
                                    })
                                }}
                            >Cancel subscription</DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
                :
                // If the user wants to update the subscription variant
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Change subscription</DialogTitle>
                        <div className="flex">
                            {/* Exclude the current variant that is linked to this Company --> !== company.variant_id */}
                            {productVariants?.filter((filterVariant: any) => (filterVariant.id !== company.variant_id.toString())).map((variant: any) => (
                                <div key={variant.id} className='border rounded-lg p-4 w-full'>
                                    <p>Number of users: {variant.attributes.name}</p>
                                    <div className="w-full flex justify-center">
                                        <DialogClose className="mt-2">
                                            <Button onClick={() => {
                                                changeSubscription(company, parseInt(variant.id))
                                                toast({
                                                    title: `Your subscription has been updated to: ${variant.attributes.name}.`,
                                                })
                                            }} className='mt-2'>Buy Now</Button>
                                        </DialogClose>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogHeader>
                </DialogContent>
            }
        </Dialog >

    )
}

export default ManageSubscription