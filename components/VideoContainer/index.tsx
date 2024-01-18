"use client"

// COMPONENTS
import { VideoPlayer } from "../VideoPlayer";
import { ToggleAutoPlayButton } from "../Buttons";
import { ToggleProgressButton } from "../Buttons";
import { LockSVG } from "../SVGs";
// HOOKS
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";

interface VideoContainerProps {
  chapterId?: string | undefined
  videoId: number | undefined
  isFree?: boolean
} 
const VideoContainer = ({
  chapterId,
  videoId,
  isFree
}: VideoContainerProps) => {
  const canAccess = useIsSubscriptionValid();

  return (
    <section className="w-full flex flex-col justify-center items-stretch gap-10">
      <VideoPlayer 
        videoId={videoId ?? undefined}
        isFree={isFree ?? false}
        canAccess={canAccess}
      />

    {videoId && (
      <div className="flex justify-between items-stretch">
        <ToggleAutoPlayButton />
        {isFree || canAccess ? (
          <ToggleProgressButton chapterId={chapterId} />
        ) : (
          <LockSVG width="30px" height="30px" fill="purple"/>
        )}
      </div>
    )}
    </section>
  )
}

export default VideoContainer;