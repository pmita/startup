"use client"

// REACT
import { useCallback } from "react";
// COMPONENTS
import { Button } from "../ui/Button";
// HOOKS
import { useUpdateProgress } from "@/hooks/useUpdateProgress";
import { useCheckProgress } from "@/hooks/useCheckProgress";

function MarkComplete({ chapterSlug }: { chapterSlug: string}) {
  // HOOKS
  const { markComplete } = useUpdateProgress();

  // EVENTS
  const handleClick = useCallback(() => {
    markComplete(chapterSlug);
  }, [chapterSlug, markComplete]);

  return (
    <Button onClick={handleClick}>
      Mark Complete
    </Button>
  )
}

function MarkIncomplete({ chapterSlug }: { chapterSlug: string}) {
  // HOOKS
  const { markIncomplete } = useUpdateProgress();

  // EVENTS
  const handleClick = useCallback(() => {
    markIncomplete(chapterSlug);
  }, [chapterSlug, markIncomplete]);

  return (
    <Button onClick={handleClick}>
      Mark Incomplete
    </Button>
  );
}

export function ToggleProgressButton({ chapterId }: { chapterId?: string}) {
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