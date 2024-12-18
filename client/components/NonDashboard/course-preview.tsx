import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import AccordionSections from "../accordion-section"


const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price)
  
  return (
    <div className="space-y-10">
      <div className="flex w-full flex-col gap-5 rounded-lg bg-card px-10 py-8">
        <div className="mb-2 bg-background">
          <Image
            src={course.image || "/placeholder.png"}
            alt="Course Preview"
            width={640}
            height={360}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold text-foreground">
            {course.title}
          </h2>
          <p className="mb-4 text-md text-muted-foreground">
            by {course.teacherName}
          </p>
          <p className="text-sm text-muted-foreground">
            {course.description}
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-foreground">
            Course Content
          </h4>
          <AccordionSections sections={course.sections} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-5 rounded-lg bg-card px-10 py-8">
        <h3 className="mb-4 text-xl text-foreground">Price Details (1 item)</h3>
        <div className="mb-4 flex justify-between text-base text-muted-foreground">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-4">
          <span className="text-lg font-bold text-foreground">Total Amount</span>
          <span className="text-lg font-bold text-foreground">{price}</span>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview