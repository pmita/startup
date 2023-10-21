import Link from "next/link"
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
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slugAsParams}`} key={chapter.weight} className="hover:text-primary-green">
          <div className="flex justify-between items-center p-2">
            <span className="flex justify-start items-center gap-2">
              <AuthCheck
                fallback={(
                  <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
                )}
              >
                <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-green"></div>
              </AuthCheck>
              <h3>{chapter.title}</h3>
            </span>
            <Tag 
              tag={chapter?.video_length || '1:01'} 
              className="bg-primary-green rounded-[6px]"
            />
          </div>
        </Link>
      ))}
    </aside>
  )
}