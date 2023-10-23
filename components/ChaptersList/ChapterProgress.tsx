"use client";

// HOOKS
import { useCheckProgress } from "@/hooks/useCheckProgress";


export default function ChapterProgress({ chapterId }: { chapterId?: string }) {
  // HOOKS
  const { isCompleted } = useCheckProgress();

  if (!chapterId) return null;

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