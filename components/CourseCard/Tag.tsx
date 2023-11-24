// UTILS
import { cn } from "@/utils/helpers/client";
interface TagProps {
  tag: string;
  className?: string;
}

export default async function Tag({ tag, className }: TagProps) {

  if(!tag) return null;

  return (
    <span
      className={cn(
        "whitespace-nowrap font-semibold leading-none text-primary-white p-2",
        className
      )}
    >
      {tag}
    </span>
  );
}