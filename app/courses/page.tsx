export const dynamic = 'force-dynamic'

// COMPONENTS
import CourseCard from '@/components/CourseCard';
// UTILS
import { getCollectionData } from '@/utils/admingFirebase';

export default async function Home() {
  const collectionData = await getCollectionData('courses');

  return(
    <div className='container'>
      <section className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-poppins font-bold uppercase">Courses</h1>
        <p>Challenging project that teach you features</p>
      </section>
      <section className="grid lg:grid-cols-[repeat(4,minmax(0,1fr))] md:grid-cols-[repeat(2,minmax(0,1fr))] grid-cols-[repeat(1,minmax(0,375px))] auto-rows-[445px] gap-4 mx-0 my-4 p-4 justify-center">
        {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            title={card?.title}
            description={card?.description}
            hastags={card?.hastags}
          />
        ))}
        {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            title={card?.title}
            description={card?.description}
            hastags={card?.hastags}
          />
        ))}
        {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            title={card?.title}
            description={card?.description}
            hastags={card?.hastags}
          />
        ))}
      </section>
    </div>
  );
  }
