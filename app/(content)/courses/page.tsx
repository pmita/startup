// NEXT
import Link from "next/link"
// COMPONENTS
import Header from "@/components/Header"
import CourseCard from "@/components/CourseCard"
import ImageWithFallback from "@/components/ImageWithFallback"
import { Tag, tagVariants } from "@/components/ui/Tag"
import InfoCard from "@/components/InfoCard"
import Title from "@/components/Header/Title"
import Description from "@/components/Header/Description"
// LIBRARIES
import { allCourses } from "@/.contentlayer/generated"
import { compareDesc } from "date-fns"
// UTILS
import { cn } from "@/utils/helpers"


export default async function LessonsPage() {
  const courses = allCourses
    .filter((course) => course?._raw.sourceFileName === 'index.mdx')
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    
  return (
    <>
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title 
            title="All Courses"
            className="capitalize"
          />
        }
        headerDescription={
          <Description
            description="Built feature based projects and stop following step by step tutorials when coding"
            className="capitilize"
          />
        }
      />
      <section className="grid grid-cols-[repeat(auto-fit,minmax(416px,416px))] auto-rows-[579px] gap-4 my-4 p-4 justify-center">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            className="bg-blue-400 border-solid border-primary-black rounded-[6px] w-full h-full"
            slug={course?._raw.sourceFileDir}
            image={
              <div className="w-full h-[65%] relative">
                <Link href={`/${course?._raw.sourceFileDir}`}>
                  <ImageWithFallback
                    src={'/images/hacker.png'}
                    fallbackSrc="/images/hacker.png"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "100%" }}
                    objectFit="cover"
                    altText={course?.title || ''}
                  />
                    {course?.tags?.length && (
                      <div className="absolute right-[5%] top-[5%] flex justify-end items-center gap-1">
                        {course?.tags?.map((tag) => (
                          <Tag
                            key={tag}
                            tag={tag}
                            className={cn(tagVariants({ variant: "primary", size: "lg" }))}
                          />
                        ))}
                      </div>
                    )}
                </Link>
              </div>
            }
            info={
              <InfoCard 
                className="bg-primary-white h-[35%] w-full flex flex-col justify-start items-start gap-4 p-4"
                title={course?.title}
                description={course?.description || ''}
                hastags={course?.stack}
              />
            }
          />
        ))}
      </section>
    </>
  );
}