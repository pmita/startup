"use client"

// REACT
import { useCallback } from "react";
// HOOKS
import { useUpdateProgress } from "@/hooks/useUpdateProgress";
import { useCheckProgress } from "@/hooks/useCheckProgress";
// UTILS
import { cn } from "@/utils/helpers";

export function ToggleProgressButton({ chapterId }: { chapterId?: string}) {
    // HOOKS
    const { isCompleted } = useCheckProgress();
    const { toggleProgress } = useUpdateProgress();
    
    // EVENTS
    const handleClick = useCallback(() => {
      toggleProgress(chapterId ?? '', isCompleted(chapterId ?? ''));
    }, [chapterId, isCompleted, toggleProgress]);
    
    if (!chapterId) return null;

    return (
      <button
        className={cn(
          "w-[20px] h-[20px] rounded-[50%]",
          isCompleted(chapterId) ? "bg-primary-green" : "bg-primary-black opacity-75"
        )}
        onClick={handleClick}
      />
    );
}