"use client"

import Image from "next/image"
import { useState } from "react"
// TYPES
import { ImageWithFallbackProps } from "./types"

export default function ImageWithFallback({
  src,
  fallbackSrc,
  altText,
  ...rest
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src ?? "");

  return (
    <Image
      src={imageSrc}
      onError={() => setImageSrc(fallbackSrc)}
      {...rest}
      alt={altText || ""}
    />
  )
}
