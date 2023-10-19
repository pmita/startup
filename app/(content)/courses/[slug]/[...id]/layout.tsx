import { allCourses } from "@/.contentlayer/generated";

interface CourseChapterLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
    id: string;
  };
}

export default function CourseChapterLayout({ children, params }: CourseChapterLayoutProps) {
  const courses = allCourses.filter((course) => course.slugAsParams.split("/")[0] === params.slug && course?._raw.sourceFileName !== 'index.mdx')

  return (
    <section className="flex flex-row justify-center items-stretch gap-16 w-full h-[90vh]">
      <aside className="grow-1 self-stretch w-full">
        {courses.map((course, index) => (
          <li key={index}>
            <h1>{course.title}</h1>
          </li>
        ))}
      </aside>
      <section className="grow-4 self-stretch w-full bg-red-400">
        {children}
      </section>
    </section>
  );
}