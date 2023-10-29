// UTILS
import { cn } from '@/utils/helpers';

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
        "full columnTopCenter gap-4 shadow-xl border-[5px]",
        className
      )}
      >
        {image && image}
        {info && info}
    </div>
    )
}