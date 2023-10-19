//COMPONENTS
import ChaptersList from "@/components/ChaptersList";
// LIBRARIES
import { allCourses } from "@/.contentlayer/generated";

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}

export default function CourseChapterLayout({ children, params }: CourseChapterLayoutProps) {
  const chapters = allCourses.filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')

  return (
    <section className="flex flex-wrap flex-row justify-center items-stretch gap-16 w-full h-[90vh]">
      <ChaptersList chapters={chapters} />
      <section className="flex-[4_1_550px] self-stretch w-full bg-red-400 order-1 sm:order-2">
        {children}
      </section>
    </section>
  );
}