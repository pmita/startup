"use client"

// COMPONENTS
import ImageWithFallback from "../ImageWithFallback";
// TYPES
import { AvatarProps } from "./types";

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