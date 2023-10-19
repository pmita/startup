// COMPONENTS
import Tag from "../CourseCard/Tag"
// LIBRARIES
import { Courses } from "@/.contentlayer/generated"

type ChapterListProps = {
  chapters: Courses[]
}


export default async function ChaptersList({ chapters }: ChapterListProps) {
  return (
    <aside className="flex-[1_1_200px] self-stretch w-full order-2 sm:order-1">
      {chapters.map((course, index) => (
        <div className="flex justify-between items-center" key={index}>
          <h3>{course.title}</h3>
          <Tag tag={course?.video_length || ''} />
        </div>
      ))}
    </aside>
  )
}