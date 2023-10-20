export const revalidate = 1200;

import Link from "next/link"
import { notFound } from "next/navigation";
// COMPONENTS
import Header from "@/components/Header";
// LIBRARIES
import { allCourses } from "contentlayer/generated";
import { compareAsc } from "date-fns";
import InfoCard from "@/components/InfoCard";

interface CoursePageProps {
  params: {
    slug: string
  }
}

async function getDocFromParams(params: any) {
  const slug = params?.slug;
  const course = allCourses.find((course) => course.slugAsParams === slug)

  if (!course) return null;

  return course;
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
  const course = await getDocFromParams(params);
  const chapters = allCourses
    .filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')
    .sort((a, b) => compareAsc(a.weight, b.weight));

  console.log(chapters);

  if (!course) notFound();
  
  return (
    <div>
      <h1>Course page</h1>
      <Header
        heading={course?.title}
        subHeading={course?.description}
        className="flex flex-col justify-center items-center gap-6"
      />
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,300px))] auto-rows-[150px] gap-8 mx-0 my-4 p-4 justify-center">
        {chapters.map((chapter) => (
          <div key={chapter.weight} className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-b-[12px] bg-primary-white p-4 py-2" key={chapter.weight}>
            <Link href={`/courses/${chapter.slugAsParams}`}>
              <InfoCard
                title={chapter?.title}
                description={chapter?.description || ''}
              />
            </Link>
          </div>
        ))}
        </section>
    </div>
  )
}