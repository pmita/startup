import ImageWithFallback from "../ImageWithFallback";

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
  <div className="w-full h-full flex flex-col justify-start items-center gap-4 bg-primary-white shadow-xl rounded-[12px]">
    <div className="w-full h-3/5 relative bg-primary-blue rounded-t-[25px]">
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
      <span
        className="absolute right-[5%] top-[5%] whitespace-nowrap bg-primary-blue px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-white">
        New
      </span>
    </div>

    <div className="w-full h-2/5 flex flex-col justify-start items-start p-4">
    <h5 className="mb-2 text-xl tracking-wide text-primary-black font-poppins font-bold">
        {title}
      </h5>
      <p className="mb-2 text-base text-primary-black font-roboto">
        {description}
      </p>
    <div className="flex justify-start items-center gap-2">
      {hastags && hastags.map((hastag) => (
        <span
          key={hastag}
          className="whitespace-nowrap bg-primary-blue px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-white">
          {hastag}
        </span>
      ))}
    </div>
    </div>
  </div>
  )
}