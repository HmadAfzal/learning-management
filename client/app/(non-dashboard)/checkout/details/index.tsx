"use client"
import { useCurrentCourse } from "@/hooks/useCurrentCourse"
import { GuestFormData, guestSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import React from "react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Loading from "@/components/loading"
import CoursePreview from "@/components/NonDashboard/course-preview"
import SignUpComponent from "@/components/auth/sign-up"
import SignInComponent from "@/components/auth/sign-in"

const CheckoutDetailsPage = () => {
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse()
  const searchParams = useSearchParams()
  const showSignUp = searchParams.get("showSignUp") === "true"

  const methods = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: "",
    },
  })

  if (isLoading) return <Loading />
  if (isError) return <div>Failed to fetch course data</div>
  if (!selectedCourse) return <div>Course not found</div>

  return (
    <div className="h-fit w-full gap-10">
      <div className="gap-10 sm:flex">
        <div className="basis-1/2 rounded-lg">
          <CoursePreview course={selectedCourse} />
        </div>

        <div className="flex basis-1/2 h-auto flex-1 flex-col gap-10">
          <div className="flex w-full items-center justify-center rounded-lg bg-card">
            {showSignUp ? <SignUpComponent /> : <SignInComponent />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutDetailsPage