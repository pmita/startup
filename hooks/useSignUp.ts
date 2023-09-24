import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// FIREBASE
import { auth, firestore } from '@/utils/firebase';
// HOOKS
import { useAuthContext } from './useAuthContext';
// TYPES
import {  AuthActionTypes } from '@/types/AuthContextTypes';

export const useSignUp = () => {
  // STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  // HOOKS
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const signUp = async (email: string, password: string, username: string) => {
    setIsLoading(false);
    setError(null);

    try{
      const response = await auth.createUserWithEmailAndPassword(email, password);
      
      if (!response.user) {
        throw new Error('Something went wrong during signUp in');
      }

      await response.user.updateProfile({
        displayName: username,
      })

      await firestore.collection('users').doc(response.user.uid).set({
        displayName: username,
        email,
      })

      dispatch({ type: AuthActionTypes.SIGN_UP_SUCCESS, payload: response.user });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
      
      router.push('/');
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

  return { signUp, error ,isLoading }
}