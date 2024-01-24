// UTILS
import { cn } from "@/utils/helpers";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const bannerVariants = cva(
  "container flex flex-col justify-center items-stretch", {
  variants: {
    variant: {
      fullHeight: "h-[100vh]",
      halfHeight: "h-[50vh]",
      quarterHeight: "h-[25vh]",
    },
    size: {
      default: "text-md",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-6xl"
      }
    },
  },
)

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  bannerTitle?: React.ReactNode | null;
  tags?: React.ReactNode;
  bannerDescription?: React.ReactNode;
}

export default async function Banner({ bannerTitle, tags, bannerDescription, variant, size, className, ...props}: BannerProps) {
  return (
    <section 
      className={cn(bannerVariants({ variant, size, className }))}
      {...props}
    >

      {bannerTitle && bannerTitle}
      {tags && tags}
      {bannerDescription && bannerDescription}
    </section>
  )
}