import admin from "firebase-admin";
import { serviceAccount } from "./serviceAccount";
import { CourseDocument } from "@/types";

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),

  });
} catch(error) {
  console.log('Firebase admin initialization error');
}

// FIRESTORE
export const firestore = admin.firestore();

// FUNCTIONS
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

export async function getCourseData(collection: string, slug: string) {
  const courseData = await firestore.collection(collection).doc(slug).get();
  return courseData.data();
}

export async function getCollectionData(collection: string): Promise<CourseDocument[]> {
  const collectionData = await firestore.collection(collection).get()
   .then((snapshot) => {
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   })

   return collectionData as CourseDocument[];
}