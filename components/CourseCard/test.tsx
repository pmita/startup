import Link from "next/link";
// COMPONENTS
import ImageWithFallback from "../ImageWithFallback";
import Tag from "./Tag";
// STYLES
import './style.css';

type CourseCardProps = {
  title: string;
  description: string;
  hastags?: string[];
}

export default async function TestCard({
  title,
  description,
  hastags
}: CourseCardProps) {
  return (
  <div className="full columnTopCenter gap-4 shadow-xl bg-primary-blue rounded-[12px]">
      <div className="ImageContainer relative">
        <Link href="/courses/[slug]" as={`/courses/${title}`}>
          <ImageWithFallback
            src={'/images/hacker.png'}
            fallbackSrc="/images/hacker.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            objectFit="cover"
            altText="John Doe"
          />
        </Link>
        <span
          className="absolute right-[5%] top-[5%] bg-primary-black px-2 py-1 text-center font-bold text-primary-white">
          New
        </span>
      </div>
      
      <div className="CardDetails columnCenterLeft gap-1 transition-all duration-[0.3s] ease-[ease-in-out] px-4 py-2 rounded-b-[12px] bg-primary-white p-4">
        <div className="rowLeftCenter gap-1">
          {hastags && hastags.map((hastag) => <Tag key={hastag} tag={hastag} /> )}
        </div>
        <h5 className="mb-2 text-xl tracking-wide text-primary-black font-poppins font-bold">
          {title}
        </h5>
        <p className="mb-2 text-base text-primary-black font-roboto">
          {description}
        </p>
      </div>
  </div>
  )
}