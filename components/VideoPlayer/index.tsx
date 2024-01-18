"use client"

import { useEffect, useRef, useState } from "react"
import Vimeo from '@vimeo/player';
// COMPONENTS
import { buttonVariants } from "../ui/Button";
// UTILS
import { cn } from "@/utils/helpers";
import Link from "next/link";

interface VimeoPlayerProps {
    videoId: number | undefined
    isFree?: boolean
    canAccess?: boolean
    onVideoEnded?: () => void
}

export const VideoPlayer = ({
  videoId, 
  isFree, 
  canAccess,
  onVideoEnded
}: VimeoPlayerProps) => {
  const playerRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!playerRef.current) {
      if (isFree || canAccess) {
        playerRef.current = new Vimeo('video-player', {
          id: videoId,
          controls: true,
          quality: 'auto',
          title: false,
          byline: false,
        });

        playerRef.current.on('ended', () => {
          onVideoEnded && onVideoEnded();
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.off('ended');
      }
    };
  }, [onVideoEnded, videoId, isFree, canAccess]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!videoId) return null;

  return (
    <>
    {videoId && (isFree || canAccess) ? (
      <div className="aspect-video w-full relative bg-secondary">
        <div data-vimeo-logo="false" id="video-player" className="absolute top-0 left-0 w-full h-full" />
      </div>
    ) : (
      <div className="aspect-video w-full bg-secondary grid place-content-center gap-10">
        <h2 className="font-bold text-neutral">You can not view this video, upgrade now</h2>
        <Link
          href="/pro"
          className={cn(buttonVariants({
            variant: 'primary',
            className: 'mt-4'
          }))}
        >
          Upgrade to PRO
        </Link>
      </div>
    )}
    </>
  )

}