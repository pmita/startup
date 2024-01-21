"use client"

// NEXT
import { useRouter } from "next/navigation";
import Link from "next/link";
// REACT
import { useCallback } from "react";
// COMPONENTS
import { VideoPlayer } from "../VideoPlayer";
import { ToggleProgressButton } from "../Buttons";
import { LockSVG } from "../SVGs";
import { buttonVariants } from "../ui/Button";
// HOOKS
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
import { useAuthState } from "@/hooks/useAuthState";
// UTILS
import { cn } from "@/utils/helpers";

interface VideoContainerProps {
  chapterId?: string
  videoId: number | undefined
  isFree?: boolean
  prevChapterLink?: React.ReactNode
  nextChapterLink?: React.ReactNode
} 
const VideoContainer = ({
  chapterId,
  videoId,
  isFree,
  prevChapterLink = false,
  nextChapterLink = false,
}: VideoContainerProps) => {
  // STATE && HOOKS
  const { user } = useAuthState();
  const canAccess = useIsSubscriptionValid();
  const router = useRouter();

  // EVENTS
  const onVideoEnded = useCallback(() => {
    if (true && nextChapterLink) {
      router.push(`/courses/${nextChapterLink}` + `?autoplay=true`);
    }
  }, [nextChapterLink, router]);

  return (
    <section className="w-full flex flex-col justify-center items-stretch gap-10">
      <VideoPlayer 
        videoId={videoId ?? undefined}
        isFree={isFree ?? false}
        canAccess={canAccess}
        onVideoEnded={onVideoEnded}
      />

      <div className="flex justify-between items-stretch">
        <div className="flex justify-center items-center gap-2.5">
            {prevChapterLink && (
              <Link 
                href={`/courses/${prevChapterLink}`}
                className={cn(buttonVariants({
                  variant: "secondaryOutlined",
                  size: "sm"
                }))}
              >
                Play Previous
              </Link>
            )}
            {nextChapterLink && (
              <Link 
                href={`/courses/${nextChapterLink}`}
                className={cn(buttonVariants({
                  variant: "secondaryOutlined",
                  size: "sm"
                }))}
              >
                Play Next
              </Link>
            )}
          </div>
        <div className="flex justify-center items-center gap-2.5">
          {/* {videoId && (
            <button
              onClick={handleToggleAutoPlay}
              className={cn(buttonVariants({
                variant: isAutoPlayOn ? "primary" : "secondaryOutlined",
                size: "sm"
              }))}
            >
              {isAutoPlayOn ? 'AutoPlay: On' : 'AutoPlay: Off'}
            </button>
          )} */}
          {((isFree || canAccess) && user) ? (
            <ToggleProgressButton chapterId={chapterId} />
          ) : (
            <LockSVG width="25px" height="25px" fill="green"/>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoContainer;
