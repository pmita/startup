//COMPONENTS
import ChaptersList from "./_components/chapters-list";
import { AsideContainer, SectionContainer, WrapContainer } from "@/layouts/wrap-container";
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
    <WrapContainer>
      <AsideContainer className="order-2 lg:order-1 min-h-[90vh] overflow-scroll">
        <ChaptersList chapters={chapters} />
      </AsideContainer>
      <SectionContainer className="w-full order-1 lg:order-2">
        {children}
      </SectionContainer>
    </WrapContainer>
  );
}