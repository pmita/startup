"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string | null | undefined;
  fallbackSrc: string;
  width?: number;
  height?: number;
  altText?: string;
}

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
