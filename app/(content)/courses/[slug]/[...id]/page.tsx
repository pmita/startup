export const revalidate = 1200;

// NEXT
import { notFound } from "next/navigation";
// COMPONENTS
import VideoContainer from "@/components/VideoContainer";
import Header from "@/components/Header";
import Title, { titleVariants } from "@/components/ui/Title";
import Description, { descriptionVariants } from "@/components/ui/Description";
import { Mdx } from "@/components/MDX";
// LIBRARIES
import { allCourses } from "contentlayer/generated";
// UTILS
import { getSortedCourseChapters } from "../page";
import { ToggleProgress } from "@/components/ToggleProgress";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/utils/helpers";
import Link from "next/link";

interface CoursePageProps {
  params: {
    slug: string,
    id: string[]
  }
}

async function getChapterFromParams(params: any) {
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
  const chapter = await getChapterFromParams(params);
  const sortedChapters = await getSortedCourseChapters(params);
  const showPrevious = chapter?.weight ? chapter?.weight > 0 : false;
  const showNext = chapter?.weight 
  ? chapter?.weight < sortedChapters.length - 1 
  : chapter?.weight === 0 
    ? true 
    : false;


  if (!chapter) notFound();
  
  return (
    <>
    <section 
      className="flex flex-col justify-start items-stretch gap-10"
    >
      <VideoContainer
        videoId={chapter?.vimeo ?? undefined}
        isFree={chapter?.free ?? false}
        controls={(
          <div className="flex justify-between items-stretch">
            <div className="flex justify-center items-center gap-2.5">
                {showPrevious && (
                  <Link 
                    href={`/courses/${sortedChapters[chapter?.weight - 1].slugAsParams}}`}
                    className={cn(buttonVariants({
                      variant: "secondaryOutlined",
                      size: "sm"
                    }))}
                  >
                    Play Previous
                  </Link>
                )}
                {showNext && (
                  <Link 
                    href={`/courses/${sortedChapters[chapter?.weight + 1].slugAsParams}}`}
                    className={cn(buttonVariants({
                      variant: "secondaryOutlined",
                      size: "sm"
                    }))}
                  >
                    Play Next
                  </Link>
                )}
              </div>
            <div className="flex justify-center items-center gap-2.5">
              <ToggleProgress  chapterId={chapter?.slugAsParams} isFree={chapter?.free ?? false} />
            </div>
          </div>
        )}
      />
      
      <Header
        className="flex flex-col justify-center items-start"
        headerTitle={
          <Title 
            title={chapter?.title}
            className={cn(titleVariants({
              variant: "secondary",
              size: "lg",
              className: "capitalize"
            }))}
          />
        }
        headerDescription={
          <Description
            description={chapter?.description || ''}
            className={cn(descriptionVariants({
              variant: "neutral",
              size: "lg"
            }))}
          />
        }
        />
      </section>
      <section className="container max-w-3xl py-6 lg:py-12">
        <Mdx code={chapter.body.code} />
      </section>
    </>
  )
}