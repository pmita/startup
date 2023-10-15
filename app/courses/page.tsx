export const dynamic = 'force-dynamic'

// COMPONENTS
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import InfoCard from '@/components/InfoCard';
// UTILS
import { getCollectionData } from '@/utils/admingFirebase';


export default async function CoursesPage() {
  const collectionData = await getCollectionData('courses');

  return(
    <div className='container flex flex-col justify-center items-stretch gap-16'>
      <Header 
        heading="All Courses" 
        subHeading="Built feature based projects and stop following step by step tutorials when coding"
        className="flex flex-col justify-center items-center gap-6"
      />
      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,300px))] auto-rows-[450px] gap-8 mx-0 my-4 p-4 justify-center">
        {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            image={
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
            }
            info={
              <InfoCard 
                hastags={card?.hastags}
                title={card?.title}
                description={card?.description}
              />
            }
          />
        ))}
      </section>
    </div>
  );
  }
