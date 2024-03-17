// FUNCTIONS
import { getCurrentUser } from "./auth";
// FIREBASE
import { firestore } from "@/utils/firebase-admin";
// TYPES
import { UserInvoiceDocument } from '@/types';

export const getInvoices = async (LIMIT: number) => {
  const user = await getCurrentUser();

  let docData= null;

  if (user) {
    const docRef = firestore.collection(`users/${user.uid}/invoices`)
    .orderBy('created', 'desc')
    .limit(LIMIT);
    docData = (await docRef.get()).docs.map((doc) => ({ 
      ...doc.data(), 
      id: doc.id, 
      created: doc.data()?.created.toMillis() || 0, 
    }));
  }

  return docData as UserInvoiceDocument[] | null;
}
