type CourseCardProps = {
  info?: React.ReactNode;
  image?: React.ReactNode;
}

export default async function CourseCard({
  info, image
}: CourseCardProps) {
  return (
    <div className="full columnTopCenter gap-4 shadow-xl bg-primary-blue rounded-[12px]">
        <div className="w-full h-3/5 relative">
          {image}
          <span
            className="absolute right-[5%] top-[5%] bg-primary-black px-2 py-1 text-center font-bold text-primary-white">
            New
          </span>
        </div>
        
        
        <div className="w-full h-2/5 border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-b-[12px] bg-primary-white p-4 py-2">
          {info}
        </div>
    </div>
    )
}