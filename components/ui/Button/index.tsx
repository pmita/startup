"use client"

import { cn } from "@/utils/helpers";
// LIBRARIES
import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[6px] font-medium disabled:opacity-50 disabled:pointers-events-none", {
    variants: {
      variant: {
        primary: "bg-primary text-neutral border-[0.3rem] border-solid border-primary hover:bg-neutral hover:text-primary",
        secondary: "bg-secondary text-neutral border-[0.3rem] border-solid border-secondary hover:bg-neutral hover:text-secondary",
        primaryOutlined: "bg-neutral text-primary border-[0.3rem] border-solid border-primary hover:bg-primary hover:text-neutral",
        secondaryOutlined: "bg-neutral text-secondary border-[0.3rem] border-solid border-secondary hover:bg-secondary hover:text-neutral",
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