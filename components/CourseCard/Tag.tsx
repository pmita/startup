import { cn } from "@/lib/util";
interface TagProps {
  tag: string;
  className?: string;
}

export default async function Tag({ tag, className }: TagProps) {

  if(!tag) return null;

  return (
    <span
      className={cn(
        "whitespace-nowrap font-semibold leading-none text-primary-white px-2 py-1",
        className
      )}
    >
      {tag}
    </span>
  );
}