// COMPONENTS
import { Tag as TagType } from "@/.contentlayer/generated";
// UTILS
import { cn } from "@/utils/helpers";
import { tagVariants, Tag } from "../ui/Tag";

type InfoCardProps = {
  hastags?: TagType[];
  title: string;
  description: string;
  className?: string;
}

export default async function InfoCard({ 
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
          {hastags && hastags.map(({ title, variant}) => (
            <Tag 
              key={title} 
              tag={title} 
              className={cn(tagVariants({ variant }))}
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