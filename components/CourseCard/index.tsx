// NEXT
import Link from "next/link"
// COMPONENTS
import Tag from "./Tag";
// LIB
import { cn } from "@/lib/util";

type CourseCardProps = {
  info?: React.ReactNode;
  image?: React.ReactNode;
  slug?: string;
  className?: string;
}

export default async function CourseCard({
  info, image, slug, className
}: CourseCardProps) {
  return (
    <div 
      className={cn(
          "full columnTopCenter gap-4 shadow-xl border-[5px]",
          className
        )}
      >
        <div className="w-full h-3/6 relative">
          <Link href={`/${slug}`}>
            {image && image}
            <Tag
              tag="New"
              className="absolute right-[5%] top-[5%] bg-primary-black rounded-[6px] py-2"
            />
          </Link>
        </div>
        
        
          {info && info}
    </div>
    )
}