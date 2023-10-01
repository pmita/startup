"use client"

// COMPONENTS
import ImageWithFallback from "../ImageWithFallback";

interface AvatarProps {
  src: string | undefined | null;
  width: number;
  height: number;
  altText?: string;
}

export default function Avatar({src, ...rest}: AvatarProps) {
  return (
    <div className="rounded-full">
      <ImageWithFallback
        src={src}
        fallbackSrc="/images/hacker.png"
        {...rest}
      />
    </div>
  )
}