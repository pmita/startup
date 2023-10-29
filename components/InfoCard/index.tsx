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
        "w-full flex flex-col justify-start item-start gap-4 p-4 py-2",
        className
      )}
    >

      {icon && (
        <NextSvg width={48} height={48} fill={'#000'} />
        )}
      
      {title && (
        <h5 className="text-xl tracking-wide text-primary-black font-poppins font-bold">
          {title}
        </h5>
      )}
      
      {description && (
        <p className="text-base text-primary-black font-roboto">
          {description}
        </p>
      )}

      {hastags && hastags.length && (
        <div className="rowLeftCenter gap-1">
          {hastags && hastags.map((hastag) => (
            <Tag 
              key={hastag} 
              tag={'# ' + hastag} 
              className="bg-primary-black rounded-[6px]"
            /> 
          ))}
        </div>
      )}
    </div>
  )
}