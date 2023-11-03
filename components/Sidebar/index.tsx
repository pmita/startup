// UTILS
import { cn } from "@/utils/helpers";

interface AsideBarProps {
  content?: React.ReactNode;
  className?: string;
}

export default async function AsideBar({ content, className }: AsideBarProps) {
  return (
    <aside className={cn(
      "flex-[1_1_300px] self-stretch w-full h-[auto] scroll-auto p-5",
      className
    )}>
      {content}
    </aside>
  )
} 