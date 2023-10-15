import Link from "next/link"

type CourseCardProps = {
  info?: React.ReactNode;
  image?: React.ReactNode;
  slug?: string;
}

export default async function CourseCard({
  info, image, slug
}: CourseCardProps) {
  return (
    <div className="full columnTopCenter gap-4 shadow-xl bg-primary-blue rounded-[12px]">
        <div className="w-full h-3/6 relative">
          <Link href={`/courses/${slug}`}>
            {image}
            <span
              className="absolute right-[5%] top-[5%] bg-primary-black px-2 py-1 text-center font-bold text-primary-white">
              New
            </span>
          </Link>
        </div>
        
        
          <div className="w-full h-3/6 border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-b-[12px] bg-primary-white p-4 py-2">
            {info}
          </div>
    </div>
    )
}