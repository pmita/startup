// UTILS
import { cn } from "@/utils/helpers";
// TYPES
import { LayoutContainerProps } from "@/types/layouts";

export const WrapContainer = ({ className, children }: LayoutContainerProps) => {
  return (
    <div className={cn("flex flex-wrap flex-row justify-center items-stretch", className )}>
      {children}
    </ div>
  );
}

export const AsideContainer = ({ className, children }: LayoutContainerProps) => {
  return (
    <div className={cn("flex-[1_1_300px] self-stretch flex flex-col flex-start items-between gap-2", className )}>
      {children}
    </ div>
  );
}

export const SectionContainer = ({ className, children }: LayoutContainerProps) => {
  return (
    <div className={cn("flex-[4_1_670px] self-stretch", className )}>
      {children}
    </ div>
  );
}