import { Skeleton } from "@/components/ui/skeleton"

export function CourseCardSkeleton() {
  return (
    <div className="bg-primary-foreground overflow-hidden rounded-lg border-2 border-transparent h-full flex flex-col">
      <Skeleton className="w-full pt-[56.25%]" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-1/2 mb-1" />
          <div className="flex justify-between items-center mt-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

