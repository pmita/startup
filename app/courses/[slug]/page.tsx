export const revalidate = 1200;

// COMPONENTS
import Header from "@/components/Header";
import Tag from "@/components/CourseCard/Tag";
import InfoCard from "@/components/InfoCard";
// UTILS
import { getCourseData, getCourseChapters } from "@/utils/admingFirebase";

interface Props {
  params: { slug: string };
}

export default async function CoursesPage(props: Props) { 
  // FETCH DATA
  const data = await getCourseData('courses', props.params.slug)
  const chapters = await getCourseChapters('courses', props.params.slug, 'chapters')
  return (
    <section className="container flex flex-col justify-start items-stretch gap-7 py-12">
      <Header
        heading={data?.title}
        subHeading={data?.subtitle}
        className="flex flex-col justify-center items-center gap-6" 
      />

      <p className="w-[750px] self-center text-center">
        {data?.content}
      </p>

      {data?.tags && data?.tags.length && (
        <div className="flex justify-center items-center gap-1">
          {data?.tags && data?.tags.map((hastag: any) => <Tag key={hastag} tag={hastag} /> )}
        </div>
      )}

      <h1 className="text-4xl text-center">Chapters</h1>
      
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,300px))] auto-rows-[185px] gap-8 mx-0 my-4 p-4 justify-center">
        {chapters.map((card) => (
          <div key={card.id} className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-4 py-2">
            <InfoCard 
              title={card?.title}
              description={card?.description}
            />
          </div>
        ))}
      </section>


  </section>
  )
}

