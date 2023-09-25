import { useState, useEffect } from 'react';
// TYPES
import { AuthActionTypes } from '@/types/AuthContextTypes';
// HOOKS
import { useAuthContext } from './useAuthContext';
// UTILS
import { auth  } from '@/utils/firebase';

export const useSignOut = () => {
    // STATE
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null | string>(null);
    const [isCancelled, setIsCancelled] = useState(false);
    // HOOKS
    const { dispatch } = useAuthContext();

    const signOut = async () => {
      setIsLoading(false);
      setError(null);

      try {
        await auth.signOut();

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
