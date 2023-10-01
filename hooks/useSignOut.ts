import { useState, useEffect } from 'react';
// TYPES
import { AuthActionTypes } from '@/types/AuthContextTypes';
// HOOKS
import { useAuthState } from './useAuthState';
// UTILS
import { firebaseAuth  } from '@/utils/firebase';

export const useSignOut = () => {
    // STATE
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null | string>(null);
    const [isCancelled, setIsCancelled] = useState(false);
    // HOOKS
    const { dispatch } = useAuthState();

    const signOut = async () => {
      setIsLoading(false);
      setError(null);

      try {
        await firebaseAuth.signOut();

        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS});

        if(!isCancelled) {
          setIsLoading(false);
          setError(null);
        }
      } catch(error) {
        if (!isCancelled) {
          setIsLoading(false);
          setError((error as Error).message);
        }
      }
    }

    useEffect(() => {
      return () => setIsCancelled(true);
    }, []);

    return { signOut, error, isLoading }
}
