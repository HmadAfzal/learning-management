"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/NonDashboard/hero-crousel"
import { useGetCoursesQuery } from "@/state/api"
import CourseCardSearch from "@/components/NonDashboard/course-card"
import { useRouter } from "next/navigation"
import { CourseCardSkeleton } from "@/components/NonDashboard/course-card0skeleton"

export default function Home() {
  const router = useRouter();
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  return (
      <main>
        {/* Hero Section */}
        <section className="border-b border-border/40 py-32 ">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center p-8 lg:p-12"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Courses
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                This is the list of the courses you have enrolled in.
                <br />
                Courses when you need them and want them.
              </p>
              <Button 
                className="mt-8 w-fit bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Search for Courses
              </Button>
            </motion.div>
            <HeroCarousel />
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <p className="mt-2 text-muted-foreground">
              From beginner to advanced in all industries, we have the right courses just for you and preparing your entire
              journey for learning and making the most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {isLoading ? (
              // Show skeletons while loading
              Array.from({ length: 8 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            ) : isError ? (
              <p className="col-span-full text-center text-red-500">Error loading courses. Please try again later.</p>
            ) : courses?.length === 0 ? (
              <p className="col-span-full text-center">No courses available.</p>
            ) : (
              courses?.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCardSearch
                    course={course}
                    onClick={() => handleCourseClick(course.courseId)}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </section>
      </main>
  )
}

