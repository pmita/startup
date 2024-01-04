// COMPONENTS
import Tag from "../CourseCard/Tag"
// UTILS
import { cn } from "@/utils/helpers";

type InfoCardProps = {
  icon?: boolean;
  hastags?: string[];
  title: string;
  description: string;
  className?: string;
}

export default async function InfoCard({ 
  icon, 
  hastags, 
  title, 
  description, 
  className
}: InfoCardProps) {
  return (
    <div className={cn(
        "w-full flex flex-col justify-start item-start",
        className
      )}
    >
      {hastags && hastags.length && (
        <div className="flex justify-start items-center gap-2">
          {hastags && hastags.map((hastag) => (
            <Tag 
              key={hastag} 
              tag={hastag} 
              className="bg-primary-black"
            /> 
          ))}
        </div>
      )}

      {title && (
        <h5 className="text-primary-black font-poppins font-bold text-base">
          {title}
        </h5>
      )}
      
      {description && (
        <p className="text-primary-black font-roboto text-sm">
          {description}
        </p>
      )}

    </div>
  )
}