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

export default admin;

// FIRESTORE
export const firestore = admin.firestore();


export async function getCourses() {
  const courseSlugs = await firestore.collection("courses").get();
  return courseSlugs.docs.map((doc) => ({
    slug: doc.id
  }));
}

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

export async function getCourseData(slug: string) {
  const courseData = await firestore.collection("courses").doc(slug).get();
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