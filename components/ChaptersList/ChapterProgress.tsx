"use client";

// COMPONENTS
import { LockSVG } from "../SVGs";
// HOOKS
import { useCheckProgress } from "@/hooks/useCheckProgress";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";


export default function ChapterProgress({ chapterId }: { chapterId?: string }) {
  // HOOKS
  const { isCompleted } = useCheckProgress();
  const canAccess = useIsSubscriptionValid();

  console.log(canAccess)


  if (!chapterId) return null;
 
  if (!canAccess) return <LockSVG width="20px" height="20px" fill="purple"/>

  return (
    <>
      {isCompleted(chapterId || '') ? (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-green" />
      ) : (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75" />
      )}
    </>
  );
}