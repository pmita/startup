"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Vimeo from '@vimeo/player';
import { Options } from "@vimeo/player";
// COMPONENTS
import { buttonVariants } from "../ui/Button";
import { ToggleProgressButton } from "../Buttons";
// UTILS
import { cn } from "@/utils/helpers";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";

interface VimeoPlayerProps {
    videoId: number | undefined
    isFree?: boolean
    onVideoEnded?: () => void
}

export const VideoPlayer: React.FC<VimeoPlayerProps> = ({videoId, isFree, onVideoEnded}) => {
  const playerRef = useRef<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const canAccess = useIsSubscriptionValid();

  useEffect(() => {
    if (!playerRef.current && videoId) {
      playerRef.current = new Vimeo('video-player', {
        id: videoId as number,
        controls: true,
        quality: 'auto',
        title: false,
        byline: false,
      })

      playerRef.current.on('ended', () => {
        onVideoEnded && onVideoEnded()
        setIsPlaying(false)
      })
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.off('ended')
      }
    }
  }, [onVideoEnded, videoId])

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying]);

  
  // EVENTS
  const handleAutoPlay = useCallback(() => {
    setShouldAutoPlay(!shouldAutoPlay);
  }, [shouldAutoPlay]);
  
  if (!videoId) return null;

  return (
    <>
    {videoId && (isFree || canAccess) ? (
      <div className="aspect-video w-full relative bg-primary bg-opacity-50">
        <div data-vimeo-logo="false" id="video-player" className="absolute top-0 left-0 w-full h-full" />
      </div>
    ) : (
      <div className="aspect-video w-full relative bg-primary bg-opacity-50">
        <h1>Test</h1>
      </div>
    )}
    </>
  )

}