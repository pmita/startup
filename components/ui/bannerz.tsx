// REACT
import * as React from "react";
//PACKAGES
import { VariantProps, cva } from "class-variance-authority";
// UTILS
import { cn } from "@/utils/helpers";

export const bannerVariants = cva(
  "container w-full", {
    variants: {
      variant: {
        split: "flex justify-center items-stretch md:flex-row flex-col",
        center: "flex justify-center items-center",
        start: "flex justify-start items-center",
      },
      size: {
        default: "min-h-[50dvh]",
        quarter: "min-h-[25dvh]",
        half: "min-h-[50dvh]",
        threeQuarters: "min-h-[75dvh]",
        full: "min-h-[100dvh]",
      },
    },
    defaultVariants: {
      variant: "center",
      size: "default",
    }
  }
);

export interface IBanner extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  className?: string;
}

export const Banner = React.forwardRef<HTMLDivElement, IBanner>(({ className, variant, size, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bannerVariants({ variant, size, className }))}
      {...props}
    />
  );
})
Banner.displayName = "Banner";

export const BannerHeader = React.forwardRef<HTMLDivElement, IBanner>(({ className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-5 p-6",
        className
      )}
      {...props}
    />
  );
})
BannerHeader.displayName = "BannerHeader";

export const BannerTitle = React.forwardRef<HTMLHeadingElement, IBanner>(({ className, ...props}, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-sm text-secondary font-bold",
        className
      )}
      {...props}
    />
  );
})
BannerTitle.displayName = "BannerTitle";

export const BannerDescription = React.forwardRef<HTMLHeadingElement, IBanner>(({ className, ...props}, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-sm text-secondary font-normal",
        className
      )}
      {...props}
    />
  );
})
BannerDescription.displayName = "BannerDescription";

export const BannerContent = React.forwardRef<HTMLDivElement, IBanner>(({ className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        className
      )}
      {...props}
    />
  );
})
BannerContent.displayName = "BannerContent";

export const BannerFooter = React.forwardRef<HTMLDivElement, IBanner>(({ className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    />
  );
})
BannerFooter.displayName = "BannerFooter";

