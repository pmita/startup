// COMPONENTS
import Tag from "../CourseCard/Tag"

type InfoCardProps = {
  hastags?: string[];
  title: string;
  description: string;
}

export default async function InfoCard({ hastags, title, description }: InfoCardProps) {
  return (
    <>
      {hastags && hastags.length && (
        <div className="rowLeftCenter gap-1">
          {hastags && hastags.map((hastag) => <Tag key={hastag} tag={hastag} /> )}
        </div>
      )}
      
      {title && (
        <h5 className="mb-2 text-xl tracking-wide text-primary-black font-poppins font-bold">
          {title}
        </h5>
      )}
      
      {description && (
        <p className="mb-2 text-base text-primary-black font-roboto">
          {description}
        </p>
      )}
    </>
  )
}