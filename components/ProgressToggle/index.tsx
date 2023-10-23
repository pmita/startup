"use client"

//REACT
import { useCallback } from "react";
// HOOKS
import { useUpdateProgress } from "@/hooks/useUpdateProgress";
import { useAuthState } from "@/hooks/useAuthState";

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

export default function ProgressToggle({ chapterId }: { chapterId?: string}) {
    // HOOKS
    const { userProgress } = useAuthState();

    // FUNCTIONS
    const isCompleted = useCallback((itemId: string) => (
       Object.keys(userProgress || {}).includes(itemId || '')
    ), [userProgress]);

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