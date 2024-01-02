//COMPONENTS
import ChaptersList from "@/components/ChaptersList";
// LIBRARIES
import { allCourses } from "@/.contentlayer/generated";
import { compareAsc } from "date-fns";
// STYLES
import '@/styles/mdx.css';

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}

export default function CourseChapterLayout({ children, params }: CourseChapterLayoutProps) {
  const chapters = allCourses
    .filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')
    .sort((a, b) => compareAsc(a.weight, b.weight));

  return (
    <section className="flex flex-wrap flex-row justify-center items-stretch w-full p-5 pb-0">
      <ChaptersList chapters={chapters} />
      <section className="p-5 flex-[4_1_670px] self-stretch w-full order-1 lg:order-2">
        {children}
      </section>
    </section>
  );
}