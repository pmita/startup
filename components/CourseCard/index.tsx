// UTILS
import { cn } from "@/utils/helpers/client"

type CourseCardProps = {
  info?: React.ReactNode;
  image?: React.ReactNode;
  tag?: React.ReactNode;
  slug?: string;
  className?: string;
}

export default async function CourseCard({
  info, image, className
}: CourseCardProps) {
  return (
    <div 
      className={cn(
        "full columnTopCenter shadow-xl border-[5px]",
        className
      )}
      >
        {image && image}
        {info && info}
    </div>
    )
}