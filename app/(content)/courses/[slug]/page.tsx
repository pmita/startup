export const revalidate = 1200;

import { notFound } from "next/navigation";
// LIBRARIES
import { allCourses } from "contentlayer/generated";

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

  if (!course) notFound();
  
  return (
    <div>
      <h1>Course page</h1>
      <h2>{course?.title}</h2>
    </div>
  )
}