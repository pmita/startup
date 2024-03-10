// REACT
import { useEffect, useState } from 'react';
// UTILS
import { firestore } from '@/utils/firebase';
// TYPES
import { FirestoreOrderBy, FirestoreQuery, UserInvoiceData } from '@/types';

export const useCollectionB = () => {
  const [documents, setDocuments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const fetchFirestoreDocuments = async (
    collection: string,
    _query: FirestoreQuery | null = null,
    _orderBy: FirestoreOrderBy | null = null,
    limit: number | null = null,
    cursor: unknown | null = null,
  ) => {
    setIsLoading(true);
    let docRef = firestore.collection(collection);

    if (limit) {
      docRef.limit(limit);
    }

    if (_query) {
      docRef.where(..._query);
    }

    if (_orderBy) {
      docRef.orderBy(..._orderBy);
    }

    if (cursor) {
      docRef.startAfter(cursor);
    }

    try {
      const snapshot = await docRef.get();
      let results: UserInvoiceData[] = [];
      snapshot.forEach((doc) => {
        results.push({ 
          id: doc.id, 
          createdAt: doc.data().createdAt.toMillis(),
          ...doc.data() 
        });
      });

      if (!isCancelled) {
        setDocuments(results);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError((error as Error).message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  
  return { fetchFirestoreDocuments, documents, isLoading, error };
}