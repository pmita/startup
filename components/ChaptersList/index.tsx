// NEXT
import Link from "next/link"
// COMPONENTS
import AuthCheck from "../AuthCheck"
import ChapterProgress from "./ChapterProgress"
import { Tag } from "../ui/Tag"
import { LockSVG } from "../SVGs"
// TYPES
import { Courses } from "@/.contentlayer/generated"

type ChapterListProps = {
  chapters: Courses[]
}

export default async function ChaptersList({ chapters }: ChapterListProps) {
  return (
    <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full order-2 lg:order-1 min-h-[90vh] overflow-scroll p-5">
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slugAsParams}`} key={chapter.weight} className="hover:text-primary-green">
          <div className="flex justify-between items-center p-2 min-h-[48px]">
            <span className="flex justify-start items-center gap-2">
              <AuthCheck fallback={(
                <>
                  {chapter.free ? (
                    <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
                  ) : (
                    <LockSVG width="20px" height="20px" fill="purple"/>
                  )}
                </>
              
              )}>
                <ChapterProgress chapterId={chapter.slugAsParams} />
              </AuthCheck>
              <h3>{chapter.title}</h3>
            </span>
            {chapter?.video_length && (
              <Tag 
                tag={chapter?.video_length} 
                className={"bg-primary-black bg-opacity-50 border-none rounded-[6px] p-2" }
              />
            )}
          </div>
        </Link>
      ))}
    </aside>
  )
}