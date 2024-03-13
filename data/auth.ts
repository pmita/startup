// NEXT
import { cookies } from 'next/headers';
// FIREBASE ADMIN
import { firebaseAuth, firestore } from "@/utils/firebase-admin";
// TYPES
import { UserInvoiceDocument } from '@/types';

export async function isUserAuthed() {
  const nextCookies = cookies();
  const authToken = nextCookies.get('__session');

  let user = null;

  if(authToken) {
    try {
      user = await firebaseAuth.verifyIdToken(authToken?.value);
    } catch (error) {
      throw new Error('User not authenticated');
    }
  }

  return user;
}

export const getInvoices = async () => {
  const user = await isUserAuthed();

  let data= null;

  if (user) {
    const testData = await firestore.collection('users').doc(user.uid).collection('invoices').get();
    data =  testData.docs.map((doc) => ({
      id: doc.id,
      created: doc.data().created.toMillis(),
      ...doc.data()
    }))
  }

  return data as UserInvoiceDocument[] | null;
}