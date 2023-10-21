import { cn } from "@/lib/util";

type DescriptionProps = {
  description?: string;
  className?: string;
}

export default async function Description({ description, className }: DescriptionProps) {
  if (!description) return null;

  return (
    <h3 className={cn(
        "text-l font-roboto font-normal",
        className
      )}
    >
      {description}
    </h3>
  )
}