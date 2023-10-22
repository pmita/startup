"use client"

// HOOKS
import { useUpdateProgress } from "../../hooks/useFirestore";

export function MarkComplete({ chapterSlug }: { chapterSlug: string}) {
  const { markComplete } = useUpdateProgress();

  return (
    <button 
      className="button"
      onClick={() => markComplete(chapterSlug)}
    >
      Mark Complete
    </button>
  )
}

export function MarkIncomplete({ chapterSlug }: { chapterSlug: string}) {
  const { markIncomplete } = useUpdateProgress();

  return (
    <button 
      className="button"
      onClick={() => markIncomplete(chapterSlug)}
    >
      Mark Incomplete
    </button>
  );
}