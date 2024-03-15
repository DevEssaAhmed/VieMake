import * as React from 'react'

import { SidebarNav } from "./sidebar-nav"
import { Separator } from "../separator"
import { redirect } from "next/navigation"
import readUserSession from "@/lib/lib"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Overview",
    href: "/admin/overview",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  return (
    <>
      <div className="hidden space-y-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
          <p className="text-muted-foreground">
            Verify usage, users and billing.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-5xl">{children}</div>
        </div>
      </div>
    </>
  )
}