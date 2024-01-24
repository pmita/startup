"use client"

// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
import { useUpdateProgress } from "@/hooks/useUpdateProgress";
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
// COMPONENTS
import { LockSVG } from "../SVGs";
// UTILS
import { cn } from "@/utils/helpers";

export type ToggleProgressProps = {
  chapterId?: string
  isFree?: boolean
}

export function ToggleProgress({ chapterId, isFree }: ToggleProgressProps) {
    // HOOKS
    const { user } = useAuthState();
    const { isCompleted } = useCheckProgress();
    const { toggleProgress } = useUpdateProgress();
    const canAccess = useIsSubscriptionValid();
    
    // EVENTS
    const handleClick = useCallback(() => {
      toggleProgress(chapterId ?? '', isCompleted(chapterId ?? ''));
    }, [chapterId, isCompleted, toggleProgress]);
    
    if (!chapterId) return null;

    return (
      <>
        {(isFree || canAccess) && user ? (
          <>
            <span className="font-roboto font-bold text-4x text-secondary">Completed: </span>
            <button
              className={cn(
                "w-[20px] h-[20px] rounded-[50%]",
                isCompleted(chapterId) ? "bg-primary-green" : "bg-primary-black opacity-75"
              )}
              onClick={handleClick}
            />
          </>
        ) : (
          <LockSVG width="25px" height="25px" fill="green" />
        )}
      </>
    );
}