// COMPONENTS
import Tag from "../CourseCard/Tag"
import { NextSvg } from "../SVGs";
// UTILS
import { cn } from '@/utils/helpers';

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
        "w-full flex flex-col justify-start item-start gap-2.5 p-2.5",
        className
      )}
    >

      {icon && (
        <NextSvg width={48} height={48} fill={'#000'} />
        )}
      
      {hastags && hastags.length && (
        <div className="flex justify-start items-center gap-1">
          {hastags && hastags.map((hastag) => (
            <Tag 
              key={hastag} 
              tag={hastag} 
              className="bg-primary-black rounded-[6px]"
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