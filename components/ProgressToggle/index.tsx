"use client"

// HOOKS
import { useUpdateProgress } from "@/hooks/useUpdateProgress";
import { useCheckProgress } from "@/hooks/useCheckProgress";

export function MarkComplete({ chapterSlug }: { chapterSlug: string}) {
  // HOOKS
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
  // HOOKS
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

export default function ProgressToggle({ chapterId }: { chapterId?: string}) {
    // HOOKS
    const { isCompleted } = useCheckProgress();

    if (!chapterId) return null;

    return (
      <>
        {isCompleted(chapterId || '') ? (
          <MarkIncomplete chapterSlug={chapterId} />
        ) : (
          <MarkComplete chapterSlug={chapterId} />
        )}
      </>
    );
}