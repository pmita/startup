// NEXT
import Link from "next/link"
// COMPONENTS
import { AuthCheck } from "../../../../../../components/auth-check"
import { ChapterProgress } from "./chapter-progress"
import { Tag } from "../../../../../../components/ui/tag"
import { LockSVG } from "../../../../../../components/SVGs"
// TYPES
import { Courses } from "@/.contentlayer/generated"

type ChapterListProps = {
  chapters: Courses[]
}

export default async function ChaptersList({ chapters }: ChapterListProps) {

  if (!chapters) return null;

  return (
    <>
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
                <ChapterProgress chapterId={chapter.slugAsParams} isFree={chapter?.free}/>
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
    </>
  )
}