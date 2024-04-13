export const revalidate = 1200;

// NEXT
import Link from "next/link"
import { notFound } from "next/navigation";
// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title } from '@/components/ui/title';
import { Description } from "@/components/ui/description";
import { InfoCard } from "@/components/info-card";
// LIBRARIES
import { allCourses } from "contentlayer/generated";
import { compareAsc } from "date-fns";
import { cn } from "@/utils/helpers";

interface CoursePageProps {
  params: {
    slug: string
  }
}

async function getLessonFromParams(params: any) {
  const slug = params?.slug;
  const course = allCourses.find((course) => course.slugAsParams === slug)

  if (!course) return null;

  return course;
}

export async function getSortedCourseChapters(params: any) {
  return allCourses
  .filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')
  .sort((a, b) => compareAsc(a.weight, b.weight));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = allCourses.find((course) => course.slugAsParams === params.slug)
  if (!course) return {};

  return { 
    title: course.title ,
    description: course?.description,
  }
}

export async function generateStaticParams(): Promise<CoursePageProps["params"][]> {
  return allCourses.filter((course) => course?._raw.sourceFileName === 'index.mdx')
   .map((course) => ({
    slug: course.slugAsParams,
   }))
}


export default async function LessonPage({ params }: CoursePageProps) {
  const course = await getLessonFromParams(params);
  const sortedChapters = await getSortedCourseChapters(params);

  if (!course) notFound();
  
  return (
    <>
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title title={course?.title} />
        }
        headerDescription={
          <Description description={course?.description || ''} />
        }
      />
      <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-[150px] justify-center">
        {sortedChapters.map((chapter) => (
          <div key={chapter.weight} className="w-full border-[6px] border-solid border-primary-black hover:border-primary-green flex flex-col justify-center items-start rounded-[12px] bg-primary-white p-4">
            <Link href={`/courses/${chapter.slugAsParams}`}>
              <InfoCard
                title={chapter?.title}
                description={chapter?.description || ''}
              />
            </Link>
          </div>
        ))}
        </section>
    </>
  )
}