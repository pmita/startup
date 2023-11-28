import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// HOOKS
import { useAuthState } from './useAuthState';
// UTILS
import { firebaseAuth, firestore, createTimeStamp } from '@/utils/firebase';
// TYPES
import { AuthActionTypes } from '@/types/AuthContextTypes';

export const useConfirmPasswordlessSignIn = () => {
  // STATE
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  // HOOKS
  const { dispatch } = useAuthState();
  const router = useRouter();

  const confirmEmailLink = async (email: string) => {
    setError(null);

    firebaseAuth.signInWithEmailLink(email, window.location.href)
      .then((result) => {
        result.additionalUserInfo?.isNewUser && result.user?.updateProfile({
          displayName: result.user.displayName
        })

        firestore.collection('users').doc(result.user?.uid).set({
          uid: result.user?.uid,
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
        }, { merge: true });

        dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: result.user });

        if(!isCancelled) {
          setError(null);
        }

        localStorage.removeItem('emailForSignIn');
        router.push('/');
      })
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { confirmEmailLink, error };
}