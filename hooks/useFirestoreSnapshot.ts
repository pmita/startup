// REACT
import { useEffect, useState } from 'react';
// UTILS
import { firebaseAuth, firestore } from '@/utils/firebase';

export const useFirestoreSnapshot = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  const currentUser = firebaseAuth.currentUser;

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore.collection('progression').doc(currentUser?.uid).onSnapshot((snapshot) => {
        setData({ ...snapshot.data(), id: snapshot.id });
        setIsLoading(false);
        setError(null);
      }, (err) => {
        setIsLoading(false);
        setError((err as Error).message);
      })

      return () => unsubscribe();
  }, [currentUser?.uid]);


  return { data, isLoading, error };
}