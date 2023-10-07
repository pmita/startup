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
  <div className="block rounded-lg bg-white shadow-2xl dark:bg-neutral-700 text-center">
    <div className="w-full h-2/4 relative">
      <ImageWithFallback
        src={'/images/hacker.png'}
        fallbackSrc="/images/hacker.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        altText="John Doe"
      />
    </div>

    <div className="border-b-2 border-neutral-100 px-6 py-4 dark:border-neutral-500">
      <span
        className="inline-block whitespace-nowrap rounded-[0.27rem] bg-blue-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-blue-700">
        New
      </span>
    </div>

    <div className="p-6">
      <h5 className="mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
        {title}
      </h5>
      <p className="mb-2 text-base text-neutral-500 dark:text-neutral-300">
        {description}
      </p>
    </div>
    <div className="border-t-2 border-neutral-100 px-6 py-4 dark:border-neutral-500">
      {hastags && hastags.map((hastag) => (
        <span
          key={hastag}
          className="m-1 inline-block whitespace-nowrap rounded-[0.27rem] bg-gray-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-gray-700">
          {hastag}
        </span>
      ))}
    </div>
  </div>
  )
}