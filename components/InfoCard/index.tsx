// COMPONENTS
import Tag from "../CourseCard/Tag"
import { NextSvg } from "../SVGs";

type InfoCardProps = {
  icon?: boolean;
  hastags?: string[];
  title: string;
  description: string;
}

export default async function InfoCard({ icon, hastags, title, description }: InfoCardProps) {
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
    </>
  )
}