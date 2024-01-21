"use client"

// COMPONENTS
import { VideoPlayer } from "../VideoPlayer";
import { ToggleAutoPlayButton } from "../Buttons";
import { ToggleProgressButton } from "../Buttons";
import { LockSVG } from "../SVGs";
// HOOKS
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
import { useAuthState } from "@/hooks/useAuthState";

interface VideoContainerProps {
  chapterId?: string
  videoId: number | undefined
  isFree?: boolean
  nextChaptersLinks?: React.ReactNode
} 
const VideoContainer = ({
  chapterId,
  videoId,
  isFree,
  nextChaptersLinks,
}: VideoContainerProps) => {
  const { user } = useAuthState();
  const canAccess = useIsSubscriptionValid();

  console.log(user)

  return (
    <section className="w-full flex flex-col justify-center items-stretch gap-10">
      <VideoPlayer 
        videoId={videoId ?? undefined}
        isFree={isFree ?? false}
        canAccess={canAccess}
      />

      <div className="flex justify-between items-stretch">
        {nextChaptersLinks && nextChaptersLinks}
        <div className="flex justify-center items-center gap-2.5">
          {videoId && <ToggleAutoPlayButton />}
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