export const dynamic = 'force-dynamic'

// COMPONENTS
// import CourseCard from '@/components/CourseCard';
import TestCard from '@/components/CourseCard/test';
import Header from '@/components/Header';
// UTILS
import { getCollectionData } from '@/utils/admingFirebase';
import './style.css';

export default async function Home() {
  const collectionData = await getCollectionData('courses');

  return(
    <div className='container'>
      <Header 
        heading="All Courses" 
        subHeading="Built feature based projects and stop following step by step tutorials when coding"
        className="flex flex-col justify-center items-center gap-5"
      />
      <section className="coursesGrid mx-0 my-4 p-4 justify-center">
        {/* {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            title={card?.title}
            description={card?.description}
            hastags={card?.hastags}
          />
        ))} */}
        {collectionData.map((card) => (
          <TestCard
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
