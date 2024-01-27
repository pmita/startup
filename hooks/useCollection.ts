// REACT
import { useEffect, useState, useRef } from 'react';
// UTILS
import { firestore } from '@/utils/firebase';
// TYPES
import { FirestoreOrderBy, FirestoreQuery } from '@/types';

export const useCollection = (
  collection: string,
  _query: FirestoreQuery | null = null,
  _orderBy: FirestoreOrderBy | null = null,
  limit: number | null = null,
  cursor: unknown | null = null,
) => {
  const [documents, setDocuments] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let docRef = firestore.collection(collection);

    if (limit) {
      docRef.limit(limit);
    }

    if (query) {
      docRef.where(...query);
    }

    if (orderBy) {
      docRef.orderBy(...orderBy);
    }

    if (cursor) {
      docRef.startAfter(cursor);
    }

    const unsubscribe = docRef.onSnapshot((snapshot) => {
      let results: { id: string; createdAt: any; }[] = [];
      snapshot.forEach((doc) => {
        results.push({ 
          id: doc.id, 
          createdAt: doc.data().createdAt.toMillis(),
          ...doc.data() 
        });

        setDocuments(results);
        setIsLoading(false);
        setError(null);
      }, (error: Error) => {
        setIsLoading(false);
        setError(error.message);
      });
    });

    return () => unsubscribe();
  }
  , [collection, query, orderBy, limit, cursor]);
  
  return { documents, isLoading, error };
}