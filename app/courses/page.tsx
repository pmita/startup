export const dynamic = 'force-dynamic'

import CourseCard from '@/components/CourseCard';
// UTILS
import { firestore, getCollectionData } from '@/utils/admingFirebase';

export async function getFirestoreData() {
  const data = await firestore.collection('courses').get().then((snapshot) => {
    if (!snapshot.empty){
      const results: any[] = [];
      snapshot.forEach((doc) => {
        if (doc.exists) {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
      return results;
    }
  });
  return data;
}

export default async function Home() {
  const data = await getFirestoreData();
  const collectionData = await getCollectionData('courses');

  return(
    <>
      <section className="flex flex-col justify-center items-center gap-5 bg-primary-blue">
        <h1 className="text-4xl font-poppins font-bold uppercase">Courses</h1>
        <p>Challenging project that teach you features</p>
      </section>
      <section className="p-5 grid grid-cols-[repeat(_auto-fit,minmax(320px,1fr))] auto-rows-[700px] gap-8">
        {collectionData.map((card) => (
          <CourseCard
            key={card.id}
            title={card?.title}
            description={card?.description}
            hastags={card?.hastags}
          />
        ))}
      </section>
    </>
  );
  }
