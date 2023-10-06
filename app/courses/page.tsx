export const dynamic = 'force-dynamic'

// UTILS
import { firestore } from '@/utils/admingFirebase';

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

  return(
    <>
      <h1>All Courses</h1>
      {data && <h1>We got data</h1>}
    </>
  );
  }
