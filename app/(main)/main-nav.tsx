"use client";

// More information on Navigation: https://ui.shadcn.com/docs/components/navigation-menu

import Link from "next/link";
import { cn } from "@/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  className?: string;
  admin: any; // Replace 'any' with the actual type of 'admin'
}

export function MainNav({ className, admin, ...props }: MainNavProps) {

  return (
    <nav
      className={cn(
        "flex items-center text-zinc-500 dark:text-zinc-100 space-x-2 lg:space-x-4 hidden md:block",
        className
      )}
      {...props}
    >
      <NavigationMenu>
        <NavigationMenuList>
          {/* Add NavigationMenuItem if you want to add another navigation button */}
          <NavigationMenuItem className="">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/to-dos" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                To-dos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/settings/profile" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {admin ? (
            <NavigationMenuItem>
              <Link className="hidden md:block" href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Admin Panel
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
