"use client"

import Image from "next/image"
import { useState } from "react"
// TYPES
import { ImageWithFallbackProps } from "@/types";

export function ImageWithFallback({
  src,
  fallbackSrc,
  altText,
  ...rest
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src ?? "");

  return (
    <Image
      className="rounded-[50%]"
      src={imageSrc}
      onError={() => setImageSrc(fallbackSrc)}
      {...rest}
      alt={altText || ""}
    />
  )
}
