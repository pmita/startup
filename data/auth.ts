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

export const getInvoices = async (LIMIT: number) => {
  const user = await isUserAuthed();

  let docData= null;

  if (user) {
    const docRef = firestore.collection(`users/${user.uid}/invoices`).orderBy('created', 'desc').limit(LIMIT);
    docData = (await docRef.get()).docs.map((doc) => ({ 
      ...doc.data(), 
      id: doc.id, 
      created: doc.data()?.created.toMillis() || 0, 
    }));
  }

  return docData as UserInvoiceDocument[] | null;
  
}

// this is a working progress

export const getCollectionDocuments = async (
  collection: string,
  startAfter: string | null = null, 
  LIMIT: number | null = null
) => {
  const user = await isUserAuthed();

  let docData= null;

  if (user) {
    const docRef = firestore.collection(collection)
  
    if (startAfter) {
      docRef.startAfter(startAfter);
    }
  
    if (LIMIT) {
      docRef.limit(LIMIT);
    }

    docData = (await docRef.get()).docs.map((doc) => ({ 
      id: doc.id, 
      created: doc.data().created.toMillis(), 
      ...doc.data() 
    }));
  }

  return docData;
}