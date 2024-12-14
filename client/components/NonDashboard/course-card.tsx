'use client'
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-primary-foreground overflow-hidden rounded-lg hover:bg-secondary transition duration-200 flex flex-col cursor-pointer border-2 h-full group ${
        isSelected
          ? "border-zinc-600"
          : "border-transparent"
      }`}
    >
      <div className="relative w-auto pt-[56.25%]">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform"
          priority
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-semibold line-clamp-1">{course.title}</h2>
          <p className="text-sm mt-1 line-clamp-2 text-muted-foreground">
            {course.description}
          </p>
        </div>
        <div className="mt-2">
          <p className=" text-customgreys-dirtyGrey text-sm">By {course.teacherName}</p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-primary-500 font-semibold">
              {formatPrice(course.price)}
            </span>
            <span className="text-muted-foreground text-sm">
              {course.enrollments?.length} Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSearch;