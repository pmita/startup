"use client"

// COMPONENTS
import { VideoPlayer } from "./video-player";
// HOOKS
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";

interface VideoContainerProps {
  videoId: number | undefined
  isFree?: boolean
  controls?: React.ReactNode
} 
export const VideoContainer = ({
  videoId,
  isFree,
  controls
}: VideoContainerProps) => {
  // STATE && HOOKS
  const canAccess = useIsSubscriptionValid();

  return (
    <section className="w-full flex flex-col justify-center items-stretch gap-10">
      <VideoPlayer 
        videoId={videoId ?? undefined}
        isFree={isFree ?? false}
        canAccess={canAccess}
      />
      {controls && controls}
    </section>
  )
}
