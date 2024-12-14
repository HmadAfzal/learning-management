"use client"

import { Bell, Search } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
                                      
export default function NonDashboardNavbar() {
  const router = useRouter()

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
        <Avatar className="h-8 w-8 border border-gray-700">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}

