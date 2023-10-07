export interface ImageWithFallbackProps {
  src: string | null | undefined;
  fallbackSrc: string;
  width?: number;
  height?: number;
  altText?: string;
  layout?: "fixed" | "intrinsic" | "responsive" | "fill";
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  sizes?: string;
  style?: React.CSSProperties;
}