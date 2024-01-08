"use client"

import { useEffect, useRef, useState } from "react"
// import Vimeo from '@vimeo/player'
import Vimeo from '@vimeo/player';

interface VimeoPlayerProps {
    videoId: number
    onVideoEnded?: () => void
}

export const VideoPlayer: React.FC<VimeoPlayerProps> = ({videoId, onVideoEnded}) => {
  const playerRef = useRef<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Vimeo('video-player', {
        id: videoId,
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

  return (
    <div className="">
      <div id="video-player" className="w-full h-full" />
    </div>
  )

}