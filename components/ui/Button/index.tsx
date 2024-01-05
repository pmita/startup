"use client"

import { cn } from "@/utils/helpers";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[6px] font-medium disabled:opacity-50 disabled:pointers-events-none", {
    variants: {
      variant: {
        primary: "bg-primary text-neutral border-[0.3rem] border-solid border-primary hover:bg-neutral hover:text-primary",
        secondary: "",
        outline: "",
        link: ""
      },
      size: {
        default: "py-[0.5rem] px-[1rem] min-h-10",
        sm: 'h-8 px-3',
        lg: 'h-12 px-8'
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}