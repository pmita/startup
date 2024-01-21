// REACT
import { useState, useEffect } from 'react';
// UTILS
import { firebaseAuth, firestore, fieldValue} from '@/utils/firebase';


export const useUpdateProgress = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | undefined>('');
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  const currentUser = firebaseAuth.currentUser;
  const docRef = firestore.collection(`progression`).doc(currentUser?.uid);

  const toggleProgress = async (slug: string, isComplete: boolean) => {
    setIsLoading(true);

    try {
      await docRef.set({ 
        [slug]: isComplete ? fieldValue.delete() : !isComplete 
      }, { 
        merge: true 
      });

      if (!isCanceled) {
        setIsLoading(false);
      }
    } catch(err) {
      if (!isCanceled) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { toggleProgress, isLoading, error };
}