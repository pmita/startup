// UTILS
import { cn } from "@/utils/helpers/client"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: React.ReactNode;
  headerDescription?: React.ReactNode;
}

export default async function Header({ headerTitle, headerDescription, className, ...props }: HeaderProps) {
  return (
    <div 
      className={cn(
        "flex gap-6",
        className
        )}
      {...props}
    >
      {headerTitle}
      {headerDescription}
    </div>
  )
}