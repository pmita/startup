"use client";

// REACT
import { useCallback } from "react";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";


export default function ChapterProgress({ chapterId }: { chapterId?: string }) {
  // HOOKS
  const { userProgress } = useAuthState();

  // FUNCTIONS
  const isCompleted = useCallback((itemId: string) => (
     Object.keys(userProgress || {}).includes(itemId || '')
  ), [userProgress]);

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