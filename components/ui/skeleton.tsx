// UTILS
import { cn } from '@/utils/helpers';

export const Skeleton = ({ className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    /> 
  )
}