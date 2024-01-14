"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Vimeo from '@vimeo/player';
// COMPONENTS
import { buttonVariants } from "../ui/Button";
import { ToggleProgressButton } from "../Buttons";
// UTILS
import { cn } from "@/utils/helpers";

interface VimeoPlayerProps {
    videoId: string | undefined
    onVideoEnded?: () => void
}

export const VideoPlayer: React.FC<VimeoPlayerProps> = ({videoId, onVideoEnded}) => {
  const playerRef = useRef<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Vimeo('video-player', {
        id: 902736844,
        autopause: false,
        controls: true
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

  return (
    <>
      <div className="aspect-video w-full relative bg-primary bg-opacity-50">
        <div id="video-player" className="absolute top-0 left-0 w-full h-full" />
      </div>
      {/* <div className="flex justify-between items-center">
        <button
          onClick={handleAutoPlay}
          className={cn(buttonVariants({ 
            variant: shouldAutoPlay ? "primary" : "secondary"
          }))}
        >
          {shouldAutoPlay ? 'Play' : 'Pause'}
        </button>
      </div> */}
    </>
  )

}