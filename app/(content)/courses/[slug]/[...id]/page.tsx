export const revalidate = 1200;

// NEXT
import { notFound } from "next/navigation";
// COMPONENTS
import Header from "@/components/Header";
import Title from "@/components/Header/Title";
import Description from "@/components/Header/Description";
import { Mdx } from "@/components/MDX";
import { ToggleProgressButton, ToggleAutoPlayButton } from "@/components/Buttons";
// LIBRARIES
import { allCourses } from "contentlayer/generated";
import { VideoPlayer } from "@/components/VideoPlayer";

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
    description: course?.description
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
  
  console.log(course?.vimeo, course?.free)
  return (
    <>
      <VideoPlayer videoId={course?.vimeo ?? undefined} isFree={course?.free ?? false}/>
      <div className="flex justify-between items-center">
        <ToggleAutoPlayButton />
        <ToggleProgressButton chapterId={course?.slugAsParams} />
      </div>
      <Header
        className="flex flex-col justify-center items-start gap-6"
        headerTitle={
          <Title 
            title={course?.title}
            className="capitalize"
          />
        }
        headerDescription={
          <Description
            description={course?.description || ''}
            className="capitilize"
          />
        }
      />
      <section className="container max-w-3xl py-6 lg:py-12">
        <Mdx code={course.body.code} />
      </section>
    </>
  )
}