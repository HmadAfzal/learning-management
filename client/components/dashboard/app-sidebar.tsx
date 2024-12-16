'use client'

import { useClerk, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { BookOpen, Briefcase, Building, DollarSign, Glasses, LogOut, Settings, User } from 'lucide-react'
import { cn } from "@/lib/utils"
import Link from "next/link"
import Loading from "../loading"

const AppSidebar = () => {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  const navLinks = {
    student: [
      { icon: BookOpen, label: "Courses", href: "/user/courses" },
      { icon: Briefcase, label: "Billing", href: "/user/billing" },
      { icon: User, label: "Profile", href: "/user/profile" },
      { icon: Glasses, label: "Security", href: "/user/profile/security" },
      { icon: Settings, label: "Settings", href: "/user/settings" },
    ],
    teacher: [
      { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
      { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
      { icon: User, label: "Profile", href: "/teacher/profile" },
      { icon: Glasses, label: "Security", href: "/teacher/profile/security" },
      { icon: Settings, label: "Settings", href: "/teacher/settings" },
    ],
  }

  if (!isLoaded) return <Loading />
  if (!user) return <div>User not found</div>

  const userType =
    (user.publicMetadata.userType as "student" | "teacher") || "student"
  const currentNavLinks = navLinks[userType]

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <SidebarHeader className="p-4">
        <SidebarMenu>
        <SidebarMenuItem>
              <SidebarMenuButton size="lg" >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    NUEXUS
                  </span>
                  <span className="truncate text-xs">
                    Technologies
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start gap-3 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                    isActive && "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 font-medium"
                  )}
                >
                  <Link href={link.href} className="flex items-center py-2 px-3 rounded-md" scroll={false}>
                    <link.icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    <span className="ml-3 text-zinc-700 dark:text-zinc-300 group-data-[collapsible=icon]:hidden">{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut()}
              className="w-full justify-start gap-3 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

