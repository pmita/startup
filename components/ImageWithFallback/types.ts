export interface ImageWithFallbackProps {
  src: string | null | undefined;
  fallbackSrc: string;
  width?: number;
  height?: number;
  altText?: string;
}