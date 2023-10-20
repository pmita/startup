// COMPONENTS
import AuthCheck from "../AuthCheck"
import Tag from "../CourseCard/Tag"
// LIBRARIES
import { Courses } from "@/.contentlayer/generated"

type ChapterListProps = {
  chapters: Courses[]
}

export default async function ChaptersList({ chapters }: ChapterListProps) {
  return (
    <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full order-2 lg:order-1 min-h-[90vh] overflow-scroll p-5">
      {chapters.map((course, index) => (
        <div className="flex justify-between items-center p-2" key={index}>
          <span className="flex justify-start items-center gap-2">
            <AuthCheck
              fallback={(
                <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
              )}
            >
              <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-green"></div>
            </AuthCheck>
            <h3>{course.title}</h3>
          </span>
          <Tag tag={course?.video_length || '1:01'} />
        </div>
      ))}
    </aside>
  )
}