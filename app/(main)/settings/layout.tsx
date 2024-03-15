import { SidebarNav } from "./sidebar-nav";
import * as React from "react";
import { Separator } from "../separator";
import readUserSession from "@/lib/lib";
import { redirect } from "next/navigation";
import { useUserRoles } from "@/hooks/useUserRoles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }
  const { userRole } = await useUserRoles();

  const filteredSidebarNavItems =
    userRole?.role === "owner"
      ? [
          ...sidebarNavItems,
          {
            title: "Company",
            href: "/settings/company",
          },
          {
            title: "Users & Roles",
            href: "/settings/users",
          },
          {
            title: "Billing",
            href: "/settings/billing",
          },
        ]
      : userRole?.role === "admin"
      ? [
          ...sidebarNavItems,
          {
            title: "Users & Roles",
            href: "/settings/users",
          },
        ]
      : sidebarNavItems;

  return (
    <>
      <div className="hidden space-y-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your settings and subscription.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={filteredSidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </div>
      <Card className="md:hidden">
        <CardHeader>
          <CardTitle>Not available</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Unfortunately this page is not available on mobile. Please visit the
            desktop version of this application to view all pages.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button>
              Back home{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
