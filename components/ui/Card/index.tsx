import * as React from "react"
// UTILS
import { cn } from '@/utils/helpers';


interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, ICard>(({ className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[6px] border bg-secondary-black text-secondary shadow-sm",
        className
      )}
      {...props}
    />
  );
})
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, ICard>(({ className, ...props}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        className
      )}
      {...props}
    />
  );
})
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, ICard>(({ className, ...props}, ref) => {
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
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, ICard>(({ className, ...props}, ref) => {
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
CardContent.displayName = "CardContent";