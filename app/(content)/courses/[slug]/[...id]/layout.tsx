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
      <aside className="flex-[1_1_200px] self-stretch w-full order-2 sm:order-1">
        {chapters.map((course, index) => (
          <li key={index}>
            <h1>{course.title}</h1>
          </li>
        ))}
      </aside>
      <section className="flex-[4_1_550px] self-stretch w-full bg-red-400 order-1 sm:order-2">
        {children}
      </section>
    </section>
  );
}