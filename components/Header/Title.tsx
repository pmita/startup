import { cn } from "@/lib/util";

type TitleProps = {
  title?: string;
  className?: string;
}

export default async function Title({ title, className }: TitleProps) {
  if (!title) return null;

  return (
    <h1 className={cn(
        "text-6xl font-poppins font-bold",
        className
      )}
    >
      {title}
    </h1>
  )
}