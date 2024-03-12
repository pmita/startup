// NEXT
import { cookies } from 'next/headers';
// FIREBASE ADMIN
import { firebaseAuth, firestore } from "@/utils/firebase-admin";

export async function isUserAuthed() {
  const nextCookies = cookies();
  const authToken = nextCookies.get('__session');
  // return authToken;

  let user = null;

  if(!authToken) {
    return user;
  } else {
    try {
      user = await firebaseAuth.verifyIdToken(authToken?.value);
      return user;
    } catch (error) {
      return user;
    }
  }
}

export const getInvoices = async () => {
  const user = await isUserAuthed();

  let data= null;

  if (user) {
    console.log('we are here')
    const testData = await firestore.collection('users').doc(user.uid).collection('invoices').get();
    data =  testData.docs.map((doc) => ({
      id: doc.id,
      created: doc.data().created.toMillis(),
      ...doc.data()
    }))
  }

  return data;
}