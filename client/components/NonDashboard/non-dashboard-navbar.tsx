"use client"

import { Bell, Search } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function NonDashboardNavbar() {
  const router = useRouter()
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  return (
    <nav className="flex h-16 items-center justify-between border-b border-zinc-800 px-4 lg:px-6">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-muted-foreground transition-colors duration-200">
        NUEXUS
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-secondary hover:text-white"
          onClick={() => router.push('/search')}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Search Courses</span>
          <span className="sm:hidden">Search</span>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-secondary hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2.5 h-2 w-2 rounded-full bg-blue-500" />
          <span className="sr-only">Notifications</span>
        </Button>
        <SignedIn>
        <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                userButtonOuterIdentifier: "text-muted-foreground",
                userButtonBox: "scale-90 sm:scale-100",
                userButtonTrigger: "rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200",
                userButtonPopoverCard: "bg-background border border-border",
                userButtonPopoverActionButton: "hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverFooter: "hidden",
              },
            }}
            userProfileMode='navigation'
            userProfileUrl={userRole === "teacher" ? "/teacher/profile" : "/user/profile"}
          />
        </SignedIn>
        <SignedOut>
            <Button
            onClick={()=>router.push('/signin')}
            variant={'secondary'}
            >
              Log in
            </Button>
            <Button
            onClick={()=>router.push('/signup')}
            >
             Sign up
            </Button>
          </SignedOut>
      </div>
    </nav>
  )
}

