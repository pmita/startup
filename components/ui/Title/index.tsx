// UTILS
import { cn } from "@/utils/helpers";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const titleVariants = cva(
  "text-6xl font-poppins font-bold", {
  variants: {
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      neutral: "text-neutral"
    },
    size: {
      default: "text-md",
      sm: "text-2xl",
      lg: "text-4xl",
      xl: "text-6xl"
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "default"
    }
  }
)

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof titleVariants> {}

export default async function Title({ 
  title, 
  className, 
  variant, 
  size, 
  ...props 
}: TitleProps) {
  if (!title) return null;

  return (
    <h1 
      className={cn(titleVariants({ variant, size, className }))}
      {...props}
    >
      {title}
    </h1>
  )
}