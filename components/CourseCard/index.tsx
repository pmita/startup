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

export default async function CourseCard({
  title,
  description,
  hastags
}: CourseCardProps) {
  return (
  <div className="full columnTopCenter gap-4 shadow-xl rounded-[12px]">
    <div className="full cardImageBox bg-primary-blue rounded-[12px]">
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
    <div className="detailsBox absolute columnCenterLeft gap-2 w-[90%] translate-x-[-0%] translate-y-[10%] transition-all duration-[0.3s] ease-[ease-in-out] overflow-hidden px-4 py-2 rounded-xl left-[5%] bottom-[10%] h-2/5 bg-primary-white p-4">
      <div className="flex justify-start items-center gap-2">
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

  </div>
  )
}