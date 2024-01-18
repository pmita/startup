"use client"

// REACT
import { useCallback } from "react";
// COMPONENTS
import { Button, buttonVariants } from "../ui/Button";
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
      <Button
        onClick={handleClick}
        className={cn(buttonVariants({ variant: 'primary'}))}
      >
        {isCompleted(chapterId ?? '') ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
    );
}