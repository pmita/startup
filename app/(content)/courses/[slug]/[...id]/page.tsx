export const revalidate = 1200;

import { notFound } from "next/navigation";
// COMPONENTS
import Header from "@/components/Header";
// LIBRARIES
import { allCourses } from "contentlayer/generated";

interface CoursePageProps {
  params: {
    slug: string,
    id: string[]
  }
}

async function getDocFromParams(params: any) {
  const slug = params?.slug + '/' + params?.id?.join('/');
  const course = allCourses.find((course) => course.slugAsParams === slug)

  if (!course) return null;

  return course;
}

export async function generateMetadata({ params }: { params: { slug: string, id: string[] } }) {
  const course = allCourses.find((course) => course.slugAsParams === (params.slug + '/' + params?.id.join('/')))

  if (!course) return {};

  return { 
    title: course.title ,
    description: course?.description,
  }
}

export async function generateStaticParams(): Promise<CoursePageProps["params"][]> {
  return allCourses
    .filter((course) => course?._raw.sourceFileName !== 'index.mdx')
    .map((course) => ({
        slug: course.slugAsParams.split("/")[0],
        id: course.slugAsParams.split("/"),
      })
    )
}

export default async function ChapterPage({ params }: CoursePageProps) {
  const course = await getDocFromParams(params);

  if (!course) notFound();
  
  return (
    <div>
      <Header
        heading={course?.title}
        subHeading={course?.description}
      />
    </div>
  )
}