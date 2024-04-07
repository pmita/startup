"use client"

// NEXT
import Image from "next/image";
// REACT
import { useState } from "react";
// TYPES
import { AvatarProps } from "@/types";

export function Avatar({src, altText, fallbackSrc, ...rest}: AvatarProps) {
  // STATE && VARIABLES
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