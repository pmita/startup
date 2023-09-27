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
    <div className="flex items-center justify-center">
      <ImageWithFallback
        src={src}
        fallbackSrc="/images/avatars/default.png"
        {...rest}
      />
    </div>
  )
}