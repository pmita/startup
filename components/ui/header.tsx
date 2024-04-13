// UTILS
import { cn } from "@/utils/helpers"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: React.ReactNode;
  headerDescription?: React.ReactNode;
}

export function Header({ headerTitle, headerDescription, className, ...props }: HeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col justify-center items-center gap-6",
        className
        )}
      {...props}
    >
      {headerTitle}
      {headerDescription}
    </div>
  )
}