"use client"

import { useEffect, useRef, useState } from "react"
import Vimeo from '@vimeo/player';
// COMPONENTS
import { buttonVariants } from "../ui/Button";
// UTILS
import { cn } from "@/utils/helpers";
import { useIsSubscriptionValid } from "@/hooks/useIsSubscriptionValid";
import Link from "next/link";

interface VimeoPlayerProps {
    videoId: number | undefined
    isFree?: boolean
    onVideoEnded?: () => void
}

export const VideoPlayer: React.FC<VimeoPlayerProps> = ({videoId, isFree, onVideoEnded}) => {
  const playerRef = useRef<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const canAccess = useIsSubscriptionValid();

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
      <div className="aspect-video w-full relative bg-secondary bg-opacity-50">
        <div data-vimeo-logo="false" id="video-player" className="absolute top-0 left-0 w-full h-full" />
      </div>
    ) : (
      <div className="aspect-video w-full relative bg-secondary grid place-content-center gap-10">
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