"use client"

import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Link from "next/link"
import React from "react"

const CompletionPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary p-3">
          <Check className="h-16 w-16 text-primary-foreground" />
        </div>
        <h1 className="mb-3 text-4xl font-bold">COMPLETED</h1>
        <p className="mb-1">
          🎉 You have made a course purchase successfully! 🎉
        </p>
      </div>

      <div className="mt-2">
        <p>
          Need help? Contact our{" "}
          <Button variant="link" asChild className="m-0 p-0 text-primary">
            <a href="mailto:support@example.com">customer support</a>
          </Button>
          .
        </p>
      </div>

      <div className="mt-2">
        <Button
          asChild
          variant="secondary"
          className="px-4 py-2"
        >
          <Link href="user/courses" scroll={false}>
            Go to Courses
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default CompletionPage