import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// HOOKS
import { useAuthContext } from './useAuthContext';
// UTILS
import { auth, firestore } from '@/utils/firebase';
// TYPES
import { AuthActionTypes } from '@/types/AuthContextTypes';

export const useConfirmEmailSignIn = () => {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  // HOOKS
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signInWithEmailConfirmed = async (email: string) => {
    setIsLoading(false);
    setError(null);

    auth.signInWithEmailLink(email, window.location.href)
      .then((result) => {
        result.additionalUserInfo?.isNewUser && result.user?.updateProfile({
          displayName: result.user.displayName
        })

        firestore.collection('users').doc(result.user?.uid).set({
          uid: result.user?.uid,
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
        })

        dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: result.user });

        if(!isCancelled) {
          setIsLoading(false);
          setError(null);
        }

        localStorage.removeItem('emailForSignIn');
        router.push('/');
      })
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signInWithEmailConfirmed, error, isLoading };
}