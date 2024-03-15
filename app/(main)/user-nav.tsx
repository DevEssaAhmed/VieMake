"use client";

// This one has a lot of imports. Themes, dropdown menu, forms for password change, all included in one small dropdown.

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./theme-switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { createBrowserClient } from "@supabase/ssr";

// Create a form
const formSchema = z
  .object({
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export function UserNav({ session }: { session: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Call useForm function and set mode for valdiation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Function to call password update
  const updatePassword = async (data: z.infer<typeof formSchema>) => {
    const { data: updatePass } = await supabase.auth.updateUser({
      password: data.password,
    });
    setOpen(false);
    toast({
      title: "Password has been updated.",
    });
    form.reset();
  };

  // Function to call signout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (!session) {
    return;
  }

  return (
    <div className="pr-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* Uncomment below picture to add image */}
                {/* <AvatarImage src="/avatars/01.png" alt="company" /> */}
                <AvatarFallback>SB</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {"Supabooster"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* Mobile Menu */}
              <Link className="md:hidden" href="/">
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              <Link className="md:hidden" href="/to-dos">
                <DropdownMenuItem>To-dos</DropdownMenuItem>
              </Link>
              {/* PC Menu */}
              <Link className="hidden md:block" href="/settings/profile">
                <DropdownMenuItem>
                  Profile
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
              <Link className="hidden md:block" href="/settings/company">
                <DropdownMenuItem>
                  Company
                  {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
              <Link className="hidden md:block" href="/settings/">
                <DropdownMenuItem>
                  Settings
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </Link>
              {/* Available on both pc and mobile */}
              <DropdownMenuItem>
                <DialogTrigger>Change password</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="-py-2 flex justify-between">
                <p className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-5">
                  Theme:
                </p>
                <ModeToggle />
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(updatePassword)}
                className="space-y-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="-pt-4">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Retype your password"
                          type="password"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" onSubmit={() => form.reset()}>
                  Update
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
