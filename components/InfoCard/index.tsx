// COMPONENTS
import Tag from "../CourseCard/Tag"
import { NextSvg } from "../SVGs";

type InfoCardProps = {
  icon?: boolean;
  hastags?: string[];
  title: string;
  description: string;
  price?: string;
  frequency?: string;
  sellingPoints?: string[];
}

export default async function InfoCard({ 
  icon, 
  hastags, 
  title, 
  description, 
  price,
  frequency,
  sellingPoints
}: InfoCardProps) {
  return (
    <>
      {hastags && hastags.length && (
        <div className="rowLeftCenter gap-1">
          {hastags && hastags.map((hastag) => <Tag key={hastag} tag={hastag} /> )}
        </div>
      )}

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

      {price && (
        <h3 className="text-xl tracking-wide -text-primary-black font-roboto font-semibold">
          <span className="text-2xl">
            ${price}
          </span> {frequency}
        </h3>
      )}

      {sellingPoints && sellingPoints.length && (
        <ul className="flex flex-col justify-start items-start gap-2">
          {sellingPoints.map((point) => (
            <li key={point} className="text-base text-primary-black font-roboto">
              {point}
            </li>
          ))}
        </ul> 
      )}
    </>
  )
}