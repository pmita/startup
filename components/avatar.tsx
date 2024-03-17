"use client"

// COMPONENTS
import { ImageWithFallback } from "./image-with-fallback";
// TYPES
import { AvatarProps } from "@/types";

export function Avatar({src, ...rest}: AvatarProps) {
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