import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// FIREBASE
import { auth, firestore, GoogleAuthProvider } from '@/utils/firebase';
// HOOKS
import { useAuthContext } from './useAuthContext';
// TYPES
import {  AuthActionTypes } from '@/types/AuthContextTypes';

export const useGoogleSignIn = () => {
  // STATE
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  // HOOKS
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signInWithGoogle = async () => {
    setError(null);

    try{
      const response = await auth.signInWithPopup(GoogleAuthProvider);
      
      if (!response.user) {
        throw new Error('Sign In with Google failed');
      }

      await response.user.updateProfile({
        displayName: response.user.displayName,
      })

      await firestore.collection('users').doc(response.user.uid).set({
        uid: response.user.uid,
        email: response.user.email,
        displayName: response.user.displayName,
        photoURL: response.user.photoURL,
      })

      dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });

      if (!isCancelled) {
        setError(null);
      }

      router.push('/');
    } catch(error) {
      if (!isCancelled) {
        setError((error as Error).message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signInWithGoogle, error }
}