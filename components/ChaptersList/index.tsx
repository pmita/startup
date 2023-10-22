import Link from "next/link"
// COMPONENTS
import Tag from "../CourseCard/Tag"
// LIBRARIES
import { Courses } from "@/.contentlayer/generated"
import CheckProgress from "./CheckProgress"

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
              <CheckProgress chapterSlug={chapter.slugAsParams} />
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