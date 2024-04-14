// UTILS
import { cn } from "@/utils/helpers";
// TYPES
import { LayoutContainerProps } from "@/types/layouts";

export const ContainerLayout = ({ className, children }: LayoutContainerProps) => {
  return (
    <div className={cn("container px-2 pt-2 w-full", className )}>
      {children}
    </ div>
  );
}