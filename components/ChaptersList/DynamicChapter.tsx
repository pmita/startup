"use client";

// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";


export default function DynamicChapter({ chapterSlug }: { chapterSlug?: string }) {
  // HOOKS
  const { userProgress } = useAuthState();

  // FUNCTIONS
  const checkIsCompleted = useCallback((chapterSlug: string) => (
     Object.keys(userProgress || {}).includes(chapterSlug || '')
  ), [userProgress]);

  return (
    <>
      {checkIsCompleted(chapterSlug || '') ? (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-green" />
      ) : (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75" />
      )}
    </>
  );
}