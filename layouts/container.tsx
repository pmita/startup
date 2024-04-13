// UTILS
import { cn } from "@/utils/helpers";

export type ContainerLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export const ContainerLayout = ({ className, children }: ContainerLayoutProps) => {
  return (
    <div className={cn("container px-2 pt-2 w-full", className )}>
      {children}
    </ div>
  );
}