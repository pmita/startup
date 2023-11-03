// NEXT
import Link from "next/link"
// COMPONENTS
import AuthCheck from "../AuthCheck"
import ChapterProgress from "./ChapterProgress"
import Tag from "../CourseCard/Tag"
import AsideBar from "../Sidebar"
// LIBRARIES
import { Courses } from "@/.contentlayer/generated"

type ChapterListProps = {
  chapters: Courses[]
}

export default async function ChaptersList({ chapters }: ChapterListProps) {
  return (
    <AsideBar
      className="flex flex-col flex-start items-between gap-2 order-2 lg:order-1 min-h-[90vh]"
      content={chapters.length && chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slugAsParams}`} key={chapter.weight} className="hover:text-primary-green">
          <div className="flex justify-between items-center p-2">
            <span className="flex justify-start items-center gap-2">
              <AuthCheck fallback={(
                <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
              
              )}>
                <ChapterProgress chapterId={chapter.slugAsParams} />
              </AuthCheck>
              <h3>{chapter.title}</h3>
            </span>
            <Tag 
              tag={chapter?.video_length || '1:01'} 
              className="bg-primary-black bg-opacity-50 rounded-[6px]"
            />
          </div>
        </Link>
      ))}
    />
  )
}