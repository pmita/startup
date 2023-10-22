"use client"

// NEXT
import Link from "next/link"
// REACT
import { Suspense, useCallback } from "react"
// COMPONENTS
import Tag from "../CourseCard/Tag"
import Spinner from "@/components/Spinner"
// HOOKS
import { useFirestoreSnapshot } from "@/hooks/useFirestoreSnapshot"
// LIBRARIES
import { Courses } from "@/.contentlayer/generated"
import CheckProgress from "./CheckProgress"

type ChapterListProps = {
  chapters: Courses[];
}

export default function ChaptersList({ chapters }: ChapterListProps) {
  const { data: chaptersCompleted } = useFirestoreSnapshot();

  console.log(chaptersCompleted);

  const checkIsCompleted = useCallback((chapterSlug: string) => {
    const result = Object.keys(chaptersCompleted || {})
      .filter((key) => chapterSlug && chapterSlug.match(key))

    return result.length ? true : false;
  }, [chaptersCompleted]);

  return (
    <aside className="flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2 w-full order-2 lg:order-1 min-h-[90vh] overflow-scroll p-5">
      {chapters.map((chapter) => (
        <Link href={`/courses/${chapter.slugAsParams}`} key={chapter.weight} className="hover:text-primary-green">
          <div className="flex justify-between items-center p-2">
            <span className="flex justify-start items-center gap-2">
              <CheckProgress 
                chapterSlug={chapter.slugAsParams} 
                checkIsCompleted={checkIsCompleted(chapter.slugAsParams)}
              />
              <h3>{chapter.title}</h3>
            </span>
            <Suspense fallback={<Spinner />}>
              <Tag 
                tag={chapter?.video_length || '1:01'} 
                className="bg-primary-black bg-opacity-50 rounded-[6px]"
              />
            </Suspense>
          </div>
        </Link>
      ))}
    </aside>
  );
}
