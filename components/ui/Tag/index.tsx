"use client"

// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";
// UTILS
import { cn } from "@/utils/helpers";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {
  tag?: string;
}

export const tagVariants = cva(
  "whitespace-nowrap font-semibold leading-none text-primary-white rounded-[6px] border-solid border-[0.3rem]", 
  {
    variants: {
      variant: {
        primary: "bg-primary text-neutral border-primary",
        primaryOutlined: "bg-neutral text-primary border-primary",
        secondary: "bg-secondary text-neutral border-secondary",
        secondaryOutlined: "bg-neutral text-secondary border-secondary",
        alternateOne: "bg-alternateOne text-neutral border-alternateOne",
        alternateOneOutlined: "bg-neutral text-alternateOne border-alternateOne",
        alternateTwo: "bg-alternateTwo text-neutral border-alternateTwo",
        alternateTwoOutlined: "bg-neutral text-alternateTwo border-alternateTwo",
      },
      size: {
        default: "py-[0.5rem] px-[1rem]",
        sm: "py-[0.25rem] px-[0.75rem]",
        lg: "py-[0.75rem] px-[1.25rem]"
      }
    }, 
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
)

export default function Tag({ className, variant, size, tag, ...props }: TagProps) {
  // FUNCTIONS
  if(!tag) return null;

  return (
    <span
      className={cn(tagVariants({ variant, size, className}))}
      {...props}
    >
      {tag}
    </span>
  );
}